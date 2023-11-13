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

// Define the MBank model
const MBank = sequelize.define("MBank", {
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
  BankId: {
    type: DataTypes.STRING(5),
    allowNull: false,
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
  RegisteredContactNo: DataTypes.STRING(100),
  Remark: DataTypes.STRING(500),
  AccountNo: DataTypes.STRING(100),
  CurrencyType: {
    type: DataTypes.STRING(100),
    defaultValue: "INR",
  },
  AuthorizedPersonCount: {
    type: DataTypes.STRING(500),
    defaultValue: "1",
  },
  AuthorizedPerson1: DataTypes.STRING(500),
  AuthorizedPerson2: DataTypes.STRING(500),
  AuthorizedPerson3: DataTypes.STRING(500),
  AuthorizedPersonRole1: {
    type: DataTypes.STRING(500),
    defaultValue: "V",
  },
  AuthorizedPersonRole2: {
    type: DataTypes.STRING(500),
    defaultValue: "V",
  },
  AuthorizedPersonRole3: {
    type: DataTypes.STRING(500),
    defaultValue: "V",
  },
  IFSCCode: DataTypes.STRING(50),
  SwiftCode: DataTypes.STRING(50),
  BankGST: DataTypes.STRING(50),
  CreatedBy: DataTypes.STRING(500),
  AcFlag: {
    type: DataTypes.STRING(1),
    defaultValue: "Y",
  },
  CreatedOn: DataTypes.DATE,
  ModifiedBy: DataTypes.STRING(500),
  ModifiedOn: DataTypes.DATE,
});

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize.sync().then(() => {
  console.log("Models synced");
});

// GET endpoint to retrieve all banks
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const banks = await MBank.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["BankId", "ASC"]],
    });
    res.json(banks);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await sequelize.close(); // Close the database connection
  }
});

// GET endpoint to retrieve active banks
router.get("/FnShowActiveData", authToken, async (req, res) => {
  try {
    const banks = await MBank.findAll({
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
  } finally {
    await sequelize.close(); // Close the database connection
  }
});

// GET endpoint to retrieve a particular bank by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const bankId = req.query.BankId;
  try {
    const banks = await MBank.findAll({
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
  } finally {
    await sequelize.close(); // Close the database connection
  }
});

// POST endpoint to add, update, or delete a bank
router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
  const bank = req.body;
  try {
    const result = await MBank.upsert(bank, {
      returning: true,
    });
    res.json({ message: result ? "Operation successful" : "Operation failed" });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await sequelize.close(); // Close the database connection
  }
});

// Export the router
module.exports = router;
