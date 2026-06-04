import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Alert from "../components/Alert";
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

    try {
      const res = await API.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Registration successful");
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

      <Alert message={message} type={message.includes("successful") ? "success" : "error"} />

      <form onSubmit={handleSubmit}>
       <label>Full Name</label> <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

       <label>Password</label> <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
        <small className="password-hint">
  Password must include uppercase, lowercase, number, and special character.
</small>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;