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
)

const EmpWork = sequelize.define("EmpWork", {
    EmployeeName:{
        type: DataTypes.STRING,
    },
    DOJ:{
        type: DataTypes.STRING,
    },
    ContractStartDate:{
        type: DataTypes.STRING,
    },
    WeeklyOff:{
        type: DataTypes.STRING,
    },
    CostCenter:{
        type: DataTypes.STRING,
    },
    DepartmentGroup:{
        type: DataTypes.STRING,
    },
    Department:{
        type: DataTypes.STRING,
    },
    SubDepartment:{
        type: DataTypes.STRING,
    },
    Designation:{
        type: DataTypes.STRING,
    },
    ReportingTo:{
        type: DataTypes.STRING,
    },
    Shift:{
        type: DataTypes.STRING,
    },
    Band:{
        type: DataTypes.STRING,
    },
    Zone:{
        type: DataTypes.STRING,
    },
    Grade:{
        type: DataTypes.STRING,
    },
    Contractor:{
        type: DataTypes.STRING,
    },
    DOL:{
        type: DataTypes.STRING,
    },
    ContractEndDate:{
        type: DataTypes.STRING,
    },
    BondApplicable:{
        type: DataTypes.STRING,
    },
    Status: {
        type: DataTypes.STRING,
    },
    Remark:{
        type: DataTypes.STRING,
    },
    Status: {
        type: DataTypes.STRING,
      }
})

sequelize
  .sync()
  .then(() => {
    console.log("Emp Work table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Emp Work table:", error);
  });

module.exports = EmpWork;