const express = require("express");
const router = express.Router();

const {
  createClaim,
  getMyClaims,
  getAllClaims,
  updateClaimStatus,
} = require("../controllers/claimController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// User send claim request
router.post("/", protect, createClaim);

// User view own claim requests
router.get("/my-claims", protect, getMyClaims);

// Admin view all claim requests
router.get("/", protect, adminOnly, getAllClaims);

// Admin approve / reject claim request
router.put("/:id/status", protect, adminOnly, updateClaimStatus);

module.exports = router;