const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ThreeFieldMaster = require('../model/ThreeFieldsModel');

// GET Route to retrieve all three field records
router.get('/', async (req, res) => {
    try {
        const fields = await ThreeFieldMaster.findAll(); // Retrieve all three field records
        res.status(200).json(fields); // Return the three field records as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const FieldByID = await ThreeFieldMaster.findByPk(req.params.id);

        if (!FieldByID) {
            return res.status(404).json({ error: 'Field not found' });
        }

        res.status(200).json({ FieldByID });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// POST Route to create a new three field record
router.post('/add', async (req, res) => {
    try {
        const newField = await ThreeFieldMaster.create(req.body); // Create a new three field record based on the request body
        res.json(newField); // Return the newly created three field record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PATCH Route to update an existing three field record by ID
router.patch('/update/:id', async (req, res) => {
    const fieldId = req.params.id; // Get the three field record ID from the URL parameter
    try {
        const updatedField = await ThreeFieldMaster.findByPk(fieldId);

        if (!updatedField) {
            return res.status(404).json({ error: 'three field record not found' });
        }

        await updatedField.update(req.body); // Update the three field record based on the request body
        res.json(updatedField); // Return the updated three field record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE Route to delete an existing three field record by ID
router.delete('/delete/:id', async (req, res) => {
    const fieldId = req.params.id; // Get the three field record ID from the URL parameter
    try {
        const deletedField = await ThreeFieldMaster.findByPk(fieldId);

        if (!deletedField) {
            return res.status(404).json({ error: 'three field record not found' });
        }

        await deletedField.destroy(); // Delete the three field record
        res.status(204).send(); // Respond with a status code indicating success with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
