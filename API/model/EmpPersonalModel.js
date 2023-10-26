const { Sequelize, DataTypes } = require("sequelize");

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

const EmpPersonal = sequelize.define("EmpPersonal", {
  EmpType: {
    type: DataTypes.STRING,
  },
  EmpTypeGroup: {
    type: DataTypes.STRING,
  },
  FirstName: {
    type: DataTypes.STRING,
  },
  MiddleName: {
    type: DataTypes.STRING,
  },
  LastName: {
    type: DataTypes.STRING,
  },
  Salutation: {
    type: DataTypes.STRING,
  },
  AadharCardNo: {
    type: DataTypes.STRING,
  },
  PANNo: {
    type: DataTypes.STRING,
  },
  PassportNo: {
    type: DataTypes.STRING,
  },
  PassportIssueDate: {
    type: DataTypes.STRING,
  },
  PassportExpireDate: {
    type: DataTypes.STRING,
  },
  CurrentAddress: {
    type: DataTypes.STRING,
  },
  CurrentPinCode: {
    type: DataTypes.STRING,
  },
  PermanentAddress: {
    type: DataTypes.STRING,
  },
  PermanentPinCode: {
    type: DataTypes.STRING,
  },
  DOB: {
    type: DataTypes.STRING,
  },
  PhoneNo: {
    type: DataTypes.STRING,
  },
  CellNo1: {
    type: DataTypes.STRING,
  },
  CellNo2: {
    type: DataTypes.STRING,
  },
  EmailID1: {
    type: DataTypes.STRING,
  },
  EmailID2: {
    type: DataTypes.STRING,
  },
  BankId1: {
    type: DataTypes.STRING,
  },
  AccountNo1: {
    type: DataTypes.STRING,
  },
  IFSCCode1: {
    type: DataTypes.STRING,
  },
  BankId2: {
    type: DataTypes.STRING,
  },
  AccountNo2: {
    type: DataTypes.STRING,
  },
  IFSCCode2: {
    type: DataTypes.STRING,
  },
  AcFlag: {
    type: DataTypes.STRING,
  },
  Category: {
    type: DataTypes.STRING,
  },
  Destination: {
    type: DataTypes.STRING,
  },
  Caste: {
    type: DataTypes.STRING,
  },
  MaritalStatus: {
    type: DataTypes.STRING,
  },
  Reference: {
    type: DataTypes.STRING,
  },
  EmployeePhoto: {
    type: DataTypes.BLOB,
  },
  MEmployeeName: {
    type: DataTypes.STRING,
  },
  Religion: {
    type: DataTypes.STRING,
  },
  Gender: {
    type: DataTypes.STRING,
  },
  BloodGroup: {
    type: DataTypes.STRING,
  },
  DrivingLicense: {
    type: DataTypes.BLOB,
  },
  FinanceAccountNo: {
    type: DataTypes.STRING,
  },
  Remark: {
    type: DataTypes.STRING,
  },
  Status: {
    type: DataTypes.STRING,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Emp Personal table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Emp Personal table:", error);
  });

module.exports = EmpPersonal;
