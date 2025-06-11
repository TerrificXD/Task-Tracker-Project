import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const { projectId } = req.params;

  try {
    const task = new Task({ title, description, project: projectId });
    await task.save();
    res.status(201).json(task);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getTasks = async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.find({ project: projectId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { status, title, description } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status, title, description },
      { new: true }
    );
    res.json(task);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ msg: 'Task deleted' });
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
};
