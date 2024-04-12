const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
const axios = require("axios");
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

const MLAttendance = sequelize.define(
  "MLAttendance",
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
    EmployeeId: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    Presenty: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    Absenty: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
    },
    FYear: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    Month: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
  },
  {
    timestamps: false, // Set to true if you have createdAt and updatedAt columns
  }
);

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

MLAttendance.sync()
  .then(() => {
    console.log("MLAttendance model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MLAttendance model:", error);
  });

router.get("/FnshowActiveData", authToken, async (req, res) => {
  try {
    const TField = await MLAttendance.findAll({
      order: [["EmployeeId", "ASC"]],
    });
    res.json(TField);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowParticularData", authToken, async (req, res) => {
  const EmployeeId = req.query.EmployeeId;
  try {
    const TField = await MLAttendance.findOne({
      where: {
        EmployeeId: EmployeeId,
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(TField);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
  const EmployeeId = req.body.EmployeeId;
  const Presenty = req.body.Presenty;
  const Absenty = req.body.Absenty;
  const Month = req.body.Month;
  const FYear = req.body.FYear;

  try {
    // Check if the record already exists for the provided EmployeeId, month, and FYear
    let existingRecord = await MLAttendance.findOne({
      where: { EmployeeId: EmployeeId, Month: Month, FYear: FYear },
    });

    if (existingRecord) {
      // If record exists, update the Presenty and Absenty values
      const updatedPresenty = existingRecord.Presenty + Presenty;
      const updatedAbsenty = existingRecord.Absenty + Absenty;

      // Update the existing record with the new values
      await existingRecord.update({
        Presenty: updatedPresenty,
        Absenty: updatedAbsenty,
      });
      res.json({ message: "Record updated successfully" });
    } else {
      // If record does not exist, create a new record
      await MLAttendance.create({
        EmployeeId: EmployeeId,
        Presenty: Presenty,
        Absenty: Absenty,
        Month: Month,
        FYear: FYear,
      });
      res.json({ message: "Record added successfully" });
    }
  } catch (error) {
    console.error("Error performing operation:", error);
    res.status(500).send("Internal Server Error");
  }
});

// For Blank Rows
const scheduleTime = "0 6 1 * *"; // This will execute the function at 6:00 AM on the first day of every month

async function fetchDataAndStoreInArray() {
  cxz;
  try {
    const response = await axios.get(
      "http://localhost:5500/employee/personal/FnShowEmpIds"
    );
    const data = response.data;
    const employeeIdsArray = data.map((employee) => employee.EmployeeId);
    console.log(employeeIdsArray); // Print the array of employee IDs
    return employeeIdsArray; // Return the array if needed
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of error
  }
}

async function AddEmptyRows(employeeIdsArray, Fyear, month) {
  try {
    // Map over employeeIdsArray and insert rows for each employee
    for (const EmployeeId of employeeIdsArray) {
      await MLAttendance.create({
        EmployeeId,
        Presenty: 0,
        FYear: Fyear,
        Month: month,
      });
    }
    console.log("Empty rows added successfully.");
  } catch (error) {
    console.error("Error adding empty rows:", error);
  }
}

// Schedule the job
const job = schedule.scheduleJob(scheduleTime, function () {
  // This function will be executed at the defined time every day
  console.log("Executing my function at", new Date());
  const Fyear = new Date().getFullYear();
  const month = new Date().getMonth();
  AddEmptyRows(fetchDataAndStoreInArray(), Fyear, month);
  // Call your function here
  // yourFunction();
});

router.get("/FnFetchAttendances", async (req, res) => {
  try {
    // Fetch all employees with their attendance details
    const employeesAttendance = await MLAttendance.findAll({
      attributes: ["EmployeeId", "Presenty", "Absenty"],
    });

    // If there are no employees found
    if (!employeesAttendance || employeesAttendance.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    // If employees are found, send them in the response
    res.status(200).json({ employees: employeesAttendance });
  } catch (error) {
    console.error("Error fetching employees attendance:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
