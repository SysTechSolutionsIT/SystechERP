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

const TEmployeeGatepass = sequelize.define(
  "TEmployeeGatepass",
  {
    CompanyId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "00001",
    },
    BranchId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "00001",
    },
    FYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GatepassId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    GatepassDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    EmployeeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EmployeeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EmployeeTypeGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    InTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    OutTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    GatepassType: {
      type: DataTypes.STRING,
      defaultValue: "Personal",
    },
    Purpose: {
      type: DataTypes.STRING(1000),
    },
    RejectReason: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    SanctionBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Remark: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    ApprovalFlag: {
      type: DataTypes.STRING,
      defaultValue: "P",
    },
    AcFlag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING(500),
      defaultValue: "",
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
    // Define additional options here
  }
);

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization

sequelize
  .sync()
  .then(() => {
    console.log("TEmployeeGatepass model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing TEmployeeGatepass model:", error);
  });

router.get("/FnshowActiveData", authToken, async (req, res) => {
  try {
    const Gatepass = await TEmployeeGatepass.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["GatepassId", "ASC"]],
    });
    res.json(Gatepass);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const GatepassId = req.query.GatepassId;
  try {
    const Gatepass = await TEmployeeGatepass.findOne({
      where: {
        GatepassId: GatepassId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["GatepassId", "ASC"]],
    });
    res.json(Gatepass);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

//showing pending entries
router.get("/FnShowPendingData", authToken, async (req, res) => {
  try {
    const approvedRecords = await TEmployeeGatepass.findAll({
      where: {
        ApprovalFlag: "P",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["GatepassId", "ASC"]],
    });
    res.json(approvedRecords);
  } catch (error) {
    console.error("Error retrieving approved data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Middleware for generating Id
const generateGatepassId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await TEmployeeGatepass.count();
      const newId = (totalRecords + 1).toString().padStart(5, "0");
      req.body.GatepassId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating  GatepassId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateGatepassId,
  authToken,
  async (req, res) => {
    const Gatepass = req.body;
    const GatepassId = Gatepass.GatepassId; // Access the  GatepassId from the request body

    try {
      if (Gatepass.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await TEmployeeGatepass.update(
          { AcFlag: "N" },
          { where: { GatepassId: GatepassId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await TEmployeeGatepass.upsert(Gatepass, {
          where: { GatepassId: GatepassId }, // Specify the where condition for update
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
  }
);

process.on("SIGINT", () => {
  console.log("Received SIGINT. Closing Sequelize connection...");
  sequelize.close().then(() => {
    console.log("Sequelize connection closed. Exiting...");
    process.exit(0);
  });
});

module.exports = router;
