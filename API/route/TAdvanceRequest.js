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

const TAdvanceRequest = sequelize.define("TAdvanceRequest", {
  CompanyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  BranchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  AdvanceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  AdvanceDate: {
    type: DataTypes.DATE,
  },
  EmployeeId: {
    type: DataTypes.STRING,
    allowNull:false
  },
  EmployeeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FYear: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  MEmployee: {
    type: DataTypes.STRING,
  },
  AdvanceType: {
    type: DataTypes.STRING,
    defaultValue: "Official",
  },
  Amount: {
    type: DataTypes.DECIMAL(18, 2),
    defaultValue: 0,
  },
  Installment: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  Purpose: {
    type: DataTypes.STRING,
  },
  ProjectId: {
    type: DataTypes.INTEGER,
  },
  AdvanceStatus: {
    type: DataTypes.STRING,
  },
  AMonth: {
    type: DataTypes.STRING,
  },
  AYear: {
    type: DataTypes.INTEGER,
  },
  ApprovalFlag: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
  Remark: {
    type: DataTypes.STRING,
  },
  AcFlag: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Y",
  },
  CreatedBy: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  CreatedOn: {
    type: DataTypes.DATE,
  },
  ModifiedBy: {
    type: DataTypes.STRING,
  },
  ModifiedOn: {
    type: DataTypes.DATE,
  },
  ApprovedBy: {
    type: DataTypes.STRING,
  },
  ApprovedAmount: {
    type: DataTypes.DECIMAL(18, 2),
    defaultValue: 0,
  },
  ApprovedInstallments: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  RejectedBy: {
    type: DataTypes.STRING,
  },
  RejectReason: {
    type: DataTypes.STRING,
  },
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

// GET endpoint to retrieve all financial year entires
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const years = await TAdvanceRequest.findAll({
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

// GET endpoint to retrieve active financial year entries
router.get("/FnShowActiveData", async (req, res) => {
  try {
    const years = await TAdvanceRequest.findAll({
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

// GET endpoint to retrieve a particular financial year entry by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const AdvanceId = req.query.AdvanceId;
  try {
    const years = await TAdvanceRequest.findOne({
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

router.get("/FnShowEmployeeAdvanceRequests", authToken, async (req, res) => {
  const EmployeeId = req.query.EmployeeId;
  try {
    const years = await TAdvanceRequest.findAll({
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

const generateAdvanceId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === 'I') {
      const totalRecords = await TAdvanceRequest.count();
      const newId = (totalRecords + 1).toString().padStart(4, "0");
      req.body.AdvanceId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating Advance Request Id:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post("/FnAddUpdateDeleteRecord", generateAdvanceId, authToken, async (req, res) => {
  const AdvanceReq = req.body;
  const AdvanceId = req.query.AdvanceId
  try {
    if (AdvanceReq.IUFlag === "D") {
      // "Soft-delete" operation
      const result = await TAdvanceRequest.update(
        { AcFlag: "N" },
        { where: { AdvanceId: AdvanceReq.AdvanceId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else if (AdvanceReq.IUFlag === 'U') {
      // Add or update operation
      const result = await TAdvanceRequest.update(AdvanceReq, {
        where: { AdvanceId: AdvanceReq.AdvanceId },
        returning: true,
      });

      res.json({
        message: result ? "Operation successful" : "Operation failed",
      });
    } else {

      const result = await TAdvanceRequest.create(AdvanceReq, {
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

router.get("/FnShowPendingData", authToken, async (req, res) => {
  try {
    const approvedRecords = await TAdvanceRequest.findAll({
      where: {
        ApprovalFlag: "P",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["AdvanceId", "ASC"]],
    });
    res.json(approvedRecords);
  } catch (error) {
    console.error("Error retrieving approved data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve all records where ApprovalFlag is "R"
router.get("/FnShowRepaymentData", authToken, async (req, res) => {
  try {
    const rejectedRecords = await TAdvanceRequest.findAll({
      where: {
        AdvanceStatus: {
          [Sequelize.Op.or]: ["Repayment", "Partial Repayment"],
        },
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
