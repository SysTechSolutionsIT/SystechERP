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

const TManualAttendance = sequelize.define(
  "TManualAttendance",
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
    AttendanceId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    FYear: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    EmployeeTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    JobTypeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: "00001",
    },
    ShiftId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EmployeeId: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    EmployeeTypeGroup: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    AttendanceDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    InTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    OutTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    AttendanceFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "E",
    },
    Remark: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    AcFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "Y",
    },
    CreatedBy: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ApprovalFlag: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "P",
    },
    SanctionBy: {
      type: DataTypes.STRING(5),
      allowNull: true,
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
  .sync()
  .then(() => {
    console.log("TManualAttendance model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing TManualAttendance model:", error);
  });

router.get("/FnshowActiveData", authToken, async (req, res) => {
  try {
    const Shift = await TManualAttendance.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["AttendanceId", "ASC"]],
    });
    res.json(Shift);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const AttendanceId = req.query.AttendanceId;
  try {
    const Shift = await TManualAttendance.findOne({
      where: {
        AttendanceId: AttendanceId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["AttendanceId", "ASC"]],
    });
    res.json(Shift);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

//showing pending entries
router.get("/FnShowManualPendingData", authToken, async (req, res) => {
  try {
    const approvedRecords = await TManualAttendance.findAll({
      where: {
        ApprovalFlag: "P",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["AttendanceId", "ASC"]],
    });
    res.json(approvedRecords);
  } catch (error) {
    console.error("Error retrieving approved data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/FnApproveAll', authToken, async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const date = new Date(req.body.AttendanceDate);
    const sanctionBy = req.body.EmployeeName;

    const approvals = await TManualAttendance.update(
      {
        ApprovalFlag: "A",
        SanctionBy: sanctionBy,
      },
      {
        where: {
          AttendanceDate: date,
        },
      }
    );

    res.json({
      message: approvals[0] ? 'Operation Successful' : 'Unsuccessful',
    });
  } catch (error) {
    console.error("Error Adding Data:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Middleware for generating Id
const generateAttendanceId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await TManualAttendance.count();
      const newId = (totalRecords + 1).toString().padStart(5, "0");
      req.body.AttendanceId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating  AttendanceId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateAttendanceId,
  authToken,
  async (req, res) => {
    const Shift = req.body;
    const AttendanceId = Shift.AttendanceId; // Access the  AttendanceId from the request body

    try {
      if (Shift.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await TManualAttendance.update(
          { AcFlag: "N" },
          { where: { AttendanceId: AttendanceId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await TManualAttendance.upsert(Shift, {
          where: { AttendanceId: AttendanceId }, // Specify the where condition for update
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
