import axios from "axios";

export const API_BASE_URL = "https://frenso-deploy-back-production.up.railway.app/
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});
