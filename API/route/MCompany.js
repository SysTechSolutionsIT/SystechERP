// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

// Create an Express router
const router = express.Router();

// Middleware for JWT authentication
const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
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
  

// Define the MCompany model
const MCompany = sequelize.define('MCompany', {
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
sequelize.sync().then(() => {
  console.log('Models synced');
});

// GET endpoint to retrieve all companies
router.get('/FnShowAllData', authToken, async (req, res) => {
  try {
    const companies = await MCompany.findAll({
      attributes: {
        exclude: ['IUFlag'],
      },
      order: [['CompanyId', 'ASC']],
    });
    res.json(companies);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET endpoint to retrieve active companies
router.get('/FnShowActiveData', authToken, async (req, res) => {
  try {
    const companies = await MCompany.findAll({
      where: {
        AcFlag: 'Y',
      },
      attributes: {
        exclude: ['IUFlag'],
      },
      order: [['CompanyId', 'ASC']],
    });
    res.json(companies);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET endpoint to retrieve a particular company by ID
router.get('/FnShowParticularData', authToken, async (req, res) => {
  const companyId = req.query.CompanyId;
  try {
    const companies = await MCompany.findAll({
      where: {
        CompanyId: companyId,
      },
      attributes: {
        exclude: ['IUFlag'],
      },
      order: [['CompanyId', 'ASC']],
    });
    res.json(companies);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST endpoint to add, update, or delete a company
router.post('/FnAddUpdateDeleteRecord', authToken, async (req, res) => {
  const company = req.body;
  try {
    const result = await MCompany.upsert(company, {
      returning: true,
    });
    res.json({ message: result ? 'Operation successful' : 'Operation failed' });
  } catch (error) {
    console.error('Error performing operation:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Export the router
module.exports = router;
