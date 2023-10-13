const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const EDImports = require('../model/EDImportsModel');

// GET Route to retrieve all ED Import records
router.get('/get', async (req, res) => {
    try {
        const imports = await EDImports.findAll(); // Retrieve all ED Import records
        res.status(200).json(imports); // Return the ED Import records as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const ImportByID = await EDImports.findByPk(req.params.id);

        if (!ImportByID) {
            return res.status(404).json({ error: 'ED import not found' });
        }

        res.status(200).json({ ImportByID });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// POST Route to create a new ED import record
router.post('/add', async (req, res) => {
    try {
        const newEDImports = await EDImports.create(req.body); // Create a new ED Import record based on the request body
        res.json(newEDImports); // Return the newly created ED Import record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PATCH Route to update an existing ED Import record by ID
router.patch('/update/:id', async (req, res) => {
    const taxId = req.params.id; // Get the ED Import record ID from the URL parameter
    try {
        const updatedEDImports = await EDImports.findByPk(taxId);

        if (!updatedEDImports) {
            return res.status(404).json({ error: 'ED Import record not found' });
        }

        await updatedEDImports.update(req.body); // Update the ED Import record based on the request body
        res.json(updatedEDImports); // Return the updated ED Import record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE Route to delete an existing ED Import record by ID
router.delete('/delete/:id', async (req, res) => {
    const taxId = req.params.id; // Get the ED Import record ID from the URL parameter
    try {
        const deletedEDImports = await EDImports.findByPk(taxId);

        if (!deletedEDImports) {
            return res.status(404).json({ error: 'ED Import record not found' });
        }

        await deletedEDImports.taxroy(); // Delete the ED Import record
        res.status(204).send(); // Respond with a status code indicating success with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
