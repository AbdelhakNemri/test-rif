/**
 * src/models/dashboard.model.js
 *
 * Aggregates statistics for the admin dashboard. Uses Sequelize raw queries
 * to execute optimized SQL. Returns a single object containing:
 * - totalInterventions
 * - inProgress
 * - treated
 * - archived
 * - topThemes: [{ themeId, count }, ...] (top 5)
 * - topCommunes: [{ communeId, count }, ...] (top 5)
 *
 * Assumptions:
 * - Table name is `Intervention`.
 * - Status values are stored in a column named `status` with values
 *   exactly matching 'en cours', 'traitée' (or 'traitées'), 'archivée' etc.
 * - Theme id column is `themeId`, commune id column is `communeId`.
 */
const { sequelize } = require('./sequelize');

async function getStats() {
  try {
    // 1. Statistiques principales avec le bon nom de colonne 'statut'
    const statsQuery = `
      SELECT
        COUNT(*) AS totalInterventions,
        SUM(CASE WHEN statut = 'En cours' THEN 1 ELSE 0 END) AS interventionsEnCours,
        SUM(CASE WHEN statut = 'Résolu' THEN 1 ELSE 0 END) AS interventionsTraitees,
        SUM(CASE WHEN statut = 'Fermé' THEN 1 ELSE 0 END) AS interventionsArchivees
      FROM intervention;
    `;

    const [statsResult] = await sequelize.query(statsQuery);
    const stats = statsResult[0];

    // 2. Top 5 des thèmes avec jointure
    const topThemesQuery = `
      SELECT t.nom AS name, COUNT(i.id) AS count
      FROM intervention i
      INNER JOIN theme t ON i.theme_id = t.id
      GROUP BY t.id, t.nom
      ORDER BY count DESC
      LIMIT 5;
    `;

    const [topThemesResult] = await sequelize.query(topThemesQuery);

    // 3. Top 5 des communes avec jointure
    const topCommunesQuery = `
      SELECT c.nom AS name, COUNT(i.id) AS count
      FROM intervention i
      INNER JOIN commune c ON i.commune_id = c.id
      GROUP BY c.id, c.nom
      ORDER BY count DESC
      LIMIT 5;
    `;

    const [topCommunesResult] = await sequelize.query(topCommunesQuery);

    return {
      totalInterventions: parseInt(stats.totalInterventions) || 0,
      interventionsEnCours: parseInt(stats.interventionsEnCours) || 0,
      interventionsTraitees: parseInt(stats.interventionsTraitees) || 0,
      interventionsArchivees: parseInt(stats.interventionsArchivees) || 0,
      topThemes: topThemesResult,
      topCommunes: topCommunesResult,
    };
  } catch (error) {
    console.error('Error in dashboard.model.getStats:', error);
    throw error;
  }
}

module.exports = {
  getStats,
};
