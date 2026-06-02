const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllReports,
  updateLostItemStatus,
  updateFoundItemStatus,
  deleteLostItemByAdmin,
  deleteFoundItemByAdmin,
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin dashboard
router.get("/dashboard", protect, adminOnly, getDashboardStats);

// Admin view all reports
router.get("/reports", protect, adminOnly, getAllReports);

// Admin update lost item status
router.put("/lost-items/:id/status", protect, adminOnly, updateLostItemStatus);

// Admin update found item status
router.put("/found-items/:id/status", protect, adminOnly, updateFoundItemStatus);

// Admin delete reports
router.delete("/lost-items/:id", protect, adminOnly, deleteLostItemByAdmin);
router.delete("/found-items/:id", protect, adminOnly, deleteFoundItemByAdmin);

module.exports = router;