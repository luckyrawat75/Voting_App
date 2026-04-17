import axios from "axios";

const API = axios.create({
  baseURL: "https://voting-app-bwqp.onrender.com", 
  //baseURL:"http://localhost:3000"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;