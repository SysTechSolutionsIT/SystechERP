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
  "u172510268_systech",
  "u172510268_devs",
  "Ggwpfax@9990",
  {
    host: "srv1001.hstgr.io",
    dialect: "mysql",
    port: 3306,
  }
);

const MEmployeeGrade = sequelize.define(
    'MEmployeeGrade', {
    CompanyId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    BranchId: { type: DataTypes.STRING(5), allowNull: false, defaultValue: '00001' },
    EmployeeGradeId: { type: DataTypes.INTEGER(3), autoIncrement:true, allowNull: false, primaryKey: true },
    EmployeeGradeName: { type: DataTypes.STRING(500), allowNull: false },
    AcFlag: { type: DataTypes.STRING(1), defaultValue: 'Y' },
    CreatedBy: { type: DataTypes.STRING(5) },
    CreatedOn: { type: DataTypes.STRING(10) },
    ModifiedBy: { type: DataTypes.STRING(5) },
    ModifiedOn: { type: DataTypes.STRING(10) },
    Remark: { type: DataTypes.STRING(500) },
  }, { timestamps: false });

  router.use(bodyParser.json())

  sequelize.sync().then(() =>{
    console.log("Models synced")
  })

  router.get("/FnShowAllData", authToken, async (req, res) =>{
    try {
        const employeeGrade = await MEmployeeGrade.findAll({
            attributes:{
            exclude: ["IUFlag"],
            },
            order: [["EmployeeGradeId", "ASC"]]
        })
        res.json(employeeGrade)
    } catch (error) {
        console.error("Error retireving data:", error);
        res.status(500).send("Internal Server Error")
    }
  })

  router.get("/FnShowActiveData", authToken, async (req, res) =>{
    try {
        const employeeGrade = await MEmployeeGrade.findAll({
            where:{
                AcFlag: "Y"
            },
            attributes:{
                exclude: ["IUFlag"]
            },
            order: [["EmployeeGradeId", "ASC"]]
        })
        res.json(employeeGrade)
    } catch (error) {
        console.error("Error Retrieving Data", error);
        res.status(500).send("Internal Server Error")
    }
  })

  router.get("/FnShowParticularData", authToken, async (req, res) => {
    const employeeGradeId = req.query.EmployeeGradeId;
    try {
      const employeeGrade = await MEmployeeGrade.findOne({
        where: {
          EmployeegradeId: employeeGradeId,
        },
        attributes: {
          exclude: ["IUFlag"],
        },
        order: [["EmployeeGradeId", "ASC"]],
      });
      res.json(employeeGrade);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post("/FnAddUpdateDeleteRecord", authToken, async (req, res) =>{
    const employeeGrade = req.body
    try{
        if (employeeGrade.IUFlag == "D"){
            const result = await MEmployeeGrade.update(
                { AcFlag: "N" },
                { where: { EmployeeGradeId: employeeGrade.EmployeeGradeId}}
            )

            res.json({
                message: result[0] ? "Record Deleted Successfully" : "Record Not Found",
            })
        } else {
            const result = await MEmployeeGrade.upsert(employeeGrade, {
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