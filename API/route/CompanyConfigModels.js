// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

// Create an Express router
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

const CompanyConfig = sequelize.define("CompanyConfig", {
    CompanyId: {
      type: DataTypes.STRING,
      defaultValue: "00001",
    },
    BranchId: {
      type: DataTypes.STRING,
      defaultValue: "00001",
    },
    CCID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    currency: { type: DataTypes.STRING, allowNull: true },
    theme: { type: DataTypes.STRING, allowNull: true },
    date: { type: DataTypes.STRING, allowNull: true },
    sessionTM: { type: DataTypes.STRING, allowNull: true },
    remarks: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    empID: { type: DataTypes.STRING, allowNull: true },
    empIdPrefix: { type: DataTypes.STRING, allowNull: true },
    cmulti: { type: DataTypes.STRING, allowNull: true },
    att: { type: DataTypes.STRING, allowNull: true },
    aProcess: { type: DataTypes.STRING, allowNull: true },
    atap: { type: DataTypes.STRING, allowNull: true },
    shiftFlag: { type: DataTypes.STRING, allowNull: true },
    jobApp: { type: DataTypes.STRING, allowNull: true },
    holiday: { type: DataTypes.STRING, allowNull: true },
    ALockDay: { type: DataTypes.INTEGER, allowNull: true },
    odFlag: { type: DataTypes.STRING, allowNull: true },
    otFlag: { type: DataTypes.STRING, allowNull: true },
    LAFlag: { type: DataTypes.STRING, allowNull: true },
    otCalc: { type: DataTypes.STRING, allowNull: true },
    esicSal: { type: DataTypes.INTEGER, allowNull: true },
    pfSal: { type: DataTypes.INTEGER, allowNull: true },
    gratuity: { type: DataTypes.INTEGER, allowNull: true },
    mlwf1: { type: DataTypes.STRING, allowNull: true },
    mlwf2: { type: DataTypes.STRING, allowNull: true },
    salLock: { type: DataTypes.STRING, allowNull: true },
    minWages: { type: DataTypes.INTEGER, allowNull: true },
    remarks1: { type: DataTypes.STRING, allowNull: true },
    salstat: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    smtpHost: { type: DataTypes.STRING, allowNull: true },
    sender: { type: DataTypes.STRING, allowNull: true },
    username: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: true },
    message: { type: DataTypes.STRING, allowNull: true },
    smsUrl: { type: DataTypes.STRING, allowNull: true },
    sms: { type: DataTypes.STRING, allowNull: true },
    IUFlag: DataTypes.STRING,
  });

  // Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

try {
  CompanyConfig.sync()
} catch (error) {
}

module.exports = CompanyConfig