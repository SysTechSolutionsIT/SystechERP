const express = require("express");
const router = express.Router();
const CCMaster = require("../model/CostCenterModel"); // Import your CCMaster model

const jwt = require("jsonwebtoken"); // Import the jwt library
const secretKey = process.env.SECRET_KEY; // Replace with your actual secret key

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
  const records = await CCMaster.findAll(); // Retrieve all bank records

  res.status(200).json({
    records,
  });
});
router.get("/:id", async (req, res) => {
  const record = await CCMaster.findByPk(req.params.id);

  res.status(200).json({
    record,
  });
});

// POST Route to create a new bank record
router.post("/add-record", authToken, async (req, res) => {
  try {
    const newRecord = await CCMaster.create(req.body); // Create a new bank record based on the request body
    res.json(newRecord); // Return the newly created bank record as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/update-cost-center/:id", authToken, async (req, res) => {
  const costCenterId = req.params.id;

  try {
    // Find the existing cost center record by ID
    const costCenter = await CostCenter.findByPk(costCenterId);

    if (!costCenter) {
      return res.status(404).json({ error: "Cost center not found" });
    }

    // Extract the fields that need to be updated from the request body
    const { cName, cRemarks, status } = req.body;

    // Update the cost center fields with new values (if provided)
    if (cName !== undefined) {
      costCenter.cName = cName;
    }
    if (cRemarks !== undefined) {
      costCenter.cRemarks = cRemarks;
    }
    if (status !== undefined) {
      costCenter.status = status;
    }

    // Save the updated cost center record
    await costCenter.save();

    // Return the updated cost center record as a response
    res.json(costCenter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE Route to delete an existing bank record by ID
router.delete("/delete-record/:id", authToken, async (req, res) => {
  const CID = req.params.id; // Get the bank record ID from the URL parameter
  try {
    const deleteRecord = await CCMaster.findByPk(CID);

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
