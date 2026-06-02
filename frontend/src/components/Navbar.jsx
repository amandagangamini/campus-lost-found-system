import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setOpenMenu(false);
  };

  return (
    <nav className="navbar">
      <h2>Campus Lost & Found</h2>

      <button className="menu-btn" onClick={() => setOpenMenu(!openMenu)}>
        ☰
      </button>

      <div className={openMenu ? "nav-links nav-open" : "nav-links"}>
        <Link to="/" onClick={() => setOpenMenu(false)}>Home</Link>

        <div className="dropdown">
          <span>Items ▾</span>
          <div className="dropdown-menu">
            <Link to="/lost-items" onClick={() => setOpenMenu(false)}>Lost Items</Link>
            <Link to="/found-items" onClick={() => setOpenMenu(false)}>Found Items</Link>
          </div>
        </div>

        {token && (
          <div className="dropdown">
            <span>Report ▾</span>
            <div className="dropdown-menu">
              <Link to="/report-lost" onClick={() => setOpenMenu(false)}>Report Lost</Link>
              <Link to="/report-found" onClick={() => setOpenMenu(false)}>Report Found</Link>
            </div>
          </div>
        )}

        {token && (
          <Link to="/my-reports" onClick={() => setOpenMenu(false)}>My Reports</Link>
        )}

        {token && user?.role === "admin" && (
          <div className="dropdown">
            <span>Admin ▾</span>
            <div className="dropdown-menu">
              <Link to="/admin" onClick={() => setOpenMenu(false)}>Dashboard</Link>
              <Link to="/admin/reports" onClick={() => setOpenMenu(false)}>Manage Reports</Link>
              <Link to="/admin/claims" onClick={() => setOpenMenu(false)}>Manage Claims</Link>
            </div>
          </div>
        )}

        {!token ? (
          <>
            <Link to="/login" onClick={() => setOpenMenu(false)}>Login</Link>
            <Link to="/register" onClick={() => setOpenMenu(false)}>Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;