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

// Define the MHoliday model
const MHoliday = sequelize.define(
  "MHoliday",
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
    FYear: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    HolidayId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    HolidayDate: {
      type: DataTypes.DATE,
    },
    IUFlag: DataTypes.STRING,
    HolidayDescription: {
      type: DataTypes.STRING(500),
    },
    HolidayType: {
      type: DataTypes.STRING(10),
      defaultValue: "P",
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    CreatedOn: {
      type: DataTypes.DATE,
    },
    ModifiedBy: {
      type: DataTypes.STRING(500),
    },
    ModifiedOn: {
      type: DataTypes.DATE,
    },
    Remark: {
      type: DataTypes.STRING(500),
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
    console.log("Connection has been established successfully. --HOliday");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// GET endpoint to retrieve all companies
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const companies = await MHoliday.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["HolidayId", "ASC"]],
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
    const companies = await MHoliday.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["HolidayId", "ASC"]],
    });
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve a particular company by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const HolidayId = req.query.HolidayId;
  try {
    const companies = await MHoliday.findOne({
      where: {
        HolidayId: HolidayId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["HolidayId", "ASC"]],
    });
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST endpoint to add, update, or "soft-delete" a company
const generateHolidayId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await MHoliday.count();
      const newId = (totalRecords + 1).toString().padStart(5, "0");
      req.body.HolidayId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating HolidayId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateHolidayId,
  authToken,
  async (req, res) => {
    const Holiday = req.body;
    const HolidayId = Holiday.HolidayId; // Access the HolidayId from the request body

    try {
      if (Holiday.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MHoliday.update(
          { AcFlag: "N" },
          { where: { HolidayId: HolidayId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MHoliday.upsert(Holiday, {
          where: { HolidayId: HolidayId }, // Specify the where condition for update
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
