// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");
const CompanyConfig = require('./CompanyConfigModels')

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

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

try {
  CompanyConfig.sync()
} catch (error) {
  
}
// GET endpoint to retrieve all cost centers
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const Record = await CompanyConfig.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["CCID", "DESC"]],
    });
    res.json(Record);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});


// GET endpoint to retrieve active cost centers
// router.get("/FnShowActiveData", authToken, async (req, res) => {
//   try {
//     const Records = await CompanyConfig.findAll({
//       where: {
//         AcFlag: "Y",
//       },
//       attributes: {
//         exclude: ["IUFlag"],
//       },
//       order: [["CCID", "ASC"]],
//     });
//     res.json(Records);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// GET endpoint to retrieve a particular cost center by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const CompanyId = req.query.CompanyId;
  try {
    const Records = await CompanyConfig.findAll({
      where: {
        CompanyId: CompanyId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["CCID", "ASC"]],
    });
    res.json(Records);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const generateCCID = async (req, res, next) => {
  try {
    if (req.body.IUFlag === 'I') {
      const totalRecords = await CompanyConfig.count();
      const newId = (totalRecords + 1).toString().padStart(3, "0");
      req.body.CCID = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating CCID:", error);
    res.status(500).send("Internal Server Error");
  }
};

// POST endpoint to add, update, or delete a cost center
router.post("/FnAddUpdateDeleteRecord", generateCCID, authToken, async (req, res) => {
  const Record = req.body;
  try {
    if (Record.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await CompanyConfig.update(
        { AcFlag: "N" },
        { where: { CCID: Record.CCID } }
      );
      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else {
      const result = await CompanyConfig.upsert(Record, {
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
});

// Export the router
module.exports = router
