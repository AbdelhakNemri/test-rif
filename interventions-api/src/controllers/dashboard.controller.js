
const dashboardService = require('../services/dashboard.service');

async function getDashboard(req, res) {
  try {
    const stats = await dashboardService.getDashboardData();
    return res.status(200).json(stats);
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération des statistiques' });
  }
}

module.exports = {
  getDashboard,
};
