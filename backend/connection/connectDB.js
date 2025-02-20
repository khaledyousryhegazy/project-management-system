require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.URI_CONNECTION, {});

    console.log("🚀 connection successfully on :", db.connection.host);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
