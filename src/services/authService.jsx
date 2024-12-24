import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth'

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true })
    return response.data
};

export const logout = async () => {
    const response = await axios.post(`${API_URL}/logout`, { withCredentials: true })
    return response.data
};

export const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/register`, { username, email, password }, { withCredentials: true })
    return response.data
};

export const getCurrentUser = async () => {
    const response = await axios.get(`${API_URL}/current-user`, { withCredentials: true })
    return response.data
};

export const isAuthenticated = async () => {
    const response = await axios.get(`${API_URL}/is-authenticated`, { withCredentials: true })
    return response.data
};

