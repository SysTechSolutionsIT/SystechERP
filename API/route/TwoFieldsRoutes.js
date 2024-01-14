const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const TwoFieldMaster = require('../model/TwoFieldsModel');

// GET Route to retrieve all two field records
router.get('/', async (req, res) => {
    try {
        const fields = await TwoFieldMaster.findAll(); // Retrieve all two field records
        res.status(200).json(fields); // Return the two field records as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const FieldByID = await TwoFieldMaster.findByPk(req.params.id);

        if (!FieldByID) {
            return res.status(404).json({ error: 'Field not found' });
        }

        res.status(200).json({ FieldByID });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// POST Route to create a new two field record
router.post('/add', async (req, res) => {
    try {
        const newField = await TwoFieldMaster.create(req.body); // Create a new two field record based on the request body
        res.json(newField); // Return the newly created two field record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PATCH Route to update an existing two field record by ID
router.patch('/update/:id', async (req, res) => {
    const fieldId = req.params.id; // Get the two field record ID from the URL parameter
    try {
        const updatedField = await TwoFieldMaster.findByPk(fieldId);

        if (!updatedField) {
            return res.status(404).json({ error: 'two field record not found' });
        }

        await updatedField.update(req.body); // Update the two field record based on the request body
        res.json(updatedField); // Return the updated two field record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE Route to delete an existing two field record by ID
router.delete('/delete/:id', async (req, res) => {
    const fieldId = req.params.id; // Get the two field record ID from the URL parameter
    try {
        const deletedField = await TwoFieldMaster.findByPk(fieldId);

        if (!deletedField) {
            return res.status(404).json({ error: 'two field record not found' });
        }

        await deletedField.destroy(); // Delete the two field record
        res.status(204).send(); // Respond with a status code indicating success with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
