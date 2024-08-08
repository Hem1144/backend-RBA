require('dotenv').config();
const mongoose = require("mongoose");
const express = require('express');

const app = express();
app.use(express.static('public'));

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); 
    }
};

connectToDatabase();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});
