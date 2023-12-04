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

const MJobsResponsibility = sequelize.define('MJobsResponsibility', {
    CompanyId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    BranchId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    JobResponsibilityId: { type: DataTypes.INTEGER(7), autoIncrement: true, allowNull: false, primaryKey: true },
    JobResponsibilityName: { type: DataTypes.STRING(500), allowNull: false },
    Duration: { type: DataTypes.INTEGER, defaultValue: 0 },
    Points: { type: DataTypes.INTEGER, defaultValue: 0 },
    Remark: { type: DataTypes.STRING(500), allowNull: true },
    AcFlag: { type: DataTypes.STRING(1), defaultValue: 'Y' },
    CreatedBy: { type: DataTypes.STRING(500), allowNull: true },
    CreatedOn: { type: DataTypes.DATE, allowNull: true },
    ModifiedBy: { type: DataTypes.STRING(500), allowNull: true },
    ModifiedOn: { type: DataTypes.DATE, allowNull: true },
  }, { timestamps: false, })

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize.sync().then(() => {
  console.log("Models synced");
});  

// GET endpoint to retrieve all companies
router.get("/FnShowAllData", authToken, async (req, res) => {
    try {
      const jobResponsibility = await MJobsResponsibility.findAll({
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["JobResponsibilityId", "ASC"]],
      });
      res.json(jobResponsibility);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // GET endpoint to retrieve active companies
router.get("/FnShowActiveData", async (req, res) => {
    try {
      const jobResponsibility = await MJobsResponsibility.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["JobResponsibilityId", "ASC"]],
      });
      res.json(jobResponsibility);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // GET endpoint to retrieve a particular jobResponsibility by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
    const jobResponsibilityid = req.query.JobsResponsibilityId;
    try {
      const jobResponsibility = await MJobsResponsibility.findOne({
        where: {
          JobsResponsibilityId: jobResponsibilityid,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["JobsResponsibilityId", "ASC"]],
      });
      res.json(jobResponsibility);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // POST endpoint to add, update, or "soft-delete" a jobResponsibility
router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
    const jobResponsibility = req.body;
    try {
      if (jobResponsibility.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MJobsResponsibility.update(
          { AcFlag: "N" },
          { where: { JobsResponsibilityId: jobResponsibility.JobsResponsibilityId } }
        );
  
        res.json({
          message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MJobsResponsibility.upsert(jobResponsibility, {
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