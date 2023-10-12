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

const EmployeeId = sequelize.define("EmployeeId", {
    EmpId: {
        type: DataTypes.STRING
        
    }
})

sequelize
    .sync()
    .then(() =>{
        console.log('Employee ID Table created successfully')
    })
    .catch((error) =>{
        console.error('Error creating Employee ID table', error)
    })

module.exports = EmployeeId