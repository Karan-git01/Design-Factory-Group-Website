import { useState } from "react";
import { useApi } from "../../context/ApiContext";

export default function ImageUploadField({ value, onChange, label = "Image" }) {
  const api = useApi();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const result = await api.uploadImage(file);
      onChange(result.url);
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm text-secondary">{label}</label>
      {value && (
        <img
          src={value}
          alt="Preview"
          className="mb-3 h-32 w-full rounded-xl object-cover"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="w-full text-sm text-secondary"
      />
      {uploading && <p className="mt-1 text-xs text-secondary">Uploading...</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}