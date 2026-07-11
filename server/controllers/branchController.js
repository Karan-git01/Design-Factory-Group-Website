import Branch from "../models/Branch.js";

export async function getAllBranches(req, res) {
  try {
    const branches = await Branch.find().sort({ isMain: -1, name: 1 });
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch branches." });
  }
}

export async function getBranchBySlug(req, res) {
  try {
    const branch = await Branch.findOne({ slug: req.params.slug });
    if (!branch) return res.status(404).json({ error: "Branch not found." });
    res.json(branch);
  } catch (err) {
    res.status(400).json({ error: "Invalid request." });
  }
}

export async function createBranch(req, res) {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json(branch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateBranch(req, res) {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!branch) return res.status(404).json({ error: "Branch not found." });
    res.json(branch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteBranch(req, res) {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) return res.status(404).json({ error: "Branch not found." });
    res.json({ success: true, message: "Branch deleted." });
  } catch (err) {
    res.status(400).json({ error: "Invalid branch ID." });
  }
}