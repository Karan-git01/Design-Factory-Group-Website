import { createContext, useContext, useCallback } from "react";

const ApiContext = createContext(null);

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function ApiProvider({ children }) {
  const request = useCallback(async (endpoint, options = {}) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      credentials: "include", // sends the admin cookie automatically when present
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const message = data?.error || data?.errors?.join(", ") || "Something went wrong.";
      throw new Error(message);
    }

    return data;
  }, []);

  const api = {
    get: (endpoint) => request(endpoint),
    post: (endpoint, body) =>
      request(endpoint, { method: "POST", body: JSON.stringify(body) }),
    put: (endpoint, body) =>
      request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
    patch: (endpoint, body) =>
      request(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
    del: (endpoint) => request(endpoint, { method: "DELETE" }),
    uploadImage: async (file) => {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        credentials: "include",
        body: formData, // no Content-Type header — browser sets the correct multipart boundary itself
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Upload failed.");
      return data;
    },
  };

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("useApi must be used within an ApiProvider");
  return ctx;
}