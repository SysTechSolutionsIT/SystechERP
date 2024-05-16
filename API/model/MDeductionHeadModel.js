const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");
const MEmployeewiseEarning = require("../model/MEmployeewiseEarningModels");

// Create an Express router
const router = express.Router();

// Middleware for JWT authentication
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

const MDeductionHeads = sequelize.define(
  "MDeductionHeads",
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
    DeductionHeadId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    DeductionHead: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    DeductionType: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "Salary",
    },
    ShortName: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    HeadPosition: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    CalculationType: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "Amount",
    },
    CalculationValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    SalaryParameter1: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    SalaryParameter2: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    SalaryParameter3: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    SalaryParameter4: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    SalaryParameter5: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    SalaryParameter6: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    SalaryParameter7: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    SalaryParameter8: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    SalaryParameter9: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    SalaryParameter10: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    Formula: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    Remark: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    FormulaType: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: "PF",
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING(500),
      allowNull: true,
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
// Middleware for parsing JSON
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
sequelize
  .sync()
  .then(() => {
    console.log("Deduction heads table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Deduction heads table:", error);
  });

module.exports = MDeductionHeads;
