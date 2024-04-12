const TManualAttendance = require("../model/ManualAttendanceModel");
const MHoliday = require("../model/HolidayModel");
const TLeaves = require("../model/TLeavesModel");
const MWeeklyOff = require("../model/WeekOffModel");

const express = require("express");
const router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const { Op } = require("sequelize");

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

router.get("/FnFetchPresenty", authToken, async (req, res) => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1); // Adjust the month directly to get the previous month
  const previousMonth = currentDate.getMonth() + 1;

  // Getting Approved Manual Attendances
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
      // Filter by the month of AttendanceDate
      [sequelize.where(
        sequelize.fn("MONTH", sequelize.col("AttendanceDate")),
        previousMonth
      )]: previousMonth,
    },
    group: ["EmployeeId"],
  });

  //Getting Weekly Offs
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
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1; // December is 11, January is 0
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
        day <= new Date(previousYear, prevMonth + 1, 0).getDate();
        day++
      ) {
        // Get the date for the current iteration
        const currentDate = new Date(previousYear, prevMonth, day);

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

  //Fetching Holidays

  const holidays = await MHoliday.findAll({
    where: {
      HolidayDate: {
        [Op.and]: [
          {
            [Op.gte]: new Date(year, previousMonth - 1, 1), // Start of previous month
          },
          { [Op.lte]: new Date(year, previousMonth, 0) }, // End of previous month
        ],
      },
    },
  });

  // Initialize arrays to hold paid and unpaid holidays
  let paidHolidaysCount = 0;
  let unpaidHolidaysCount = 0;

  // Iterate over holidays and categorize them based on HolidayType
  holidays.forEach((holiday) => {
    if (holiday.HolidayType === "Paid") {
      paidHolidaysCount++;
    } else if (holiday.HolidayType === "Unpaid") {
      unpaidHolidaysCount++;
    }
  });

  // Return the counts of paid and unpaid holidays
  res.json({
    paidHolidaysCount: paidHolidaysCount,
    unpaidHolidaysCount: unpaidHolidaysCount,
  });
});
