const express = require('express');
const router = express.Router();
const Designation  = require('../model/DesignationModel'); // Assuming your model file is in the same directory
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

// GET all Designations
router.get('/get', authToken, async (req, res) => {
  try {
    const designations = await Designation.findAll();
    res.json(designations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Designations' });
  }
});

// GET Designation by ID
router.get('/get/:id', authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const designation = await Designation.findByPk(id);
    if (!designation) {
      res.status(404).json({ error: 'Designation not found' });
    } else {
      res.json(designation);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Designation' });
  }
});

// POST a new Designation
router.post('/add', authToken, async (req, res) => {
  try {
    const newDesignation = await Designation.create(req.body);
    res.status(201).json(newDesignation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Designation' });
  }
});

// PATCH Designation by ID
router.patch('/update/:id', authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedDesignations] = await Designation.update(req.body, {
      where: { id },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'Designation not found' });
    } else {
      res.json(updatedDesignations[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Designation' });
  }
});

// DELETE Designation by ID
router.delete('/delete/:id', authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Designation.destroy({
      where: { id },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Designation not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Designation' });
  }
});

module.exports = router;
