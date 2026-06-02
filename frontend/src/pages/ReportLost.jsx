import { useState } from "react";
import API from "../api/api";
import Alert from "../components/Alert";
function ReportLost() {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    lostLocation: "",
    lostDate: "",
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
      data.append("lostLocation", formData.lostLocation);
      data.append("lostDate", formData.lostDate);
      data.append("contactNumber", formData.contactNumber);

      if (image) {
        data.append("image", image);
      }

      await API.post("/lost-items", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Lost item reported successfully");

      setFormData({
        itemName: "",
        category: "",
        description: "",
        lostLocation: "",
        lostDate: "",
        contactNumber: "",
      });

      setImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to report lost item");
    }
  };

  return (
    <div className="form-container">
      <h2>Report Lost Item</h2>

      <Alert
  message={message}
  type={message.includes("successfully") ? "success" : "error"}
/>

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

<label>Lost Location</label>
<input
  type="text"
  name="lostLocation"
  placeholder="Example: Library, Cafeteria"
  value={formData.lostLocation}
  onChange={handleChange}
/>

<label>Lost Date</label>
<input
  type="date"
  name="lostDate"
  value={formData.lostDate}
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

        <button type="submit">Submit Lost Item</button>
      </form>
    </div>
  );
}

export default ReportLost;