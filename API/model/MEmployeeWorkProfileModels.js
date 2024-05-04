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

const MEmployeeWorkProfile = sequelize.define(
  `MEmployeeWorkProfile`,
  {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: `00001`,
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: `00001`,
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    DOJ: { type: DataTypes.DATEONLY, allowNull: true },
    DOL: { type: DataTypes.DATEONLY, allowNull: true },
    ContractorId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    ContractorStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    ContractorEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    DeptGroupId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    DeptId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
    SubDeptId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    DesgId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
    ReportingTo: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    WeeklyOff: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    ShiftId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    BandId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
    ZoneId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
    GradeId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    CostCenterId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    BondApplicable: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: `N`,
    },
    BondAttachment: { type: DataTypes.STRING(500), allowNull: true },
    CurrentJob: { type: DataTypes.STRING(500), allowNull: true },
    Remark: { type: DataTypes.STRING(100), allowNull: true },
    AcFlag: { type: DataTypes.STRING(1), allowNull: true, defaultValue: `Y` },
    CreatedBy: { type: DataTypes.STRING(50), allowNull: true },
    CreatedOn: { type: DataTypes.STRING(50), allowNull: true },
    ModifiedBy: { type: DataTypes.STRING(50), allowNull: true },
    ModifiedOn: { type: DataTypes.STRING(50), allowNull: true },
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

sequelize.sync();

module.exports = MEmployeeWorkProfile