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

const TLeaves = sequelize.define(
    'TLeaves',
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
      FYear: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      LeaveApplicationId: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      LeaveApplicationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      EmployeeId: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      EmployeeType: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      EmployeeTypeGroup: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      LeaveFromDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      LeaveToDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      LeaveTypeId: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      LeaveDays: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      SanctionBy: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      SanctionFromDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      SanctionToDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      SanctionLeaveDays: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      Remark: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      ApprovalFlag: {
        type: DataTypes.STRING(1),
        allowNull: true,
        defaultValue: 'P',
      },
      AcFlag: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: 'Y',
      },
      CreatedBy: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: '',
      },
      CreatedOn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ModifiedBy: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      ModifiedOn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
);

router.use(bodyParser.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

TLeaves.sync()
  .then(() => {
    console.log("MLeaveTyepe model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MLeaveTyepe model:", error);
  });

  router.get("/FnShowAllData", authToken, async (req, res) => {
    try {
      const Leaves = await TLeaves.findAll({
        attributes: {
          exclude: ['id']
        },
        order: [["LeaveApplicationId", "ASC"]],
      });
      res.json(Leaves);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    } 
  });
  
  // GET endpoint to retrieve active companies
  router.get("/FnShowActiveData", authToken, async (req, res) => {
    try {
      const Leaves = await TLeaves.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["LeaveApplicationId", "ASC"]],
      });
      res.json(Leaves);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const LeaveApplicationId = req.query.LeaveApplicationId;
    try {
      const Leaves = await TLeaves.findOne({
        where: {
          LeaveApplicationId: LeaveApplicationId,
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["LeaveApplicationId", "ASC"]],
      });
      res.json(Leaves);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularEmployeeData", authToken, async (req, res) => {
    const EmployeeId = req.query.EmployeeId; // Assuming you're using EmployeeId instead of LeaveApplicationId
    try {
      const Leaves = await TLeaves.findAll({
        where: {
          EmployeeId: EmployeeId, 
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["LeaveApplicationId", "ASC"]],
      });
      res.json(Leaves);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  
  const generateLeaveApplicationId = async (req, res, next) => {
    try {
      if (req.body.IUFlag === 'I') {
        const currentYear = req.body.FYear
        const totalRecords = await TLeaves.count({ 
          where: { 
            FYear: currentYear 
          } 
        });
   
        const newId = `${currentYear}-LA${(totalRecords + 1).toString().padStart(5, "0")}`;
        req.body.LeaveApplicationId = newId;
        console.log(req.body.LeaveApplicationId)
      }
      next();
    } catch (error) {
      console.error("Error generating LeaveApplicationId:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  
  
  router.post("/FnAddUpdateDeleteRecord", generateLeaveApplicationId, authToken, async (req, res) => {
    const Leaves = req.body;
    const LeaveApplicationId = Leaves.LeaveApplicationId;  // Access the LeaveApplicationId from the request body
  
    try {
      if (Leaves.IUFlag == "D") {
        // "Soft-delete" operation
        const result = await TLeaves.update(
          { AcFlag: "N" },
          { where: { LeaveApplicationId: LeaveApplicationId } }
        );
  
        res.json({
          message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await TLeaves.upsert(Leaves, {
          where: { LeaveApplicationId: LeaveApplicationId },  // Specify the where condition for update
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
