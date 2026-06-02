const LostItem = require("../models/LostItem");

// Create lost item
const createLostItem = async (req, res) => {
  try {
const {
  itemName,
  category,
  description,
  lostLocation,
  lostDate,
  contactNumber,
} = req.body;

const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (
      !itemName ||
      !category ||
      !description ||
      !lostLocation ||
      !lostDate ||
      !contactNumber
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const lostItem = await LostItem.create({
      itemName,
      category,
      description,
      lostLocation,
      lostDate,
      contactNumber,
      image,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Lost item reported successfully",
      lostItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all approved lost items
const getLostItems = async (req, res) => {
  try {
    const { search, category, location } = req.query;

    let filter = { status: "approved" };

    if (search) {
      filter.$or = [
        { itemName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (location) {
      filter.lostLocation = { $regex: location, $options: "i" };
    }

    const lostItems = await LostItem.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(lostItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single lost item
const getLostItemById = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!lostItem) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    res.json(lostItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update lost item
const updateLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);

    if (!lostItem) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    if (lostItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this item" });
    }

    const updatedLostItem = await LostItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Lost item updated successfully",
      lostItem: updatedLostItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete lost item
const deleteLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);

    if (!lostItem) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    if (lostItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    await lostItem.deleteOne();

    res.json({ message: "Lost item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my lost item reports
const getMyLostItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(lostItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLostItem,
  getLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
  getMyLostItems,
};