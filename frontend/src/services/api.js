import axios from 'axios';

// Centralized Axios client configured for HackGuard AI backend engine
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Engine': 'HackGuard-CommandCenter/1.0',
  },
});

// Request interceptor for injecting auth token and active hackathon scope
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hackguard_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const currentHackathon = localStorage.getItem('hackguard_active_hackathon');
    if (currentHackathon) {
      config.headers['X-Hackathon-Scope'] = currentHackathon;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for centralized error diagnostics
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorResponse = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'An unexpected evaluation engine error occurred.',
      details: error.response?.data?.details || null,
      isNetworkError: !error.response,
    };
    return Promise.reject(errorResponse);
  }
);

export default apiClient;

