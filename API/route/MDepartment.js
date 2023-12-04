// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

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

const MDepartment = sequelize.define("MDepartment",
{
      CompanyId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '00001'
      },
      BranchId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '00001'
      },
      DepartmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ParentDeptId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DepartmentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DepartmentName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DepartmentGroupId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CostCenterId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DepartmentHeadId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DepartmentSubHeadId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DepartmentStdStaffStrength: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      DepartmentStdWorkerStrength: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Remark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Status :{
        type: DataTypes.STRING,
        allowNull: true,
      },
      AcFlag: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      IUFlag :{
        type: DataTypes.STRING,
        allowNull: true,
      },
      CreatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CreatedOn: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ModifiedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ModifiedOn: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
)

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize.sync().then(() => {
  console.log("Models synced");
});

// GET endpoint to retrieve all cost centers
router.get("/FnShowAlldata", authToken, async (req, res) =>{
    try{
        const departments = await MDepartment.findAll({
            attributes:{
                exclude: ["IUFlag"]
            },
            order: [["DepartmentId", "ASC"]]
        })
        res.json(departments)
    } catch(error){
        console.error("Error retriving data", error);
        res.status(500).send('Internal Server Error')
    }
})

// GET endpoint to retrieve active cost centers
router.get("/FnShowActiveData", authToken, async (req, res) => {
    try {
      const departments = await MDepartment.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["DepartmentId", "ASC"]],
      });
      res.json(departments);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

// GET endpoint to retrieve a particular cost center by ID
router.get("/FnShowParticularData", authToken, async (req, res) => {
    const departmentId = req.query.DepartmentId;
    try {
      const departments = await MDepartment.findAll({
        where: {
          DepartmentId: departmentId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["DepartmentId", "ASC"]],
      });
      res.json(departments);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // POST endpoint to add, update, or "soft-delete" a departments
router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
    const departments = req.body;
    try {
      if (departments.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await MDepartment.update(
          { AcFlag: "N" },
          { where: { DepartmentId: departments.DepartmentId } }
        );
  
        res.json({
          message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
        });
      } else {
        // Add or update operation
        const result = await MDepartment.upsert(departments, {
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
  
  // Export the router
  module.exports = router;
  