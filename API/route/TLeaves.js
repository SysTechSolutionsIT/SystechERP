const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const TLeaves = require("../model/TLeavesModel");
const MLeaveType = require("../model/MLeaveTypeModel");

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

// const TLeaves = sequelize.define(
//   "TLeaves",
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
//     FYear: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//     },
//     LeaveApplicationId: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//     },
//     LeaveApplicationDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     LeaveApplicationId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//     },
//     EmployeeType: {
//       type: DataTypes.STRING(10),
//       allowNull: false,
//     },
//     EmployeeTypeGroup: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//     },
//     LeaveFromDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     LeaveToDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     LeaveTypeId: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//     },
//     LeaveDays: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//       defaultValue: 0,
//     },
//     SanctionBy: {
//       type: DataTypes.STRING(5),
//       allowNull: true,
//     },
//     SanctionFromDate: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     SanctionToDate: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     SanctionLeaveDays: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       defaultValue: 0,
//     },
//     Remark: {
//       type: DataTypes.STRING(1000),
//       allowNull: true,
//     },
//     ApprovalFlag: {
//       type: DataTypes.STRING(1),
//       allowNull: true,
//       defaultValue: "P",
//     },
//     AcFlag: {
//       type: DataTypes.STRING(1),
//       allowNull: false,
//       defaultValue: "Y",
//     },
//     CreatedBy: {
//       type: DataTypes.STRING(500),
//       allowNull: true,
//       defaultValue: "",
//     },
//     CreatedOn: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     ModifiedBy: {
//       type: DataTypes.STRING(500),
//       allowNull: true,
//     },
//     ModifiedOn: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// router.use(bodyParser.json());

// TLeaves.sync()
//   .then(() => {
//     console.log("MLeaveTyepe model synchronized successfully.");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing MLeaveTyepe model:", error);
//   });

router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const Leaves = await TLeaves.findAll({
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
  const EmployeeId = req.query.EmployeeId; // Assuming you're using LeaveApplicationId instead of LeaveApplicationId
  try {
    const Leaves = await TLeaves.findAll({
      where: {
        EmployeeId: EmployeeId,
      },
      order: [["LeaveApplicationId", "ASC"]],
    });
    res.json(Leaves);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnFetchHRPendingLeaves", authToken, async (req, res) => {
  try {
    const Leaves = await TLeaves.findAll({
      where: {
        ApprovalFlag: "HRP",
      },
      order: [["LeaveApplicationId", "ASC"]],
    });
    res.json(Leaves);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowManagerSanctionLeaves", authToken, async (req, res) => {
  const SanctioningEMP = req.query.TBSanctionBy;
  try {
    const Leaves = await TLeaves.findAll({
      where: {
        TBSanctionBy: SanctioningEMP,
        ApprovalFlag: "MP",
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
    if (req.body.IUFlag === "I") {
      const currentYear = req.body.FYear;
      const totalRecords = await TLeaves.count({
        where: {
          FYear: currentYear,
        },
      });

      const newId = `${currentYear}-LA${(totalRecords + 1)
        .toString()
        .padStart(5, "0")}`;
      req.body.LeaveApplicationId = newId;
      console.log(req.body.LeaveApplicationId);
    }
    next();
  } catch (error) {
    console.error("Error generating LeaveApplicationId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateLeaveApplicationId,
  authToken,
  async (req, res) => {
    const Leaves = req.body;
    const LeaveApplicationId = req.query.LeaveApplicationId; // Access the LeaveApplicationId from the request body

    try {
      if (Leaves.IUFlag === `D`) {
        // `Soft-delete` operation
        const result = await TLeaves.update(
          { AcFlag: `N` },
          { where: { LeaveApplicationId: Leaves.LeaveApplicationId } }
        );

        res.json({
          message: result[0]
            ? `Record Deleted Successfully`
            : `Record Not Found`,
        });
      } else if (Leaves.IUFlag === `U`) {
        // Add or update operation
        const result = await TLeaves.update(Leaves, {
          where: { LeaveApplicationId: LeaveApplicationId },
          returning: true,
        });

        res.json({
          message: result ? `Operation successful` : `Operation failed`,
        });
      } else {
        const result = await TLeaves.create(Leaves, {
          returning: true,
        });

        res.json({
          message: result ? `Operation successful` : `Operation failed`,
        });
      }
    } catch (error) {
      console.error("Error performing operation:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/CalculatePresenty", authToken, async (req, res) => {
  const LeaveBody = req.body;
  const LeavesEarned = req.query.LeavesEarned;
  let Presenty = 0; // Initialize Presenty as a number
  let Absenty = 0; // Initialize Absenty as a number
  let CarryForward = 0; // Initialize CarryForward as a number
  const AMonth = new Date(LeaveBody.SanctionFromDate).getMonth() + 1;
  const LeaveDays = LeaveBody.SanctionLeaveDays;

  const Max = await MLeaveType.findOne({
    where: {
      LeaveTypeId: LeaveBody.LeaveTypeId,
    },
    attributes: ["MaxPerMonth"], // Specify the attribute directly
    order: [["LeaveTypeId", "ASC"]],
  });
  const MPM = Max.MaxPerMonth;

  console.log("MPM:", MPM);

  if (LeaveDays < MPM) {
    Presenty += LeaveDays;
    MaxUsedFlag = false;
    if (MLeaveType.CarryForwardFlag === "Y") {
      CarryForward = MPM - LeaveDays;
    }
    //Updating Leave Balance
  }
  // When leaves taken is exactly equal to maximum of the month
  else if (LeaveDays == MPM) {
    Presenty += LeaveDays;
    MaxUsedFlag = true;
    if (MLeaveType.CarryForwardFlag === "Y") {
      CarryForward = 0;
    }
  } else {
    // where leaves taken exceeds maximum per month
    // Here we must check for Leaves Earned Module
    Presenty = MPM;
    const Remain = LeaveDays - MPM;
    MaxUsedFlag = true;

    if (LeavesEarned > 0 && Remain < LeavesEarned) {
      //Update Leaves Earned
      CarryForward = LeavesEarned - Remain;
    } else if (Remain == LeavesEarned) {
      CarryForward = 0;
    } else {
      Absenty = LeaveDays - MPM;
    }

    if (MLeaveType.CarryForwardFlag === "Y") {
      CarryForward = 0;
    }
  }

  const LeavePresentyObject = {
    LeaveApplicationId: LeaveBody.LeaveApplicationId,
    EmployeeId: LeaveBody.EmployeeId,
    FYear: LeaveBody.FYear,
    Month: AMonth,
    Presenty: Presenty,
    Absenty: Absenty,
    CarryForward: CarryForward,
  };
  console.log("Leave Presenty Object", LeavePresentyObject);
  res.json(LeavePresentyObject);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT. Closing Sequelize connection...");
  sequelize.close().then(() => {
    console.log("Sequelize connection closed. Exiting...");
    process.exit(0);
  });
});

module.exports = router;
