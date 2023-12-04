const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();

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
  'MEmployee',
  {
    CompanyId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    BranchId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    EmployeeTypeId: { type: DataTypes.STRING(50), allowNull: false, defaultValue: '001' },
    EmployeeId: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
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
    EmployeePhoto: { type: DataTypes.BLOB, allowNull: true },
    Gender: { type: DataTypes.STRING(10), allowNull: true },
    BloodGroup: { type: DataTypes.STRING(10), allowNull: true },
    DrivingLicence: { type: DataTypes.BLOB, allowNull: true },
    FinanceAccountNo: { type: DataTypes.STRING(100), allowNull: true },
    Remark: { type: DataTypes.STRING(255), allowNull: true },
    AcFlag: { type: DataTypes.STRING(1), allowNull: true, defaultValue: 'Y' },
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
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
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

router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
  const employee = req.body;
  const employeeId = req.query.EmployeeId;  // Access the EmployeeId from query parameters

  try {
    if (employee.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await MEmployee.update(
        { AcFlag: "N" },
        { where: { EmployeeId: employeeId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else {
      // Add or update operation
      const result = await MEmployee.upsert(employee, {
        where: { EmployeeId: employeeId },  // Specify the where condition for update
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
