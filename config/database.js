const mongoose = require('mongoose');

const url="mongodb+srv://Yugma:LwFQ8DTq1Q1C8WDl@cluster0.msx2imj.mongodb.net/LinkedinDB"

async function connectToMongoDB() {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connectToMongoDB };
