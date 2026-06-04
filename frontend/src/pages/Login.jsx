import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Alert from "../components/Alert";
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful");
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

return (
  <div className="auth-page">
    <div className="form-container auth-card">
      <h2>Login</h2>

      <p className="auth-subtitle">
        Access your account to report, search, and manage lost and found items.
      </p>

      <Alert
        message={message}
        type={message.includes("successful") ? "success" : "error"}
      />

      <form onSubmit={handleSubmit}>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
        />

       <label>Password</label>

<div className="password-field">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Enter your password"
    value={formData.password}
    onChange={handleChange}
  />

  <button
    type="button"
    className="password-toggle"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🙈" : "👁️"}
  </button>
</div>
        <button type="submit">Login</button>
      </form>
      
      <p className="auth-switch">
  <a href="/forgot-password">Forgot password?</a>
</p>
      <p className="auth-switch">
        Don&apos;t have an account? <a href="/register">Register here</a>
      </p>
    </div>
  </div>
);
}

export default Login;