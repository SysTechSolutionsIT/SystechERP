const express = require('express');
const router = express.Router();
const EmpAcademic = require('../model/EmpAcademicModel'); 

router.get('/get', async (req, res) => {
    try {
        const empAcademics = await EmpAcademic.findAll();
        res.status(200).json(empAcademics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/get/:id', async (req, res) => {
    const empAcademicId = req.params.id;
  
    try {
        const empAcademicInstance = await EmpAcademic.findByPk(empAcademicId);
  
        if (!empAcademicInstance) {
            return res.status(404).json({ message: 'EmpAcademic not found' });
        }
  
        res.status(200).json(empAcademicInstance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST
router.post('/add', async (req, res) => {
    try {
        const empAcademicData = req.body;
        const createdEmpAcademic = await EmpAcademic.create(empAcademicData);
        res.status(201).json(createdEmpAcademic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PATCH by ID
router.patch('/update/:id', async (req, res) => {
    const empAcademicId = req.params.id;
  
    try {
        const [updated] = await EmpAcademic.update(req.body, {
            where: { id: empAcademicId },
        });
  
        if (updated === 0) {
            return res.status(404).json({ message: 'EmpAcademic not found' });
        }
  
        const updatedEmpAcademic = await EmpAcademic.findByPk(empAcademicId);
        res.status(200).json(updatedEmpAcademic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE by ID
router.delete('/delete/:id', async (req, res) => {
    const empAcademicId = req.params.id;
  
    try {
        const empAcademicInstance = await EmpAcademic.findByPk(empAcademicId);
  
        if (!empAcademicInstance) {
            return res.status(404).json({ message: 'EmpAcademic not found' });
        }
  
        await empAcademicInstance.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
