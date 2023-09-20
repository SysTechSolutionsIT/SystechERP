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

const CostCenter = sequelize.define(
  "CostCenter",
  {
    cID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cName: {
      type: DataTypes.TEXT,
    },
    cRemarks: {
      type: DataTypes.STRING, // You can adjust the data type for the role as neede
    },
    status: {
      type: DataTypes.BOOLEAN, // You can adjust the data type for the role as needed
    },
  },
  {
    timestamps: false, // Disable timestamps
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("cost center table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating cost center table:", error);
  });

module.exports = CostCenter;
