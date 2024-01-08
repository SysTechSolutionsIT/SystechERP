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

const MTwoField = sequelize.define(
  "MTwoField",
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
    FieldId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    MasterNameId: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    FieldDetails: {
      type: DataTypes.STRING(500),
      allowNull: true,
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
    Remark: {
      type: DataTypes.STRING(500),
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

MTwoField.sync()
  .then(() => {
    console.log("MTwoField model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MTwoField model:", error);
  });

router.get("/FnshowActiveData", authToken, async (req, res) => {
  try {
    const TField = await MTwoField.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["MasterNameId", "ASC"]],
    });
    res.json(TField);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const FieldId = req.query.FieldId;
  try {
    const TField = await MTwoField.findOne({
      where: {
        FieldId: FieldId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["FieldId", "ASC"]],
    });
    res.json(TField);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowCategoricalData", authToken, async (req, res) => {
  const MasterNameId = req.query.MasterNameId;
  try {
    const TField = await MTwoField.findAll({
      where: {
        MasterNameId: MasterNameId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["FieldId", "ASC"]],
    });
    res.json(TField);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});
const generateFieldId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await MTwoField.count();
      const newId = (totalRecords + 1).toString().padStart(5, "0");
      req.body.FieldId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating FieldId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateFieldId,
  authToken,
  async (req, res) => {
    const TField = req.body;
    const FieldId = TField.FieldId; // Access the FieldId from the request body
    console.log("Request Payload:", req.body);
    try {
      if (TField.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MTwoField.update(
          { AcFlag: "N" },
          { where: { FieldId: FieldId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MTwoField.upsert(TField, {
          where: { FieldId: FieldId }, // Specify the where condition for update
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
