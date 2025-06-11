// src/pages/Projects.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import styles from './Projects.module.css';
import dashboard_analytics from '../assets/dashboard_analytics.jpg';

export default function Projects() {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Redirect to login if token missing
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  // ✅ Fetch projects from backend
  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(
        res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch (err) {
      console.error(err);
      setError('Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch projects on first load
  useEffect(() => {
    fetchProjects();
  }, [token]);

  // ✅ Create new project
  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post(
        '/projects',
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      await fetchProjects(); // Refresh list
    } catch (err) {
      console.error(err);
      setError('Could not create project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.projectsContainer}>
      <h1 className={styles.title}>Your Projects</h1>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleCreate} className={styles.createForm}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New project title"
          className={styles.input}
          required
        />
        <button
          type="submit"
          className={styles.createButton}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Add Project'}
        </button>
      </form>

      {loading && projects.length === 0 && (
        <p className={styles.loading}>Loading projects...</p>
      )}

      {projects.length === 0 && !loading ? (
        <div className={styles.noProjects}>
          <p className={styles.noProjectsText}>
            No projects yet. Create one to get started!
          </p>
          <img
            src={dashboard_analytics}
            alt="No projects"
            className={styles.noProjectsImage}
          />
        </div>
      ) : (
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project._id} className={styles.projectCard}>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectCreatedAt}>
                Created:{' '}
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => navigate(`/tasks/${project._id}`)}
                className={styles.projectLink}
              >
                View Tasks →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
