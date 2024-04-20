const express = require("express");
const router = express.Router();
const KRA = require("../model/KRAModel"); // Assuming your model is exported as "KRA"
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

// GET all KRAs
router.get("/get", authToken, async (req, res) => {
  try {
    const kraList = await KRA.findAll();
    res.json(kraList);
  } catch (error) {
    console.error("Error fetching KRAs:", error);
    res.status(500).json({ error: "Failed to retrieve KRAs" });
  }
});

// GET KRA by ID
router.get("/get/:id", authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const kra = await KRA.findByPk(id);
    if (!kra) {
      res.status(404).json({ error: "KRA not found" });
    } else {
      res.json(kra);
    }
  } catch (error) {
    console.error("Error fetching KRA by ID:", error);
    res.status(500).json({ error: "Failed to retrieve KRA" });
  }
});

// POST a new KRA
router.post("/add", authToken, async (req, res) => {
  const { Name, Duration, Points, Status } = req.body;
  try {
    const newKRA = await KRA.create({ Name, Duration, Points, Status });
    res.status(201).json(newKRA);
  } catch (error) {
    console.error("Error creating KRA:", error);
    res.status(500).json({ error: "Failed to create KRA" });
  }
});

// PATCH (Update) KRA by ID
  router.patch("/update/:id", authToken, async (req, res) => {
  const { id } = req.params;
  const { Name, Duration, Points, Status } = req.body;
  try {
    const kra = await KRA.findByPk(id);
    if (!kra) {
      res.status(404).json({ error: "KRA not found" });
    } else {
      // Update the KRA attributes
      kra.Name = Name;
      kra.Duration = Duration;
      kra.Points = Points;
      kra.Status = Status;

      // Submit the updated KRA
      await kra.save();

      res.json(kra);
    }
  } catch (error) {
    console.error("Error updating KRA by ID:", error);
    res.status(500).json({ error: "Failed to update KRA" });
  }
});

// DELETE KRA by ID
router.delete("/delete/:id", authToken, async (req, res) => {
  const { id } = req.params;
  try {
    const kra = await KRA.findByPk(id);
    if (!kra) {
      res.status(404).json({ error: "KRA not found" });
    } else {
      // Delete the KRA
      await kra.destroy();
      res.status(204).send(); // No content (successful deletion)
    }
  } catch (error) {
    console.error("Error deleting KRA by ID:", error);
    res.status(500).json({ error: "Failed to delete KRA" });
  }
});

module.exports = router;
