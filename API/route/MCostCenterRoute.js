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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    CostCenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "CostCenterId", // Set the field name to maintain the "CostCenterId" format
      get() {
        // Format the CostCenterId as "0001"
        const rawValue = this.getDataValue("CostCenterId");
        return rawValue ? rawValue.toString().padStart(4, "0") : null;
      },
    },
    CostCenterName: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      defaultValue: "Y",
    },
    Remark: DataTypes.STRING(500),
    Status: DataTypes.STRING(10),
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

// POST endpoint to add, update, or delete a cost center
router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
  const costCenter = req.body;
  try {
    if (costCenter.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await MCostCenter.update(
        { AcFlag: "N" },
        { where: { CostCenterId: costCenter.CostCenterId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
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
});

// Export the router
module.exports = router;
