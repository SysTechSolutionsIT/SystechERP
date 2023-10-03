const express = require("express");
const router = express.Router();
const JobMaster = require("../model/JobMasterModel");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

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

router.get("/", authToken, async (req, res) => {
  try {
    const jobs = await JobMaster.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve Job Master data" });
  }
});

router.post("/add", authToken, async (req, res) => {
  try {
    const newRecord = await JobMaster.create(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Job Record" });
  }
});

router.get("/get/:id", authToken, async (req, res) => {
  try {
    const record = await JobMaster.findByPk(req.params.id);
    if (!record) {
      res.status(404).json({ error: "Record not found" });
    } else {
      res.json(record);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve Record" });
  }
});

router.patch("/update/:id", authToken, async (req, res) => {
  const ID = req.params.id;
  try {
    const updated = await JobMaster.findByPk(ID);

    if (!updated) {
      return res.status(404).json({ error: "record not found" });
    }

    await updated.update(req.body);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE EmployeeType by ID
router.delete("/delte/:id", authToken, async (req, res) => {
  const ID = req.params.id; // Get the bank record ID from the URL parameter
  try {
    const deleted = await JobMaster.findByPk(ID);

    if (!deleted) {
      return res.status(404).json({ error: "record not found" });
    }

    await deleted.destroy(); // Delete the bank record
    res.status(204).send(); // Respond with a status code indicating success with no content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
