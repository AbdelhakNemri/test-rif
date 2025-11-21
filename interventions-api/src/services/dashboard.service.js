/**
 * src/services/dashboard.service.js
 *
 * Simple service to retrieve dashboard statistics.
 */
const dashboardModel = require('../models/dashboard.model');

async function getDashboardData() {
  return dashboardModel.getStats();
}

module.exports = {
  getDashboardData,
};
