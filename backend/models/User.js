const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');


// Define User model
const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true, },
    email: { type: DataTypes.STRING,  allowNull: false,    unique: true,  validate: { isEmail: true, }  },
    password: { type: DataTypes.STRING,  allowNull: false,}, });
  // Hash password before saving
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });
  
  module.exports = User;