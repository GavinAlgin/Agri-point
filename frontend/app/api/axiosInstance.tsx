// src/api/axiosInstance.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.180.137/api/",
  withCredentials: true, // ✅ allow sending/receiving cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// No need to attach token manually
export default API;
