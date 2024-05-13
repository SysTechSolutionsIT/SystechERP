const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

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

const MDesignation = sequelize.define(
  'MDesignation', 
  {
    CompanyId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    BranchId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    DesignationId: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    DesignationName: { type: DataTypes.STRING(500), allowNull: false },
    ReportDesignationId: { type: DataTypes.STRING(5), defaultValue: '00001' },
    ShortName: { type: DataTypes.STRING(3) },
    DesignationsPosition: { type: DataTypes.INTEGER, defaultValue: 1 },
    Remark: { type: DataTypes.STRING(500) },
    AcFlag: { type: DataTypes.STRING(1), defaultValue: 'Y' },
    CreatedBy: { type: DataTypes.STRING(500) },
    CreatedOn: { type: DataTypes.DATE },
    ModifiedBy: { type: DataTypes.STRING(500) },
    ModifiedOn: { type: DataTypes.DATE },
  }, 
  { timestamps: false }
);

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

router.get("/FnShowAllData", authToken, async (req, res) =>{
  try{
    const designation = await MDesignation.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["DesignationId", "ASC"]],
    })
    res.json(designation)
  } catch (error){
    console.error('Error retrieving data', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET endpoint to retrieve active companies
router.get("/FnShowActiveData", authToken, async (req, res) => {
  try {
    const designation = await MDesignation.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["DesignationId", "ASC"]],
    });
    res.json(designation);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const designationid = req.query.DesignationId;
  try {
    const designation = await MDesignation.findOne({
      where: {
        DesignationId: designationid,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["DesignationId", "ASC"]],
    });
    res.json(designation);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Middleware for generating EarningHeadId
const generateDesignationId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await MDesignation.count();
      const newId = (totalRecords + 1).toString().padStart(3, "0");
      req.body.DesignationId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating Designation ID:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post("/FnAddUpdateDeleteRecord", generateDesignationId, authToken, async (req, res) => {
  const designation = req.body; // Access the DesignationId from query parameters

  try {
    if (designation.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await MDesignation.update(
        { AcFlag: "N" },
        { where: { DesignationId: designation.DesignationId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else {
      // Add or update operation
      const result = await MDesignation.upsert(designation, {
        where: { DesignationId: designation.DesignationId },  // Specify the where condition for update
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

module.exports = router;
