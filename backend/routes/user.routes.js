const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const upload = require("../middlewares/upload.middleware");

router.get("/all", auth, isAdmin, getAllUsers); //admin only
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);

module.exports = router;
