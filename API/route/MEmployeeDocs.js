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

// Define the MEmpDocs model
const MEmpDocs = sequelize.define("MEmpDocs", {
  CompanyId: {
    type: DataTypes.STRING(5),
    allowNull: false,
    defaultValue: "00001",
  },
  BranchId: {
    type: DataTypes.STRING(5),
    allowNull: false,
    defaultValue: "00001",
  },
  EmployeeId: {
    type: DataTypes.INTEGER(5),
    allowNull: false,
  },
  DocId: {
    type: DataTypes.INTEGER(5),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Document: DataTypes.STRING,
  DocumentName: DataTypes.STRING,
  IUFlag: DataTypes.STRING,
  Remarks: DataTypes.STRING,
  CreatedOn: DataTypes.DATE,
  ModifiedOn: DataTypes.DATE,
});

// Middleware for parsing JSON
router.use(bodyParser.json());

sequelize.sync();
// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// GET endpoint to retrieve all companies
router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const companies = await MEmpDocs.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve active companies
// router.get("/FnShowActiveData", async (req, res) => {
//   try {
//     const companies = await MEmpDocs.findAll({
//       where: {
//         AcFlag: "Y",
//       },
//       attributes: {
//         exclude: ["IUFlag"],
//       },
//       order: [["EmployeeId", "ASC"]],
//     });
//     res.json(companies);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// GET endpoint to retrieve a particular record by ID
router.get("/GetEmployeeDocs", authToken, async (req, res) => {
  const EmployeeId = req.query.EmployeeId;
  try {
    const companies = await MEmpDocs.findOne({
      where: {
        EmployeeId: EmployeeId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnGetADoc", authToken, async (req, res) => {
  const { EmployeeId, DocId } = req.body;

  try {
    const record = await MEmpDocs.findOne({
      where: {
        EmployeeId: EmployeeId,
        DocId: DocId,
      },
      attributes: ["Document"],
    });

    if (!record) {
      return res.status(404).json({ message: "Document not found" });
    }

    const fileData = record.Document;

    if (!fileData) {
      return res
        .status(404)
        .json({ message: "File not found for the Employee" });
    }

    // Add logic to determine content type based on file extension if needed
    let contentType = "application/octet-stream"; // Default to binary

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": fileData.length,
    });

    res.end(fileData);
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send("Internal Server Error");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/employee-docs");
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
  upload.single("file"), // Using 'single' as each request handles a single file
  async (req, res) => {
    try {
      const file = req.file.filename;
      const EmployeeId = req.query.EmployeeId;

      // Find existing documents for the specified EmployeeId
      const existingDocuments = await MEmpDocs.findOne({
        where: { EmployeeId: EmployeeId },
        attributes: ["Document"],
      });

      let documentsArray = existingDocuments ? existingDocuments.Document : [];

      // Add the new file to the array of documents
      documentsArray.push(file);

      // Update the record in the MEmpDocs table using Sequelize
      await MEmpDocs.update(
        { Document: documentsArray },
        { where: { EmployeeId } }
      );

      return res.json({ Status: "Success" });
    } catch (error) {
      console.error(error);
      return res.json({ Message: "Error" });
    }
  }
);

router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
  const record = req.body;
  try {
    if (record.IUFlag === "D") {
      const result = await MEmpDocs.update(
        { AcFlag: "N" },
        { where: { EmployeeId: record.EmployeeId, DocID: record.DocId } }
      );

      res.json({
        message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
      });
    } else {
      const result = await MEmpDocs.upsert(record, {
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
});
module.exports = router;
