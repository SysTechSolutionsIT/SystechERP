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

const MCaderwiseEarning = sequelize.define('MCaderwiseEarning', {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
    },
    CaderwiseEarningId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    CaderwiseEarningDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    EmployeeTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EmployeeType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    EmployeeTypeGroup: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    EarningHeadId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EarningHead: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ECalculationType: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    ECalculationValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    Formula: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    Remark: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'Y',
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
  }, {
    timestamps: false
  });

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

MCaderwiseEarning.sync()
  .then(() => {
    console.log("MCaderwiseEarning model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MCaderwiseEarning model:", error);
  });

  router.get("/FnshowActiveData", authToken, async (req, res) => {
    try {
      const CaderwiseEarning = await MCaderwiseEarning.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["CaderwiseEarningId", "ASC"]],
      });
      res.json(CaderwiseEarning);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const CaderwiseEarningId = req.query.CaderwiseEarningId;
    try {
      const CaderwiseEarning = await MCaderwiseEarning.findAll({
        where: {
          CaderwiseEarningId: CaderwiseEarningId,
        },
        attributes: {
          exclude: ["IUFlag", "id"],
        }
      });
      res.json(CaderwiseEarning);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  const generateCaderwiseEarningId = async (req, res, next) => {
    console.log("Request body:", req.body);
    try {
        const totalRecords = await MCaderwiseEarning.count();
        const newId = (totalRecords + 1).toString().padStart(4, "0");

        req.body.forEach((item) => {
            item.CaderwiseEarningId = newId;
        });

        next();
    } catch (error) {
        console.error("Error generating CaderwiseEarningId:", error);
        res.status(500).send("Internal Server Error");
    }
};
  
  router.post(
    "/FnAddUpdateDeleteRecord",
    generateCaderwiseEarningId,
    authToken,
    async (req, res) => {
      const CaderwiseEarning = req.body;
      const CaderwiseEarningId = CaderwiseEarning.map(
        (item) => item.CaderwiseEarningId
      );
  
      try {
        if (CaderwiseEarning.some((item) => item.IUFlag === "D")) {
          // "Soft-delete" operation
          const result = await MCaderwiseEarning.update(
            { AcFlag: "N" },
            { where: { CaderwiseEarningId: CaderwiseEarningId } }
          );
  
          res.json({
            message: result[0]
              ? "Record(s) Deleted Successfully"
              : "Record(s) Not Found",
          });
        } else {
          const results = await Promise.all(
            CaderwiseEarning.map(async (item) => {
              const result = await MCaderwiseEarning.upsert(item, {
                updateOnDuplicate: true
              });
  
              return result;
            })
          );
  
          res.json({
            message: results ? "Operation successful" : "Operation failed",
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