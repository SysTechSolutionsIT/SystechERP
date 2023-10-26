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

const Currency = sequelize.define("Currency", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  abbr: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
});

const closeDatabaseConnection = () => {
  sequelize
    .close()
    .then(() => {
      console.log("Database connection closed.");
    })
    .catch((error) => {
      console.error("Error closing database connection:", error);
    });
};

sequelize
  .sync()
  .then(() => {
    console.log("Currency masters table created successfully.");
    // closeDatabaseConnection();
  })
  .catch((error) => {
    console.error("Error creating Currency masters table:", error);
    // closeDatabaseConnection();
  });

module.exports = Currency;
