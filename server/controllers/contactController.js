import ContactSubmission from "../models/ContactSubmission.js";
import { sendContactNotification } from "../config/mailer.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(req, res) {
  try {
    const { name, email, phone, message, consent } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }
    if (!consent) {
      return res.status(400).json({ error: "You must agree to the privacy policy." });
    }

    const submission = await ContactSubmission.create({ name, email, phone, message, consent });

    sendContactNotification(submission);

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

export async function getAllSubmissions(req, res) {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch submissions." });
  }
}

export async function updateSubmissionStatus(req, res) {
  try {
    const { status } = req.body;
    const validStatuses = ["new", "contacted", "closed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!submission) return res.status(404).json({ error: "Submission not found." });
    res.json(submission);
  } catch (err) {
    res.status(400).json({ error: "Invalid submission ID." });
  }
}

export async function deleteSubmission(req, res) {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!submission) return res.status(404).json({ error: "Submission not found." });
    res.json({ success: true, message: "Submission deleted." });
  } catch (err) {
    res.status(400).json({ error: "Invalid submission ID." });
  }
}