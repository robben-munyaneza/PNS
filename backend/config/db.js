// config/db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // set to true if you want to see raw SQL logs
  }
);

// Test connection
sequelize.authenticate()
  .then(() => console.log('✅ Connected to MySQL database using Sequelize'))
  .catch(err => console.error('❌ Unable to connect to database:', err));

module.exports = sequelize;
