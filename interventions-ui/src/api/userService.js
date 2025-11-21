import apiClient from './apiClient';

export const getUsers = () => {
  return apiClient.get('/users');
};

export const getUserById = (id) => {
  return apiClient.get(`/users/${id}`);
};

export const createUser = (userData) => {
  return apiClient.post('/users', userData);
};

export const updateUser = (id, userData) => {
  return apiClient.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}`);
};

const userService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;