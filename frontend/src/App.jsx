import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import MyReports from "./pages/MyReports";
import AdminDashboard from "./pages/AdminDashboard";
import ManageReports from "./pages/ManageReports";
import ManageClaims from "./pages/ManageClaims";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import BackButton from "./components/BackButton";


function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />

      <main className={isHome ? "container home-container" : "container page-container"}>
        <BackButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/lost-items" element={<LostItems />} />
          <Route path="/found-items" element={<FoundItems />} />
          <Route path="/report-lost" element={<ReportLost />} />
          <Route path="/report-found" element={<ReportFound />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<ManageReports />} />
          <Route path="/admin/claims" element={<ManageClaims />} />
          <Route path="/profile" element={<Profile />} />
         
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
