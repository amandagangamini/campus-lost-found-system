import { useEffect, useState } from "react";
import API from "../api/api";
import Alert from "../components/Alert";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    profileImage: "",
    currentPassword: "",
    newPassword: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        name: res.data.user.name,
        email: res.data.user.email,
        role: res.data.user.role,
        profileImage: res.data.user.profileImage || "",
        currentPassword: "",
        newPassword: "",
      });

      if (res.data.user.profileImage) {
        setPreview(`http://localhost:5000${res.data.user.profileImage}`);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      setPreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("currentPassword", formData.currentPassword);
      data.append("newPassword", formData.newPassword);

      if (image) {
        data.append("profileImage", image);
      }

      const res = await API.put("/auth/profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Profile updated successfully");

      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        profileImage: res.data.user.profileImage,
      });

      if (res.data.user.profileImage) {
        setPreview(`http://localhost:5000${res.data.user.profileImage}`);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="profile-page full-profile-page">
      <div className="profile-card full-profile-card">
        <div className="profile-left">
          <div className="profile-photo-wrapper">
            {preview ? (
              <img src={preview} alt="Profile" className="profile-photo" />
            ) : (
              <div className="profile-avatar">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>

          <h2>{formData.name || "User Profile"}</h2>
          <p>{formData.email}</p>

          <span className="profile-role">{formData.role}</span>

          <div className="profile-info-box">
            <h3>Account Details</h3>
            <p>
              Update your personal information, profile photo, and password
              securely.
            </p>
          </div>
        </div>

        <div className="profile-right">
          <h2>My Profile</h2>

          <p className="auth-subtitle">
            Manage your account information and security settings.
          </p>

          <Alert
            message={message}
            type={message.includes("successfully") ? "success" : "error"}
          />

          <form onSubmit={handleSubmit}>
            <div className="profile-form-grid">
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Role</label>
                <input type="text" value={formData.role} disabled />
              </div>

              <div>
                <label>Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div>
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                <small className="password-hint">
  Use at least 8 characters with uppercase, lowercase, number, and special character.
</small>
              </div>
            </div>

            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;