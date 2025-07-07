const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
  checkAuth,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const upload = require("../middlewares/upload.middleware");

router.get("/all", auth, isAdmin, getAllUsers); //admin only

router.post("/register", upload.single("avatar"), register);

router.get("/me", auth, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

router.post("/login", login);

module.exports = router;
