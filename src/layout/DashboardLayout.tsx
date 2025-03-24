import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/Topbar";
import styles from "./DashboardLayout.module.scss";
import PSlogo from "../assets/PS Text PNG 5.png";

const DashboardLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageContent = document.querySelector(`.${styles.pageContent}`); // Select scrolling div

    if (pageContent) {
      pageContent.scrollTo(0, 0); // Scroll inside pageContent
    } else {
      window.scrollTo(0, 0); // Fallback to window scroll
    }
  }, [pathname]); 
  
  return (
    <div className={styles.dashboardLayout}>
      {/* TopBar */}
      <TopBar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
      {/* Powered By Footer */}
      <div className={styles.poweredBy}>
        Powered by <img src={PSlogo} alt="PS Logo" />
      </div>
    </div>
  );
};

export default DashboardLayout;
