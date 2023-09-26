const express = require('express');
const router = express.Router();
const EmpSalary = require('../model/EmpSalaryModel'); // Assuming your model is in the models directory

// GET all employees' salaries
router.get('/get', async (req, res) => {
  try {
    const salaries = await EmpSalary.findAll();
    res.status(200).json(salaries);
  } catch (error) {
    console.error("Error fetching employee salaries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET an employee's salary by ID
router.get('/get/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const salary = await EmpSalary.findByPk(id);
    if (!salary) {
      return res.status(404).json({ error: "Employee salary not found" });
    }
    res.status(200).json(salary);
  } catch (error) {
    console.error("Error fetching employee salary by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new employee's salary
router.post('/add', async (req, res) => {
  const newSalaryData = req.body;
  try {
    const newSalary = await EmpSalary.create(newSalaryData);
    res.status(201).json(newSalary);
  } catch (error) {
    console.error("Error creating employee salary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH (update) an employee's salary by ID
router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;
  const updatedSalaryData = req.body;
  try {
    const salary = await EmpSalary.findByPk(id);
    if (!salary) {
      return res.status(404).json({ error: "Employee salary not found" });
    }
    // Update the employee's salary data
    await salary.update(updatedSalaryData);
    res.status(200).json(salary);
  } catch (error) {
    console.error("Error updating employee salary by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE an employee's salary by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const salary = await EmpSalary.findByPk(id);
    if (!salary) {
      return res.status(404).json({ error: "Employee salary not found" });
    }
    // Delete the employee's salary
    await salary.destroy();
    res.status(204).end(); // 204 No Content status indicates successful deletion
  } catch (error) {
    console.error("Error deleting employee salary by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
