const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
const axios = require("axios");
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

const MLAttendance = sequelize.define(
  "MLAttendance",
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
    EmployeeId: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    Presenty: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    Absenty: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
    },
    FYear: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    Month: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
  },
  {
    timestamps: false, // Set to true if you have createdAt and updatedAt columns
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

MLAttendance.sync()
  .then(() => {
    console.log("MLAttendance model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MLAttendance model:", error);
  });

module.exports = MLAttendance;
