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

const mleavetype = sequelize.define(
    'mleavetype',
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
      LeaveTypeId: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      LeaveType: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      ShortName: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      PaidFlag: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: 'P',
      },
      CarryForwardFlag: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: 'Y',
      },
      Remark: {
        type: DataTypes.STRING(500),
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

mleavetype.sync()
  .then(() => {
    console.log("mleavetype model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing mleaveTyepe model:", error);
  });

  router.get("/FnShowAllData", authToken, async (req, res) => {
    try {
      const LeaveType = await mleavetype.findAll({
        attributes: {
          exclude: ['id']
        },
        order: [["LeaveTypeId", "ASC"]],
      });
      res.json(LeaveType);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    } 
  });
  
  // GET endpoint to retrieve active companies
  router.get("/FnShowActiveData", authToken, async (req, res) => {
    try {
      const LeaveType = await mleavetype.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["LeaveTypeId", "ASC"]],
      });
      res.json(LeaveType);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const LeaveTypeId = req.query.LeaveTypeId;
    try {
      const LeaveType = await mleavetype.findOne({
        where: {
          LeaveTypeId: LeaveTypeId,
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["LeaveTypeId", "ASC"]],
      });
      res.json(LeaveType);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  const generateLeaveTypeId = async (req, res, next) => {
    try {
      if (req.body.IUFlag === 'I') {
        const totalRecords = await mleavetype.count();
        const newId = (totalRecords + 1).toString().padStart(4, "0");
        req.body.LeaveTypeId = newId;
      }
      next();
    } catch (error) {
      console.error("Error generating LeaveTypeId:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  
  router.post("/FnAddUpdateDeleteRecord", generateLeaveTypeId, authToken, async (req, res) => {
      const LeaveType = req.body;
      const LeaveTypeId = LeaveType.LeaveTypeId;  // Access the LeaveTypeId from the request body
    
      try {
        if (LeaveType.IUFlag === "D") {
          // "Soft-delete" operation
          const result = await mleavetype.update(
            { AcFlag: "N" },
            { where: { LeaveTypeId: LeaveTypeId } }
          );
    
          res.json({
            message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
          });
        } else {
          // Add or update operation
          const result = await mleavetype.upsert(LeaveType, {
            where: { LeaveTypeId: LeaveTypeId },  // Specify the where condition for update
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
  