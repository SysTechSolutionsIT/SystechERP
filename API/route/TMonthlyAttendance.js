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

const TMonthlyAttendance = sequelize.define(
  "TMonthlyAttendance",
  {
    CompanyId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    BranchId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    MAttendanceId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    ApprovedMA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Leaves: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Holidays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    WeeklyOffs: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    TotalDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Presenty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Absences: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

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

TMonthlyAttendance.sync()
  .then(() => {
    console.log("MLeaveTyepe model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MLeaveTyepe model:", error);
  });

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const MAttendanceId = req.query.MAttendanceId;
  try {
    const Shift = await TMonthlyAttendance.findOne({
      where: {
        MAttendanceId: MAttendanceId,
      },
      order: [["MAttendanceId", "ASC"]],
    });
    res.json(Shift);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

//showing pending entries
router.get("/FnShowEmployeeData", authToken, async (req, res) => {
  const empID = req.query.EmployeeId;
  try {
    const approvedRecords = await TMonthlyAttendance.findAll({
      where: {
        EmployeeId: empID,
      },
      order: [["MAttendanceId", "ASC"]],
    });
    res.json(approvedRecords);
  } catch (error) {
    console.error("Error retrieving approved data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Middleware for generating Id
const generateMAttendanceId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await TMonthlyAttendance.count();
      const newId = (totalRecords + 1).toString().padStart(5, "0");
      req.body.MAttendanceId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating  MAttendanceId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateMAttendanceId,
  authToken,
  async (req, res) => {
    const Shift = req.body;
    const MAttendanceId = Shift.MAttendanceId; // Access the  MAttendanceId from the request body

    try {
      // Add or update operation
      const result = await TMonthlyAttendance.upsert(Shift, {
        where: { MAttendanceId: MAttendanceId }, // Specify the where condition for update
        returning: true,
      });

      res.json({
        message: result ? "Operation successful" : "Operation failed",
      });
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
