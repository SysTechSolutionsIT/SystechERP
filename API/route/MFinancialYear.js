// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

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

// Define the MFinancialYear model
const MFinancialYear = sequelize.define("MFinancialYear", {
  CompanyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  BranchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  FYearId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  StartDate: DataTypes.DATE,
  EndDate: DataTypes.DATE,
  ShortName: DataTypes.STRING(100),
  YearClose: {
    type: DataTypes.STRING(1),
    allowNull: false,
  },
  AcFlag: {
    type: DataTypes.STRING(1),
    defaultValue: "Y",
  },
  IUFlag: DataTypes.STRING,
  Remark: DataTypes.STRING(500),
});

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// GET endpoint to retrieve all financial year entires
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const years = await MFinancialYear.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["FYearId", "ASC"]],
    });
    res.json(years);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve active financial year entries
router.get("/FnShowActiveData", async (req, res) => {
  try {
    const years = await MFinancialYear.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["FYearId", "ASC"]],
    });
    res.json(years);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve a particular financial year entry by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const yearId = req.query.FYearId;
  try {
    const years = await MFinancialYear.findOne({
      where: {
        FYearId: yearId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["FYearId", "ASC"]],
    });
    res.json(years);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST endpoint to add, update, or "soft-delete" a financial year entry
router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
  const year = req.body;
  try {
    if (year.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await MFinancialYear.update(
        { AcFlag: "N" },
        { where: { FYearId: year.FYearId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else {
      // Add or update operation
      const result = await MFinancialYear.upsert(year, {
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
