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

const WeeklyOff = sequelize.define("WeeklyOff", {
  weekID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  weeklyOffName: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  },
  remarks: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
  },
  status: {
    type: DataTypes.BOOLEAN, // You can adjust the data type for the role as needed
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Weekly off Master Table created successfully");
  })
  .catch((error) => {
    console.error("Error creating Weekly off Master table", error);
  });

module.exports = KRAModel;
