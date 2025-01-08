// src/api/axiosInstance.js
import axios from "axios";
// import { logOut } from "../../helper";
let count = 1;
// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1/", // Added https:// protocol
  timeout: 5000, // Optional: Timeout for requests (in ms)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before the request is sent, e.g., add auth token
    return config;
  },
  (error) => {
    // Do something with request error
    return error;
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;  // Return the full response, don't extract data here
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("UnAuthorized 401 !!!");
      return Promise.reject(error);
    }
    return Promise.reject(error);  // Properly reject the error
  }
);

export default axiosInstance;
