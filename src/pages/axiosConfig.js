// src/pages/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esta URL si tu servidor está en otro puerto o dominio
  timeout: 5000, // Tiempo máximo de espera
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;

