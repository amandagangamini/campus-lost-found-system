import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import Alert from "../components/Alert";

function ForgotPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/forgot-password", {
        email: formData.email,
        newPassword: formData.newPassword,
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container auth-card">
        <h2>Forgot Password</h2>

        <p className="auth-subtitle">
          Enter your registered email and create a new password.
        </p>

        <Alert
          message={message}
          type={message.includes("successfully") ? "success" : "error"}
        />

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your registered email"
            value={formData.email}
            onChange={handleChange}
          />

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

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit">Change Password</button>
        </form>

        <p className="auth-switch">
          Remember your password? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;