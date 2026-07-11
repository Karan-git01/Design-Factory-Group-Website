import cloudinary from "../config/cloudinary.js";

export async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "design-factory-group",
            transformation: [{ width: 1920, crop: "limit" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

    const result = await uploadFromBuffer();
    res.status(201).json({ url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload error:", err); // <-- new: logs the real reason
    res.status(500).json({ error: "Image upload failed." });
  }
}