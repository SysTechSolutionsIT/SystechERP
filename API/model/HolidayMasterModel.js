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

// Define the model
const Holiday = sequelize.define("Holiday", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // You might want to use an ENUM type here for "Paid", "Unpaid", "weekOff", etc.
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remark: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING, // You might want to use a BOOLEAN type if "Active" and "Inactive" are the only possible values.
    allowNull: false,
  },
});

// Create the table in the database if it doesn't exist
sequelize
  .sync()
  .then(() => {
    console.log("Holiday master table created successfully");
  })
  .catch((error) => {
    console.log("Error creating Holiday Master table", error);
  });

module.exports = Holiday;
