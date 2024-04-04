// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");
const multer = require("multer");
const path = require("path");

// Create an Express router
const router = express.Router();

// Middleware for JWT authentication
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

// Configure Sequelize with database connection details
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

// Define the MCompany model
const MCompany = sequelize.define("MCompany", {
  CompanyId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  CompanySectorId: DataTypes.STRING,
  CompanySector: DataTypes.STRING,
  CompanyName: DataTypes.STRING,
  ShortName: DataTypes.STRING,
  NatureOfBusiness: DataTypes.STRING,
  Logo: DataTypes.STRING,
  AcFlag: DataTypes.STRING,
  CreatedBy: DataTypes.STRING,
  CreatedByName: DataTypes.STRING,
  ModifiedBy: DataTypes.STRING,
  ModifiedByName: DataTypes.STRING,
  IUFlag: DataTypes.STRING,
  SingleCompany: DataTypes.STRING,
  CreatedOn: DataTypes.DATE,
  ModifiedOn: DataTypes.DATE,
  FieldId: DataTypes.STRING,
  FieldName: DataTypes.STRING,
});

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

MCompany.sync()
  .then(() => {
    console.log("MCaderwiseEarning model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MCaderwiseEarning model:", error);
  });

// GET endpoint to retrieve all companies
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const companies = await MCompany.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["CompanyId", "ASC"]],
    });
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve active companies
router.get("/FnShowActiveData", async (req, res) => {
  try {
    const companies = await MCompany.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["CompanyId", "ASC"]],
    });
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve a particular company by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
  const companyId = req.query.CompanyId;
  try {
    const companies = await MCompany.findOne({
      where: {
        CompanyId: companyId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["CompanyId", "ASC"]],
    });
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnGetLogo", authToken, async (req, res) => {
  const companyId = req.query.CompanyId;

  try {
    const company = await MCompany.findOne({
      where: {
        CompanyId: companyId,
      },
      attributes: ["Logo"],
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const logoData = company.Logo;

    if (!logoData) {
      return res
        .status(404)
        .json({ message: "Logo not found for the company" });
    }

    res.writeHead(200, {
      "Content-Type": "image/png", // Adjust content type based on your image type
      "Content-Length": logoData.length,
    });

    res.end(logoData);
  } catch (error) {
    console.error("Error retrieving logo:", error);
    res.status(500).send("Internal Server Error");
  }
});

const generateCompanyId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      const totalRecords = await MCompany.count();
      const newId = (totalRecords + 1).toString().padStart(5, "0");
      req.body.CompanyId = newId;
    }
    next();
  } catch (error) {
    console.error("Error generating CompanyId:", error);
    res.status(500).send("Internal Server Error");
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/company-logo");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  "/upload",
  authToken,
  upload.single("image"),
  authToken,
  async (req, res) => {
    try {
      const image = req.file.filename;
      // Update the record in the MCompany table using Sequelize
      await MCompany.update(
        { Logo: image },
        { where: { CompanyId: req.query.CompanyId } }
      );

      return res.json({ Message: "Success" });
    } catch (error) {
      console.error(error);
      return res.json({ Message: "Error" });
    }
  }
);

router.get("/get-upload", authToken, async (req, res) => {
  const companyId = req.query.CompanyId;
  try {
    const companies = await MCompany.findOne({
      where: {
        CompanyId: companyId,
      },
      attributes: ["Logo"],
      order: [["CompanyId", "ASC"]],
    });
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/FnAddUpdateDeleteRecord",
  generateCompanyId,
  authToken,
  async (req, res) => {
    const company = req.body;
    try {
      if (company.IUFlag === "D") {
        const result = await MCompany.update(
          { AcFlag: "N" },
          { where: { CompanyId: company.CompanyId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        const result = await MCompany.upsert(company, {
          returning: true,
        });

        res.json({
          message: result ? "Operation successful" : "Operation failed",
        });
      }
    } catch (error) {
      console.error("Error performing operation:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
