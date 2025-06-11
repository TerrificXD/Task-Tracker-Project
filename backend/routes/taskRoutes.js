// routes/taskRoutes.js
import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

const router = express.Router();
router.use(auth);

router.post('/projects/:projectId/tasks', createTask);
router.get('/projects/:projectId/tasks', getTasks);
router.put('/tasks/:taskId', updateTask); // Added '/tasks' prefix
router.delete('/tasks/:taskId', deleteTask); // Added '/tasks' prefix

export default router;