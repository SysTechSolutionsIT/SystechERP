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

const TMonthlyAttendance = sequelize.define(
  `TMonthlyAttendance`,
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
    MAttendanceId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    ManualAttendance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PaidLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    UnpaidLeaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PaidHolidays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    UnpaidHolidays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    WeeklyOffs: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    TotalDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MAYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MAMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Presenty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Absences: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TotalSalariedDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    console.log(`Connection has been established successfully.`);
  })
  .catch((err) => {
    console.error(`Unable to connect to the database:`, err);
  });

  module.exports = TMonthlyAttendance