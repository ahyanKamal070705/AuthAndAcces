const bcrypt = require("bcrypt");

//importing model to interact with db without importing cant interact
const User = require("../models/user");

//SIGNUP FUNCTION KA FLOW
// --> FETCH DATA ---> CHECK IF USER EXIST ----> IF YES RETURN ---> IF NOT HASH PASSWORD ----> INSERT IN DB

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //check if user Already exist (go and find in db)

    const existingUser = await User.findOne({ email: email });     

    //valid entry found
    if (existingUser) {
      return res.status(400).json({
        //return is added because if same data found age if ke baaad hashing krne ka kya jarurat wahi se exit
        success: false,
        message: "user already exist",
      });
    }

    //hashing the password

    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        //return is added because if same data found age if ke baaad hashing krne ka kya jarurat wahi se exit
        success: false,
        message: error.message,
      });
    }

    //adding user to the db

    const user = await User.create({
      name,
      email,
      password:hashedPassword,
      role,
    });

    res.status(200).json({
        success:true,
        data:user,
        message:"succesful entry created",
    })

  } catch (error) {
    
    res.status(500).json({
        success: false,
        message: "An error occurred while entering the data in db",
        error: error.message // Optionally include the error message
    });

  }
};
