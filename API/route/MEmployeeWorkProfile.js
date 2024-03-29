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

const MEmployeeWorkProfile = sequelize.define(
  "MEmployeeWorkProfile",
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
      type: DataTypes.INTEGER(5),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    DOJ: { type: DataTypes.STRING(50), allowNull: true },
    DOL: { type: DataTypes.STRING(50), allowNull: true },
    ContractorId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    ContractorStartDate: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    ContractorEndDate: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    DeptGroupId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    DeptId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
    SubDeptId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    DesgId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
    ReportingTo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    WeeklyOff: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: null,
    },
    ShiftId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    BandId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
    ZoneId: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
    GradeId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    CostCenterId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    BondApplicable: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N",
    },
    BondAttachment: { type: DataTypes.STRING(500), allowNull: true },
    CurrentJob: { type: DataTypes.STRING(500), allowNull: true },
    Remark: { type: DataTypes.STRING(100), allowNull: true },
    AcFlag: { type: DataTypes.STRING(1), allowNull: true, defaultValue: "Y" },
    CreatedBy: { type: DataTypes.STRING(50), allowNull: true },
    CreatedOn: { type: DataTypes.STRING(50), allowNull: true },
    ModifiedBy: { type: DataTypes.STRING(50), allowNull: true },
    ModifiedOn: { type: DataTypes.STRING(50), allowNull: true },
  },
  {
    timestamps: false,
  }
);

// Middleware for parsing JSON
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

router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const employees = await MEmployeeWorkProfile.findAll({
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
    const employees = await MEmployeeWorkProfile.findAll({
      where: {
        AcFlag: "Y",
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

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const employeeId = req.query.EmployeeId;
  try {
    const employees = await MEmployeeWorkProfile.findOne({
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
  const work = req.body;
  try {
    if (work.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await MEmployeeWorkProfile.update(
        { AcFlag: "N" },
        { where: { EmployeeId: work.EmployeeId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else {
      // Add or update operation
      const result = await MEmployeeWorkProfile.upsert(work, {
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

router.get('/GetEmployeeDetails', authToken, async (req, res) => {
  try {
    
  } catch (error) {
    
  }
})

//For monthly attendances
router.get("/GetWeeklyOff", authToken, async (req, res) => {
  try {
    const employees = await MEmployeeWorkProfile.findAll({
      attributes: ["EmployeeId", "WeeklyOff"],
    });

    if (!employees) {
      return res.status(404).json({ message: "No employees found" });
    }

    const weeklyOffs = {};
    employees.forEach((employee) => {
      weeklyOffs[employee.EmployeeId] = employee.WeeklyOff;
    });

    res.json(weeklyOffs);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
