
const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });        
        console.log("Connected to database");
    }
     catch (error) {
        console.log("Database not connected");
        console.error(error);
        process.exit(1); 
    }
}

module.exports = connectDB;
