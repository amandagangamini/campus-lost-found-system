const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
resetPassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, upload.single("profileImage"), updateProfile);
router.get("/profile", protect, getProfile);
router.post("/forgot-password", forgotPassword);


module.exports = router;