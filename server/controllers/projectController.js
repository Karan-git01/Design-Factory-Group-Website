import Project from "../models/Project.js";

export async function getAllProjects(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 0; // 0 = no limit, return all

    let query = Project.find({ published: true }).sort({ order: 1, createdAt: -1 });
    if (limit > 0) query = query.limit(limit);

    const projects = await query;
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects." });
  }
}

export async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found." });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: "Invalid project ID." });
  }
}

export async function createProject(req, res) {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateProject(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: "Project not found." });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found." });
    res.json({ success: true, message: "Project deleted." });
  } catch (err) {
    res.status(400).json({ error: "Invalid project ID." });
  }
}