const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter=require("./routes/user");
const loginRouter=require("./routes/login");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;

// * DB CONNECTION
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected succeffully");
});

app.use('/user',userRouter);
app.use('/login',loginRouter);




app.listen(4000, () => {
  console.log("Server works on port 4000 ...");
});

//! FONCTIONS: 
// ^ find({}).count()  , find({}).limit(15) , find({}).sort({age:-1})





