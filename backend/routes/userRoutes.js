const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

//console.log("protect:", protect);
//console.log("getUserProfile:", getUserProfile);

//This is protected route
router.get("/profile", protect, getUserProfile);

module.exports = router;
