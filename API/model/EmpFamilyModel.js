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

const EmpFamily = sequelize.define("EmpFamily", {
  PersonName: {
    type: DataTypes.STRING,
  },
  Relation: {
    type: DataTypes.STRING,
  },
  Education: {
    type: DataTypes.STRING,
  },
  Occupation: {
    type: DataTypes.STRING,
  },
  Address: {
    type: DataTypes.STRING,
  },
  CellNo: {
    type: DataTypes.STRING,
  },
  EmailID: {
    type: DataTypes.STRING,
  },
  Nominee: {
    type: DataTypes.STRING,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Emp Family table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Emp Family table:", error);
  });

module.exports = EmpFamily;
