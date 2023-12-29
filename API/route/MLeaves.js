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

const MLeaves = sequelize.define('MLeaves', {
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
    LeaveBalanceId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    FYear: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EmployeeTypeId: {
      type: DataTypes.STRING(5),
    },
    EmployeeType: {
      type: DataTypes.STRING(10),
    },
    EmployeeTypeGroup: {
      type: DataTypes.STRING(10),
    },
    LeaveTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    Month: {
      type: DataTypes.STRING(5),
    },
    Year: {
      type: DataTypes.STRING(5),
    },
    LeaveBalanceDate: {
      type: DataTypes.DATE,
    },
    EmployeeName: {
      type: DataTypes.STRING(500),
    },
    LeaveTypeDesc: {
      type: DataTypes.STRING(5),
    },
    OpeningBalance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned1: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned2: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned3: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned4: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned5: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned6: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned7: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned8: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned9: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned10: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned11: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveEarned12: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    SanctionLeaveDays: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    LeaveBalance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    Remark: {
      type: DataTypes.STRING(500),
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: 'Y',
    },
    CreatedBy: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ModifiedBy: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: false, 
});
  
router.use(bodyParser.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

MLeaves.sync()
  .then(() => {
    console.log("MLeaveTyepe model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MLeaveTyepe model:", error);
  });

  router.get("/FnShowAllData", authToken, async (req, res) => {
    try {
      const Leaves = await MLeaves.findAll({
        attributes: {
          exclude: ['id']
        },
        order: [["LeaveBalanceId", "ASC"]],
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
      const Leaves = await MLeaves.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["LeaveBalanceId", "ASC"]],
      });
      res.json(Leaves);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const LeaveBalanceId = req.query.LeaveBalanceId;
    try {
      const Leaves = await MLeaves.findOne({
        where: {
          LeaveBalanceId: LeaveBalanceId,
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["LeaveBalanceId", "ASC"]],
      });
      res.json(Leaves);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularEmployeeData", authToken, async (req, res) => {
    const EmployeeId = req.query.EmployeeId; // Assuming you're using EmployeeId instead of LeaveBalanceId
    try {
      const Leaves = await MLeaves.findAll({
        where: {
          EmployeeId: EmployeeId, 
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["LeaveBalanceId", "ASC"]],
      });
      res.json(Leaves);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  
const generateLeaveBalanceId = async (req, res, next) => {
  try{
    const totalRecords = await MLeaves.count()

    req.body.forEach((item, index) => {
      const newId = (totalRecords + index + 1).toString().padStart(5,"0")
      item.LeaveBalanceId = newId
    })

    next()
  } catch (error){
    console.error('Error generating Leave Balance Id', error);
    res.status(500).send('Internal Server Error')
  }
}
  
  router.post("/FnAddUpdateDeleteRecord", generateLeaveBalanceId, authToken, async (req, res) => {
    const Leaves = req.body;
  
    try {
      if (Array.isArray(Leaves)) {
        // Handle multiple inserts
        const results = await Promise.all(
          Leaves.map(async (leave) => {
            return MLeaves.upsert(leave, {
              where: { LeaveBalanceId: leave.LeaveBalanceId },
              returning: true,
            });
          })
        );
  
        res.json({
          message: results ? "Operations successful" : "Operations failed",
        });
      } else {
        // Handle single insert or update
        const LeaveBalanceId = Leaves.LeaveBalanceId;
  
        if (Leaves.IUFlag === "D") {
          // "Soft-delete" operation
          const result = await MLeaves.update(
            { AcFlag: "N" },
            { where: { LeaveBalanceId: LeaveBalanceId } }
          );
  
          res.json({
            message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
          });
        } else {
          // Add or update operation
          const result = await MLeaves.upsert(Leaves, {
            where: { LeaveBalanceId: LeaveBalanceId },
            returning: true,
          });
  
          res.json({
            message: result ? "Operation successful" : "Operation failed",
          });
        }
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
  