const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const CompanyConfig = require("./CompanyConfigModels");
const MEmployeeType = require("../model/MEmployeeTypeModels");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Configure Sequelize with database connection details
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

const MEmployeeSalary = sequelize.define(
  "MEmployeeSalary",
  {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    EmployeeId: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    GradeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    BandId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    CTC: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    GrossSalary: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    OTFlag: { type: DataTypes.STRING(1), defaultValue: "N" },
    OTAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    PFFlag: { type: DataTypes.STRING(1), defaultValue: "N" },
    PFNo: { type: DataTypes.STRING(50) },
    PFDate: { type: DataTypes.DATE },
    ESICFlag: { type: DataTypes.STRING(1), defaultValue: "N" },
    ESICNo: { type: DataTypes.STRING(50) },
    ESICDate: { type: DataTypes.DATE },
    UANNo: { type: DataTypes.STRING(50) },
    MLWFFlag: { type: DataTypes.STRING(1), defaultValue: "N" },
    MLWFNo: { type: DataTypes.STRING(50) },
    GratuityApplicable: { type: DataTypes.STRING(1), defaultValue: "N" },
    GratuityAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    Remark: { type: DataTypes.STRING(1000) },
    AcFlag: { type: DataTypes.STRING(1), defaultValue: "Y" },
    CreatedBy: { type: DataTypes.STRING(5) },
    CreatedOn: { type: DataTypes.DATE },
    ModifiedBy: { type: DataTypes.STRING(5) },
    ModifiedOn: { type: DataTypes.DATE },
  },
  {
    timestamps: false,
  }
);

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const employees = await MEmployeeSalary.findAll({
      attributes: {
        // Your attribute configuration here
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve active companies
router.get("/FnShowActiveData", authToken, async (req, res) => {
  try {
    const employees = await MEmployeeSalary.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const employee = req.query;
  try {
    const employees = await MEmployeeSalary.findOne({
      where: {
        EmployeeId: employee.EmployeeId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const generateEmployeeId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      // Fetch the company configuration to check if empID column is 'Yes' or 'No'
      const config = await CompanyConfig.findAll({
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["CCID", "DESC"]],
      });
      // Check if config array is empty or not
      if (!config || config.length === 0) {
        throw new Error("Company configuration not found");
      }

      // Check if empID column is 'Yes' or 'No'
      if (config[0].empID === "Yes") {
        // Fetch the EmployeeTypeId from the request body
        const employeeTypeId = req.query.EmployeeTypeId;

        // Fetch the corresponding employee type to get the ShortName
        const employeeType = await MEmployeeType.findOne({
          where: {
            EmployeeTypeId: employeeTypeId,
          },
        });
        if (!employeeType) {
          throw new Error("Employee type not found");
        }

        // Get the prefix from ShortName
        const prefix = employeeType.ShortName;

        // Generate EmployeeId with prefixes based on ShortName
        const totalRecords = await MEmployeeSalary.count();
        const newId = (totalRecords + 1).toString().padStart(3, "0");
        req.body.EmployeeId = prefix + newId;
      } else {
        // Generate EmployeeId without prefixes
        const totalRecords = await MEmployeeSalary.count();
        const newId = (totalRecords + 1).toString().padStart(3, "0");
        req.body.EmployeeId = newId;
      }
      next();
    }
  } catch (error) {
    console.error("Error generating EmployeeId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateEmployeeId,
  authToken,
  async (req, res) => {
    const salary = req.body;
    try {
      if (salary.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MEmployeeSalary.update(
          { AcFlag: "N" },
          { where: { EmployeeId: salary.EmployeeId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MEmployeeSalary.upsert(salary, {
          returning: true,
        });

        res.json({
          message: result ? "Operation successful" : "Operation failed",
        });
      }
    } catch (error) {
      console.error("Error performing operation:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
