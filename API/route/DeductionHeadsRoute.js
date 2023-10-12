const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const DeductionHeadsMaster = require('../model/DeductionHeadsModel');

// GET Route to retrieve all deduction head records
router.get('/get', async (req, res) => {
    try {
        const heads = await DeductionHeadsMaster.findAll(); // Retrieve all deduction head records
        res.status(200).json(heads); // Return the deduction head records as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        Sequelize.close()
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const DeductionHeadByID = await DeductionHeadsMaster.findByPk(req.params.id);

        if (!DeductionHeadByID) {
            return res.status(404).json({ error: 'Deduction head not found' });
        }

        res.status(200).json({ DeductionHeadByID });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        Sequelize.close()
    }
})

// POST Route to create a new deduction head record
router.post('/add', async (req, res) => {
    try {
        const newDeductionHeads = await DeductionHeadsMaster.create(req.body); // Create a new deduction head record based on the request body
        res.json(newDeductionHeads); // Return the newly created deduction head record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        Sequelize.close()
    }
});

// PATCH Route to update an existing deduction head record by ID
router.patch('/update/:id', async (req, res) => {
    const DeductionHeadID = req.params.id; // Get the deduction head record ID from the URL parameter
    try {
        const updatedDeductionHeads = await DeductionHeadsMaster.findByPk(DeductionHeadID);

        if (!updatedDeductionHeads) {
            return res.status(404).json({ error: 'deduction head record not found' });
        }

        await updatedDeductionHeads.update(req.body); // Update the deduction head record based on the request body
        res.json(updatedDeductionHeads); // Return the updated deduction head record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        Sequelize.close()
    }
});

// DELETE Route to delete an existing deduction head record by ID
router.delete('/delete/:id', async (req, res) => {
    const DeductionHeadID = req.params.id; // Get the deduction head record ID from the URL parameter
    try {
        const deletedDeductionHeads = await DeductionHeadsMaster.findByPk(DeductionHeadID);

        if (!deletedDeductionHeads) {
            return res.status(404).json({ error: 'deduction head record not found' });
        }

        await deletedDeductionHeads.destroy(); // Delete the deduction head record
        res.status(204).send(); // Respond with a status code indicating success with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        Sequelize.close()
    }
});

module.exports = router;
