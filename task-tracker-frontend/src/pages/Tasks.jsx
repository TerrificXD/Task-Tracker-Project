import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import styles from './Tasks.module.css';

export default function Tasks() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [statusOptions] = useState(['To Do', 'In Progress', 'Done']);
  const [error, setError] = useState(''); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to track loading

  const fetchTasks = async () => {
    setLoading(true); // Indicate loading has started
    setError(''); // Clear any previous errors
    try {
      const res = await API.get(`/projects/${projectId}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tasks.'); // Set an error message
    } finally {
      setLoading(false); // Indicate loading has finished
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post(`/projects/${projectId}/tasks`, formData);
      setFormData({ title: '', description: '' });
      // Optimistically update the tasks list
      setTasks(prevTasks => [...prevTasks, res.data]);
    } catch (err) {
      console.error(err);
      setError('Failed to create task.');
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    setError('');
    setLoading(true);
    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
      // Optimistically update the task status in the list
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error(err);
      setError('Failed to update task status.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setError('');
    setLoading(true);
    try {
      await API.delete(`/tasks/${taskId}`);
      // Optimistically remove the task from the list
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error(err);
      setError('Failed to delete task.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <div className={styles.tasksContainer}>
      <h1 className={styles.title}>Tasks</h1>
      {error && <p className={styles.error}>{error}</p>} {/* Display errors */}

      {/* Task Form */}
      <form onSubmit={handleCreateTask} className={styles.taskForm}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className={styles.input}
          required
        />
        <button className={styles.addTaskButton} disabled={loading}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      {/* Task List */}
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div key={task._id} className={styles.taskCard}>
            <h3 className={styles.taskTitle}>{task.title}</h3>
            <p className={styles.taskDescription}>{task.description}</p>
            <p className={styles.taskStatus}>
              Status: <span className={styles.taskStatus}>{task.status}</span>
            </p>
            <div className={styles.statusButtons}>
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => updateTaskStatus(task._id, status)}
                  className={`${styles.statusButton} ${
                    task.status === status
                      ? styles.statusButtonActive
                      : styles.statusButtonInactive
                  }`}
                  disabled={loading}
                >
                  {status}
                </button>
              ))}
              <button
                onClick={() => deleteTask(task._id)}
                className={styles.deleteButton}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}