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

const MEmployeewiseDeduction = sequelize.define(
  "MEmployeewiseDeduction",
  {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
      primaryKey: true,
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
      primaryKey: true,
    },
    EmployeeId: {
      type: DataTypes.STRING(7),
      allowNull: false,
      primaryKey: true,
    },
    EmployeewiseDeductionId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
      primaryKey: true,
    },
    EmployeewiseDeductionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    EmployeeTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    EmployeeType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    EmployeeTypeGroup: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    DeductionHeadId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    DeductionHead: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    DCalculationType: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    DCalculationValue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    Formula: {
      type: DataTypes.STRING(500),
    },
    Remark: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
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
    ModifiedBy: {
      type: DataTypes.STRING(5),
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

// Model synchronization
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await MEmployeewiseDeduction.sync();
    console.log("MEmployeewiseDeduction model synchronized successfully.");
  } catch (error) {
    console.error(
      "Unable to connect to the database or synchronize model:",
      error
    );
  }
})();

module.exports = MEmployeewiseDeduction;
