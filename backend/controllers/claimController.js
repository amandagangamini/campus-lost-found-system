const Claim = require("../models/Claim");
const FoundItem = require("../models/FoundItem");

// Create claim request
const createClaim = async (req, res) => {
  try {
    const { foundItem, message, proofDescription } = req.body;

    if (!foundItem || !message || !proofDescription) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const itemExists = await FoundItem.findById(foundItem);

    if (!itemExists) {
      return res.status(404).json({ message: "Found item not found" });
    }

    const existingClaim = await Claim.findOne({
  foundItem,
  claimUser: req.user._id,
});

if (existingClaim) {
  return res.status(400).json({
    message: "You have already submitted a claim for this item",
  });
}

    const claim = await Claim.create({
      foundItem,
      claimUser: req.user._id,
      message,
      proofDescription,
    });

    res.status(201).json({
      message: "Claim request sent successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's claims
const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimUser: req.user._id })
      .populate("foundItem")
      .populate("claimUser", "name email")
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin get all claims
const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("foundItem")
      .populate("claimUser", "name email")
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin update claim status
const updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    claim.status = status;
    await claim.save();

    res.json({
      message: "Claim status updated successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClaim,
  getMyClaims,
  getAllClaims,
  updateClaimStatus,
};