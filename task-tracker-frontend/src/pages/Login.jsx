// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api'; // Assuming this is your API service
import LoginIllustration from '../assets/login_illustration.png';
import styles from './Login.module.css';

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/login', credentials);
      loginUser(res.data.token);
      navigate('/projects');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.illustrationContainer}>
          <img
            src={LoginIllustration}
            alt="Login"
            className={styles.illustration}
          />
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.description}>
            Log in to your account to manage tasks.
          </p>
          {error && <p className={styles.error}>{error}</p>}
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className={styles.input}
            required
          />

          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>

          <p className={styles.signupLink}>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}