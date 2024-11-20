const express = require("express");
const connectDB = require('./Config/db');
const errorHandler = require('./Middleware/errorHandler');
const validateComicBook = require('./Middleware/Validation');
const comicRoutes = require('./Routes/comicRoutes');

const app = express();
require("dotenv").config(); 


connectDB();

app.use(express.json());
app.use(validateComicBook);
app.use('/comics', comicRoutes);                      

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{ 
    console.log(`Server Started at port ${PORT}`);
});