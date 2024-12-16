// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing users
    await User.deleteMany();

    const adminUser = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password', // Ensure this is hashed by pre-save hook
      isAdmin: true,
    });

    await adminUser.save();

    console.log('Admin user created');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
