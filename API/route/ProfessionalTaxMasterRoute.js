const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ProfessionalTaxMaster = require('../model/ProfessionalTaxMasterModel');

// GET Route to retrieve all professional tax records
router.get('/get', async (req, res) => {
    try {
        const taxes = await ProfessionalTaxMaster.findAll(); // Retrieve all professional tax records
        res.status(200).json(taxes); // Return the professional tax records as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const TaxByID = await ProfessionalTaxMaster.findByPk(req.params.id);

        if (!TaxByID) {
            return res.status(404).json({ error: 'Professional Tax not found' });
        }

        res.status(200).json({ TaxByID });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// POST Route to create a new professional tax record
router.post('/add', async (req, res) => {
    try {
        const newProfessionalTax = await ProfessionalTaxMaster.create(req.body); // Create a new professional tax record based on the request body
        res.json(newProfessionalTax); // Return the newly created professional tax record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PATCH Route to update an existing professional tax record by ID
router.patch('/update/:id', async (req, res) => {
    const taxId = req.params.id; // Get the professional tax record ID from the URL parameter
    try {
        const updatedProfessionalTax = await ProfessionalTaxMaster.findByPk(taxId);

        if (!updatedProfessionalTax) {
            return res.status(404).json({ error: 'professional tax record not found' });
        }

        await updatedProfessionalTax.update(req.body); // Update the professional tax record based on the request body
        res.json(updatedProfessionalTax); // Return the updated professional tax record as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE Route to delete an existing professional tax record by ID
router.delete('/delete/:id', async (req, res) => {
    const taxId = req.params.id; // Get the professional tax record ID from the URL parameter
    try {
        const deletedProfessionalTax = await ProfessionalTaxMaster.findByPk(taxId);

        if (!deletedProfessionalTax) {
            return res.status(404).json({ error: 'professional tax record not found' });
        }

        await deletedProfessionalTax.taxroy(); // Delete the professional tax record
        res.status(204).send(); // Respond with a status code indicating success with no content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
