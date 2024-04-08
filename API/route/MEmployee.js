const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const path = require("path");
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

const MEmployee = sequelize.define(
  "MEmployee",
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
    EmployeeTypeId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "001",
    },
    EmployeeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    EmployeeName: { type: DataTypes.STRING(500), allowNull: true },
    EmployeeTypeGroupId: { type: DataTypes.STRING(50), allowNull: true },
    Salutation: { type: DataTypes.STRING(50), allowNull: true },
    LastName: { type: DataTypes.STRING(255), allowNull: true },
    FirstName: { type: DataTypes.STRING(255), allowNull: true },
    MiddleName: { type: DataTypes.STRING(255), allowNull: true },
    MEmployeeName: { type: DataTypes.STRING(255), allowNull: true },
    AadharCardNo: { type: DataTypes.STRING(100), allowNull: true },
    PANNo: { type: DataTypes.STRING(100), allowNull: true },
    PassportNo: { type: DataTypes.STRING(100), allowNull: true },
    PassportIssueDate: { type: DataTypes.STRING(50), allowNull: true },
    PassportExpireDate: { type: DataTypes.DATE, allowNull: true },
    CurrentAddress: { type: DataTypes.STRING(1000), allowNull: true },
    CurrentPincode: { type: DataTypes.STRING(10), allowNull: true },
    PermanentAddress: { type: DataTypes.STRING(1000), allowNull: true },
    PermanentPincode: { type: DataTypes.STRING(10), allowNull: true },
    DOB: { type: DataTypes.STRING(50), allowNull: true },
    EmailId1: { type: DataTypes.STRING(100), allowNull: true },
    EmailId2: { type: DataTypes.STRING(100), allowNull: true },
    PhoneNo: { type: DataTypes.STRING(15), allowNull: true },
    CellNo1: { type: DataTypes.STRING(15), allowNull: true },
    CellNo2: { type: DataTypes.STRING(15), allowNull: true },
    BankId1: { type: DataTypes.STRING(50), allowNull: true },
    AccountNo1: { type: DataTypes.STRING(100), allowNull: true },
    IFSCCode1: { type: DataTypes.STRING(50), allowNull: true },
    BankId2: { type: DataTypes.STRING(50), allowNull: true },
    AccountNo2: { type: DataTypes.STRING(100), allowNull: true },
    IFSCCode2: { type: DataTypes.STRING(50), allowNull: true },
    MaritalStatus: { type: DataTypes.STRING(15), allowNull: true },
    ReferenceId: { type: DataTypes.STRING(50), allowNull: true },
    DestinationId: { type: DataTypes.STRING(50), allowNull: true },
    ReligionId: { type: DataTypes.STRING(50), allowNull: true },
    CategoryId: { type: DataTypes.STRING(50), allowNull: true },
    CasteId: { type: DataTypes.STRING(50), allowNull: true },
    EmployeePhoto: { type: DataTypes.STRING, allowNull: true },
    Gender: { type: DataTypes.STRING(10), allowNull: true },
    BloodGroup: { type: DataTypes.STRING(10), allowNull: true },
    DrivingLicence: { type: DataTypes.BLOB, allowNull: true },
    FinanceAccountNo: { type: DataTypes.STRING(100), allowNull: true },
    Remark: { type: DataTypes.STRING(255), allowNull: true },
    AcFlag: { type: DataTypes.STRING(1), allowNull: true, defaultValue: "Y" },
    CreatedBy: { type: DataTypes.STRING(50), allowNull: true },
    CreatedOn: { type: DataTypes.STRING(50), allowNull: true },
    ModifiedBy: { type: DataTypes.STRING(50), allowNull: true },
    ModifiedOn: { type: DataTypes.STRING(50), allowNull: true },
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
    const employees = await MEmployee.findAll({
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
    const employees = await MEmployee.findAll({
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

//ROute to provide only employee Ids
router.get("/FnShowEmpIds", async (req, res) => {
  try {
    const employees = await MEmployee.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: ["EmployeeId"], // Only retrieve EmployeeId
      order: [["EmployeeId", "ASC"]],
      distinct: true, // Ensure uniqueness
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowPerticularData", authToken, async (req, res) => {
  const employeeId = req.query.EmployeeId;
  try {
    const employees = await MEmployee.findOne({
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
router.get("/FnShowImageData", authToken, async (req, res) => {
  const employeeId = req.query.EmployeeId;
  try {
    const employee = await MEmployee.findOne({
      where: {
        EmployeeId: employeeId,
      },
      attributes: ["EmployeePhoto"], // Include only the EmployeePhoto field
      order: [["EmployeeId", "ASC"]],
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const { EmployeePhoto } = employee.dataValues;

    res.json({ EmployeePhoto });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/employee-photo");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  "/upload",
  authToken,
  upload.single("image"),
  authToken,
  async (req, res) => {
    try {
      const image = req.file.filename;
      // Update the record in the MCompany table using Sequelize
      await MEmployee.update(
        { EmployeePhoto: image },
        { where: { EmployeeId: req.query.EmployeeId } }
      );

      return res.json({ Status: "Success" });
    } catch (error) {
      console.error(error);
      return res.json({ Message: "Error" });
    }
  }
);

router.get("/get-upload", authToken, async (req, res) => {
  const employeeId = req.query.EmployeeId;
  try {
    const employees = await MEmployee.findOne({
      where: {
        EmployeeId: employeeId,
      },
      attributes: ["EmployeePhoto"],
      order: [["EmployeeId", "ASC"]],
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const generateEmployeeId = async (req, res, next) => {
  if (req.body.IUFlag === 'I'){
      try {
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
          const totalRecords = await MEmployee.count();
          const newId = (totalRecords + 1).toString().padStart(3, "0");
          req.body.EmployeeId = prefix + newId;
        } else {
          // Generate EmployeeId without prefixes
          const totalRecords = await MEmployee.count();
          const newId = (totalRecords + 1).toString().padStart(3, "0");
          req.body.EmployeeId = newId;
        }
        next();
      } catch (error) {
        console.error("Error generating EmployeeId:", error);
        res.status(500).send("Internal Server Error");
      }
    };
  }

router.post(
  "/FnAddUpdateDeleteRecord",
  generateEmployeeId,
  authToken,
  async (req, res) => {
    const employee = req.body; // Access the EmployeeId from query parameters

    try {
      if (employee.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MEmployee.update(
          { AcFlag: "N" },
          { where: { EmployeeId: employee.EmployeeId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MEmployee.upsert(employee, {
          where: { EmployeeId: employee.EmployeeId }, // Specify the where condition for update
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
