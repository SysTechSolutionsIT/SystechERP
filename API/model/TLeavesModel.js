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

const TLeaves = sequelize.define(
  "TLeaves",
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
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    LeaveApplicationId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
    },
    LeaveApplicationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EmployeeType: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    EmployeeTypeGroup: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    LeaveFromDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    LeaveToDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    LeaveTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    LeaveDays: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    TBSanctionBy: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    SanctionBy: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    SanctionFromDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    SanctionToDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    SanctionLeaveDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    SanctionMonth: {
      type: DataTypes.INTEGER, // Month of the leave
    },
    Remark: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    ApprovalFlag: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: "MP",
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: "",
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

TLeaves.sync()
  .then(() => {
    console.log("MLeaveTyepe model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MLeaveTyepe model:", error);
  });
module.exports = TLeaves;
