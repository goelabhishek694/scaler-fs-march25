const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const emailHelper = require("../utils/emailHelper");
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "user does not exist. Please register",
        success: false,
      });
    }

    if (password !== user.password) {
      return res.json({
        message: "incorrect credentials",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user["_id"] }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("JWT from login", token);
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({
      message: "You've successfully logged in!",
      success: true,
      data: token,
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
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    res.json({
      success: true,
      message: "You are authorised to go to the protected route",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
const otpGenerator = function() {
  return Math.floor(100000 + Math.random()*900000);
};
0.123452*900000 + 100000
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({email});
    if (!user) {
      res.status(404).json({
        message: "User not registered",
        success: false,
      });
    }
    const otp = otpGenerator();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10*60*1000;
    await user.save();
    //send otp via email
    await emailHelper("otp.html", user.email, {name: user.name, otp})
    res.status(200).json({
        message: "Otp sent to registered mail",
        success: true,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const {otp, password} = req.body;
    const {email} = req.params;
    //if otp is valid
    const user = await User.find({email, otp});
    if (!user) {
      res.status(404).json({
        message: "User not registered",
        success: false,
      });
    }
    //if otp is expired - 10min timer
    if(Date.now()> user.otpExpiry){
      res.status(401).json({
        message: "otp expired",
        success: false,
      });
    }

    //update new password to db
    user.password = password;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save()

    res.status(200).json({
      message: "password reset successfully",
      success: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
