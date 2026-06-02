const FoundItem = require("../models/FoundItem");

// Create found item
const createFoundItem = async (req, res) => {
  try {
const {
  itemName,
  category,
  description,
  foundLocation,
  foundDate,
  contactNumber,
} = req.body;

const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (
      !itemName ||
      !category ||
      !description ||
      !foundLocation ||
      !foundDate ||
      !contactNumber
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const foundItem = await FoundItem.create({
      itemName,
      category,
      description,
      foundLocation,
      foundDate,
      contactNumber,
      image,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Found item reported successfully",
      foundItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all approved found items
const getFoundItems = async (req, res) => {
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
      filter.foundLocation = { $regex: location, $options: "i" };
    }

    const foundItems = await FoundItem.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(foundItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single found item
const getFoundItemById = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!foundItem) {
      return res.status(404).json({ message: "Found item not found" });
    }

    res.json(foundItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update found item
const updateFoundItem = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id);

    if (!foundItem) {
      return res.status(404).json({ message: "Found item not found" });
    }

    if (foundItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this item" });
    }

    const updatedFoundItem = await FoundItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Found item updated successfully",
      foundItem: updatedFoundItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete found item
const deleteFoundItem = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id);

    if (!foundItem) {
      return res.status(404).json({ message: "Found item not found" });
    }

    if (foundItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    await foundItem.deleteOne();

    res.json({ message: "Found item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my found item reports
const getMyFoundItems = async (req, res) => {
  try {
    const foundItems = await FoundItem.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(foundItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFoundItem,
  getFoundItems,
  getFoundItemById,
  updateFoundItem,
  deleteFoundItem,
  getMyFoundItems,
};