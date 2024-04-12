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

// Define the MHoliday model
const MHoliday = sequelize.define(
  "MHoliday",
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
    FYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HolidayId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    HolidayDate: {
      type: DataTypes.DATE,
    },
    IUFlag: DataTypes.STRING,
    HolidayDescription: {
      type: DataTypes.STRING(500),
    },
    HolidayType: {
      type: DataTypes.STRING(10),
      defaultValue: "P",
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    CreatedOn: {
      type: DataTypes.DATE,
    },
    ModifiedBy: {
      type: DataTypes.STRING(500),
    },
    ModifiedOn: {
      type: DataTypes.DATE,
    },
    Remark: {
      type: DataTypes.STRING(500),
    },
  },
  {
    timestamps: false,
  }
);

MHoliday.sync();

module.exports = MHoliday;
