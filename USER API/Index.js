const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const app = express();
app.use(express.json());
mongoose
    .connect("mongodb://localhost:27017/")
    .then(()=>{
        console.log("connected to database")
    })
    .catch(()=>{
        console.log("something went wrong")
    });
    
app.use(userRoutes);
app.listen(3000, () => {
    console.log("app is running")
});

