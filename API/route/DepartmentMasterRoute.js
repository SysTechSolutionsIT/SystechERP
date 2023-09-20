const express = require('express');
const router = express.Router();
const DepartmentMaster = require('../model/DepartmentMasterModel'); // Import your DepartmentMaster model

// GET Route to retrieve all department records
router.get('/get', async (req, res) => {
  try {
    const departments = await DepartmentMaster.findAll(); // Retrieve all department records
    res.json(departments); // Return the department records as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET Route to retrieve a department record by ID
router.get('/get/:id', async (req, res) => {
  try {
    const department = await DepartmentMaster.findByPk(req.params.id); // Retrieve a department record by ID
    if (department) {
      res.json(department); // Return the department record as JSON if found
    } else {
      res.status(404).json({ error: 'Department not found' }); // Return a 404 error if the department is not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// POST Route to create a new department record
router.post('/add-dept', async (req, res) => {
  try {
    const newDepartment = await DepartmentMaster.create(req.body); // Create a new department record based on the request body
    res.json(newDepartment); // Return the newly created department record as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH Route to update an existing department record by ID
router.patch('/update-dept/:id', async (req, res) => {
  const departmentId = req.params.id; // Get the department record ID from the URL parameter
  try {
    const updatedDepartment = await DepartmentMaster.findByPk(departmentId);

    if (!updatedDepartment) {
      return res.status(404).json({ error: 'Department record not found' });
    }

    await updatedDepartment.update(req.body); // Update the department record based on the request body
    res.json(updatedDepartment); // Return the updated department record as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE Route to delete an existing department record by ID
router.delete('/delete-dept/:id', async (req, res) => {
  const departmentId = req.params.id; // Get the department record ID from the URL parameter
  try {
    const deletedDepartment = await DepartmentMaster.findByPk(departmentId);

    if (!deletedDepartment) {
      return res.status(404).json({ error: 'Department record not found' });
    }

    await deletedDepartment.destroy(); // Delete the department record
    res.status(204).send(); // Respond with a status code indicating success with no content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
