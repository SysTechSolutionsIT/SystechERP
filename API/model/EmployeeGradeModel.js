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

const EmpGrade = sequelize.define("EmpGrade",{
    Name: {
        type: DataTypes.STRING,
    },
    Status: {
        type: DataTypes.STRING,
    },
    Remark: {
        type: DataTypes.STRING,
    }
})

sequelize
    .sync()
    .then(() =>{
        console.log("Emp Grade table created successfully")
    })
    .catch((error) =>{
        console.error("Error creating Emp Grade table", error);
    })

module.exports = EmpGrade