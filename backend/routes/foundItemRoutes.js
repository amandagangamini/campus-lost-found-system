const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createFoundItem,
  getFoundItems,
  getFoundItemById,
  updateFoundItem,
  deleteFoundItem,
  getMyFoundItems,
} = require("../controllers/foundItemController");

const { protect } = require("../middleware/authMiddleware");

// Create found item report
router.post("/", protect, upload.single("image"), createFoundItem);

// Get all approved found items
router.get("/", getFoundItems);

// Get my found item reports
router.get("/my-reports", protect, getMyFoundItems);

// Get single found item
router.get("/:id", getFoundItemById);

// Update found item
router.put("/:id", protect, updateFoundItem);

// Delete found item
router.delete("/:id", protect, deleteFoundItem);

module.exports = router;