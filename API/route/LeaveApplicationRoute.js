const express = require("express");
const router = express.Router();
const LeaveApplication = require("../model/LeaveApplicationModel"); // Import your LeaveApplication model here
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

// GET route to retrieve all leave applications
router.get("/get", authToken, async (req, res) => {
  try {
    const leaveApplications = await LeaveApplication.findAll();
    res.json(leaveApplications);
  } catch (error) {
    console.error("Error fetching leave applications:", error);
    res.status(500).json({ error: "Failed to retrieve leave applications" });
  }
});

// GET route to retrieve a specific leave application by ID
router.get("/get/:id", authToken, async (req, res) => {
  const leaveApplicationId = req.params.id;
  try {
    const leaveApplication = await LeaveApplication.findByPk(leaveApplicationId);
    if (leaveApplication) {
      res.json(leaveApplication);
    } else {
      res.status(404).json({ error: "Leave application not found" });
    }
  } catch (error) {
    console.error("Error fetching leave application:", error);
    res.status(500).json({ error: "Failed to retrieve leave application" });
  }
});

// POST route to create a new leave application
router.post("/add", authToken, async (req, res) => {
  try {
    const newLeaveApplication = await LeaveApplication.create(req.body);
    res.status(201).json(newLeaveApplication);
  } catch (error) {
    console.error("Error creating leave application:", error);
    res.status(500).json({ error: "Failed to create leave application" });
  }
});

// PATCH route to update an existing leave application by ID
router.patch("/update/:id", authToken, async (req, res) => {
  const leaveApplicationId = req.params.id;
  try {
    const updatedLeaveApplication = await LeaveApplication.findByPk(leaveApplicationId);
    if (!updatedLeaveApplication) {
      return res.status(404).json({ error: "Leave application not found" });
    }
    await updatedLeaveApplication.update(req.body);
    res.json(updatedLeaveApplication);
  } catch (error) {
    console.error("Error updating leave application:", error);
    res.status(500).json({ error: "Failed to update leave application" });
  }
});

// DELETE route to delete a leave application by ID
router.delete("/delete/:id", authToken, async (req, res) => {
  const leaveApplicationId = req.params.id;
  try {
    const deletedLeaveApplication = await LeaveApplication.findByPk(leaveApplicationId);
    if (!deletedLeaveApplication) {
      return res.status(404).json({ error: "Leave application not found" });
    }
    await deletedLeaveApplication.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting leave application:", error);
    res.status(500).json({ error: "Failed to delete leave application" });
  }
});

module.exports = router;
