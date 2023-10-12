const express = require("express");
const router = express.Router();
const EmployeeId = require("../model/EmployeeIdModel");
const jwt = require("jsonwebtoken");

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

// GET Route to fetch all EmployeeIds
router.get("/get", authToken, async (req, res) => {
  try {
    const employeeIds = await EmployeeId.findAll();
    res.json(employeeIds);
  } catch (error) {
    console.error("Error fetching EmployeeIds:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Route to fetch an EmployeeId by ID
router.get("/get/:id", authToken, async (req, res) => {
  const empId = req.params.id;

  try {
    const employeeId = await EmployeeId.findOne({ where: { EmpId: empId } });

    if (!employeeId) {
      return res.status(404).json({ error: "EmployeeId not found" });
    }

    res.json(employeeId);
  } catch (error) {
    console.error("Error fetching EmployeeId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST Route to create a new EmployeeId
router.post("/add", authToken, async (req, res) => {
  try {
    // Assuming you expect the request body to contain the necessary data
    const { EmpId, createdAt, updatedAt } = req.body;

    // Create a new EmployeeId instance
    const newEmployeeId = await EmployeeId.create({
      EmpId,
      createdAt,
      updatedAt,
    });

    // Respond with the newly created EmployeeId
    res.status(201).json(newEmployeeId);
  } catch (error) {
    console.error("Error creating EmployeeId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH Route to update an EmployeeId by ID
router.patch("/update/:id", authToken, async (req, res) => {
  const empId = req.params.id; // Get the EmployeeId's ID from the URL parameter
  const updatedEmpId = req.body.EmpId; // Get the updated EmpId from the request body

  try {
    const employeeId = await EmployeeId.findOne({ where: { EmpId: empId } });

    if (!employeeId) {
      return res.status(404).json({ error: "EmployeeId not found" });
    }

    // Update the EmpId with the new value from the request body
    employeeId.EmpId = updatedEmpId;
    await employeeId.save();

    res.json(employeeId);
  } catch (error) {
    console.error("Error updating EmployeeId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
