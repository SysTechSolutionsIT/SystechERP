const express = require("express");
const CompanyConfig = require("../model/CompanyConfigModel"); // Import your CompanyConfig model here
const router = express.Router();

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

// GET route to retrieve all company configurations
router.get("/get",  async (req, res) => {
  try {
    const companyConfigs = await CompanyConfig.findAll();
    res.json(companyConfigs);
  } catch (error) {
    console.error("Error fetching company configurations:", error);
    res.status(500).json({ error: "Failed to fetch company configurations" });
  }
});

// GET route to retrieve a specific company configuration by ID
router.get("/get/:id",  async (req, res) => {
  const companyId = req.params.id;
  try {
    const companyConfig = await CompanyConfig.findByPk(companyId);
    if (companyConfig) {
      res.json(companyConfig);
    } else {
      res.status(404).json({ error: "Company configuration not found" });
    }
  } catch (error) {
    console.error("Error fetching company configuration:", error);
    res.status(500).json({ error: "Failed to fetch company configuration" });
  }
});

// POST route to create a new company configuration
router.post("/add",  async (req, res) => {
  const newCompanyConfig = req.body; // Assuming the request body contains the new configuration data
  try {
    const createdCompanyConfig = await CompanyConfig.create(newCompanyConfig);
    res.status(201).json(createdCompanyConfig);
  } catch (error) {
    console.error("Error creating company configuration:", error);
    res.status(500).json({ error: "Failed to create company configuration" });
  }
});

// PUT route to update an existing company configuration by ID
router.put("/update/:id",  async (req, res) => {
  const companyId = req.params.id;
  const updatedCompanyConfigData = req.body; // Assuming the request body contains the updated configuration data
  try {
    const [updatedRowCount] = await CompanyConfig.update(updatedCompanyConfigData, {
      where: { id: companyId },
    });
    if (updatedRowCount === 1) {
      res.status(200).json({ message: "Company configuration updated successfully" });
    } else {
      res.status(404).json({ error: "Company configuration not found" });
    }
  } catch (error) {
    console.error("Error updating company configuration:", error);
    res.status(500).json({ error: "Failed to update company configuration" });
  }
});

module.exports = router;
