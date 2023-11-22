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
  "u172510268_systech",
  "u172510268_devs",
  "Ggwpfax@9990",
  {
    host: "srv1001.hstgr.io",
    dialect: "mysql",
    port: 3306,
  }
);

const MEmployeeWorkProfile = sequelize.define("MEmployeeWorkProfile", {
  WorkProfileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  CompanyId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  BranchId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  EmployeeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  DOJ: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  DOL: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Contractor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ContractorStartDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  ContractorEndDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  DeptGroup: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Dept: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  SubDept: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Desg: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ReportingTo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  WeeklyOff: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Shift: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Band: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Zone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Grade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CostCenter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  BondApplicable: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  BondAttachment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CurrentJob: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Remark: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  AcFlag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IUFlag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CreatedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CreatedOn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  ModifiedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ModifiedOn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize.sync().then(() => {
  console.log("Models synced");
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

module.exports = router;
