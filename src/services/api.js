import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://10.0.3.2:3334', // Physical device
  baseURL: 'http://localhost:3334', // Emulator
});

export default api;
