// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { token, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          TaskTracker
        </Link>
        <div className={styles.navLinks}>
          {token ? (
            <>
              <Link to="/projects" className={styles.projectsLink}>
                Projects
              </Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.loginLink}>
                Login
              </Link>
              <Link to="/signup" className={styles.signupLink}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}