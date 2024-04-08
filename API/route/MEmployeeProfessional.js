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

const MEmployeeProfessional = sequelize.define(
    'MEmployeeProfessional',
    {
        CompanyId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
        BranchId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
        EmployeeId: { type: DataTypes.INTEGER(5), allowNull: false, autoIncrement: true, primaryKey: true },
        Employer: { type: DataTypes.STRING(350), allowNull: false },
        Experience: { type: DataTypes.STRING(500) },
        Designation: { type: DataTypes.STRING(500) },
        JobResponsibility: { type: DataTypes.STRING(1000) },
        Salary: { type: DataTypes.STRING(500) },
        CVFile: { type: DataTypes.STRING(500) },
        SalarySlipFile: { type: DataTypes.STRING(500) },
        AcFlag: { type: DataTypes.STRING(1), defaultValue: "Y" },
        Remark: { type: DataTypes.STRING(1000) },
        CreatedBy: { type: DataTypes.STRING(5), allowNull: false },
        CreatedOn: { type: DataTypes.STRING(10) },
        ModifiedBy: { type: DataTypes.STRING(5), allowNull: false },
        ModifiedOn: { type: DataTypes.STRING(10) },
    },
    {
        timestamps:false
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
    const employees = await MEmployeeProfessional.findAll({
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
    const employees = await MEmployeeProfessional.findAll({
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
    const employees = await MEmployeeProfessional.findOne({
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
          const totalRecords = await MEmployeeProfessional.count();
          const newId = (totalRecords + 1).toString().padStart(3, "0");
          req.body.EmployeeId = prefix + newId;
        } else {
          // Generate EmployeeId without prefixes
          const totalRecords = await MEmployeeProfessional.count();
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
  const professional = req.body;
  try {
    if (professional.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await MEmployeeProfessional.update(
        { AcFlag: "N" },
        { where: { EmployeeId: professional.EmployeeId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else {
      // Add or update operation
      const result = await MEmployeeProfessional.upsert(professional, {
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
