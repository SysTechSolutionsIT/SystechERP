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

const MEmployeeAcademic = sequelize.define(
    'MEmployeeAcademic',
    {
        CompanyId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
        BranchId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
        EmployeeId: { type: DataTypes.INTEGER(5), allowNull: false, autoIncrement: true, primaryKey: true },
        Qualification: { type: DataTypes.STRING(350), allowNull: false },
        Institute: { type: DataTypes.STRING(500) },
        Specialization: { type: DataTypes.STRING(500) },
        Grades: { type: DataTypes.STRING(1000) },
        PassingYear: { type: DataTypes.STRING(15) },
        Remark: { type: DataTypes.STRING(1000) },
        AcFlag: { type: DataTypes.STRING(1), defaultValue: "Y" },
        CreatedBy: { type: DataTypes.STRING(5), allowNull: false },
        CreatedOn: { type: DataTypes.STRING(5) },
        ModifiedBy: { type: DataTypes.STRING(5), allowNull: false },
        ModifiedOn: { type: DataTypes.STRING(5) },
    },
    {
        timestamps: false
    }
)

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
    const employees = await MEmployeeAcademic.findAll({
      attributes: {
        // Your attribute configuration here
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve active companies
router.get("/FnShowActiveData", authToken, async (req, res) => {
  try {
    const employees = await MEmployeeAcademic.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag","ACFlag","CreatedBy","CreatedOn","ModifiedBy","ModifiedOn","Remark","BranchId","CompanyId"],
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const employeeId = req.query.EmployeeId;
  try {
    const employees = await MEmployeeAcademic.findOne({
      where: {
        EmployeeId: employeeId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
  const academic = req.body;
  try {
    if (academic.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await MEmployeeAcademic.update(
        { AcFlag: "N" },
        { where: { EmployeeId: academic.EmployeeId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else {
      // Add or update operation
      const result = await MEmployeeAcademic.upsert(academic, {
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
