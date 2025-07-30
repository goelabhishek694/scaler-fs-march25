const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({
        message: "user already exists",
        success: false,
      });
    }
    const newUser = new User({ name, email, password });
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
    res.send({
        message: "You've successfully logged in!",
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
