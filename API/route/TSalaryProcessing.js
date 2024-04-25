const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Op } = require("sequelize");
const moment = require("moment");

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

const TSalaryProcessing = sequelize.define('TSalaryProcessing', {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
      primaryKey:true
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
      primaryKey:true
    },
    FYear: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    ProcessId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey:true
    },
    ProcessDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey:true
    },
    EmployeeTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    EmpType: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    DeptId: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    AMonth: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    AYear: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    Salary: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    PerDaySalary: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    Presenty: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    MonthlySalary: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    GrossSalary: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    TotalEarning: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    TotalDeduction: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    NetSalary: {
      type: DataTypes.DECIMAL(17, 2),
      allowNull: true
    },
    BankSalary: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    CashSalary: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'Y'
    },
    Remark: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
})

sequelize
  .sync()
  .then(() => {
    console.log("TSalaryProcessing model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing TSalaryProcessing model:", error);
  });

try {
    TSalaryProcessing.sync()
} catch (error) {
    
}


router.get("/FnshowActiveData", authToken, async (req, res) => {
    try {
      const Shift = await TSalaryProcessing.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["ProcessId", "ASC"]],
      });
      res.json(Shift);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const ProcessId = req.query.ProcessId;
    try {
      const Shift = await TSalaryProcessing.findOne({
        where: {
          ProcessId: ProcessId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["ProcessId", "ASC"]],
      });
      res.json(Shift);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularEmployeeData", authToken, async (req, res) => {
    const EmployeeId = req.query.EmployeeId;
    try {
      const Shift = await TSalaryProcessing.findAll({
        where: {
          EmployeeId: EmployeeId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["ProcessId", "DESC"]],
      });
      res.json(Shift);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  module.exports = TSalaryProcessing