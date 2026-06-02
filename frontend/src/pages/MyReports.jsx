import { useEffect, useState } from "react";
import API from "../api/api";
import ItemImage from "../components/ItemImage";
import StatusBadge from "../components/StatusBadge";

function MyReports() {
  const [lostReports, setLostReports] = useState([]);
  const [foundReports, setFoundReports] = useState([]);

  const fetchMyReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const lostRes = await API.get("/lost-items/my-reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const foundRes = await API.get("/found-items/my-reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLostReports(lostRes.data);
      setFoundReports(foundRes.data);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch my reports");
    }
  };

  useEffect(() => {
    fetchMyReports();
  }, []);

  return (
    <div>
      <h2>My Reports</h2>

      <h3>My Lost Item Reports</h3>

      <div className="item-grid">
        {lostReports.length === 0 ? (
          <p>No lost item reports found.</p>
        ) : (
          lostReports.map((item) => (
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
                <strong>Lost Location:</strong> {item.lostLocation}
              </p>

              <p>
                <strong>Date:</strong> {item.lostDate?.substring(0, 10)}
              </p>

              <p>
                <strong>Contact:</strong> {item.contactNumber}
              </p>

              <p>
                <strong>Status:</strong> <StatusBadge status={item.status} />
              </p>
            </div>
          ))
        )}
      </div>

      <h3 className="section-title">My Found Item Reports</h3>

      <div className="item-grid">
        {foundReports.length === 0 ? (
          <p>No found item reports found.</p>
        ) : (
          foundReports.map((item) => (
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
                <strong>Found Location:</strong> {item.foundLocation}
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyReports;