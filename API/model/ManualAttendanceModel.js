const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

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

const TManualAttendance = sequelize.define(
  "TManualAttendance",
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
    AttendanceId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    FYear: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    EmployeeTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    JobType: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "N/A",
    },
    checkbox: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "false",
    },
    ShiftId: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    AttendanceDate: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    AttendanceDay: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    InTime: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    OutTime: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    Remark: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
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
    TBSanctionBy: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    ApprovalFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "P",
    },
    SanctionBy: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization

TManualAttendance.sync()
  .then(() => {
    console.log("TManualAttendance model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing TManualAttendance model:", error);
  });
module.exports = TManualAttendance;
