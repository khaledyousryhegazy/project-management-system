const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
// get all users
const getAllUsers = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if user exist
    const existUser = await User.findOne({ email: email });

    if (existUser !== null) {
      res.status(409).json({ message: "user already exist" });
      return;
    }

    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser === null) {
      res.status(409).json({ message: "user not exist" });
    }

    const isMatch = existUser.comparePassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "password is not correct please try again" });
    }

    // token here
    var token = jwt.sign(
      { userId: existUser._id, username: existUser.username, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );

    res.status(200).json({ success: true, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, register, login };
