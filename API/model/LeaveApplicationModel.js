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

const LeaveApplication = sequelize.define("LeaveApplications", {
      ApprovalFlag:{
        type: DataTypes.STRING
      },
      FYear: {
        type: DataTypes.STRING
      },
      ApplicationDate: {
        type: DataTypes.STRING
      },
      EmployeeId: {
        type: DataTypes.STRING
      },
      EmployeeName: {
        type: DataTypes.STRING
      },
      LeaveType:{
        type: DataTypes.STRING
      },
      LeaveFromDate: {
        type: DataTypes.STRING
      },
      LeaveToDate: {
        type: DataTypes.STRING
      },
      remarks: {
        type: DataTypes.STRING
      },
      leaveDays: {
        type: DataTypes.STRING
      },
      Status: {
        type: DataTypes.STRING
      },
      SanctionBy:{
        type: DataTypes.STRING
      },
    SanctionFromDate:{
        type: DataTypes.STRING
    },
    SanctionToDate:{
        type: DataTypes.STRING
    },
    SanctionLeaveDay:{
        type: DataTypes.STRING
    },
})

sequelize
    .sync()
    .then(() =>{
        console.log('Leave Application Table created successfully')
    })
    .catch((error) =>{
        console.log('Error creating Leave Application Table', error)
    })

module.exports = LeaveApplication