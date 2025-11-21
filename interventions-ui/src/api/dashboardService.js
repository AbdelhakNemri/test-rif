import apiClient from './apiClient';

export const getDashboardStats = () => {
  return apiClient.get('/dashboard');
};

const dashboardService = {
  getDashboardStats,
};

export default dashboardService;