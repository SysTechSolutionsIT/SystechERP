const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Op } = require("sequelize");
const MWeeklyOff = require("../model/WeekOffModel");

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
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     port: process.env.DB_PORT,
//   }
// );

// const MWeeklyOff = sequelize.define(
//   "MWeeklyOff",
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
//     WeeklyOffId: {
//       type: DataTypes.STRING(5),
//       primaryKey: true,
//     },
//     WeeklyOffName: {
//       type: DataTypes.STRING(500),
//       allowNull: false,
//     },
//     Remark: {
//       type: DataTypes.STRING(500),
//     },
//     AcFlag: {
//       type: DataTypes.STRING(1),
//       defaultValue: "Y",
//     },
//     CreatedBy: {
//       type: DataTypes.STRING(500),
//     },
//     CreatedOn: {
//       type: DataTypes.DATE,
//     },
//     ModifiedBy: {
//       type: DataTypes.STRING(500),
//     },
//     ModifiedOn: {
//       type: DataTypes.DATE,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// router.use(bodyParser.json());

// // Model synchronization
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

// MWeeklyOff.sync()
//   .then(() => {
//     console.log("MWeeklyOff model synchronized successfully.");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing MWeeklyOff model:", error);
//   });

router.get("/FnshowActiveData", authToken, async (req, res) => {
  try {
    const WeeklyOff = await MWeeklyOff.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["WeeklyOffId", "ASC"]],
    });
    res.json(WeeklyOff);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const WeeklyOffId = req.query.WeeklyOffId;
  try {
    const WeeklyOff = await MWeeklyOff.findOne({
      where: {
        WeeklyOffId: WeeklyOffId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["WeeklyOffId", "ASC"]],
    });
    res.json(WeeklyOff);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const generateWeeklyOffId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await MWeeklyOff.count();
      const newId = (totalRecords + 1).toString().padStart(5, "0");
      req.body.WeeklyOffId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating WeeklyOffId:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post(
  "/FnAddUpdateDeleteRecord",
  generateWeeklyOffId,
  authToken,
  async (req, res) => {
    const WeeklyOff = req.body;
    const WeeklyOffId = WeeklyOff.WeeklyOffId; // Access the WeeklyOffId from the request body

    try {
      if (WeeklyOff.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MWeeklyOff.update(
          { AcFlag: "N" },
          { where: { WeeklyOffId: WeeklyOffId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MWeeklyOff.upsert(WeeklyOff, {
          where: { WeeklyOffId: WeeklyOffId }, // Specify the where condition for update
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

router.get("/GetWeeklyOffCount", authToken, async (req, res) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-based month index
    const weekdays = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    // Calculate the previous month
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // December is 11, January is 0
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const weeklyOffData = await MWeeklyOff.findAll({
      attributes: ["WeeklyOffId", "WeeklyOffName"],
    });

    if (!weeklyOffData || weeklyOffData.length === 0) {
      return res.status(404).json({ message: "No weekly off data found" });
    }

    const weeklyOffCounts = [];

    for (const weeklyOff of weeklyOffData) {
      // Loop for entries in the table
      const weeklyOffId = weeklyOff.WeeklyOffId;
      const weeklyOffDays = weeklyOff.WeeklyOffName.split(",").map(
        (day) => day.trim() // Splitting string
      );

      let totalCount = 0;

      for (const days of weeklyOffDays) {
        //For each value in the string

        // Count occurrences of the weekday in the current month
        for (
          let day = 1;
          day <= new Date(previousYear, previousMonth + 1, 0).getDate();
          day++
        ) {
          // Get the date for the current iteration
          const currentDate = new Date(previousYear, previousMonth, day);

          // Check if the current date is the target weekday
          if (currentDate.getDay() === weekdays[days]) {
            // If it matches, increment the count
            totalCount++;
          }
        }
      }

      weeklyOffCounts.push({
        WeeklyOffId: weeklyOffId,
        TotalCount: totalCount,
      });
    }

    res.json(weeklyOffCounts);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/GetWeeklyOffCountByMonth", authToken, async (req, res) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const fromMonth = req.query.fromMonth ? parseInt(req.query.fromMonth) : currentDate.getMonth() + 1; // Adjust month to be 1-based
    const toMonth = req.query.toMonth ? parseInt(req.query.toMonth) : fromMonth; // Default to fromMonth if toMonth is not provided
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const weeklyOffData = await MWeeklyOff.findAll({
      attributes: ["WeeklyOffId", "WeeklyOffName"],
    });

    if (!weeklyOffData || weeklyOffData.length === 0) {
      return res.status(404).json({ message: "No weekly off data found" });
    }

    const weeklyOffCounts = [];

    for (let month = fromMonth; month <= toMonth; month++) {
      const adjustedMonth = month - 1; // Adjust month to be 0-based
      const year = adjustedMonth < currentDate.getMonth() ? currentYear : currentYear - 1;
      const previousMonth = adjustedMonth === 0 ? 11 : adjustedMonth - 1;
      const previousYear = adjustedMonth === 0 ? year - 1 : year;

      for (const weeklyOff of weeklyOffData) {
        const weeklyOffId = weeklyOff.WeeklyOffId;
        const weeklyOffDays = weeklyOff.WeeklyOffName.split(",").map(day => day.trim());

        const offDays = [];

        for (const day of weeklyOffDays) {
          if (!offDays.includes(day)) {
            offDays.push(day);
          }
        }

        const totalCount = offDays.length;

        weeklyOffCounts.push({
          Monthly: month,
          WeeklyOffId: weeklyOffId,
          TotalCount: totalCount,
          OffDays: offDays,
        });
      }
    }

    res.json(weeklyOffCounts);
  } catch (error) {
    console.error("Error retrieving data:", error);
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
