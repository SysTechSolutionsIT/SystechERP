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

const MEarningHeads = sequelize.define(
  "MEarningHeads",
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
    EarningHeadId: {
      type: DataTypes.INTEGER(5),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    EarningHead: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    EarningType: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "Salary",
    },
    ShortName: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    HeadPosition: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    CalculationType: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "Amount",
    },
    CalculationValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },

    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "Y",
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
    tableName: "MEarningHeads",
    timestamps: false, // Assuming you're not using createdAt and updatedAt fields
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
    const years = await MFinancialYear.findOne({
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

router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
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
      // Add or update operation
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
