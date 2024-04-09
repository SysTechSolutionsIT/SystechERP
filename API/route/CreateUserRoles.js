const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = express.Router();

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
  
const UserRoles = sequelize.define('UserRoles', {
    CompanyId: { type: DataTypes.STRING(5), defaultValue: '00001' },
    BranchId: { type: DataTypes.STRING(5), defaultValue: '00001' },
    RoleId:{ type: DataTypes.INTEGER(5), allowNull: false, primaryKey:true, autoIncrement:true},
    RoleName: { type: DataTypes.STRING(100), defaultValue: 'NA' },
    AccessRights:  { type: DataTypes.STRING(255), allowNull: true, defaultValue: 'NA' },
    AcFlag: { type: DataTypes.STRING(1), allowNull:false, defaultValue:'Y'}
},{
  timestamps:false
})

  // Middleware for parsing JSON
  router.use(bodyParser.json());

  // Model synchronization
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

    UserRoles.sync()
  .then(() => {
    console.log("UserRoles model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing UserRoles model:", error);
  });

  router.get("/FnShowAllData", authToken, async (req, res) => {
    try {
      const Roles = await UserRoles.findAll({
        attributes: {
          exclude: ['id']
        },
        order: [["RoleId", "ASC"]],
      });
      res.json(Roles);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    } 
  });

  router.get("/FnShowActiveData", authToken, async (req, res) => {
    try {
      const Roles = await UserRoles.findAll({
        where: {
          AcFlag: "Y",
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["RoleId", "ASC"]],
      });
      res.json(Roles);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const RoleId = req.query.RoleId;
    try {
      const Roles = await UserRoles.findOne({
        where: {
          RoleId: RoleId,
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["RoleId", "ASC"]],
      });
      res.json(Roles);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/FnShowParticularEmployeeData", authToken, async (req, res) => {
    const EmployeeId = req.query.EmployeeId; 
    const FYear = req.query.FYear
    const Month = req.query.Month
    const Year = req.query.Year
    try {
      const Roles = await UserRoles.findAll({
        where: {
          EmployeeId: EmployeeId, 
          FYear : FYear,
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["RoleId", "ASC"]],
      });
      res.json(Roles);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });


  router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) => {
    const Roles = req.body;
    const RoleId = req.query.RoleId
    try {
      if (req.query.IUFlag === "D") {
        // "Soft-delete" operation
        const result = await UserRoles.update(
          { AcFlag: "N" },
          { where: { RoleId: Roles.RoleId } }
        );
  
        res.json({
          message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
        });
      } else if (req.query.IUFlag === 'U') {
        // Add or update operation
        const result = await UserRoles.update(Roles, {
          where: { RoleId: RoleId },
          returning: true,
        });
  
        res.json({
          message: result ? "Operation successful" : "Operation failed",
        });
      } else {
  
        const result = await UserRoles.create(Roles, {
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


  process.on("SIGINT", () => {
    console.log("Received SIGINT. Closing Sequelize connection...");
    sequelize.close().then(() => {
      console.log("Sequelize connection closed. Exiting...");
      process.exit(0);
    });
  });
  
  module.exports = router;