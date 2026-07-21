const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = 'mongodb+srv://Chandu:Chandu1234567@cluster0.j9vfols.mongodb.net/goat_sheep_market?retryWrites=true&w=majority';
    const conn = await mongoose.connect(connStr);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection fault: ${error.message}`);
  }
};

module.exports = connectDB;
