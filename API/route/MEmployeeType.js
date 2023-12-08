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

const MEmployeeType = sequelize.define('MEmployeeType', {
    CompanyId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    BranchId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    EmployeeTypeId: { type: DataTypes.INTEGER(3),autoIncrement:true, allowNull: false, primaryKey: true },
    EmployeeType: { type: DataTypes.STRING(50), allowNull: false },
    EmployeeTypeGroup: { type: DataTypes.STRING(50), allowNull: false },
    ShortName: { type: DataTypes.STRING(1) },
    Remark: { type: DataTypes.STRING(500) },
    AcFlag: { type: DataTypes.STRING(1), defaultValue: 'Y' },
    CreatedBy: { type: DataTypes.STRING(5) },
    CreatedOn: { type: DataTypes.STRING(10) },
    ModifiedBy: { type: DataTypes.STRING(5) },
    ModifiedOn: { type: DataTypes.STRING(10) },
  }, { timestamps: false });

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

router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const employeeType = await MEmployeeType.findAll({
      attributes: {
        // Your attribute configuration here
      },
      order: [["EmployeeTypeId", "ASC"]],
    });
    res.json(employeeType);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  } 
});

// GET endpoint to retrieve active companies
router.get("/FnShowActiveData", authToken, async (req, res) => {
  try {
    const employeeType = await MEmployeeType.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeTypeId", "ASC"]],
    });
    res.json(employeeType);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const employeeTypeId = req.query.EmployeeTypeId;
  try {
    const employeeType = await MEmployeeType.findOne({
      where: {
        EmployeeTypeId: employeeTypeId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeTypeId", "ASC"]],
    });
    res.json(employeeType);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Middleware for generating EarningHeadId
const generateEmployeeTypeId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === 'I') {
      const totalRecords = await MEmployeeType.count();
      const newId = (totalRecords + 1).toString().padStart(3, "0");
      req.body.EmployeeTypeId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating EmployeeTypeId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post("/FnAddUpdateDeleteRecord", generateEmployeeTypeId, authToken, async (req, res) => {
    const employeeType = req.body;
    const employeeTypeId = employeeType.EmployeeTypeId;  // Access the EmployeeTypeId from the request body
  
    try {
      if (employeeType.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MEmployeeType.update(
          { AcFlag: "N" },
          { where: { EmployeeTypeId: employeeTypeId } }
        );
  
        res.json({
          message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MEmployeeType.upsert(employeeType, {
          where: { EmployeeTypeId: employeeTypeId },  // Specify the where condition for update
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
  
  process.on("SIGINT", () => {
    console.log("Received SIGINT. Closing Sequelize connection...");
    sequelize.close().then(() => {
      console.log("Sequelize connection closed. Exiting...");
      process.exit(0);
    });
  });
  

module.exports = router;
