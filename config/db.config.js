const mongoose = require('mongoose');
require('dotenv').config();

const userName = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

const mongoURI = `mongodb+srv://${userName}:${password}@cluster0.oeu1n3f.mongodb.net/prod_manager`;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;