const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const EarningHeadsMaster = require('../model/EarningHeadsModel');

// GET Route to retrieve all earning head records
router.get('/get', async (req, res) => {
    try {
        const heads = await EarningHeadsMaster.findAll(); // Retrieve all earning head records
        res.status(200).json(heads); // Return the earning head records as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const EarningHeadByID = await EarningHeadsMaster.findByPk(req.params.id);

        if (!EarningHeadByID) {
            return res.status(404).json({ error: 'Earning head not found' });
        }

        res.status(200).json({ EarningHeadByID });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// POST Route to create a new earning head record
router.post('/add', async (req, res) => {
    try {
        const newEarningHeads = await EarningHeadsMaster.create(req.body); // Create a new earning head record based on the request body
        res.json(newEarningHeads); // Return the newly created earning head record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PATCH Route to update an existing earning head record by ID
router.patch('/update/:id', async (req, res) => {
    const EarningHeadID = req.params.id; // Get the earning head record ID from the URL parameter
    try {
        const updatedEarningHeads = await EarningHeadsMaster.findByPk(EarningHeadID);

        if (!updatedEarningHeads) {
            return res.status(404).json({ error: 'earning head record not found' });
        }

        await updatedEarningHeads.update(req.body); // Update the earning head record based on the request body
        res.json(updatedEarningHeads); // Return the updated earning head record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE Route to delete an existing earning head record by ID
router.delete('/delete/:id', async (req, res) => {
    const EarningHeadID = req.params.id; // Get the earning head record ID from the URL parameter
    try {
        const deletedEarningHeads = await EarningHeadsMaster.findByPk(EarningHeadID);

        if (!deletedEarningHeads) {
            return res.status(404).json({ error: 'earning head record not found' });
        }

        await deletedEarningHeads.destroy(); // Delete the earning head record
        res.status(204).send(); // Respond with a status code indicating success with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
