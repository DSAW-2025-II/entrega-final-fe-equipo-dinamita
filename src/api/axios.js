import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Interceptor para establecer Content-Type solo si no es FormData
api.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  // Si es FormData, axios establecerá automáticamente el Content-Type correcto
  return config;
});

export default api;
