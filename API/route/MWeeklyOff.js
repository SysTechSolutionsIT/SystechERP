const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Op } = require("sequelize");
const MWeeklyOff = require("./MWeeklyOffModel");

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

// router.get("/MWeeklyOff/count", async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth() ; // Current month
//     const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     let totalCount = 0;

//     for (const weekday of weekdays) {
//       const counts = await MWeeklyOff.count({
//         where: {
//           // Check if the WeekDayName contains the specified weekday
//           WeekDayName: {
//             [Op.like]: `%${weekday}%`,
//           },
//           // Check if the date falls within the previous month
//           CreatedOn: {
//             [Op.gte]: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // Start of previous month
//             [Op.lt]: new Date(currentDate.getFullYear(), currentMonth, 1), // Start of current month
//           },
//         },
//       });

//       totalCount += counts;
//     }

//     res.json({ totalCount });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

process.on("SIGINT", () => {
  console.log("Received SIGINT. Closing Sequelize connection...");
  sequelize.close().then(() => {
    console.log("Sequelize connection closed. Exiting...");
    process.exit(0);
  });
});

module.exports = router;
