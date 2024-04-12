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

  const MEmployeeType = sequelize.define('MEmployeeType', {
    CompanyId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    BranchId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    EmployeeTypeId: { type: DataTypes.INTEGER(3),autoIncrement:true, allowNull: false, primaryKey: true },
    EmployeeType: { type: DataTypes.STRING(50), allowNull: false },
    EmployeeTypeGroup: { type: DataTypes.STRING(50), allowNull: false },
    PrefixEnabled: { type: DataTypes.STRING(50), allowNull: false },
    ShortName: { type: DataTypes.STRING(1) },
    Remark: { type: DataTypes.STRING(500) },
    AcFlag: { type: DataTypes.STRING(1), defaultValue: 'Y' },
    CreatedBy: { type: DataTypes.STRING(5) },
    CreatedOn: { type: DataTypes.STRING(10) },
    ModifiedBy: { type: DataTypes.STRING(5) },
    ModifiedOn: { type: DataTypes.STRING(10) },
  }, { timestamps: false });

  // Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = MEmployeeType