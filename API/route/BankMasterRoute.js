const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Import the jwt library
const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key
const BankMaster = require('../model/BankMasterModel'); // Import your BankMaster model

const authToken = (req, res, next) =>{
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// GET Route to retrieve all bank records
router.get('/banks', authToken, async (req, res) => {
  try {
    const banks = await BankMaster.findAll(); // Retrieve all bank records
    res.json(banks); // Return the bank records as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/banks/:id", authToken, async (req, res) => {
  try {
    const BankbyId = await BankMaster.findByPk(req.params.id);

    if (!BankbyId) {
      return res.status(404).json({ error: 'Bank record not found' });
    }

    res.status(200).json({ BankbyId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST Route to create a new bank record
router.post('/add-bank', authToken, async (req, res) => {
  try {
    const newBank = await BankMaster.create(req.body); // Create a new bank record based on the request body
    res.json(newBank); // Return the newly created bank record as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH Route to update an existing bank record by ID
router.patch('/update-bank/:id', authToken, async (req, res) => {
  const bankId = req.params.id; // Get the bank record ID from the URL parameter
  try {
    const updatedBank = await BankMaster.findByPk(bankId);

    if (!updatedBank) {
      return res.status(404).json({ error: 'Bank record not found' });
    }

    await updatedBank.update(req.body); // Update the bank record based on the request body
    res.json(updatedBank); // Return the updated bank record as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE Route to delete an existing bank record by ID
router.delete('/delete-bank/:id', authToken, async (req, res) => {
  const bankId = req.params.id; // Get the bank record ID from the URL parameter
  try {
    const deletedBank = await BankMaster.findByPk(bankId);

    if (!deletedBank) {
      return res.status(404).json({ error: 'Bank record not found' });
    }

    await deletedBank.destroy(); // Delete the bank record
    res.status(204).send(); // Respond with a status code indicating success with no content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
