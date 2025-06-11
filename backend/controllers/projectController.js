import Project from '../models/project.js';

export const createProject = async (req, res) => {
  const { title } = req.body;
  try {
    const projectCount = await Project.countDocuments({ user: req.user.id });
    if (projectCount >= 4) {
      return res.status(400).json({ msg: 'Maximum 4 projects allowed' });
    }

    const project = new Project({ title, user: req.user.id });
    await project.save();
    res.status(201).json(project);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
};
