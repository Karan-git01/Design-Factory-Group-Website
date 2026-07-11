import JobListing from "../models/JobListing.js";

export async function getAllJobs(req, res) {
  try {
    const jobs = await JobListing.find({ published: true }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job listings." });
  }
}

export async function createJob(req, res) {
  try {
    const job = await JobListing.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateJob(req, res) {
  try {
    const job = await JobListing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) return res.status(404).json({ error: "Job listing not found." });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteJob(req, res) {
  try {
    const job = await JobListing.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: "Job listing not found." });
    res.json({ success: true, message: "Job listing deleted." });
  } catch (err) {
    res.status(400).json({ error: "Invalid job ID." });
  }
}