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

const MEmployeewiseDeduction = sequelize.define(
  "MEmployeewiseDeduction",
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
    EmployeeId: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    EmployeewiseDeductionId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
      primaryKey: true,
    },
    SrNo: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    EmployeewiseDeductionDate: {
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
    DeductionHeadId: {
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
      defaultValue: 0,
    },
    Formula: {
      type: DataTypes.STRING(500),
    },
    Remark: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "MEmployeewiseDeduction",
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

MEmployeewiseDeduction.sync()
  .then(() => {
    console.log("MEmployeewiseDeduction model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MEmployeewiseDeduction model:", error);
  });

router.get("/FnshowActiveData", authToken, async (req, res) => {
  try {
    const EmpDeduction = await MEmployeewiseDeduction.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(EmpDeduction);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const EmployeeId = req.query.EmployeeId;
  try {
    const EmployeewiseDeductions = await MEmployeewiseDeduction.findAll({
      where: {
        EmployeeId: EmployeeId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(EmployeewiseDeductions);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const generateEmployeewiseDeductionId = async (req, res, next) => {
  console.log("Request body:", req.body);
  try {
    const employeeType = req.body[0]?.EmployeeType || "X"; // Use the EmployeeType from the first item in the array
    const totalRecords = await MEmployeewiseDeduction.count();

    req.body.forEach((item, index) => {
      const newId = (totalRecords + index + 1).toString().padStart(4, "0");
      item.EmployeewiseDeductionId = `${employeeType}${newId}`;
    });

    next();
  } catch (error) {
    console.error("Error generating EmployeewiseDeductionId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateEmployeewiseDeductionId,
  authToken,
  async (req, res) => {
    const EmployeewiseDeductions = req.body;
    const EmployeewiseDeductionIds = EmployeewiseDeductions.map(
      (item) => item.EmployeewiseDeductionId
    );

    try {
      if (EmployeewiseDeductions.some((item) => item.IUFlag === "D")) {
        // "Soft-delete" operation
        const result = await MEmployeewiseDeduction.update(
          { AcFlag: "N" },
          { where: { EmployeewiseDeductionId: EmployeewiseDeductionIds } }
        );

        res.json({
          message: result[0]
            ? "Record(s) Deleted Successfully"
            : "Record(s) Not Found",
        });
      } else {
        const results = await Promise.all(
          EmployeewiseDeductions.map(async (item) => {
            const result = await MEmployeewiseDeduction.upsert(item, {
              updateOnDuplicate: true,
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
