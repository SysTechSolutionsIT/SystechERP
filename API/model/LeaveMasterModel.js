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

const LeaveMaster = sequelize.define("LeaveMaster", {
      LeaveType: {
        type: DataTypes.STRING
      },
      ShortName: {
        type: DataTypes.STRING
      },
      PaidFlag: {
        type: DataTypes.STRING
      },
      CarryForwardFlag: {
        type: DataTypes.STRING
      },
      Remark: {
        type: DataTypes.STRING
      },
      Status: {
        type: DataTypes.STRING
      },
})

sequelize
    .sync()
    .then(() =>[
        console.log('Leave Master table created successfully')
    ])
    .catch((error) =>{
        console.log('Error Creating Leave Master', error)
    })

module.exports = LeaveMaster