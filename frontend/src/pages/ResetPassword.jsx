import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import Alert from "../components/Alert";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put(`/auth/reset-password/${token}`, {
        password,
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container auth-card">
        <h2>Reset Password</h2>

        <p className="auth-subtitle">
          Enter a new password for your account.
        </p>

        <Alert
          message={message}
          type={message.includes("successfully") ? "success" : "error"}
        />

        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;