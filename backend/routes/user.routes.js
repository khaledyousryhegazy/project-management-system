const express = require("express");
const {
  getAllUsers,
  register,
  login,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/all", getAllUsers); //admin only //login only
router.post("/register", register);
router.post("/login", login);

module.exports = router;
