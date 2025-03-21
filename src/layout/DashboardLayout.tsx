import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/Topbar";
import styles from "./DashboardLayout.module.scss";
import PSlogo from "../assets/PS Text PNG 5.png";

const DashboardLayout = () => {
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
