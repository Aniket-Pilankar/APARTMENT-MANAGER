import axios from "axios";

const request = axios.create({
  baseURL: "https://appartment-manager-backend.onrender.com",
  headers: {
    "Content-type": "application/json",
  },
});

export default request;
