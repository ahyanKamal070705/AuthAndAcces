//mongoose ka instance

const mongoose = require('mongoose');
require('dotenv').config();


const dbConnect =()=>{  
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
.then(()=>console.log("db ka connection succesffulll"))
.catch((e)=> {
    console.log(e);
    console.log("issue in connection");
    process.exit(1); 
})

}
module.exports = dbConnect; 