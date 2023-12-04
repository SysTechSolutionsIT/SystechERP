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
  "u172510268_systech",
  "u172510268_devs",
  "Ggwpfax@9990",
  {
    host: "srv1001.hstgr.io",
    dialect: "mysql",
    port: 3306,
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
sequelize.sync().then(() => {
  console.log("Models synced");
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

router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
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
