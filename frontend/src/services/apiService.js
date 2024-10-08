import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/users',
});

// Login
export const login = async (email, password) => {
  return await api.post('/login', { email, password });
};

// Criar Usuário
export const createUser = async (username, email, password) => {
  return await api.post('/signup', { username, email, password });
};

// Obter usuários
export const getUsers = async (token) => {
  return await api.get('/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Renovar Token
export const refreshToken = async (token) => {
  return await api.post('/refresh-token', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Obter Dados Protegidos
export const getProtectedData = async (token) => {
  return await api.get('/protected-route', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
