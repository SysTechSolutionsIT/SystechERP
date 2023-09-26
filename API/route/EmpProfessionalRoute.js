const express = require('express');
const router = express.Router();
const EmpProfessional = require('../model/EmpProfessionalModel'); // Import the EmpProfessional model

// GET by ID
router.get('/get/:id', async (req, res) => {
  const empProfessionalId = req.params.id;

  try {
    const empProfessional = await EmpProfessional.findByPk(empProfessionalId);
    
    if (!empProfessional) {
      return res.status(404).json({ message: 'EmpProfessional not found' });
    }

    res.status(200).json(empProfessional);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST
router.post('/add', async (req, res) => {
  try {
    const empProfessional = await EmpProfessional.create(req.body);
    res.status(201).json(empProfessional);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PATCH
router.patch('/update/:id', async (req, res) => {
  const empProfessionalId = req.params.id;

  try {
    const [updated] = await EmpProfessional.update(req.body, {
      where: { id: empProfessionalId },
    });

    if (updated === 0) {
      return res.status(404).json({ message: 'EmpProfessional not found' });
    }

    const updatedEmpProfessional = await EmpProfessional.findByPk(empProfessionalId);
    res.status(200).json(updatedEmpProfessional);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
  const empProfessionalId = req.params.id;

  try {
    const empProfessional = await EmpProfessional.findByPk(empProfessionalId);

    if (!empProfessional) {
      return res.status(404).json({ message: 'EmpProfessional not found' });
    }

    await empProfessional.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
