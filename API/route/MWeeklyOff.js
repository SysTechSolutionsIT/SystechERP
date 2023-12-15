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

const MWeeklyOff = sequelize.define('MWeeklyOff', {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
      primaryKey: true
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001',
      primaryKey: true
    },
    WeeklyOffId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    WeeklyOffName: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    Remark: {
      type: DataTypes.STRING(500)
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      defaultValue: 'Y'
    },
    CreatedBy: {
      type: DataTypes.STRING(500)
    },
    CreatedOn: {
      type: DataTypes.DATE
    },
    ModifiedBy: {
      type: DataTypes.STRING(500)
    },
    ModifiedOn: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: false 
  });

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

MWeeklyOff.sync()
  .then(() => {
    console.log("MWeeklyOff model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MWeeklyOff model:", error);
  });

  router.get("/FnshowActiveData", authToken, async (req, res) => {
    try {
      const WeeklyOff = await MWeeklyOff.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["WeeklyOffId", "ASC"]],
      });
      res.json(WeeklyOff);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const WeeklyOffId = req.query.WeeklyOffId;
    try {
      const WeeklyOff = await MWeeklyOff.findOne({
        where: {
          WeeklyOffId: WeeklyOffId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["WeeklyOffId", "ASC"]],
      });
      res.json(WeeklyOff);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  const generateWeeklyOffId = async (req, res, next) => {
    try {
      if (req.body.IUFlag === 'I') {
        const totalRecords = await MWeeklyOff.count();
        const newId = (totalRecords + 1).toString().padStart(5, "0");
        req.body.WeeklyOffId = newId;
      }
      next();
    } catch (error) {
      console.error("Error generating WeeklyOffId:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  router.post("/FnAddUpdateDeleteRecord", generateWeeklyOffId, authToken, async (req, res) => {
    const WeeklyOff = req.body;
    const WeeklyOffId = WeeklyOff.WeeklyOffId;  // Access the WeeklyOffId from the request body
  
    try {
      if (WeeklyOff.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MWeeklyOff.update(
          { AcFlag: "N" },
          { where: { WeeklyOffId: WeeklyOffId } }
        );
  
        res.json({
          message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MWeeklyOff.upsert(WeeklyOff, {
          where: { WeeklyOffId: WeeklyOffId },  // Specify the where condition for update
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

  process.on("SIGINT", () => {
    console.log("Received SIGINT. Closing Sequelize connection...");
    sequelize.close().then(() => {
      console.log("Sequelize connection closed. Exiting...");
      process.exit(0);
    });
  });
  

module.exports = router;
