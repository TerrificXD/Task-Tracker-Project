// src/components/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api'; // Assuming this is your API service
import SignupIllustration from '../assets/signup_illustration.png';
import styles from './Signup.module.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <img
          src={SignupIllustration}
          alt="Signup"
          className={styles.illustration}
        />
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <h2 className={styles.title}>Signup</h2>
          {error && <p className={styles.error}>{error}</p>}
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            name="country"
            placeholder="Country"
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button
            type="submit"
            className={styles.registerButton}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Register'}
          </button>
          <p className={styles.loginLink}>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}