//EXPRESS KA INSTANCE
const express = require("express");

//ROUTER KA INSTANCE
const router = express.Router();


//import controller
const {signup} = require('../Controllers/auth');
const{login} = require('../Controllers/auth2')
 
//maping the controlller  
router.post('/login',login);
router.post('/signup',signup);

//MIDDLEWARES
const {auth,isAdmin,isStudent} = require('../middlewares/middle');

//FLOW : '/student' wala route---> then middleware1 ----> middleware2




//testing route
router.get('/test' ,auth , (req,res)=>{
    res.json({  //no return needed as res.json will only end the cycle
        success:true,
        message:"testing route welcome"
    })
})







//   '/student' wala route pe request aayega toh sbse phle auth wala middleware chalega--> uske baad check hoga student role hai ki nahi

router.get('/student' ,auth , isStudent, (req,res)=>{
    res.json({  //no return needed as res.json will only end the cycle
        success:true,
        message:"student welcome"
    })
})

// '/admin' wala route mein aya auth middleware check karo then isAdmin middleware check karo=---> payload mein role dale the usse check hoga
router.get('/admin' ,auth , isAdmin, (req,res)=>{
    res.json({  //no return needed as res.json will only end the cycle
        success:true,
        message:"admin welcome"
    })
})


 
 
module.exports = router;     
    