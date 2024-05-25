// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");
const MEmployeewiseEarning = require("../model/MEmployeewiseEarningModels");
const MDeductionHeads = require("../model/MDeductionHeadModel");

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

// const MDeductionHeads = sequelize.define("MDeductionHeads", {
//   CompanyId: {
//     type: DataTypes.STRING(5),
//     allowNull: false,
//     defaultValue: "00001",
//   },
//   BranchId: {
//     type: DataTypes.STRING(5),
//     allowNull: false,
//     defaultValue: "00001",
//   },
//   DeductionHeadId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//   },
//   DeductionHead: {
//     type: DataTypes.STRING(500),
//     allowNull: true,
//   },
//   DeductionType: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//     defaultValue: "Salary",
//   },
//   ShortName: {
//     type: DataTypes.STRING(3),
//     allowNull: true,
//   },
//   HeadPosition: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   CalculationType: {
//     type: DataTypes.STRING(10),
//     allowNull: true,
//     defaultValue: "Amount",
//   },
//   CalculationValue: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: true,
//     defaultValue: 0,
//   },
//   SalaryParameter1: {
//     type: DataTypes.STRING(5),
//     allowNull: true,
//   },
//   SalaryParameter2: {
//     type: DataTypes.STRING(5),
//     allowNull: true,
//   },
//   SalaryParameter3: {
//     type: DataTypes.STRING(5),
//     allowNull: true,
//   },
//   SalaryParameter4: {
//     type: DataTypes.STRING(5),
//     allowNull: true,
//   },
//   SalaryParameter5: {
//     type: DataTypes.STRING(5),
//     allowNull: true,
//   },
//   SalaryParameter6: {
//     type: DataTypes.STRING(5),
//     allowNull: true,
//   },
//   SalaryParameter7: {
//     type: DataTypes.STRING(5),
//     allowNull: true,
//   },
//   SalaryParameter8: {
//     type: DataTypes.STRING(5),
//     allowNull: true,
//   },
//   SalaryParameter9: {
//     type: DataTypes.STRING(5),
//     allowNull: true,
//   },
//   SalaryParameter10: {
//     type: DataTypes.STRING(5),
//     allowNull: true,
//   },
//   Formula: {
//     type: DataTypes.STRING(500),
//     allowNull: true,
//   },
//   Remark: {
//     type: DataTypes.STRING(1000),
//     allowNull: true,
//   },
//   AcFlag: {
//     type: DataTypes.STRING(1),
//     allowNull: false,
//     defaultValue: "Y",
//   },
//   CreatedBy: {
//     type: DataTypes.STRING(500),
//     allowNull: true,
//   },
//   CreatedOn: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   ModifiedBy: {
//     type: DataTypes.STRING(500),
//     allowNull: true,
//   },
//   ModifiedOn: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
// }, {
//   timestamps:false
// });
// // Middleware for parsing JSON
// router.use(bodyParser.json());

// // Model synchronization
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// GET endpoint to retrieve all financial year entires
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const years = await MDeductionHeads.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["DeductionHeadId", "ASC"]],
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
    const years = await MDeductionHeads.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["DeductionHeadId", "ASC"]],
    });
    res.json(years);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve a particular financial year entry by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const DeductionHeadId = req.query.DeductionHeadId;
  try {
    const years = await MDeductionHeads.findOne({
      where: {
        DeductionHeadId: DeductionHeadId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["DeductionHeadId", "ASC"]],
    });
    res.json(years);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnFetchSalaryParameters", authToken, async (req, res) => {
  const { EmployeeId } = req.query;

  try {
    // Fetch all earning heads for the given EmployeeId
    const employeeEarnings = await MEmployeewiseEarning.findAll({
      where: {
        EmployeeId,
      },
      attributes: { exclude: ["id"] }, // Exclude the 'id' column
    });
    console.log("Employee Earnings:", employeeEarnings);

    // Fetch all deduction heads
    const deductionHeads = await MDeductionHeads.findAll();

    console.log("Deduction Heads:", deductionHeads);

    // Create a map of earning head ids to calculation values
    const earningHeadMap = employeeEarnings.reduce((accumulator, earning) => {
      accumulator[earning.EarningHeadId] = earning.ECalculationValue;
      return accumulator;
    }, {});

    console.log("Earning Head Map:", earningHeadMap);

    // Iterate over deduction heads and update salary parameters with calculation values
    const formattedResult = deductionHeads
      .map((deductionHead) => {
        const calculatedParams = {};
        // Iterate over salary parameter columns to find matching earning head ids
        for (let i = 1; i <= 10; i++) {
          const parameterKey = `SalaryParameter${i}`;
          const earningHeadId = deductionHead[parameterKey];
          if (earningHeadId && earningHeadMap[earningHeadId] !== undefined) {
            calculatedParams[parameterKey] = earningHeadMap[earningHeadId];
          }
        }
        // If any non-null calculation values found, return with DeductionHeadId
        if (Object.keys(calculatedParams).length > 0) {
          return {
            DeductionHeadId: deductionHead.DeductionHeadId,
            ...calculatedParams,
          };
        }
        // Otherwise, return null
        return null;
      })
      .filter(Boolean); // Filter out null entries

    console.log("Formatted Result:", formattedResult);

    res.json(formattedResult);
  } catch (error) {
    console.error("Error fetching salary parameters:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Middleware for generating DeductionHeadId
const generateDeductionHeadId = async (req, res, next) => {
  try {
    // Check if IUFlag is 'I'
    if (req.body.IUFlag === "I") {
      const totalRecords = await MDeductionHeads.count();
      const newId = "D" + (totalRecords + 1).toString().padStart(4, "0");
      req.body.DeductionHeadId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating DeductionHeadId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  authToken,
  generateDeductionHeadId,
  async (req, res) => {
    const deductionHead = req.body;
    try {
      if (deductionHead.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MDeductionHeads.update(
          { AcFlag: "N" },
          { where: { DeductionHeadId: deductionHead.DeductionHeadId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MDeductionHeads.upsert(deductionHead, {
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

module.exports = router;
