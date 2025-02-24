const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["Authorization"] || req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded?.userId);

    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    next();
  } catch (error) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token has expired" });
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  }
};

module.exports = auth;
