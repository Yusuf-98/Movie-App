import axios, {
  type InternalAxiosRequestConfig, // Tipe untuk konfigurasi request
  type AxiosResponse, // Tipe untuk objek respons sukses
  type AxiosError, // Tipe untuk objek error
} from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — inject API key into every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.params = {
    ...config.params,
    api_key: import.meta.env.VITE_TMDB_API_KEY as string,
    language: config.params?.language ?? 'en-US',
  };
  return config;
});

// Response interceptor — normalize errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) throw new Error('API key tidak valid. Periksa file .env kamu.');
      if (status === 404) throw new Error('Data tidak ditemukan.');
      if (status === 429) throw new Error('Terlalu banyak request. Coba lagi sebentar.');
    }
    throw error;
  }
);

export default api;
