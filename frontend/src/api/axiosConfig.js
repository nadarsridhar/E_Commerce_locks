// // src/api/apiClient.js
// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:9000/api",
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// export default api;

// src/api/apiClient.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9000/api",  // Make sure this is correct (9000 port hai?)
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Automatically attach token to every request (if available in localStorage)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");  // token ko storage se le lo
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ✅ Global error handling (optional)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data?.message || error.message);
        // Optional: yaha tum centralized error handling bhi kar sakte ho
        return Promise.reject(error);
    }
);

export default api;
