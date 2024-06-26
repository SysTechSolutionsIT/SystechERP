const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const TManualAttendance = require("../model/ManualAttendanceModel");
const { Op } = require("sequelize");
const moment = require("moment");

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

// const TManualAttendance = sequelize.define(
//   "TManualAttendance",
//   {
//     CompanyId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//       defaultValue: "00001",
//     },
//     BranchId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//       defaultValue: "00001",
//     },
//     AttendanceId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//       primaryKey: true,
//     },
//     FYear: {
//       type: DataTypes.STRING(5),
//       allowNull: true,
//     },
//     EmployeeTypeId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//     },
//     JobTypeId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//       defaultValue: "00001",
//     },
//     ShiftId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//     },
//     EmployeeId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//     },
//     EmployeeTypeGroup: {
//       type: DataTypes.STRING(10),
//       allowNull: true,
//     },
//     AttendanceDate: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     InTime: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     OutTime: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     AttendanceFlag: {
//       type: DataTypes.STRING(1),
//       allowNull: true,
//       defaultValue: "E",
//     },
//     Remark: {
//       type: DataTypes.STRING(500),
//       allowNull: true,
//     },
//     AcFlag: {
//       type: DataTypes.STRING(1),
//       allowNull: true,
//       defaultValue: "Y",
//     },
//     CreatedBy: {
//       type: DataTypes.STRING(5),
//       allowNull: true,
//     },
//     CreatedOn: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     ModifiedBy: {
//       type: DataTypes.STRING(5),
//       allowNull: true,
//     },
//     ModifiedOn: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     ApprovalFlag: {
//       type: DataTypes.STRING(1),
//       allowNull: true,
//       defaultValue: "P",
//     },
//     SanctionBy: {
//       type: DataTypes.STRING(5),
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// // Middleware for parsing JSON
// router.use(bodyParser.json());

// // Model synchronization

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

router.get("/FnShowParticularEmployeeData", authToken, async (req, res) => {
  const EmployeeId = req.query.EmployeeId;
  try {
    const Shift = await TManualAttendance.findAll({
      where: {
        EmployeeId: EmployeeId,
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

//showing manager pending entries
router.get("/FnFetchHRPendingAttendances", authToken, async (req, res) => {
  try {
    const Attendance = await TManualAttendance.findAll({
      where: {
        ApprovalFlag: "HRP",
      },
      order: [["AttendanceId", "ASC"]],
    });
    res.json(Attendance);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowManagerSanctionAttendances", authToken, async (req, res) => {
  const SanctioningEMP = req.query.TBSanctionBy;
  try {
    const Attendance = await TManualAttendance.findAll({
      where: {
        TBSanctionBy: SanctioningEMP,
        ApprovalFlag: "MP",
      },
      order: [["AttendanceId", "ASC"]],
    });
    res.json(Attendance);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/FnApproveAll", authToken, async (req, res) => {
  try {
    const FromDate = req.query.FromDate;
    const ToDate = req.query.ToDate;
    const UserRole = req.query.UserRole
    console.log('User Role', UserRole)

    // Function to convert date format
    const convertDateFormat = (dateString) => {
      // Split the date string into parts based on the dash separator
      const parts = dateString.split("-");

      // Rearrange the parts to format "yyyy-mm-dd" for proper comparison
      const formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];

      return formattedDate;
    };

    // Convert FromDate and ToDate to the desired format
    const fromDate = convertDateFormat(FromDate);
    const toDate = convertDateFormat(ToDate);

    console.log("FromDate in yyyy-mm-dd format:", fromDate);
    console.log("ToDate in yyyy-mm-dd format:", toDate);

    // Get the EmployeeName from request body or wherever it is available
    const sanctionBy = req.body.EmployeeName;

    let approvals;

    try {
      if (UserRole == 'Admin') { // Use strict equality
        approvals = await TManualAttendance.update({
          ApprovalFlag: "A",
          SanctionBy: sanctionBy,
        }, {
          where: {
            AttendanceDate: {
              [Op.between]: [fromDate, toDate],
            },
          },
        });
        console.log('Admin Approval Done')

      } else if (UserRole == 'Manager') {
        approvals = await TManualAttendance.update({
          ApprovalFlag: "HRP",
          SanctionBy: sanctionBy,
        }, {
          where: {
            AttendanceDate: {
              [Op.between]: [fromDate, toDate],
            },
          },
        });
        console.log('Manager Approval Done')
      }
    } catch (error) {
      console.error('Error Approving Attendance', error);
    }

    // Log the generated SQL query
    console.log("Generated SQL Query:", approvals[1]);

    res.json({
      message: approvals[0] ? "Operation Successful" : "Unsuccessful",
    });
  } catch (error) {
    console.error("Error Approving Attendances:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Middleware for generating Id
const generateAttendanceId = async (req, res, next) => {
  try {
    if (Array.isArray(req.body)) {
      const totalRecords = await TManualAttendance.count();
      req.body.forEach((record, index) => {
        if (record.IUFlag === "I") {
          const newId = (totalRecords + index + 1).toString().padStart(5, "0");
          record.AttendanceId = newId;
        }
      });
    } else if (req.body.IUFlag === "I") {
      const totalRecords = await TManualAttendance.count();
      const newId = (totalRecords + 1).toString().padStart(5, "0");
      req.body.AttendanceId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating AttendanceId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateAttendanceId,
  authToken,
  async (req, res) => {
    const attendance = Array.isArray(req.body) ? req.body : [req.body];
    console.log(attendance);
    try {
      const operations = attendance.map(async (attendances) => {
        const AttendanceId = attendances.AttendanceId || req.query.AttendanceId; // Access the AttendanceId from the request body or query

        if (attendances.IUFlag === "D") {
          // "Soft-delete" operation
          const result = await TManualAttendance.update(
            { AcFlag: "N" },
            { where: { AttendanceId: AttendanceId } }
          );
          return {
            message: result[0]
              ? "Record Deleted Successfully"
              : "Record Not Found",
          };
        } else {
          // Add or update operation
          const result = await TManualAttendance.upsert(attendances, {
            where: { AttendanceId: AttendanceId }, // Specify the where condition for update
            returning: true,
          });
          return {
            message: result ? "Operation successful" : "Operation failed",
          };
        }
      });

      const results = await Promise.all(operations);
      res.json(results);
    } catch (error) {
      console.error("Error performing operation:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//For Monthly Attendances

router.get("/MAttendance/count", async (req, res) => {
  try {
    // Calculate the date range for the previous month
    const startDate = moment().subtract(1, "months").startOf("month").format("DD-MM-YYYY");
    const endDate = moment().subtract(1, "months").endOf("month").format("DD-MM-YYYY");
    // Use Sequelize's aggregation functions to count instances and group them by EmployeeId
    const counts = await TManualAttendance.findAll({
      attributes: [
        "EmployeeId",
        [
          sequelize.fn("COUNT", sequelize.col("AttendanceId")),
          "ManualAttendance",
        ],
      ],
      where: {
        ApprovalFlag: "A",
        AttendanceDate: {
          [Op.between]: [startDate, endDate],
        },
        JobType: 'Present' // Filter records where JobType is 'Present'
      },
      group: ["EmployeeId"],
    });

    res.json(counts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
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
