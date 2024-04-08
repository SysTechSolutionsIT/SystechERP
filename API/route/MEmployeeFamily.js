const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const CompanyConfig = require('./CompanyConfigModels')
const MEmployeeType = require('./MEmployeeTypeModels')

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

const MEmployeeFamily = sequelize.define(
    'MEmployeeFamily',
    {
    CompanyId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    BranchId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    EmployeeId: { type: DataTypes.INTEGER(5), allowNull: false, autoIncrement: true, primaryKey: true },    
    PersonName: { type: DataTypes.STRING(350), allowNull: true },
    Relation: { type: DataTypes.STRING(500) },
    Education: { type: DataTypes.STRING(500) },
    Occupation: { type: DataTypes.STRING(500) },
    Address: { type: DataTypes.STRING(500) },
    CellNo: { type: DataTypes.STRING(500) },
    EmailId: { type: DataTypes.STRING(500) },
    Nominee: { type: DataTypes.STRING(1), defaultValue: "N" },
    Remark: { type: DataTypes.STRING(500) },
    AcFlag: { type: DataTypes.STRING(1), defaultValue: "Y" },
    CreatedBy: { type: DataTypes.STRING(5), allowNull: false },
    CreatedOn: { type: DataTypes.DATE },
    ModifiedBy: { type: DataTypes.STRING(5), allowNull: false },
    ModifiedOn: { type: DataTypes.DATE },
    }
)

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const employees = await MEmployeeFamily.findAll({
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
    const employees = await MEmployeeFamily.findAll({
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
  const employeeId = req.query.EmployeeId;
  try {
    const employees = await MEmployeeFamily.findOne({
      where: {
        EmployeeId: employeeId,
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
        if (req.body.IUFlag === 'I'){
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
              EmployeeTypeId: employeeTypeId
            }
          });
          if (!employeeType) {
            throw new Error("Employee type not found");
          }
    
          // Get the prefix from ShortName
          const prefix = employeeType.ShortName;
    
          // Generate EmployeeId with prefixes based on ShortName
          const totalRecords = await MEmployeeFamily.count();
          const newId = (totalRecords + 1).toString().padStart(3, "0");
          req.body.EmployeeId = prefix + newId;
        } else {
          // Generate EmployeeId without prefixes
          const totalRecords = await MEmployeeFamily.count();
          const newId = (totalRecords + 1).toString().padStart(3, "0");
          req.body.EmployeeId = newId;
        }
        next();
      }
      } catch (error) {
        console.error("Error generating EmployeeId:", error);
        res.status(500).send("Internal Server Error");
    };
  }


router.post("/FnAddUpdateDeleteRecord", generateEmployeeId, authToken, async (req, res) => {
  const family = req.body;
  try {
    if (family.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await MEmployeeFamily.update(
        { AcFlag: "N" },
        { where: { EmployeeId: family.EmployeeId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else if (family.IUFlag === "U") {
      // Add or update operation
      const result = await MEmployeeFamily.update(family, {
        where: { EmployeeId: EmployeeId },
        returning: true,
      });

      res.json({
        message: result ? "Operation successful" : "Operation failed",
      });
    } else {
      const result = await MEmployeeFamily.create(family, {
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
});

module.exports = router;
