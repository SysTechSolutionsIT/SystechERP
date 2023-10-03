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

const ShiftMaster = sequelize.define("ShiftMaster", {
  sID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  eType: {
    type: DataTypes.STRING,
  },
  sName: {
    type: DataTypes.STRING,
  },
  startT: {
    type: DataTypes.STRING, // You can adjust the data type for the role as neede
  },
  endT: {
    type: DataTypes.STRING, // You can adjust the data type for the role as neede
  },
  OTstartT: {
    type: DataTypes.STRING, // You can adjust the data type for the role as neede
  },
  OTendT: {
    type: DataTypes.STRING, // You can adjust the data type for the role as neede
  },
  GRstartT: {
    type: DataTypes.STRING, // You can adjust the data type for the role as neede
  },
  GRendT: {
    type: DataTypes.STRING, // You can adjust the data type for the role as neede
  },
  halfDayHours: {
    type: DataTypes.INTEGER,
  },
  fullDayHours: {
    type: DataTypes.INTEGER,
  },
  twoDayShift: {
    type: DataTypes.BOOLEAN, // You can adjust the data type for the role as needed
  },
  autoRotateFlag: {
    type: DataTypes.BOOLEAN, // You can adjust the data type for the role as needed
  },
  graceMin: {
    type: DataTypes.INTEGER,
  },
  graceMax: {
    type: DataTypes.INTEGER,
  },
  remarks: {
    type: DataTypes.STRING, // You can adjust the data type for the role as neede
  },
  status: {
    type: DataTypes.BOOLEAN, // You can adjust the data type for the role as needed
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Shift Master table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Shift Master table:", error);
  });

module.exports = ShiftMaster;
