// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

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

const MEarningHeads = sequelize.define(
  "MEarningHeads",
  {
    CompanyId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "00001",
    },
    BranchId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "00001",
    },
    EarningHeadId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: 'E0001'
    },
    EarningHead: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EarningType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ShortName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HeadPosition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CalculationType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CalculationValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    SalaryParameter1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter6: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter7: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter8: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter9: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter10: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Formula: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FieldId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FieldName: {
      type: DataTypes.STRING,
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
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = MEarningHeads