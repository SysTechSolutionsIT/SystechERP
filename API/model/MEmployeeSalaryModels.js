const express = require(`express`);
const bodyParser = require(`body-parser`);
const { Sequelize, DataTypes } = require(`sequelize`);
const jwt = require(`jsonwebtoken`);
const router = express.Router();


// Configure Sequelize with database connection details
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: `mysql`,
    port: process.env.DB_PORT,
  }
);

const MEmployeeSalary = sequelize.define(
  `MEmployeeSalary`,
  {
    CompanyId: {
      type: DataTypes.STRING(5),
      defaultValue: `00001`,
    },
    BranchId: {
      type: DataTypes.STRING(5),
      defaultValue: `00001`,
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    GradeId: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: `00001`,
    },
    BandId: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: `00001`,
    },
    CTC: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    GrossSalary: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    OTFlag: { type: DataTypes.STRING(1), defaultValue: `N` },
    OTAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    PFFlag: { type: DataTypes.STRING(1), defaultValue: `N` },
    PFNo: { type: DataTypes.STRING(50) },
    PFDate: { type: DataTypes.DATE },
    ESICFlag: { type: DataTypes.STRING(1), defaultValue: `N` },
    ESICNo: { type: DataTypes.STRING(50) },
    ESICDate: { type: DataTypes.DATE },
    UANNo: { type: DataTypes.STRING(50) },
    MLWFFlag: { type: DataTypes.STRING(1), defaultValue: `N` },
    MLWFNo: { type: DataTypes.STRING(50) },
    GratuityApplicable: { type: DataTypes.STRING(1), defaultValue: `N` },
    GratuityAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    Remark: { type: DataTypes.STRING(1000) },
    AcFlag: { type: DataTypes.STRING(1), defaultValue: `Y` },
    CreatedBy: { type: DataTypes.STRING(5) },
    CreatedOn: { type: DataTypes.DATE },
    ModifiedBy: { type: DataTypes.STRING(5) },
    ModifiedOn: { type: DataTypes.DATE },
  },
  {
    timestamps: false,
  }
);

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection has been established successfully.`);
  })
  .catch((err) => {
    console.error(`Unable to connect to the database:`, err);
  });

  module.exports = MEmployeeSalary