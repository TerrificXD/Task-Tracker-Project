import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Important
import dashboardImg from '../assets/dashboard_summary.png';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Welcome to Task Tracker</h1>
      <p className={styles.description}>
        Track your projects and manage tasks efficiently.
      </p>
      <div className={styles.getStartedSection}>
        <div>
          <h2 className={styles.getStartedTitle}>
            Get started by creating your first project.
          </h2>
          <Link to="/projects" className={styles.projectLink}>
            Go to Projects →
          </Link>
        </div>
        <img
          src={dashboardImg}
          alt="Dashboard Illustration"
          className={styles.illustration}
        />
      </div>
    </div>
  );
}
