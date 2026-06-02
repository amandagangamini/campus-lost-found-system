import { useEffect, useState } from "react";
import API from "../api/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState("");

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load admin dashboard");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {message && <p className="message">{message}</p>}

      {stats && (
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Lost Items</h3>
            <p>{stats.totalLostItems}</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Found Items</h3>
            <p>{stats.totalFoundItems}</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Claims</h3>
            <p>{stats.totalClaims}</p>
          </div>

          <div className="dashboard-card">
            <h3>Pending Lost Items</h3>
            <p>{stats.pendingLostItems}</p>
          </div>

          <div className="dashboard-card">
            <h3>Pending Found Items</h3>
            <p>{stats.pendingFoundItems}</p>
          </div>

          <div className="dashboard-card">
            <h3>Resolved Lost Items</h3>
            <p>{stats.resolvedLostItems}</p>
          </div>

          <div className="dashboard-card">
            <h3>Resolved Found Items</h3>
            <p>{stats.resolvedFoundItems}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;