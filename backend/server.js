const express = require('express');
const env = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");


env.config();  
connectDB();

const app =  express();

app.use(cors());
app.use(express.json());
app.use("/api/users",require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;  

app.listen(PORT,() => {
    console.log(`Server running on PORT: ${PORT}`);
})