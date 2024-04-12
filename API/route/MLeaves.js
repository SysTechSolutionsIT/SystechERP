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

const MLeaves = sequelize.define(
  "MLeaves",
  {
    CompanyId: {
      type: DataTypes.STRING(5),
      defaultValue: "00001",
    },
    BranchId: {
      type: DataTypes.STRING(5),
      defaultValue: "00001",
    },
    LeaveBalanceId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
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
      defaultValue: "Y",
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
      order: [["LeaveBalanceId", "ASC"]],
    });
    res.json(Leaves);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularEmployeeData", authToken, async (req, res) => {
  const EmployeeId = req.query.EmployeeId;
  const FYear = req.query.FYear;
  const Month = req.query.Month;
  const Year = req.query.Year;
  try {
    const Leaves = await MLeaves.findAll({
      where: {
        EmployeeId: EmployeeId,
        FYear: FYear,
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
  try {
    const totalRecords = await MLeaves.count();

    req.body.forEach((item, index) => {
      const newId = (totalRecords + index + 1).toString().padStart(5, "0");
      item.LeaveBalanceId = newId;
    });

    next();
  } catch (error) {
    console.error("Error generating Leave Balance Id", error);
    res.status(500).send("Internal Server Error");
  }
};

router.patch("/FnUpdateRecords", authToken, async (req, res) => {
  try {
    const { EmployeeId, FYear } = req.query;
    const updateDataArray = Array.isArray(req.body) ? req.body : [req.body];

    const updatePromises = updateDataArray.map(async (updateData) => {
      const { LeaveBalanceId, ...updateFields } = updateData;
      try {
        const result = await MLeaves.update(updateFields, {
          where: {
            EmployeeId: EmployeeId,
            FYear: FYear,
            LeaveBalanceId: LeaveBalanceId,
          },
        });

        return result[0]; // Indicates the number of updated records
      } catch (error) {
        console.error("Error updating record:", error);
        return 0; // Indicates failure to update
      }
    });

    const updateResults = await Promise.all(updatePromises);
    const totalUpdatedRecords = updateResults.reduce(
      (sum, count) => sum + count,
      0
    );

    res.json({
      message:
        totalUpdatedRecords > 0
          ? "Records Updated Successfully"
          : "No Records Updated",
      totalUpdatedRecords,
    });
  } catch (error) {
    console.error("Error updating records:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/FnLeaveApproved", authToken, async (req, res) => {
  const EmployeeId = req.body.EmployeeId;
  const LeaveTypeId = req.body.LeaveTypeId;
  const FYear = req.body.FYear;
  const LeaveDetails = req.body;
  console.log(LeaveDetails);

  try {
    // Update the SanctionLeaveDays column
    await MLeaves.update(
      { SanctionLeaveDays: LeaveDetails.SanctionLeaveDays },
      {
        where: {
          EmployeeId: EmployeeId,
          LeaveTypeId: LeaveTypeId,
          FYear: FYear,
        },
      }
    );

    // Retrieve the OpeningBalance from the database
    const leaveRecord = await MLeaves.findOne({
      where: { EmployeeId: EmployeeId, LeaveTypeId: LeaveTypeId, FYear: FYear },
    });

    if (leaveRecord) {
      // Calculate the remaining leave balance
      const remainingLeaves =
        leaveRecord.LeaveBalance - LeaveDetails.SanctionLeaveDays;
      console.log(remainingLeaves);
      // Update the LeavesTaken column
      await MLeaves.update(
        { LeaveBalance: remainingLeaves },
        {
          where: {
            EmployeeId: EmployeeId,
            LeaveTypeId: LeaveTypeId,
            FYear: FYear,
          },
        }
      );

      res.status(200).send("Leave details updated successfully.");
    } else {
      res.status(404).send("Leave record not found.");
    }
  } catch (error) {
    console.error("Error updating leave details:", error);
    res.status(500).send("Internal server error.");
  }
});

// Route to update a Specific Leaves Earned
router.patch("/FnLeaveEarnedUpdate", authToken, async (req, res) => {
  const EmployeeId = req.query.EmployeeId;
  const FYear = req.query.FYear;
  const CarryForward = req.query.CarryForward;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const LEno = `LeavesEarned${currentMonth}`;
  console.log("LeavesEarned Number:", LEno);

  try {
    // Update the SanctionLeaveDays column
    await MLeaves.update(
      { LEno: CarryForward },
      { where: { EmployeeId: EmployeeId, FYear: FYear } }
    );
    res.status(200).send("Leave details updated successfully.");
  } catch (error) {
    console.error("Error updating leave details:", error);
    res.status(500).send("Internal server error.");
  }
});

// Route to update a Specific Leaves Earned
router.get("/FnFetchLeaveEarned", authToken, async (req, res) => {
  const EmployeeId = req.query.EmployeeId;
  const FYear = req.query.FYear;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const LEno = `LeaveEarned${currentMonth}`;
  console.log("LEno", LEno);

  try {
    const Leaves = await MLeaves.findOne({
      where: {
        EmployeeId: EmployeeId,
        FYear: FYear,
      },
      attributes: {
        include: [[LEno, LEno]], // Dynamically include the column with name matching LEno
      },
    });
    res.json(Leaves);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Posting new data
router.post(
  "/FnAddUpdateDeleteRecord",
  generateLeaveBalanceId,
  authToken,
  async (req, res) => {
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
            message: result[0]
              ? "Record Deleted Successfully"
              : "Record Not Found",
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
