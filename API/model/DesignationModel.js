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

const Designation = sequelize.define("Designation",{
    Name: {
      type: DataTypes.STRING, // You can adjust the data type for the role as neede
    },
    ReportDesignationName: {
      type: DataTypes.STRING, // You can adjust the data type for the role as neede
    },
    Status: {
      type: DataTypes.STRING, // You can adjust the data type for the role as neede
    },
    Remark: {
      type: DataTypes.STRING, // You can adjust the data type for the role as neede
    }
})

sequelize
    .sync()
    .then(() =>{
        console.log('Designation table created successfully')
    })
    .catch((error) =>{
        console.error('Error creating Designation table', error)
    })

module.exports = Designation