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
)

  const TMonthlyEmployeeEarningUpload = sequelize.define('TMonthlyEmployeeEarningUpload', {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
      primaryKey: true
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
      primaryKey: true
    },
    MonthlyEarningId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    EarningHeadId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    AMonth: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    AYear: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    Amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
      defaultValue: 0
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'Y'
    },
  })

  sequelize
  .sync()
  .then(() => {
    console.log("TMonthlyEmployeeEarningUpload model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing TMonthlyEmployeeEarningUpload model:", error);
  });

try {
    TMonthlyEmployeeEarningUpload.sync()
} catch (error) {
    
}

router.get("/FnshowActiveData", authToken, async (req, res) => {
    try {
      const MonthlyEarning = await TMonthlyEmployeeEarningUpload.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["MonthlyEarningId", "ASC"]],
      });
      res.json(MonthlyEarning);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const MonthlyEarningId = req.query.MonthlyEarningId;
    try {
      const MonthlyEarning = await TMonthlyEmployeeEarningUpload.findOne({
        where: {
          MonthlyEarningId: MonthlyEarningId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["MonthlyEarningId", "ASC"]],
      });
      res.json(MonthlyEarning);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularEmployeeData", authToken, async (req, res) => {
    const EmployeeId = req.query.EmployeeId;
    try {
      const MonthlyEarning = await TMonthlyEmployeeEarningUpload.findAll({
        where: {
          EmployeeId: EmployeeId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["MonthlyEarningId", "DESC"]],
      });
      res.json(MonthlyEarning);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  const generateMonthlyEarningId = async (req, res, next) => {
    try {
      if (req.body.IUFlag === 'I') {
        const totalRecords = await TMonthlyEmployeeEarningUpload.count();
        const newId = (totalRecords + 1).toString().padStart(5, "0");
        req.body.MonthlyEarningId = newId;
      }
      next();
    } catch (error) {
      console.error("Error generating EmployeeTypeId:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  // POST endpoint to add, update, or "soft-delete" a monthlyEarning
  router.post("/FnAddUpdateDeleteRecord", generateMonthlyEarningId, authToken, async (req, res) => {
    const monthlyEarning = req.body;
    try {
      if (monthlyEarning.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await TMonthlyEmployeeEarningUpload.update(
          { AcFlag: "N" },
          { where: { MonthlyEarningId: monthlyEarning.MonthlyEarningId } }
        );
  
        res.json({
          message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await TMonthlyEmployeeEarningUpload.upsert(monthlyEarning, {
          where:{
            MonthlyEarningId: monthlyEarning.MonthlyEarningId
          },
          returning: true,
        });
  
        res.json({
          message: result ? "Operation successful" : "Operation failed",
        });
      }
    } catch (error) {
      console.error("Error performing operation:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Export the router
  module.exports = router;
  