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

const MShift = sequelize.define('MShift', {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      defaultValue: '00001',
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      defaultValue: '00001',
    },
    ShiftId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    EmployeeTypeGroupId: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    EmployeeTypeId: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    ShiftName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    StartTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    EndTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    OTStartTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    GraceEarlyTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    GraceLateTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    HalfdayHours: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    FulldayHours: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    AutoRotateFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'Y',
    },
    TwoDayShift: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: 'Y',
    },
    ShiftGraceHoursMin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    ShiftGraceHoursMax: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
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
  }, {
    timestamps: false, 
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

MShift.sync()
  .then(() => {
    console.log("MShift model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MShift model:", error);
  });

  router.get("/FnshowActiveData", authToken, async (req, res) => {
    try {
      const Shift = await MShift.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["ShiftId", "ASC"]],
      });
      res.json(Shift);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const ShiftId = req.query.ShiftId;
    try {
      const Shift = await MShift.findOne({
        where: {
          ShiftId: ShiftId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["ShiftId", "ASC"]],
      });
      res.json(Shift);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

    // Middleware for generating Id
const generateShiftId = async (req, res, next) => {
    try {
      if (req.body.IUFlag === 'I') {
        const totalRecords = await MShift.count();
        const newId = (totalRecords + 1).toString().padStart(5, "0");
        req.body.ShiftId = newId;
      }
      next();
    } catch (error) {
      console.error("Error generating ShiftId:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  router.post("/FnAddUpdateDeleteRecord", generateShiftId, authToken, async (req, res) => {
    const Shift = req.body;
    const ShiftId = Shift.ShiftId;  // Access the ShiftId from the request body
  
    try {
      if (Shift.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MShift.update(
          { AcFlag: "N" },
          { where: { ShiftId: ShiftId } }
        );
  
        res.json({
          message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MShift.upsert(Shift, {
          where: { ShiftId: ShiftId },  // Specify the where condition for update
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
