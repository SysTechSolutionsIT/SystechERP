const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Configure Sequelize with database connection details
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

const mleavetype = sequelize.define(
  "mleavetype",
  {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    LeaveTypeId: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    LeaveType: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ShortName: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    DefaultBalance: {
      type: DataTypes.INTEGER(20),
      allowNull: true,
    },
    MaxPerMonth: {
      type: DataTypes.INTEGER(20),
      allowNull: true,
    },
    PaidFlag: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "P",
    },
    CarryForwardFlag: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "Y",
    },
    Remark: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

router.use(bodyParser.json());

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

mleavetype
  .sync()
  .then(() => {
    console.log("mleavetype model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing mleaveTyepe model:", error);
  });
module.exports = mleavetype;
