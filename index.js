//NOTES


//AUTHENTICATION : IDENTITY VERIFICATION USER KO REGISTER KARANA JAB WOH LOGIN KARE TO VEIRFY

//AUTHORISATION : KAUNSA ROUTE KA PERMISSION DENA HAIII YEH DECIDE KARE
//COURSE WALA BACCHA ---> COURSE WALA ROUTE
//ADMIN ----> ADMIN PANEL WALA ROUTE
//NON COURSE WALA BACCHA ---> BS KHAREEDNA WALA ROUTE


const express = require('express');
const cookieParser = require('cookie-parser');
const app =express();


require('dotenv').config();


const dbConnect = require('./config/database');
dbConnect();

const PORT = process.env.PORT || 5000



//middlware
app.use(express.json());
app.use(cookieParser());

//importing routes
const auth = require('./routes/authRoutes');

//mounting the routes
app.use('/api/v1',auth)
 

app.listen(PORT,()=>{
    console.log("db ka connection succesfull");
})

    

 
//default routes
app.get('/',(req,res)=>{
    res.send("this is home page");
})


  
