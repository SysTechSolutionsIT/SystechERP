const express = require("express");
const router = express.Router();
const ShiftMaster = require("../model/ShiftMasterModel"); // Import your ShiftMaster model
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

// GET all ShiftMaster records
router.get("/", authToken, async (req, res) => {
  try {
    const shiftMasters = await ShiftMaster.findAll();
    res.json(shiftMasters);
  } catch (error) {
    console.error("Error fetching ShiftMaster records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new ShiftMaster record
router.post("/add", authToken, async (req, res) => {
  try {
    const newShiftMaster = await ShiftMaster.create(req.body);
    res.status(201).json(newShiftMaster);
  } catch (error) {
    console.error("Error creating ShiftMaster record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH (update) an existing ShiftMaster record by ID
router.patch("/update/:id", authToken, async (req, res) => {
  const id = req.params.id;
  try {
    const updatedShiftMaster = await ShiftMaster.update(req.body, {
      where: { sID: id },
    });
    if (updatedShiftMaster[0] === 1) {
      res
        .status(200)
        .json({ message: "ShiftMaster record updated successfully" });
    } else {
      res.status(404).json({ error: "ShiftMaster record not found" });
    }
  } catch (error) {
    console.error("Error updating ShiftMaster record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a ShiftMaster record by ID
router.delete("/delete/:id", authToken, async (req, res) => {
  const id = req.params.id;
  try {
    const deletedShiftMasterCount = await ShiftMaster.destroy({
      where: { sID: id },
    });
    if (deletedShiftMasterCount === 1) {
      res
        .status(200)
        .json({ message: "ShiftMaster record deleted successfully" });
    } else {
      res.status(404).json({ error: "ShiftMaster record not found" });
    }
  } catch (error) {
    console.error("Error deleting ShiftMaster record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
