const express = require("express");
const router = express.Router();
const AttMaster = require("../model/AttendanceMasterModel"); // Import your AttMaster model
const jwt = require("jsonwebtoken"); // Import the jwt library

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// GET Route to retrieve all bank records
router.get("/", authToken, async (req, res) => {
  const records = await AttMaster.findAll(); // Retrieve all bank records

  res.status(200).json({
    records,
  });
});
router.get("/:id", authToken, async (req, res) => {
  const record = await AttMaster.findByPk(req.params.id);

  res.status(200).json({
    record,
  });
});

// POST Route to create a new bank record
router.post("/add-record", authToken, async (req, res) => {
  try {
    const newRecord = await AttMaster.create(req.body); // Create a new bank record based on the request body
    res.json(newRecord); // Return the newly created bank record as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH Route to update an existing bank record by ID
router.patch("/update-record/:id", authToken, async (req, res) => {
  const DeviceId = req.params.id; // Get the bank record ID from the URL parameter
  try {
    const updatedRecord = await AttMaster.findByPk(DeviceId);

    if (!updatedRecord) {
      return res.status(404).json({ error: "Record record not found" });
    }

    await updatedRecord.update(req.body); // Update the Record record based on the request body
    res.json(updatedRecord); // Return the updated bank record as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE Route to delete an existing bank record by ID
router.delete("/delete-record/:id", authToken, async (req, res) => {
  const bankId = req.params.id; // Get the bank record ID from the URL parameter
  try {
    const deleteRecord = await AttMaster.findByPk(bankId);

    if (!deleteRecord) {
      return res.status(404).json({ error: "Bank record not found" });
    }

    await deleteRecord.destroy(); // Delete the bank record
    res.status(204).send(); // Respond with a status code indicating success with no content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
