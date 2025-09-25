import axios from 'axios';

export const apiClient = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    timeout:10000,
    headers:{
        'Content-Type':'application/json'
    }
})