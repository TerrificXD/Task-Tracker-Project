// src/components/DashboardLayout.jsx
import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./DashboardLayout.module.css";

const DashboardLayout = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <h2 className={styles.logo}>Task Tracker</h2>
        <ul className={styles.navList}>
          <li>
            <Link to="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/projects" className={styles.navLink}>
              Projects
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
