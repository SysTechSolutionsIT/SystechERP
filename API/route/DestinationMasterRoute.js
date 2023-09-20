const express = require('express');
const router = express.Router();
const DestinationMaster = require('../model/DestinationMasterModel');

// GET Route to retrieve all destination records
router.get('/', async (req, res) => {
    try {
        const destinations = await DestinationMaster.findAll(); // Retrieve all destination records
        res.status(200).json(destinations); // Return the destination records as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST Route to create a new destination record
router.post('/add-dest', async (req, res) => {
    try {
        const newDestination = await DestinationMaster.create(req.body); // Create a new destination record based on the request body
        res.json(newDestination); // Return the newly created destination record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PATCH Route to update an existing destination record by ID
router.patch('/update-dest/:id', async (req, res) => {
    const destinationId = req.params.id; // Get the destination record ID from the URL parameter
    try {
        const updatedDestination = await DestinationMaster.findByPk(destinationId);

        if (!updatedDestination) {
            return res.status(404).json({ error: 'destination record not found' });
        }

        await updatedDestination.update(req.body); // Update the destination record based on the request body
        res.json(updatedDestination); // Return the updated destination record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE Route to delete an existing destination record by ID
router.delete('/delete-dest/:id', async (req, res) => {
    const destinationId = req.params.id; // Get the destination record ID from the URL parameter
    try {
        const deletedDestination = await DestinationMaster.findByPk(destinationId);

        if (!deletedDestination) {
            return res.status(404).json({ error: 'destination record not found' });
        }

        await deletedDestination.destroy(); // Delete the destination record
        res.status(204).send(); // Respond with a status code indicating success with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
