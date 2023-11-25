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
  "u172510268_systech",
  "u172510268_devs",
  "Ggwpfax@9990",
  {
    host: "srv1001.hstgr.io",
    dialect: "mysql",
    port: 3306,
  }
);

const MProfessTax = sequelize.define(
  "MProfessTax",
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
    PTId: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Gender: {
      type: DataTypes.STRING(10),
      defaultValue: "Male",
    },
    UpperLimit: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LowerLimit: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    PTAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    PTAmountFeb: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      defaultValue: "Y",
    },
    Remark: {
      type: DataTypes.STRING(500),
    },
    CreatedBy: {
      type: DataTypes.STRING(500),
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ModifiedBy: {
      type: DataTypes.STRING(500),
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "MProfessTax",
    timestamps: false, // Set this to true if you have createdAt and updatedAt columns
    // Other model options go here
  }
);
// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize.sync().then(() => {
  console.log("Models synced");
});

// GET endpoint to retrieve all financial year entires
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const years = await MProfessTax.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["PTId", "ASC"]],
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
    const years = await MProfessTax.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["PTId", "ASC"]],
    });
    res.json(years);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve a particular financial year entry by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const PTId = req.query.PTId;
  try {
    const years = await MProfessTax.findOne({
      where: {
        PTId: PTId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["PTId", "ASC"]],
    });
    res.json(years);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
  const earningHead = req.body;
  try {
    if (earningHead.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await MProfessTax.update(
        { AcFlag: "N" },
        { where: { PTId: earningHead.PTId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else {
      // Add or update operation
      const result = await MProfessTax.upsert(earningHead, {
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
