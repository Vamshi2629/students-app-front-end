// src/api/authApi.js
const BASE_URL = "http://localhost:5000/api/auth"; // Adjust if different

export const signup = (data) =>
  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const sendOtp = (data) =>
  fetch(`${BASE_URL}/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const verifyOtp = (data) =>
  fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const setPassword = (data) =>
  fetch(`${BASE_URL}/set-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
