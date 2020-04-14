import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://10.0.3.2:3334', // Emulator
  baseURL: 'http://localhost:3334', // Physical device
});

export default api;
