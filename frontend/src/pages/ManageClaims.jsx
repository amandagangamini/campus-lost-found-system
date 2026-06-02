import { useEffect, useState } from "react";
import API from "../api/api";

function ManageClaims() {
  const [claims, setClaims] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchClaims = async () => {
    try {
      const res = await API.get("/claims", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClaims(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load claims");
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const updateClaimStatus = async (id, status) => {
    try {
      await API.put(
        `/claims/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`Claim ${status} successfully`);
      fetchClaims();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update claim");
    }
  };

  return (
    <div>
      <h2>Manage Claim Requests</h2>

      {message && <p className="message">{message}</p>}

      <div className="admin-list">
        {claims.length === 0 ? (
          <p>No claim requests found.</p>
        ) : (
          claims.map((claim) => (
            <div className="admin-report-card" key={claim._id}>
              {claim.foundItem?.image && (
                <img
                  src={`http://localhost:5000${claim.foundItem.image}`}
                  alt={claim.foundItem.itemName}
                />
              )}

              <div>
                <h3>{claim.foundItem?.itemName}</h3>

                <p>
                  <strong>Claim User:</strong> {claim.claimUser?.name}
                </p>

                <p>
                  <strong>Email:</strong> {claim.claimUser?.email}
                </p>

                <p>
                  <strong>Message:</strong> {claim.message}
                </p>

                <p>
                  <strong>Proof:</strong> {claim.proofDescription}
                </p>

                <p>
                  <strong>Status:</strong> {claim.status}
                </p>

                <div className="admin-actions">
                  <button className="approve-btn" onClick={() => updateClaimStatus(claim._id, "approved")}>
  Approve
</button>

<button className="reject-btn" onClick={() => updateClaimStatus(claim._id, "rejected")}>
  Reject
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

export default ManageClaims;