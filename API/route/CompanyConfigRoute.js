const express = require('express');
const router = express.Router();
const CompanyConfig = require('../model/CompanyConfigModel'); // Import your CompanyConfig model

// GET Route to retrieve all company configurations
router.get('/', async (req, res) => {
  try {
    const companyConfigs = await CompanyConfig.findAll(); // Retrieve all company configurations
    res.json(companyConfigs); // Return the company configurations as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// POST Route to create a new company configuration
router.post('/update', async (req, res) => {
  try {
    const newCompanyConfig = await CompanyConfig.create(req.body); // Create a new company configuration based on the request body
    res.json(newCompanyConfig); // Return the newly created company configuration as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH Route to update an existing company configuration by ID
router.patch('/update/:id', async (req, res) => {
  const companyId = req.params.id; // Get the company configuration ID from the URL parameter
  try {
    const updatedCompanyConfig = await CompanyConfig.findByPk(companyId);
    
    if (!updatedCompanyConfig) {
      return res.status(404).json({ error: 'Company configuration not found' });
    }

    await updatedCompanyConfig.update(req.body); // Update the company configuration based on the request body
    res.json(updatedCompanyConfig); // Return the updated company configuration as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
