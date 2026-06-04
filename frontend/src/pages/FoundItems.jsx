import { useEffect, useState } from "react";
import API from "../api/api";
import ItemImage from "../components/ItemImage";
import StatusBadge from "../components/StatusBadge";
import Alert from "../components/Alert";

function FoundItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [isClaimSubmitting, setIsClaimSubmitting] = useState(false);

  const [claimData, setClaimData] = useState({
    foundItem: "",
    message: "",
    proofDescription: "",
  });

  const fetchFoundItems = async () => {
    try {
      const res = await API.get(
        `/found-items?search=${search}&location=${location}`
      );
      setItems(res.data);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch found items");
    }
  };

  useEffect(() => {
    fetchFoundItems();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFoundItems();
  };

  const openClaimForm = (itemId) => {
    setClaimData({
      foundItem: itemId,
      message: "",
      proofDescription: "",
    });
    setMessage("");
  };

  const handleClaimChange = (e) => {
    setClaimData({
      ...claimData,
      [e.target.name]: e.target.value,
    });
  };

  const submitClaim = async (e) => {
    e.preventDefault();

    if (isClaimSubmitting) return;
setIsClaimSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please login before claiming an item");
        return;
      }

      await API.post("/claims", claimData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Claim request sent successfully");

      setClaimData({
        foundItem: "",
        message: "",
        proofDescription: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send claim request");
    }finally {
  setIsClaimSubmitting(false);
}
  };

  return (
    <div>
      <h2>Found Items</h2>

      <Alert
        message={message}
        type={message.includes("successfully") ? "success" : "error"}
      />

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {claimData.foundItem && (
        <div className="claim-box">
          <h3>Claim This Item</h3>

          <form onSubmit={submitClaim}>
            <textarea
              name="message"
              placeholder="Message"
              value={claimData.message}
              onChange={handleClaimChange}
            ></textarea>

            <textarea
              name="proofDescription"
              placeholder="Proof description. Example: It has my name sticker."
              value={claimData.proofDescription}
              onChange={handleClaimChange}
            ></textarea>

            <button type="submit">Send Claim Request</button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                setClaimData({
                  foundItem: "",
                  message: "",
                  proofDescription: "",
                })
              }
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="item-grid">
        {items.length === 0 ? (
          <p>No approved found items available.</p>
        ) : (
          items.map((item) => (
            <div className="item-card" key={item._id}>
              <ItemImage src={item.image} alt={item.itemName} />

              <h3>{item.itemName}</h3>

              <p>
                <strong>Category:</strong> {item.category}
              </p>

              <p>
                <strong>Description:</strong> {item.description}
              </p>

              <p>
                <strong>Location:</strong> {item.foundLocation}
              </p>

              <p>
                <strong>Date:</strong> {item.foundDate?.substring(0, 10)}
              </p>

              <p>
                <strong>Contact:</strong> {item.contactNumber}
              </p>

              <p>
                <strong>Status:</strong> <StatusBadge status={item.status} />
              </p>

              <button type="submit" disabled={isClaimSubmitting}>
  {isClaimSubmitting ? "Sending..." : "Send Claim Request"}
</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FoundItems;