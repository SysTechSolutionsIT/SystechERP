const express = require("express");
const router = express.Router();
const authorize = require('../Authorization')
const Company = require("../model/CMModel");

router.use(authorize)

router.post("/add", async (req, res) => {
  const newCompany = await Company.create({
    name: req.body.name,
    shortName: req.body.shortName,
    sectorDetails: req.body.sectorDetails,
    natureOfBusiness: req.body.natureOfBusiness,
    status: req.body.status,
    createdBy: req.body.createdBy,
    createdOn: new Date(),
    modifiedBy: req.body.modifiedBy,
    modifiedOn: new Date(),
  });

  res.status(201).json({
    message: "Company created successfully",
    company: newCompany,
  });
});

router.get("/", async (req, res) => {
  const companies = await Company.findAll();

  res.status(200).json({
    companies,
  });
});

router.get("/:id", async (req, res) => {
  const company = await Company.findByPk(req.params.id);

  res.status(200).json({
    company,
  });
});

router.put("/update/:id", async (req, res) => {
  const company = await Company.findByPk(req.params.id);

  if (!company) {
    return res.status(404).json({
      message: "Company not found",
    });
  }
  (company.name = req.body.name),
    (company.shortName = req.body.shortName),
    (company.sectorDetails = req.body.sectorDetails),
    (company.natureOfBusiness = req.body.natureOfBusiness),
    (company.status = req.body.status),
    (company.modifiedBy = req.body.modifiedBy);
  company.modifiedOn = new Date();

  await company.save();

  res.status(200).json({
    message: "Company updated successfully",
    company,
  });
});

router.delete("/delete/:id", async (req, res) => {
  const company = await Company.findByPk(req.params.id);

  if (!company) {
    return res.status(404).json({
      message: "Company not found",
    });
  }

  await company.destroy();

  res.status(200).json({
    message: "Company deleted successfully",
  });
});

module.exports = router;
