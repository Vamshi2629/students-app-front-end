import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if hosted differently
  withCredentials: true,
});

export default instance;

