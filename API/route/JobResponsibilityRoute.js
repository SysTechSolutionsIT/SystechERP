const express = require("express");
const router = express.Router();
const JobResponsibilityModel  = require("../model/JobResponsibilityModel"); // Assuming your model is exported as "JobResponsibilityModel"

// GET all Job Responsibilities
router.get("/get", async (req, res) => {
  try {
    const jobResponsibilities = await JobResponsibilityModel.findAll();
    res.json(jobResponsibilities);
  } catch (error) {
    console.error("Error fetching Job Responsibilities:", error);
    res.status(500).json({ error: "Failed to retrieve Job Responsibilities" });
  }
});

// GET Job Responsibility by ID
router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const jobResponsibility = await JobResponsibilityModel.findByPk(id);
    if (!jobResponsibility) {
      res.status(404).json({ error: "Job Responsibility not found" });
    } else {
      res.json(jobResponsibility);
    }
  } catch (error) {
    console.error("Error fetching Job Responsibility by ID:", error);
    res.status(500).json({ error: "Failed to retrieve Job Responsibility" });
  }
});

// POST a new Job Responsibility
router.post("/add", async (req, res) => {
  const { Name, Duration, Points, Status } = req.body;
  try {
    const newJobResponsibility = await JobResponsibilityModel.create({
      Name,
      Duration,
      Points,
      Status,
    });
    res.status(201).json(newJobResponsibility);
  } catch (error) {
    console.error("Error creating Job Responsibility:", error);
    res.status(500).json({ error: "Failed to create Job Responsibility" });
  }
});

// PATCH (Update) Job Responsibility by ID
router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { Name, Duration, Points, Status } = req.body;
  try {
    const jobResponsibility = await JobResponsibilityModel.findByPk(id);
    if (!jobResponsibility) {
      res.status(404).json({ error: "Job Responsibility not found" });
    } else {
      // Update the Job Responsibility attributes
      jobResponsibility.Name = Name;
      jobResponsibility.Duration = Duration;
      jobResponsibility.Points = Points;
      jobResponsibility.Status = Status;

      // Save the updated Job Responsibility
      await jobResponsibility.save();

      res.json(jobResponsibility);
    }
  } catch (error) {
    console.error("Error updating Job Responsibility by ID:", error);
    res.status(500).json({ error: "Failed to update Job Responsibility" });
  }
});

// DELETE Job Responsibility by ID
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const jobResponsibility = await JobResponsibilityModel.findByPk(id);
    if (!jobResponsibility) {
      res.status(404).json({ error: "Job Responsibility not found" });
    } else {
      // Delete the Job Responsibility
      await jobResponsibility.destroy();
      res.status(204).send(); // No content (successful deletion)
    }
  } catch (error) {
    console.error("Error deleting Job Responsibility by ID:", error);
    res.status(500).json({ error: "Failed to delete Job Responsibility" });
  }
});

module.exports = router;
