const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const EmpPersonal = require("../model/EmpPersonalModel"); // Replace with the actual path to your model file

const authToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

// GET all employees
router.get("/get", authToken, async (req, res) => {
  try {
    const employees = await EmpPersonal.findAll();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET employee by ID
router.get("/get/:id", authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await EmpPersonal.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new employee
router.post("/add", authToken, async (req, res) => {
  const newEmployeeData = req.body;
  try {
    const newEmployee = await EmpPersonal.create(newEmployeeData);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH (update) an employee by ID
router.patch("/update/:id", authToken, async (req, res) => {
  const { id } = req.params;
  const updatedEmployeeData = req.body;
  try {
    const employee = await EmpPersonal.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    await employee.update(updatedEmployeeData);
    res.json(employee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE an employee by ID
router.delete("/delete/:id", authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await EmpPersonal.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    await employee.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
