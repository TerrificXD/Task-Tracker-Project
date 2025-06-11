import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import { createProject, getProjects } from '../controllers/projectController.js';

const router = express.Router();
router.use(auth);

router.post('/', createProject);
router.get('/', getProjects);

export default router;
