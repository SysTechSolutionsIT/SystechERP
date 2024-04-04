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

const TAdvanceInstallments = sequelize.define('TAdvanceInstallments', {
    CompanyId: {
      type: DataTypes.STRING(5),
      defaultValue: '00001'
    },
    BranchId: {
      type: DataTypes.STRING(5),
      defaultValue: '00001'
    },
    InstallmentId: {
      type: DataTypes.STRING(5),
      primaryKey:true
    },
    FYear: {
      type: DataTypes.STRING(5),
    },
    AdvanceId: {
      type: DataTypes.STRING(20),
      primaryKey:true
    },
    AdvanceDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      primaryKey:true
    },
    AMonth: {
      type: DataTypes.STRING(2),
      primaryKey:true
    },
    AYear: {
      type: DataTypes.STRING(20),
      primaryKey:true
    },
    StartMonth: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    InstallmentAmount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    RepaymentAmount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    BalanceAmount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    RepaymentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    RepaymentMonth: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    RepaymentYear: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    AdvanceType: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: 'Official'
    },
    Amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
      defaultValue: 0
    },
    Installment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    Purpose: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ProjectId: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    AdvanceStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'Pending'
    },
    ApprovalFlag: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ApprovedAmount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
      defaultValue: 0
    },
    ApprovedInstallments: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    Remark: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true
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
    },

  },{
    timestamps:false
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

TAdvanceInstallments.sync()
  .then(() => {
    console.log("TAdvance Installments model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MLeaveTyepe model:", error);
  });

  router.get("/FnShowAllData", authToken, async (req, res) => {
    try {
      const Leaves = await TAdvanceInstallments.findAll({
        attributes: {
          exclude: ['id']
        },
        order: [["AdvanceId", "ASC"]],
      });
      res.json(Leaves);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    } 
  });

  router.get("/FnShowActiveData", async (req, res) => {
    try {
      const years = await TAdvanceInstallments.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["AdvanceId", "ASC"]],
      });
      res.json(years);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularAdvanceInstallment", authToken, async (req, res) => {
    const AdvanceId = req.query.AdvanceId;
    try {
      const years = await TAdvanceInstallments.findAll({
        where: {
          AdvanceId: AdvanceId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["AdvanceId", "ASC"]],
      });
      res.json(years);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });


  router.get("/FnShowEmployeeAdvanceInstallments", authToken, async (req, res) => {
    const EmployeeId = req.query.EmployeeId;
    try {
      const years = await TAdvanceInstallments.findAll({
        where: {
          EmployeeId: EmployeeId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["EmployeeId", "ASC"]],
      });
      res.json(years);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  const generateInstallmentId = async (req, res, next) => {
    try {
      if (req.body.IUFlag === 'I') {
        const totalRecords = await TAdvanceInstallments.count();
        const newId = (totalRecords + 1).toString().padStart(5, "0");
        req.body.InstallmentId = newId;
      }
      next();
    } catch (error) {
      console.error("Error generating InstallmentId:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  router.post("/FnAddUpdateDeleteRecord", generateInstallmentId, authToken, async (req, res) => {
    const AdvanceReq = req.body;
    const AdvanceId = AdvanceReq.AdvanceId
    try {
      if (AdvanceReq.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await TAdvanceInstallments.update(
          { AcFlag: "N" },
          { where: { AdvanceId: AdvanceId } }
        );
  
        res.json({
          message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
        });
      } else if (AdvanceReq.IUFlag === 'U') {
        // Add or update operation
        const result = await TAdvanceInstallments.update(AdvanceReq, {
          where: { AdvanceId: AdvanceReq.AdvanceId },
          returning: true,
        });
  
        res.json({
          message: result ? "Operation successful" : "Operation failed",
        });
      } else {
  
        const result = await TAdvanceInstallments.create(AdvanceReq, {
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

  router.get("/FnShowParticularRepaymentData", authToken, async (req, res) => {
    const advanceId = req.query.AdvanceId
    try {
      const rejectedRecords = await TAdvanceInstallments.findAll({
        where: {
          AdvanceId: advanceId,
          AcFlag: 'Y'
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["AdvanceId", "ASC"]],
      });
      res.json(rejectedRecords);
    } catch (error) {
      console.error("Error retrieving rejected data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  module.exports = router;