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

const FinModel = sequelize.define("FinModel", {
  finId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fShortName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sDate: {
    type: DataTypes.DATE, // You can adjust the data type for the role as needed
  },
  eDate: {
    type: DataTypes.DATE, // You can adjust the data type for the role as needed
  },
  yearAct: {
    type: DataTypes.INTEGER, // You can adjust the data type for the role as needed
  },
  remarks: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  },
  status: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Financial Model table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Financial Model table:", error);
  });

module.exports = FinModel;
