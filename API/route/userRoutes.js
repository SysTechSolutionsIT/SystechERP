require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { Sequelize, DataTypes, ExclusionConstraintError } = require("sequelize");
// const User = require("../model/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { useResolvedPath } = require('react-router-dom');
const secretKey = process.env.SECRET_KEY
// console.log('in useer routes', secretKey)

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

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessrights:{
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
});

// Middleware for parsing JSON
router.use(bodyParser.json());

// Model synchronization
sequelize
  .authenticate()
  .then(() => {
    console.log('User connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  User.sync()
  .then(() => {
    console.log("MTwoField model synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing MTwoField model:", error);
  });


// Registration
router.post("/register", async (req, res) => {
  try {
    const { email, empid, password, name, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    // Create a new user with name and role
    const newUser = await User.create(req.body);

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.id }, secretKey);
    res.status(201).json({ user: newUser, token });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/accessrights', authToken, async (req, res) => {
  try {
    const Rights = req.body;
    const { EmployeeId } = req.query;

    // Find the user by empid
    const user = await User.findOne({ where: { empid: EmployeeId } });

    if (!user) {
      return res.status(404).json({ message: "User not registered yet" });
    } else {
      console.log('Updating accessrights for empid:', EmployeeId);
      
      // Convert Rights array to comma-separated string
      const rightsString = Rights.join(',');
      
      // Update the accessrights field with the string
      const result = await User.update(
        { accessrights: rightsString },
        { where: { empid: EmployeeId } }
      );

      console.log('Update result:', result);
      console.log('New accessrights:', Rights);
      
      res.json({ message: result ? "Access rights updated successfully" : "Error in updating access rights" });
    }

  } catch (error) {
    console.error("Error performing operation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the provided password with the stored password
      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, secretKey);
  
      res.json({ token, name: user.name, role: user.role, empid: user.empid});
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Export both the secretKey and router in a single object
module.exports = router;
