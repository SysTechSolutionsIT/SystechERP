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

const MEarningHeads = sequelize.define(
  "MEarningHeads",
  {
    CompanyId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "00001",
    },
    BranchId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "00001",
    },
    EarningHeadId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: 'E0001'
    },
    EarningHead: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EarningType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ShortName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HeadPosition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CalculationType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CalculationValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    SalaryParameter1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter6: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter7: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter8: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter9: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SalaryParameter10: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Formula: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Y",
    },
    IUFlag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CreatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FieldId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FieldName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
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
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// GET endpoint to retrieve all financial year entires
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const years = await MEarningHeads.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EarningHeadId", "ASC"]],
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
    const years = await MEarningHeads.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EarningHeadId", "ASC"]],
    });
    res.json(years);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve a particular financial year entry by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const earningHeadId = req.query.EarningHeadId;
  try {
    const years = await MEarningHeads.findOne({
      where: {
        EarningHeadId: earningHeadId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EarningHeadId", "ASC"]],
    });
    res.json(years);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Middleware for generating EarningHeadId
const generateEarningHeadId = async (req, res, next) => {
  try {
    // Check if IUFlag is 'I'
    if (req.body.IUFlag === 'I') {
      const totalRecords = await MEarningHeads.count();
      const newId = "E" + (totalRecords + 1).toString().padStart(4, "0");
      req.body.EarningHeadId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating EarningHeadId:", error);
    res.status(500).send("Internal Server Error");
  }
};


router.post("/FnAddUpdateDeleteRecord", authToken, generateEarningHeadId, async (req, res) => {
  const earningHead = req.body;
  try {
    if (earningHead.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await MEarningHeads.update(
        { AcFlag: "N" },
        { where: { EarningHeadId: earningHead.EarningHeadId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else {
      const result = await MEarningHeads.upsert(earningHead, {
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
