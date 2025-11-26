import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    console.log("Retrieved token from localStorage:", token);
    if (token) {
        console.log("Attaching token to request");
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
