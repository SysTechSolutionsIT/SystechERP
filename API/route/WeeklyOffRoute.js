const express = require("express");
const router = express.Router();
const WeekMaster = require("../model/WeeklyOffModel"); // Import your WeekMaster model
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

// GET all WeekMaster records
router.get("/get", authToken, async (req, res) => {
  try {
    const WeekMasters = await WeekMaster.findAll();
    res.json(WeekMasters);
  } catch (error) {
    console.error("Error fetching WeekMaster records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/:id", authToken, async (req, res) => {
  const record = await WeekMaster.findByPk(req.params.id);

  res.status(200).json({
    record,
  });
});

// POST a new WeekMaster record
router.post("/add", authToken, async (req, res) => {
  try {
    const newWeekMaster = await WeekMaster.create(req.body);
    res.status(201).json(newWeekMaster);
  } catch (error) {
    console.error("Error creating WeekMaster record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH (update) an existing WeekMaster record by ID
router.patch("/update/:id", authToken, async (req, res) => {
  const id = req.params.id;
  try {
    const updatedWeekMaster = await WeekMaster.update(req.body, {
      where: { weekID: id },
    });
    if (updatedWeekMaster[0] === 1) {
      res
        .status(200)
        .json({ message: "WeekMaster record updated successfully" });
    } else {
      res.status(404).json({ error: "WeekMaster record not found" });
    }
  } catch (error) {
    console.error("Error updating WeekMaster record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a WeekMaster record by ID
router.delete("/delete/:id", authToken, async (req, res) => {
  const id = req.params.id;
  try {
    const deletedWeekMasterCount = await WeekMaster.destroy({
      where: { weekID: id },
    });
    if (deletedWeekMasterCount === 1) {
      res
        .status(200)
        .json({ message: "WeekMaster record deleted successfully" });
    } else {
      res.status(404).json({ error: "WeekMaster record not found" });
    }
  } catch (error) {
    console.error("Error deleting WeekMaster record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
