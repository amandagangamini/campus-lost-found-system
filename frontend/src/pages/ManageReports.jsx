import { useEffect, useState } from "react";
import API from "../api/api";

function ManageReports() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchReports = async () => {
    try {
      const res = await API.get("/admin/reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLostItems(res.data.lostItems);
      setFoundItems(res.data.foundItems);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load reports");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const updateLostStatus = async (id, status) => {
    try {
      await API.put(
        `/admin/lost-items/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Lost item status updated successfully");
      fetchReports();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update status");
    }
  };

  const updateFoundStatus = async (id, status) => {
    try {
      await API.put(
        `/admin/found-items/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Found item status updated successfully");
      fetchReports();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update status");
    }
  };

  const deleteLostItem = async (id) => {
    try {
      await API.delete(`/admin/lost-items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Lost item deleted successfully");
      fetchReports();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete item");
    }
  };

  const deleteFoundItem = async (id) => {
    try {
      await API.delete(`/admin/found-items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Found item deleted successfully");
      fetchReports();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete item");
    }
  };

  return (
    <div>
      <h2>Manage Reports</h2>

      {message && <p className="message">{message}</p>}

      <h3>Lost Item Reports</h3>

      <div className="admin-list">
        {lostItems.length === 0 ? (
          <p>No lost item reports found.</p>
        ) : (
          lostItems.map((item) => (
            <div className="admin-report-card" key={item._id}>
              {item.image && (
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.itemName}
                />
              )}

              <div>
                <h3>{item.itemName}</h3>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Location:</strong> {item.lostLocation}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>User:</strong> {item.user?.name}</p>

                <div className="admin-actions">
                  <button className="approve-btn" onClick={() => updateLostStatus(item._id, "approved")}>
  Approve
</button>

<button className="reject-btn" onClick={() => updateLostStatus(item._id, "rejected")}>
  Reject
</button>

<button className="resolve-btn" onClick={() => updateLostStatus(item._id, "resolved")}>
  Resolve
</button>

<button className="delete-btn" onClick={() => deleteLostItem(item._id)}>
  Delete
</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <h3 className="section-title">Found Item Reports</h3>

      <div className="admin-list">
        {foundItems.length === 0 ? (
          <p>No found item reports found.</p>
        ) : (
          foundItems.map((item) => (
            <div className="admin-report-card" key={item._id}>
              {item.image && (
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.itemName}
                />
              )}

              <div>
                <h3>{item.itemName}</h3>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Location:</strong> {item.foundLocation}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>User:</strong> {item.user?.name}</p>

                <div className="admin-actions">
                    <button
    className="approve-btn"
    onClick={() => updateFoundStatus(item._id, "approved")}
  >
    Approve
  </button>

  <button
    className="reject-btn"
    onClick={() => updateFoundStatus(item._id, "rejected")}
  >
    Reject
  </button>

  <button
    className="resolve-btn"
    onClick={() => updateFoundStatus(item._id, "resolved")}
  >
    Resolve
  </button>

  <button
    className="delete-btn"
    onClick={() => deleteFoundItem(item._id)}
  >
    Delete
  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageReports;