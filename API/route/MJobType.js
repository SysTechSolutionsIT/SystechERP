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

const MJobType = sequelize.define('MJobType', {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001'
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '00001'
    },
    JobTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    JobTypeName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ShortName: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    RateGroup: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    RatePerDay: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
      defaultValue: 0
    },
    Category: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: 'Standard'
    },
    Position: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    Remark: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'Y'
    },
    CreatedBy: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ModifiedBy: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: true
    }
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

MJobType.sync()
  .then(() => {
    console.log("MJobType model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MJobType model:", error);
  });
  
  router.get("/FnshowActiveData", authToken, async (req, res) => {
    try {
      const JobType = await MJobType.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["JobTypeId", "ASC"]],
      });
      res.json(JobType);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const JobTypeId = req.query.JobTypeId;
    try {
      const JobType = await MJobType.findOne({
        where: {
          JobTypeId: JobTypeId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["JobTypeId", "ASC"]],
      });
      res.json(JobType);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Middleware for generating Id
const generateJobTypeId = async (req, res, next) => {
    try {
      if (req.body.IUFlag === 'I') {
        const totalRecords = await MJobType.count();
        const newId = (totalRecords + 1).toString().padStart(5, "0");
        req.body.JobTypeId = newId;
      }
      next();
    } catch (error) {
      console.error("Error generating JobTypeId:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  router.post("/FnAddUpdateDeleteRecord", generateJobTypeId, authToken, async (req, res) => {
    const JobType = req.body;
    const JobTypeId = JobType.JobTypeId;  // Access the JobTypeId from the request body
  
    try {
      if (JobType.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MJobType.update(
          { AcFlag: "N" },
          { where: { JobTypeId: JobTypeId } }
        );
  
        res.json({
          message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MJobType.upsert(JobType, {
          where: { JobTypeId: JobTypeId },  // Specify the where condition for update
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
