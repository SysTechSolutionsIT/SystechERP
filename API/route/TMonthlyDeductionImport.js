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

  const TMonthlyEmployeeDeductionUpload = sequelize.define('TMonthlyEmployeeDeductionUpload', {
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
    MonthlyDeductionId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    DeductionHeadId: {
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
    console.log("TMonthlyEmployeeDeductionUpload model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing TMonthlyEmployeeDeductionUpload model:", error);
  });

try {
    TMonthlyEmployeeDeductionUpload.sync()
} catch (error) {
    
}

router.get("/FnshowActiveData", authToken, async (req, res) => {
    try {
      const MonthlyDeduction = await TMonthlyEmployeeDeductionUpload.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["MonthlyDeductionId", "ASC"]],
      });
      res.json(MonthlyDeduction);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const MonthlyDeductionId = req.query.MonthlyDeductionId;
    try {
      const MonthlyDeduction = await TMonthlyEmployeeDeductionUpload.findOne({
        where: {
          MonthlyDeductionId: MonthlyDeductionId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["MonthlyDeductionId", "ASC"]],
      });
      res.json(MonthlyDeduction);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularEmployeeData", authToken, async (req, res) => {
    const EmployeeId = req.query.EmployeeId;
    try {
      const MonthlyDeduction = await TMonthlyEmployeeDeductionUpload.findAll({
        where: {
          EmployeeId: EmployeeId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["MonthlyDeductionId", "DESC"]],
      });
      res.json(MonthlyDeduction);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  const generateMonthlyDeductionId = async (req, res, next) => {
    try {
      if (req.body.IUFlag === 'I') {
        const totalRecords = await TMonthlyEmployeeDeductionUpload.count();
        const newId = (totalRecords + 1).toString().padStart(5, "0");
        req.body.MonthlyDeductionId = newId;
      }
      next();
    } catch (error) {
      console.error("Error generating EmployeeTypeId:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  // POST endpoint to add, update, or "soft-delete" a monthlyDeduction
  router.post("/FnAddUpdateDeleteRecord", generateMonthlyDeductionId, authToken, async (req, res) => {
    const monthlyDeduction = req.body;
    try {
      if (monthlyDeduction.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await TMonthlyEmployeeDeductionUpload.update(
          { AcFlag: "N" },
          { where: { MonthlyDeductionId: monthlyDeduction.MonthlyDeductionId } }
        );
  
        res.json({
          message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await TMonthlyEmployeeDeductionUpload.upsert(monthlyDeduction, {
          where:{
            MonthlyDeductionId: monthlyDeduction.MonthlyDeductionId
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
  