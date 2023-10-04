const express = require("express");
const router = express.Router();
const LeaveMaster = require("../model/LeaveMasterModel"); // Import your LeaveMaster model here
const jwt = require('jsonwebtoken'); // Import the jwt library

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

// GET route to retrieve all leave master records
router.get("/get", authToken, async (req, res) => {
  try {
    const leaveMasters = await LeaveMaster.findAll();
    res.json(leaveMasters);
  } catch (error) {
    console.error("Error fetching leave master records:", error);
    res.status(500).json({ error: "Failed to retrieve leave master records" });
  }
});

// GET route to retrieve a specific leave master record by ID
router.get("/get/:id", authToken, async (req, res) => {
  const leaveMasterId = req.params.id;
  try {
    const leaveMaster = await LeaveMaster.findByPk(leaveMasterId);
    if (leaveMaster) {
      res.json(leaveMaster);
    } else {
      res.status(404).json({ error: "Leave master record not found" });
    }
  } catch (error) {
    console.error("Error fetching leave master record:", error);
    res.status(500).json({ error: "Failed to retrieve leave master record" });
  }
});

// POST route to create a new leave master record
router.post("/add", authToken, async (req, res) => {
  try {
    const newLeaveMaster = await LeaveMaster.create(req.body);
    res.status(201).json(newLeaveMaster);
  } catch (error) {
    console.error("Error creating leave master record:", error);
    res.status(500).json({ error: "Failed to create leave master record" });
  }
});

// PATCH route to update an existing leave master record by ID
router.patch("/update/:id", authToken, async (req, res) => {
  const leaveMasterId = req.params.id;
  try {
    const updatedLeaveMaster = await LeaveMaster.findByPk(leaveMasterId);
    if (!updatedLeaveMaster) {
      return res.status(404).json({ error: "Leave master record not found" });
    }
    await updatedLeaveMaster.update(req.body);
    res.json(updatedLeaveMaster);
  } catch (error) {
    console.error("Error updating leave master record:", error);
    res.status(500).json({ error: "Failed to update leave master record" });
  }
});

// DELETE route to delete a leave master record by ID
router.delete("/delete/:id", authToken, async (req, res) => {
  const leaveMasterId = req.params.id;
  try {
    const deletedLeaveMaster = await LeaveMaster.findByPk(leaveMasterId);
    if (!deletedLeaveMaster) {
      return res.status(404).json({ error: "Leave master record not found" });
    }
    await deletedLeaveMaster.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting leave master record:", error);
    res.status(500).json({ error: "Failed to delete leave master record" });
  }
});

module.exports = router;
