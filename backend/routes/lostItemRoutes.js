const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createLostItem,
  getLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
  getMyLostItems,
} = require("../controllers/lostItemController");

const { protect } = require("../middleware/authMiddleware");

// Create lost item report
router.post("/", protect, upload.single("image"), createLostItem);

// Get all approved lost items
router.get("/", getLostItems);

router.get("/my-reports", protect, getMyLostItems);

// Get single lost item
router.get("/:id", getLostItemById);

// Update lost item
router.put("/:id", protect, updateLostItem);

// Delete lost item
router.delete("/:id", protect, deleteLostItem);

module.exports = router;