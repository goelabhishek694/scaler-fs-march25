const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
exports.registerUser = async (req, res) => {
  try {
    const { email } = req.body;
    //if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({
        message: "user already exists",
        success: false,
      });
    }
    const newUser = new User(req.body);
    await newUser.save();

    return res.json({
      message: "user created successfully",
      success: true,
      data: newUser,
    });
  } catch (err) {
    //check for user validation failed error
    console.log(err);
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const {email,password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "user does not exist. Please register",
        success: false,
      });
    }

    if(password !== user.password){
        return res.json({
        message: "incorrect credentials",
        success: false,
      });
    }
    const token = jwt.sign({userId:user["_id"]}, process.env.JWT_SECRET, {expiresIn: "1d"});
    console.log("JWT from login", token);
    res.cookie("token", token, {httpOnly: true, maxAge: 24*60*60*1000});
    res.status(200).json({
        message: "You've successfully logged in!",
        success: true,
        data: token
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.currentUser = async (req, res) => {
  try{
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    res.json({
      success: true,
      message: 'You are authorised to go to the protected route',
      data: user
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
}
