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

const MEmployeewiseEarning = sequelize.define(
  "MEmployeewiseEarning",
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
    EmployeeId: {
      type: DataTypes.INTEGER(7),
      allowNull: false,
    },
    EmployeewiseEarningId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EmployeewiseEarningDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    EmployeeTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EmployeeType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    EmployeeTypeGroup: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    EarningHeadId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EarningHead: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ECalculationType: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    ECalculationValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    Formula: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Remark: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  module.exports = MEmployeewiseEarning