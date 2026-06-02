import { useEffect, useState } from "react";
import API from "../api/api";
import ItemImage from "../components/ItemImage";
import StatusBadge from "../components/StatusBadge";
function LostItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const fetchLostItems = async () => {
    try {
      const res = await API.get(
        `/lost-items?search=${search}&location=${location}`
      );
      setItems(res.data);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch lost items");
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLostItems();
  };

  return (
    <div>
      <h2>Lost Items</h2>

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

      <div className="item-grid">
        {items.length === 0 ? (
          <p>No approved lost items available.</p>
        ) : (
          items.map((item) => (
            <div className="item-card" key={item._id}>
              {item.image && <ItemImage src={item.image} alt={item.itemName} />}

              <h3>{item.itemName}</h3>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Location:</strong> {item.lostLocation}</p>
              <p><strong>Date:</strong> {item.lostDate?.substring(0, 10)}</p>
              <p><strong>Contact:</strong> {item.contactNumber}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LostItems;