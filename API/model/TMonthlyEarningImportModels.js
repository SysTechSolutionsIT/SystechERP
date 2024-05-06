const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Op } = require("sequelize");
const moment = require("moment");


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
)

  const TMonthlyEmployeeEarningUpload = sequelize.define('TMonthlyEmployeeEarningUpload', {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
      primaryKey: true
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
      primaryKey: true
    },
    MonthlyEarningId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    EarningHeadId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    AMonth: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    AYear: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    Amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
      defaultValue: 0
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'Y'
    },
  })

  sequelize
  .sync()
  .then(() => {
    console.log("TMonthlyEmployeeEarningUpload model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing TMonthlyEmployeeEarningUpload model:", error);
  });

module.exports = TMonthlyEmployeeEarningUpload