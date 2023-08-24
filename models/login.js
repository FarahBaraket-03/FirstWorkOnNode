const mongoose=require("mongoose");

const Login=mongoose.model("login",{
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
});

module.exports=Login;