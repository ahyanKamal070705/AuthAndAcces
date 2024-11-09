const User = require("../models/user");
const bcrypt = require("bcrypt");

require("dotenv").config();

//import jwt
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    //fetch the data
    const { email, password } = req.body;

    //check if email id and password is empty or not
    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "fill the data",
      });
    }

    //check if mail exist  //.lean()added because uske bina changes nai kr payenge aage kiye hai changes
    const user = await User.findOne({ email: email }).lean(); //user will contain all the infotmation with the email mathched like name,pass,role,email

    //if not exist
    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: "user not found",
      });
    }

    //if user found check for passwords and generate and create jwt token

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      //if password mathced

      // DO TWO THINGS    1)CREATE JWT TOKEN  ----->create payload and add the secret key
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });
       
      console.log(user);
      //this will add token and changed the password to undefine in user object extracted above not in db
    //    user.token = token; 
   
    user.token = token;
      user.password = undefined;   //password bhejna hi nai hai
      console.log(user);

      //2)CREATE COOKIES (sedning jwt inside cookies as a resposne)
      const options = { httpOnly: true, maxAge: 3600000, secure: true }; // 1-hour cookie

      res.cookie("token", token,options).status(200).json({
        //this will send all this data to frontend
        success: true,
        token,
        user,
        message: "user logged",
      });
    } else {
      //if password doesnt matched
      return res.status(401).json({
        sucess: false,
        message: "password incorrect",
      });
    }
  } catch (error) {  
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
