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

const KRAModel = sequelize.define("KRA", {
    Name: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  },
    Duration: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  },
    Points: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  },
    Status: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  }
})

sequelize
    .sync()
    .then(() =>{
        console.log('KRA Table created successfully')
    })
    .catch((error) =>{
        console.error('Error creating KRA table', error);
    })

module.exports = KRAModel