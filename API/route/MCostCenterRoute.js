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

const MCostCenter = sequelize.define(
  "MCostCenter",
  {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    CostCenterId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    CostCenterName: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      defaultValue: "Y",
    },
    IUFlag: {
      type: DataTypes.STRING(1),
    },
    Remark: DataTypes.STRING(500),
  },
  {
    tableName: "MCostCenter", // Specify the table name if it differs from the model name
    timestamps: false, // Disable timestamps (createdAt and updatedAt)
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

MCostCenter.sync()
  .then(() => {
    console.log("MLeaveTyepe model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MLeaveTyepe model:", error);
  });

// GET endpoint to retrieve all cost centers
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const costCenters = await MCostCenter.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["CostCenterId", "ASC"]],
    });
    res.json(costCenters);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve active cost centers
router.get("/FnShowActiveData", authToken, async (req, res) => {
  try {
    const costCenters = await MCostCenter.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["CostCenterId", "ASC"]],
    });
    res.json(costCenters);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve a particular cost center by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const costCenterId = req.query.CostCenterId;
  try {
    const costCenters = await MCostCenter.findAll({
      where: {
        CostCenterId: costCenterId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["CostCenterId", "ASC"]],
    });
    res.json(costCenters);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const generateCostCenterId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await MCostCenter.count();
      const newId = (totalRecords + 1).toString().padStart(3, "0");
      req.body.CostCenterId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating EmployeeTypeId:", error);
    res.status(500).send("Internal Server Error");
  }
};

// POST endpoint to add, update, or delete a cost center
router.post(
  "/FnAddUpdateDeleteRecord",
  generateCostCenterId,
  authToken,
  async (req, res) => {
    const costCenter = req.body;
    try {
      if (costCenter.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MCostCenter.update(
          { AcFlag: "N" },
          { where: { CostCenterId: costCenter.CostCenterId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MCostCenter.upsert(costCenter, {
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
  }
);

// Export the router
module.exports = router;
