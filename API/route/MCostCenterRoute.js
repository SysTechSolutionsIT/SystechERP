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

const MCostCenter = sequelize.define(
  "MCostCenter",
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
    CostCenterId: {
      type: DataTypes.STRING(7),
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
    CreatedBy: DataTypes.STRING(500),
    CreatedOn: DataTypes.DATE,
    ModifiedBy: DataTypes.STRING(500),
    ModifiedOn: DataTypes.DATE,
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
sequelize.sync().then(() => {
  console.log("Models synced");
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
  } finally {
    await sequelize.close(); // Close the database connection
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
  } finally {
    await sequelize.close(); // Close the database connection
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
  } finally {
    await sequelize.close(); // Close the database connection
  }
});

// POST endpoint to add, update, or delete a cost center
router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
  const costCenter = req.body;
  try {
    const result = await MCostCenter.upsert(costCenter, {
      returning: true,
    });
    res.json({ message: result ? "Operation successful" : "Operation failed" });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await sequelize.close(); // Close the database connection
  }
});

// Export the router
module.exports = router;
