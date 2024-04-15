const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const CompanyConfig = require("./CompanyConfigModels");
const MEmployeeType = require("../model/MEmployeeTypeModels");

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

const MEmployee = sequelize.define(
  "MEmployee",
  {
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
    EmployeeTypeId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "001",
    },
    EmployeeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    EmployeeName: { type: DataTypes.STRING(500), allowNull: true },
    EmployeeTypeGroupId: { type: DataTypes.STRING(50), allowNull: true },
    Salutation: { type: DataTypes.STRING(50), allowNull: true },
    LastName: { type: DataTypes.STRING(255), allowNull: true },
    FirstName: { type: DataTypes.STRING(255), allowNull: true },
    MiddleName: { type: DataTypes.STRING(255), allowNull: true },
    MEmployeeName: { type: DataTypes.STRING(255), allowNull: true },
    AadharCardNo: { type: DataTypes.STRING(100), allowNull: true },
    PANNo: { type: DataTypes.STRING(100), allowNull: true },
    PassportNo: { type: DataTypes.STRING(100), allowNull: true },
    PassportIssueDate: { type: DataTypes.STRING(50), allowNull: true },
    PassportExpireDate: { type: DataTypes.DATE, allowNull: true },
    CurrentAddress: { type: DataTypes.STRING(1000), allowNull: true },
    CurrentPincode: { type: DataTypes.STRING(10), allowNull: true },
    PermanentAddress: { type: DataTypes.STRING(1000), allowNull: true },
    PermanentPincode: { type: DataTypes.STRING(10), allowNull: true },
    DOB: { type: DataTypes.STRING(50), allowNull: true },
    EmailId1: { type: DataTypes.STRING(100), allowNull: true },
    EmailId2: { type: DataTypes.STRING(100), allowNull: true },
    PhoneNo: { type: DataTypes.STRING(15), allowNull: true },
    CellNo1: { type: DataTypes.STRING(15), allowNull: true },
    CellNo2: { type: DataTypes.STRING(15), allowNull: true },
    BankId1: { type: DataTypes.STRING(50), allowNull: true },
    AccountNo1: { type: DataTypes.STRING(100), allowNull: true },
    IFSCCode1: { type: DataTypes.STRING(50), allowNull: true },
    BankId2: { type: DataTypes.STRING(50), allowNull: true },
    AccountNo2: { type: DataTypes.STRING(100), allowNull: true },
    IFSCCode2: { type: DataTypes.STRING(50), allowNull: true },
    MaritalStatus: { type: DataTypes.STRING(15), allowNull: true },
    ReferenceId: { type: DataTypes.STRING(50), allowNull: true },
    DestinationId: { type: DataTypes.STRING(50), allowNull: true },
    ReligionId: { type: DataTypes.STRING(50), allowNull: true },
    CategoryId: { type: DataTypes.STRING(50), allowNull: true },
    CasteId: { type: DataTypes.STRING(50), allowNull: true },
    EmployeePhoto: { type: DataTypes.STRING, allowNull: true },
    Gender: { type: DataTypes.STRING(10), allowNull: true },
    BloodGroup: { type: DataTypes.STRING(10), allowNull: true },
    DrivingLicence: { type: DataTypes.BLOB, allowNull: true },
    FinanceAccountNo: { type: DataTypes.STRING(100), allowNull: true },
    Remark: { type: DataTypes.STRING(255), allowNull: true },
    AcFlag: { type: DataTypes.STRING(1), allowNull: true, defaultValue: "Y" },
    CreatedBy: { type: DataTypes.STRING(50), allowNull: true },
    CreatedOn: { type: DataTypes.STRING(50), allowNull: true },
    ModifiedBy: { type: DataTypes.STRING(50), allowNull: true },
    ModifiedOn: { type: DataTypes.STRING(50), allowNull: true },
  },
  {
    timestamps: false,
  }
);

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

