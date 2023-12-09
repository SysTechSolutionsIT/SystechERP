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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const MKRA = sequelize.define('MKRA', {
    CompanyId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    BranchId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    KRAId: { type: DataTypes.INTEGER(5), autoIncrement:true, allowNull: false, primaryKey: true },
    KRAName: { type: DataTypes.STRING(500), allowNull: false },
    Duration: { type: DataTypes.INTEGER, defaultValue: 0 },
    Points: { type: DataTypes.INTEGER, defaultValue: 0 },
    Remark: { type: DataTypes.STRING(500), allowNull: true },
    AcFlag: { type: DataTypes.STRING(1), defaultValue: 'Y' },
    CreatedBy: { type: DataTypes.STRING(500), allowNull: true },
    CreatedOn: { type: DataTypes.DATE, allowNull: true },
    ModifiedBy: { type: DataTypes.STRING(500), allowNull: true },
    ModifiedOn: { type: DataTypes.DATE, allowNull: true },
  }, { timestamps: false });

  router.use(bodyParser.json())


  router.get("/FnShowAllData", authToken, async (req, res) =>{
    try {
        const KRA = await MKRA.findAll({
            attributes:{
            exclude: ["IUFlag"],
            },
            order: [["KRAId", "ASC"]]
        })
        res.json(KRA)
    } catch (error) {
        console.error("Error retireving data:", error);
        res.status(500).send("Internal Server Error")
    }
  })

  router.get("/FnShowActiveData", authToken, async (req, res) =>{
    try {
        const KRA = await MKRA.findAll({
            where:{
                AcFlag: "Y"
            },
            attributes:{
                exclude: ["IUFlag"]
            },
            order: [["KRAId", "ASC"]]
        })
        res.json(KRA)
    } catch (error) {
        console.error("Error Retrieving Data", error);
        res.status(500).send("Internal Server Error")
    }
  })

  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const kraId = req.query.KRAId;
    try {
      const KRA = await MKRA.findOne({
        where: {
          KRAId: kraId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["KRAId", "ASC"]],
      });
      res.json(KRA);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) =>{
    const KRA = req.body
    try{
        if (KRA.IUFlag == "D"){
            const result = await MKRA.update(
                { AcFlag: "N" },
                { where: { KRAId: KRA.KRAId}}
            )

            res.json({
                message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
            })
        } else {
            const result = await MKRA.upsert(KRA, {
                returning: true
            })

            res.json({
                message: result ? "Operation Successful" : "Operation Failed"
            })
        }
    } catch(error){
        console.error("Error performing operation", error);
        res.status(500).send("Internal Server Error")
    }
  })

  module.exports = router