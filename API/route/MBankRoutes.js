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

// Define the MBanks model
const MBanks = sequelize.define("MBanks", {
  CompanyId: {
<<<<<<< HEAD
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  BranchId: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  BankId: {
    type: DataTypes.STRING(5),
=======
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  BranchId: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  BankId: {
    type: DataTypes.STRING(11),
>>>>>>> 0375935ecc8ffae39c960697a933aaf8973f8679
    primaryKey: true,
  },
  AccountType: DataTypes.STRING(50),
  BankName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  BranchName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  BranchAddress: DataTypes.STRING(500),
  RegisteredEmailId: DataTypes.STRING(100),
  RegisteredContactNo: DataTypes.INTEGER,
  Remark: DataTypes.STRING(60),
  AccountNo: DataTypes.STRING(50),
  CurrencyType: {
    type: DataTypes.STRING(50),
    defaultValue: "INR",
  },
  AuthorizedPersonCount: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  AuthorizedPerson1: DataTypes.STRING(50),
  AuthorizedPerson2: DataTypes.STRING(50),
  AuthorizedPerson3: DataTypes.STRING(50),
  AuthorizedPersonRole1: {
    type: DataTypes.STRING(50),
  },
  AuthorizedPersonRole2: {
    type: DataTypes.STRING(500),
  },
  AuthorizedPersonRole3: {
    type: DataTypes.STRING(500),
  },
  IFSCCode: DataTypes.STRING(50),
  SwiftCode: DataTypes.STRING(50),
  BankGST: DataTypes.STRING(50),
  AcFlag: {
    type: DataTypes.STRING(1),
    defaultValue: "Y",
  },
});

// Middleware for parsing JSON
router.use(bodyParser.json());
try {
  MBanks.sync();
} catch (error) {}

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  try {
    MBanks.sync()
  } catch (error) {
    
  }
// GET endpoint to retrieve all banks
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const banks = await MBanks.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["BankId", "ASC"]],
    });
    res.json(banks);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve active banks
router.get("/FnShowActiveData", authToken, async (req, res) => {
  try {
    const banks = await MBanks.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["BankId", "ASC"]],
    });
    res.json(banks);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve a particular bank by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const bankId = req.query.BankId;
  try {
    const banks = await MBanks.findOne({
      where: {
        BankId: bankId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["BankId", "ASC"]],
    });
    res.json(banks);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const generateBankId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await MBanks.count();
      const newId = (totalRecords + 1).toString().padStart(5, "0");
      req.body.BankId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating BankId", error);
    res.status(500).send("Internal Server Error");
  }
};

// POST endpoint to add, update, or delete a bank
router.post(
  "/FnAddUpdateDeleteRecord",
  generateBankId,
  authToken,
  async (req, res) => {
    const bank = req.body;
    try {
      if (bank.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MBanks.update(
          { AcFlag: "N" },
          { where: { BankId: bank.BankId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        const result = await MBanks.upsert(bank, {
          returning: true,
        });
        res.json({
          message: result ? "Operation successful" : "Operation failed",
        });
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Export the router
module.exports = router;