router.get("/FnShowAllData", authToken, async (req, res) => {
  try {
    const employees = await MEmployee.findAll({
      attributes: {
        // Your attribute configuration here
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET endpoint to retrieve active companies
router.get("/FnShowActiveData", authToken, async (req, res) => {
  try {
    const employees = await MEmployee.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

//ROute to provide only employee Ids
router.get("/FnShowEmpIds", async (req, res) => {
  try {
    const employees = await MEmployee.findAll({
      where: {
        AcFlag: "Y",
      },
      attributes: ["EmployeeId"], // Only retrieve EmployeeId
      order: [["EmployeeId", "ASC"]],
      distinct: true, // Ensure uniqueness
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/FnShowPerticularData", authToken, async (req, res) => {
  const employeeId = req.query.EmployeeId;
  try {
    const employees = await MEmployee.findOne({
      where: {
        EmployeeId: employeeId,
      },
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeId", "ASC"]],
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/FnShowImageData", authToken, async (req, res) => {
  const employeeId = req.query.EmployeeId;
  try {
    const employee = await MEmployee.findOne({
      where: {
        EmployeeId: employeeId,
      },
      attributes: ["EmployeePhoto"], // Include only the EmployeePhoto field
      order: [["EmployeeId", "ASC"]],
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const { EmployeePhoto } = employee.dataValues;

    res.json({ EmployeePhoto });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/employee-photo");
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
      await MEmployee.update(
        { EmployeePhoto: image },
        { where: { EmployeeId: req.query.EmployeeId } }
      );

      return res.json({ Status: "Success" });
    } catch (error) {
      console.error(error);
      return res.json({ Message: "Error" });
    }
  }
);

router.get("/get-upload", authToken, async (req, res) => {
  const employeeId = req.query.EmployeeId;
  try {
    const employees = await MEmployee.findOne({
      where: {
        EmployeeId: employeeId,
      },
      attributes: ["EmployeePhoto"],
      order: [["EmployeeId", "ASC"]],
    });
    res.json(employees);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const switchEmployeeId = async (req, res, next) => {
  try {
    // Fetch the company configuration to check if empID column is 'Yes' or 'No'
    const config = await CompanyConfig.findAll({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["CCID", "DESC"]],
    });

    // Check if config array is empty or not
    if (!config || config.length === 0) {
      throw new Error("Company configuration not found");
    }

    // Check if empID column is 'Yes' or 'No'
    const isEmpIDEnabled = config[0].empID === "Yes";

    if (isEmpIDEnabled) {
      // Fetch the EmployeeTypeId from the request body
      const employeeTypeId = req.body.EmployeeTypeId;

      // Fetch the corresponding employee type to get the ShortName
      const employeeType = await MEmployeeType.findOne({
        where: {
          EmployeeTypeId: employeeTypeId,
        },
      });

      if (!employeeType) {
        throw new Error("Employee type not found");
      }

      // Get the prefix from ShortName
      const prefix = employeeType.ShortName;

      // Find the next available EmployeeId
      let employeeId = await findNextAvailableEmployeeId(prefix);

      // Update req.body with the generated EmployeeId
      req.body.EmployeeId = employeeId;
    }
    next();
  } catch (error) {
    console.error("Error generating EmployeeId:", error);
    // res.status(500).send("Internal Server Error");
  }
};

const generateEmployeeId = async (req, res, next) => {
  try {
    if (req.body.IUFlag === "I") {
      // Fetch the company configuration to check if empID column is 'Yes' or 'No'
      const emptypeid = await MEmployeeType.findOne({
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["EmployeeTypeId", "DESC"]],
      });

      // Check if emptypeid array is empty or not
      if (!emptypeid || emptypeid.length === 0) {
        throw new Error("Company configuration not found");
      }

      // Check if empID column is 'Yes' or 'No'
      const isEmpIDEnabled = emptypeid.PrefixEnabled === "Yes";

      if (isEmpIDEnabled) {
        // Fetch the EmployeeTypeId from the request body
        const employeeTypeId = req.query.EmployeeTypeId;

        // Fetch the corresponding employee type to get the ShortName
        const employeeType = await MEmployeeType.findOne({
          where: {
            EmployeeTypeId: employeeTypeId,
          },
        });

        if (!employeeType) {
          throw new Error("Employee type not found");
        }

        // Get the prefix from ShortName
        const prefix = employeeType.ShortName;

        // Find the next available EmployeeId
        let employeeId = await findNextAvailableEmployeeId(prefix);

        // Update req.body with the generated EmployeeId
        req.body.EmployeeId = employeeId;
      }
    }

    next();
  } catch (error) {
    console.error("Error generating EmployeeId:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Function to find the next available EmployeeId with the given prefix
const findNextAvailableEmployeeId = async (prefix) => {
  let newId = "001"; // Default starting EmployeeId
  let isUnique = false;

  // Check if there exists a record with the given prefix + newId
  while (!isUnique) {
    const existingEmployee = await MEmployee.findOne({
      where: {
        EmployeeId: prefix + newId,
      },
    });

    // If no record found, mark it as unique, otherwise increment newId
    if (!existingEmployee) {
      isUnique = true;
    } else {
      newId = (parseInt(newId) + 1).toString().padStart(3, "0"); // Increment newId
    }
  }

  return prefix + newId;
};

async function updateEmployeeIdInTables(
  oldEmployeeId,
  newEmployeeId,
  newEmployeeTypeId,
  callback
) {
  try {
    // Fetch table names from Sequelize
    const tables = await sequelize.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`,
      {
        replacements: [sequelize.config.database],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Iterate through tables
    for (const table of tables) {
      const tableName = table.table_name;
      // Check if the table has an 'EmployeeId' column
      const hasEmployeeIdColumn = await sequelize.query(
        `SELECT COUNT(*) AS count FROM information_schema.columns WHERE table_schema = ? AND table_name = ? AND column_name = 'EmployeeId'`,
        {
          replacements: [sequelize.config.database, tableName],
          type: sequelize.QueryTypes.SELECT,
        }
      );

      const hasEmployeeTypeIdColumn = await sequelize.query(
        `SELECT COUNT(*) AS count FROM information_schema.columns WHERE table_schema = ? AND table_name = ? AND column_name = 'EmployeeTypeId'`,
        {
          replacements: [sequelize.config.database, tableName],
          type: sequelize.QueryTypes.SELECT,
        }
      );

      // If the table has the 'EmployeeId' column, update the EmployeeId values
      if (hasEmployeeIdColumn[0].count > 0) {
        // Construct the UPDATE query to update EmployeeId
        let updateQuery = `UPDATE ${tableName} SET EmployeeId = ? WHERE EmployeeId = ?`;
        let replacements = [newEmployeeId, oldEmployeeId];

        // If the table has the 'EmployeeTypeId' column, include it in the update query
        if (hasEmployeeTypeIdColumn[0].count > 0 && newEmployeeTypeId) {
          updateQuery = `UPDATE ${tableName} SET EmployeeId = ?, EmployeeTypeId = ? WHERE EmployeeId = ?`;
          replacements = [newEmployeeId, newEmployeeTypeId, oldEmployeeId];
        }

        // Execute the update query with the appropriate replacements
        await sequelize.query(updateQuery, {
          replacements,
          type: sequelize.QueryTypes.UPDATE,
        });
        console.log(`Updated EmployeeId in table ${tableName}`);
      } else {
        console.log(
          `Table ${tableName} does not have an EmployeeId column. Skipping...`
        );
      }
    }

    // Callback indicating successful update
    callback(null, "All tables updated");
  } catch (error) {
    // If an error occurs during the update, log it and callback with the error
    console.error("Error updating employee ID in tables:", error);
    callback(error, null);
  }
}

router.post("/FnSwitchEmployeeType", authToken, async (req, res) => {
  const newEmployeeTypeId = req.body.EmployeeTypeId;
  const oldEmployeeId = req.body.EmployeeId;
  let newEmployeeId = null;
  // Generate new employee ID based on the new Employee Type Id
  try {
    // Fetch the company configuration to check if empID column is 'Yes' or 'No'
    const emptypeid = await MEmployeeType.findOne({
      attributes: {
        exclude: ["IUFlag"],
      },
      order: [["EmployeeTypeId", "DESC"]],
    });

    // Check if emptypeid array is empty or not
    if (!emptypeid || emptypeid.length === 0) {
      throw new Error("Company configuration not found");
    }

    // Check if empID column is 'Yes' or 'No'
    const isEmpIDEnabled = emptypeid.PrefixEnabled === "Yes";

    if (isEmpIDEnabled) {
      // Fetch the EmployeeTypeId from the request body
      const employeeTypeId = req.body.EmployeeTypeId;

      // Fetch the corresponding employee type to get the ShortName
      const employeeType = await MEmployeeType.findOne({
        where: {
          EmployeeTypeId: employeeTypeId,
        },
      });

      if (!employeeType) {
        throw new Error("Employee type not found");
      }

      // Get the prefix from ShortName
      const prefix = employeeType.ShortName;

      // Find the next available EmployeeId
      let employeeId = await findNextAvailableEmployeeId(prefix);

      // Update req.body with the generated EmployeeId
      newEmployeeId = employeeId;
    }
    next();
  } catch (error) {
    console.error("Error generating new EmployeeId:", error);
    // res.status(500).send("Internal Server Error");
  }

  // Update the EmployeeId in all tables across the database
  updateEmployeeIdInTables(
    oldEmployeeId,
    newEmployeeId,
    newEmployeeTypeId,
    (err, result) => {
      if (err) {
        console.error("Error updating employee ID in tables:", err);
        // res.status(500).send('Internal Server Error');
      } else {
        console.log("Employee ID updated in all tables");
        // res.status(200).send('Employee ID updated successfully');
      }
    }
  );
});

router.post(
  "/FnAddUpdateDeleteRecord",
  generateEmployeeId,
  authToken,
  async (req, res) => {
    const employee = req.body; // Access the EmployeeId from query parameters

    try {
      if (employee.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MEmployee.update(
          { AcFlag: "N" },
          { where: { EmployeeId: employee.EmployeeId } }
        );

        res.json({
          message: result[0]
            ? "Record Deleted Successfully"
            : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MEmployee.upsert(employee, {
          where: { EmployeeId: employee.EmployeeId }, // Specify the where condition for update
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
