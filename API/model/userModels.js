const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Initialize Sequelize with your MySQL database connection
const sequelize = new Sequelize('u172510268_systech', 'u172510268_devs', 'Ggwpfax@9990', {
  host: 'srv1001.hstgr.io',
  dialect: 'mysql',
  port: 3306,
});

// Define the User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING, // You can adjust the data type for the role as needed
    allowNull: true,
  },
});

// Hash the password before saving it to the database
User.beforeCreate(async (user, options) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Salt rounds: 10
    user.password = hashedPassword;
  } catch (error) {
    throw new Error('Error hashing the password');
  }
});

// Method to compare the provided password with the hashed password
User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Sync the model with the database (creates the table if it doesn't exist)
sequelize
  .sync()
  .then(() => {
    console.log('User table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating User table:', error);
  });

module.exports = User;
