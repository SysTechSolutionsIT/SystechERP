const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Op } = require("sequelize");

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

const MWeeklyOff = sequelize.define(
  "MWeeklyOff",
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
    WeeklyOffId: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    WeeklyOffName: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    Remark: {
      type: DataTypes.STRING(500),
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING(500),
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
  },
  {
    timestamps: false,
  }
);

router.use(bodyParser.json());

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

MWeeklyOff.sync()
  .then(() => {
    console.log("MWeeklyOff model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MWeeklyOff model:", error);
  });
module.exports = MWeeklyOff;
