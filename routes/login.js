const router=require("express").Router()
const bcrypt=require("bcrypt");
const Login = require("../models/login");



router.post("/add", async (req, res) => {
    try {
      let data = req.body;
      let pwd= await hashage (data.password)
      let login = new Login({name:data.name,email:data.email,password:pwd});
      let result = await login.save(); // insertOne(user) , insertMany([{},{},{}])
      res.send(result);
      //     console.log("add new user api")
      // res.send("add new user api")
    } catch (error) {
      console.log(error);
      res.send("403");
    }
  });
  
  
  
  router.get("/:email/:password", async (req, res) => {
    try {
      let email = req.params.email;
      let pwd = req.params.password;
      //  TRAITEMENT LOGIN
      let cnx = await Login.findOne({ email: email});
      if (!cnx) {
        res.send("failed");
      } else {
        const result= await dehashage(pwd,cnx.password);
        console.log("Resultat:",result);
        res.send("success");
      }
    } catch (error) {
      res.send(error);
    }
  });


//? CRYPTAGE:

const hashage=async(pwd)=>{
    const cryptedPwd= await bcrypt.hash(pwd,8);
    console.log(cryptedPwd);
    return cryptedPwd
    //^ decryptage:
    // const match= await bcrypt.compare(pwd,cryptedPwd);
    // if(match){console.log("matched password")}
    // else{console.log("password not matched")}
}

const dehashage=async(pwd,cryptedPwd)=>{
    // const cryptedPwd= await bcrypt.hash(pwd,8);
    // console.log(cryptedPwd);
    //^ decryptage:
    const match= await bcrypt.compare(pwd,cryptedPwd);
    if(match){console.log("matched password");return true}
    else{console.log("password not matched");return false}
}

module.exports=router;