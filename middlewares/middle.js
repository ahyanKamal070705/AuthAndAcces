//HERE THE CONCEPT IS DIFFERNT FROM WHAT I KNOW PREVIUOUSLY
// PREVIOUSLY MIDDLEWARE WAS TO PARSE DATA FROM REQ.BODY

//BUT HERE:
//CHECK ROUTE WALA FOLDER

const jwt = require("jsonwebtoken");
require("dotenv").config();

//1) auth middleware (intent : is to check user is authenticated or not)
let decode = {};

exports.auth = (req, res, next) => {
  //extract token wrna verify kaise karoge                                       //space dena hai bearer ke baad
  const token  = req.body.tokem || req.cookies.token ||  req.header("Authorization").replace("Bearer ","");

  if (!token) {
    res.status(500).json({
      success: false,
      message: "token not present",
    });
  } 
  try {
    decode = jwt.verify(token,process.env.JWT_SECRET);
   console.log(decode);  //will contain email,id,roll i.e what we added in payload


  next();
  } catch (error) {
   
    res.status(500).json({
        success: false,
        message:error.message,
      });

  }
};

//2) IS STUDENT  (INTENT :TO CHECK FROM ROLE STUDENT IS ACCESING OR NOT)

exports.isStudent = (req,res,next)=>{
    try {
        if(decode.role != "Student"){
            res.status(401).json({
                success: false,
                message:"this is a protected rout for studetn",
              });
        }else{
          //No need to include succes wala respone route mein hi likha hai
        }
        next();
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message,
          });
    }
}




exports.isAdmin = (req,res,next)=>{
    try {
        if(decode.role != "Admin"){
            res.status(401).json({
                success: false,
                message:"this is a protected rout for Admin",
              });
        }else{
          //No need to include succes wala respone route mein hi likha hai
        }
        next();
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message,
          });
    }
}