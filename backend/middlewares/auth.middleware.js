const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // const token =
    //   req.headers["authorization"].split(" ")[1] ||
    //   req.headers["Authorization"].split(" ")[1];
    const token =
      req.cookies.token ||
      req.headers["authorization"]?.split(" ")[1] ||
      req.headers["Authorization"]?.split(" ")[1];

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
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token has expired" });
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  }
};

module.exports = auth;
