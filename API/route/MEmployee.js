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
  "u172510268_systech",
  "u172510268_devs",
  "Ggwpfax@9990",
  {
    host: "srv1001.hstgr.io",
    dialect: "mysql",
    port: 3306,
  }
);

const MEmployee = sequelize.define(
  'MEmployee',
  {
    CompanyId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    BranchId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    EmployeeId: { type: DataTypes.STRING(5), allowNull: false },
    EmployeeTypeId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '001' },
    EmployeeName: { type: DataTypes.STRING(500), allowNull: true },
    EmployeeTypeGroupId: { type: DataTypes.STRING(5), allowNull: true, defaultValue: '00001' },
    Salutation: { type: DataTypes.STRING(5), allowNull: true, defaultValue: '00013' },
    LastName: { type: DataTypes.STRING(500), allowNull: true },
    FirstName: { type: DataTypes.STRING(500), allowNull: true },
    MiddleName: { type: DataTypes.STRING(500), allowNull: true },
    MEmployeeName: { type: DataTypes.STRING(500), allowNull: true },
    AadharCardNo: { type: DataTypes.STRING(100), allowNull: true },
    PANNo: { type: DataTypes.STRING(100), allowNull: true },
    PassportNo: { type: DataTypes.STRING(100), allowNull: true },
    PassportIssueDate: { type: DataTypes.DATE, allowNull: true },
    PassportExpireDate: { type: DataTypes.DATE, allowNull: true },
    CurrentAddress: { type: DataTypes.STRING(1000), allowNull: true },
    CurrentPincode: { type: DataTypes.STRING(10), allowNull: true },
    PermanantAddress: { type: DataTypes.STRING(1000), allowNull: true },
    PermanantPincode: { type: DataTypes.STRING(10), allowNull: true },
    DOB: { type: DataTypes.DATE, allowNull: true },
    EmailId1: { type: DataTypes.STRING(100), allowNull: true },
    EmailId2: { type: DataTypes.STRING(100), allowNull: true },
    PhoneNo: { type: DataTypes.STRING(15), allowNull: true },
    CellNo1: { type: DataTypes.STRING(15), allowNull: true },
    CellNo2: { type: DataTypes.STRING(15), allowNull: true },
    BankId1: { type: DataTypes.STRING(5), allowNull: true, defaultValue: '00001' },
    AccountNo1: { type: DataTypes.STRING(100), allowNull: true },
    IFSCCode1: { type: DataTypes.STRING(50), allowNull: true },
    BankId2: { type: DataTypes.STRING(5), allowNull: true },
    AccountNo2: { type: DataTypes.STRING(100), allowNull: true },
    IFSCCode2: { type: DataTypes.STRING(50), allowNull: true },
    MaritalStatus: { type: DataTypes.STRING(15), allowNull: true, defaultValue: 'UnMarried' },
    ReferenceId: { type: DataTypes.STRING(5), allowNull: true, defaultValue: '00024' },
    DestinationId: { type: DataTypes.STRING(5), allowNull: true, defaultValue: '00001' },
    ReligionId: { type: DataTypes.STRING(5), allowNull: true, defaultValue: '00028' },
    CategoryId: { type: DataTypes.STRING(5), allowNull: true, defaultValue: '00033' },
    CasteId: { type: DataTypes.STRING(5), allowNull: true, defaultValue: '00039' },
    EmployeePhoto: { type: DataTypes.STRING(1000), allowNull: true },
    Gender: { type: DataTypes.STRING(10), allowNull: true, defaultValue: 'Male' },
    BloodGroup: { type: DataTypes.STRING(10), allowNull: true },
    DrivingLicence: { type: DataTypes.STRING(500), allowNull: true },
    FinanceAccountNo: { type: DataTypes.STRING(100), allowNull: true },
    Remark: { type: DataTypes.STRING(500), allowNull: true },
    AcFlag: { type: DataTypes.STRING(1), allowNull: true, defaultValue: 'Y' },
    CreatedBy: { type: DataTypes.STRING(5), allowNull: true },
    CreatedOn: { type: DataTypes.DATE, allowNull: true },
    ModifiedBy: { type: DataTypes.STRING(5), allowNull: true },
    ModifiedOn: { type: DataTypes.DATE, allowNull: true },
  },
  {
    timestamps: false,
    primaryKey: ['CompanyId', 'BranchId', 'EmployeeId', 'EmployeeTypeId'],
  }
);

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize.sync().then(() => {
  console.log("Models synced");
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
  try {
    if (employee.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await MEmployee.update(
        { AcFlag: "N" },
        { where: { EmployeeId: employee.EmployeeId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else {
      // Add or update operation
      const result = await MEmployee.upsert(employee, {
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
