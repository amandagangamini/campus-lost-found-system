import { useState } from "react";
import API from "../api/api";

function ReportFound() {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    foundLocation: "",
    foundDate: "",
    contactNumber: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("itemName", formData.itemName);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("foundLocation", formData.foundLocation);
      data.append("foundDate", formData.foundDate);
      data.append("contactNumber", formData.contactNumber);

      if (image) {
        data.append("image", image);
      }

      await API.post("/found-items", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Found item reported successfully");

      setFormData({
        itemName: "",
        category: "",
        description: "",
        foundLocation: "",
        foundDate: "",
        contactNumber: "",
      });

      setImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to report found item");
    }
  };

  return (
    <div className="form-container">
      <h2>Report Found Item</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
       <label>Item Name</label>
<input
  type="text"
  name="itemName"
  placeholder="Enter item name"
  value={formData.itemName}
  onChange={handleChange}
/>

<label>Category</label>
<input
  type="text"
  name="category"
  placeholder="Example: ID Card, Electronics, Books"
  value={formData.category}
  onChange={handleChange}
/>

<label>Description</label>
<textarea
  name="description"
  placeholder="Describe the lost item"
  value={formData.description}
  onChange={handleChange}
></textarea>

        <label>Found Location</label>
<input
  type="text"
  name="foundLocation"
  placeholder="Example: Cafeteria, Lab, Lecture Hall"
  value={formData.foundLocation}
  onChange={handleChange}
/>

<label>Found Date</label>
<input
  type="date"
  name="foundDate"
  value={formData.foundDate}
  onChange={handleChange}
/>

        <label>Contact Number</label>
<input
  type="text"
  name="contactNumber"
  placeholder="Enter contact number"
  value={formData.contactNumber}
  onChange={handleChange}
/>

<label>Item Image</label>
<input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">Submit Found Item</button>
      </form>
    </div>
  );
}

export default ReportFound;