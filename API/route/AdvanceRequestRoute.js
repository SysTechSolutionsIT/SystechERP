const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AdvanceRequest = require('../model/AdvanceRequestModel');

// GET Route to retrieve all advance request records
router.get('/get', async (req, res) => {
    try {
        const taxes = await AdvanceRequest.findAll(); // Retrieve all advance request records
        res.status(200).json(taxes); // Return the advance request records as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const RequestByID = await AdvanceRequest.findByPk(req.params.id);

        if (!RequestByID) {
            return res.status(404).json({ error: 'Professional Tax not found' });
        }

        res.status(200).json({ RequestByID });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// POST Route to create a new advance request record
router.post('/add', async (req, res) => {
    try {
        const newAdvanceRequest = await AdvanceRequest.create(req.body); // Create a new advance request record based on the request body
        res.json(newAdvanceRequest); // Return the newly created advance request record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PATCH Route to update an existing advance request record by ID
router.patch('/update/:id', async (req, res) => {
    const taxId = req.params.id; // Get the advance request record ID from the URL parameter
    try {
        const updatedAdvanceRequest = await AdvanceRequest.findByPk(taxId);

        if (!updatedAdvanceRequest) {
            return res.status(404).json({ error: 'advance request record not found' });
        }

        await updatedAdvanceRequest.update(req.body); // Update the advance request record based on the request body
        res.json(updatedAdvanceRequest); // Return the updated advance request record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE Route to delete an existing advance request record by ID
router.delete('/delete/:id', async (req, res) => {
    const taxId = req.params.id; // Get the advance request record ID from the URL parameter
    try {
        const deletedAdvanceRequest = await AdvanceRequest.findByPk(taxId);

        if (!deletedAdvanceRequest) {
            return res.status(404).json({ error: 'advance request record not found' });
        }

        await deletedAdvanceRequest.taxroy(); // Delete the advance request record
        res.status(204).send(); // Respond with a status code indicating success with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
