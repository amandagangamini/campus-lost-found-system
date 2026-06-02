const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const Claim = require("../models/Claim");

// Admin dashboard counts
const getDashboardStats = async (req, res) => {
  try {
    const totalLostItems = await LostItem.countDocuments();
    const totalFoundItems = await FoundItem.countDocuments();
    const totalClaims = await Claim.countDocuments();

    const pendingLostItems = await LostItem.countDocuments({ status: "pending" });
    const pendingFoundItems = await FoundItem.countDocuments({ status: "pending" });

    const resolvedLostItems = await LostItem.countDocuments({ status: "resolved" });
    const resolvedFoundItems = await FoundItem.countDocuments({ status: "resolved" });

    res.json({
      totalLostItems,
      totalFoundItems,
      totalClaims,
      pendingLostItems,
      pendingFoundItems,
      resolvedLostItems,
      resolvedFoundItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin view all lost and found reports
const getAllReports = async (req, res) => {
  try {
    const lostItems = await LostItem.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const foundItems = await FoundItem.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      lostItems,
      foundItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin update lost item status
const updateLostItemStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const lostItem = await LostItem.findById(req.params.id);

    if (!lostItem) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    lostItem.status = status;
    await lostItem.save();

    res.json({
      message: "Lost item status updated successfully",
      lostItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin update found item status
const updateFoundItemStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const foundItem = await FoundItem.findById(req.params.id);

    if (!foundItem) {
      return res.status(404).json({ message: "Found item not found" });
    }

    foundItem.status = status;
    await foundItem.save();

    res.json({
      message: "Found item status updated successfully",
      foundItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin delete lost item
const deleteLostItemByAdmin = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);

    if (!lostItem) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    await lostItem.deleteOne();

    res.json({ message: "Lost item deleted by admin successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin delete found item
const deleteFoundItemByAdmin = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id);

    if (!foundItem) {
      return res.status(404).json({ message: "Found item not found" });
    }

    await foundItem.deleteOne();

    res.json({ message: "Found item deleted by admin successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllReports,
  updateLostItemStatus,
  updateFoundItemStatus,
  deleteLostItemByAdmin,
  deleteFoundItemByAdmin,
};