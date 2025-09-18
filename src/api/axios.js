import axios from 'axios';

const instance = axios.create({
  baseURL:'http://15.134.44.62:8888/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];
 
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
 
// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") 
      
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
// Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
 
    // Only handle 401 errors
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
 
    // Special case: Don't retry refresh token requests
    if (originalRequest.url.includes("refreshToken")) {
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    }
 
    // If already refreshing, queue the request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }
 
    originalRequest._retry = true;
    isRefreshing = true;
 
    const refreshToken =
      localStorage.getItem("refreshToken") 
 
    if (!refreshToken) {
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    }
 
    try {
      const res = await axios.post(
        "http://15.134.44.62:8888/api/admin/auth/refresh-token",
        { refreshToken },
        {
          baseURL: "http://15.134.44.62:8888/api",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
 
      const newToken = res.data.accessToken;
 
      localStorage.setItem("token", newToken);
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newToken}`;
 
      processQueue(null, newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return instance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default instance;