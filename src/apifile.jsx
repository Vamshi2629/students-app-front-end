// src/api.js
import axios from "axios";

const apifile = axios.create({
  baseURL: "https://api.cloudinary.com",
});

apifile.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apifile;
