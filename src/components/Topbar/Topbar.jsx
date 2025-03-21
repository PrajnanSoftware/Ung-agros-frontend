import "./topbar.scss";
import { FaBell, FaUser, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import {axiosInstance} from "../../utils/axiosInstance";

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/users/profile");

        if (response.data?.data?.user) {
          setUser(response.data.data.user);
        } else {
          console.error("Unexpected API response format", response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const toggleNotifications = () => setShowNotifications(!showNotifications);
  const toggleProfile = () => setShowProfile(!showProfile);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/users/logout");

      if (response.status === 200) {
        setUser(null);
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="topbar">
      <a href="/dashboard/overview" className="logo">
        Admin Dashboard
      </a>
      <div className="actions">
        <FaBell className="icon" onClick={toggleNotifications} />
        <FaUser className="icon" onClick={toggleProfile} />
      </div>

      {showNotifications && (
        <div className="overlay">
          <div className="modal">
            <FaTimes className="close-icon" onClick={toggleNotifications} />
            <h3>Notifications</h3>
            <ul>
              <li>New order received</li>
              <li>Product stock running low</li>
              <li>Shipping update available</li>
            </ul>
          </div>
        </div>
      )}

      {showProfile && (
        <div className="overlay" onClick={() => setShowProfile(false)}>
          <div className="modal">
            <FaTimes className="close-icon" onClick={toggleProfile} />
            <h3>User Profile</h3>
            {user ? (
              <>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
