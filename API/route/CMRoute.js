const express = require("express");
const router = express.Router();
const Company = require("../model/CMModel");
const multer = require("multer");
const path = require("path");
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where files will be stored
    const uploadDir = path.join(__dirname, "..", "uploads"); // Go up one directory to reach the 'uploads' folder
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Set the file name for the uploaded file (you can customize this)
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }); // Create the upload object

// router.use(authorize)

router.post("/add", upload.single("logo"), async (req, res) => {
  try {
    if (req.file) {
      // Create a new Company record with the file path
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
        logo: req.file.path, // Store the file path in the 'logo' column
        logoName: req.file.originalname, // Store the original file name
        singleBranch: req.body.singleBranch,
      });

      res.status(201).json(newCompany);
    } else {
      // Handle the case where the file upload failed
      res.status(500).json({ error: "File upload failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put(
  "/update/:id",

  upload.single("logo"),
  async (req, res) => {
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
    company.logo = req.body.logo; // Store the file path in the 'logo' column
    company.singleBranch = req.body.singleBranch;

    await company.save();

    res.status(200).json({
      message: "Company updated successfully",
      company,
    });
  }
);

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
