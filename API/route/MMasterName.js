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

const MMasterName = sequelize.define(
  "MMasterName",
  {
    MasterId: {
      type: DataTypes.INTEGER(5),
      primaryKey: true,
      autoIncrement: true,
    },
    MasterName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
    IUFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
  },
  {
    timestamps: false, // Set to true if you have createdAt and updatedAt columns
  }
);

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

MMasterName.sync()
  .then(() => {
    console.log("MMasterName model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MMasterName model:", error);
  });

router.get("/FnshowActiveData", authToken, async (req, res) => {
  try {
    const TField = await MMasterName.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["MasterId", "ASC"]],
    });
    res.json(TField);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const MasterId = req.query.MasterId;
  try {
    const TField = await MMasterName.findOne({
      where: {
        MasterId: MasterId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["MasterId", "ASC"]],
    });
    res.json(TField);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const generateMasterId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await MMasterName.count();
      const newId = (totalRecords + 1).toString().padStart(5, "0");
      req.body.MasterId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating MasterId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateMasterId,
  authToken,
  async (req, res) => {
    const TField = req.body;
    const MasterId = TField.MasterId; // Access the MasterId from the request body

    try {
      if (TField.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MMasterName.update(
          { AcFlag: "N" },
          { where: { MasterId: MasterId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MMasterName.upsert(TField, {
          where: { MasterId: MasterId }, // Specify the where condition for update
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
