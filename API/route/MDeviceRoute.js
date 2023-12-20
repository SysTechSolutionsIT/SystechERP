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

// Define the MDevice model
const MDevice = sequelize.define(
  "MDevice",
  {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    DeviceId: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    DeviceName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    IpAddress: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    PortNo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Remark: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
    CreatedBy: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

sequelize.sync();

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully. --Device");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// GET endpoint to retrieve all companies
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const companies = await MDevice.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["DeviceId", "ASC"]],
    });
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve active companies
router.get("/FnShowActiveData", async (req, res) => {
  try {
    const companies = await MDevice.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["DeviceId", "ASC"]],
    });
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve a particular company by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const DeviceId = req.query.DeviceId;
  try {
    const companies = await MDevice.findOne({
      where: {
        DeviceId: DeviceId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["DeviceId", "ASC"]],
    });
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST endpoint to add, update, or "soft-delete" a company
const generateDeviceId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await MDevice.count();
      const newId = (totalRecords + 1).toString().padStart(5, "0");
      req.body.DeviceId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating DeviceId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateDeviceId,
  authToken,
  async (req, res) => {
    const Device = req.body;
    const DeviceId = Device.DeviceId; // Access the DeviceId from the request body

    try {
      if (Device.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MDevice.update(
          { AcFlag: "N" },
          { where: { DeviceId: DeviceId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MDevice.upsert(Device, {
          where: { DeviceId: DeviceId }, // Specify the where condition for update
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

process.on("SIGINT", () => {
  console.log("Received SIGINT. Closing Sequelize connection...");
  sequelize.close().then(() => {
    console.log("Sequelize connection closed. Exiting...");
    process.exit(0);
  });
});

module.exports = router;
