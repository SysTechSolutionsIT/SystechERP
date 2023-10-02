const express = require('express');
const router = express.Router();
const EmpGrade = require('../model/EmployeeGradeModel'); // Assuming your model file is in the same directory
const jwt = require('jsonwebtoken'); // Import the jwt library

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
// GET all EmpGrades
router.get('/get', authToken, async (req, res) => {
  try {
    const empGrades = await EmpGrade.findAll();
    res.json(empGrades);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve EmpGrades' });
  }
});

// GET EmpGrade by ID
router.get('/get/:id', authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const empGrade = await EmpGrade.findByPk(id);
    if (!empGrade) {
      res.status(404).json({ error: 'EmpGrade not found' });
    } else {
      res.json(empGrade);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve EmpGrade' });
  }
});

// POST a new EmpGrade
router.post('/add', authToken, async (req, res) => {
  try {
    const newEmpGrade = await EmpGrade.create(req.body);
    res.status(201).json(newEmpGrade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create EmpGrade' });
  }
});

// PATCH EmpGrade by ID
router.patch('/update/:id', authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedEmpGrades] = await EmpGrade.update(req.body, {
      where: { id },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'EmpGrade not found' });
    } else {
      res.json(updatedEmpGrades[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update EmpGrade' });
  }
});

// DELETE EmpGrade by ID
router.delete('/delete/:id', authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await EmpGrade.destroy({
      where: { id },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'EmpGrade not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete EmpGrade' });
  }
});

module.exports = router;
