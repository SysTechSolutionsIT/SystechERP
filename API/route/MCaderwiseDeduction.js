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

const MCaderwiseDeduction = sequelize.define(
    'MCaderwiseDeduction',
    {
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
      CaderwiseDeductionId: {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
      },
      CaderwiseDeductionDate: {
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
      DeductionHeadID: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      DeductionHead: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      DCalculationType: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      DCalculationValue: {
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
    },
    {
      timestamps: false,
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

MCaderwiseDeduction.sync()
  .then(() => {
    console.log("MCaderwiseDeduction model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MCaderwiseDeduction model:", error);
  });

  router.get("/FnshowActiveData", authToken, async (req, res) => {
    try {
      const CaderwiseDeduciton = await MCaderwiseDeduction.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["CaderwiseDeductionId", "ASC"]],
      });
      res.json(CaderwiseDeduciton);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

    router.get("/FnShowParticularData", authToken, async (req, res) => {
    const CaderwiseDeductionId = req.query.CaderwiseDeductionId;
    try {
      const CaderwiseDeduciton = await MCaderwiseDeduction.findAll({
        where: {
          CaderwiseDeductionId: CaderwiseDeductionId,
        },
        attributes: {
          exclude: ["IUFlag", "id"],
        }
      });
      res.json(CaderwiseDeduciton);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  const generateCaderwiseDeductionId = async (req, res, next) => {
    console.log("Request body:", req.body);
    try {
        if (req.body.IUFlag === "D") {
            // For single-item delete operation
            const CaderwiseDeductionId = req.body.CaderwiseDeductionId;
            req.body.CaderwiseDeductionId = CaderwiseDeductionId;
        } else {
            // For other operations, generate newId for each item
            const totalRecords = await MCaderwiseDeduction.count();
            const newId = (totalRecords + 1).toString().padStart(4, "0");

            req.body.forEach((item) => {
                item.CaderwiseDeductionId = newId;
            });
        }

        next();
    } catch (error) {
        console.error("Error generating CaderwiseDeductionId:", error);
        res.status(500).send("Internal Server Error");
    }
};


  
  router.post(
    "/FnAddUpdateDeleteRecord",
    generateCaderwiseDeductionId,
    authToken,
    async (req, res) => {
      const CaderwiseDeduciton = req.body;
      const CaderwiseDeductionId = CaderwiseDeduciton.map(
        (item) => item.CaderwiseDeductionId
      );
  
      try {
        if (CaderwiseDeduciton.some((item) => item.IUFlag === "D")) {
          // "Soft-delete" operation
          const result = await MCaderwiseDeduction.update(
            { AcFlag: "N" },
            { where: { CaderwiseDeductionId: CaderwiseDeductionId } }
          );
  
          res.json({
            message: result[0]
              ? "Record(s) Deleted Successfully"
              : "Record(s) Not Found",
          });
        } else {
          const results = await Promise.all(
            CaderwiseDeduciton.map(async (item) => {
              const result = await MCaderwiseDeduction.upsert(item, {
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