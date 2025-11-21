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
const { QueryTypes } = require('sequelize');

async function getStats() {
  // 1) Single-row aggregate for totals and status counts — efficient using SUM(CASE)
  const aggregateSql = `
    SELECT
      COUNT(*) AS totalInterventions,
      SUM(CASE WHEN status = 'en cours' THEN 1 ELSE 0 END) AS inProgress,
      SUM(CASE WHEN status = 'traitée' OR status = 'traitees' OR status = 'traite' THEN 1 ELSE 0 END) AS treated,
      SUM(CASE WHEN status = 'archivée' OR status = 'archive' OR status = 'archived' THEN 1 ELSE 0 END) AS archived
    FROM Intervention;
  `;

  const aggregateRows = await sequelize.query(aggregateSql, { type: QueryTypes.SELECT });
  const aggregate = aggregateRows && aggregateRows[0] ? aggregateRows[0] : {
    totalInterventions: 0, inProgress: 0, treated: 0, archived: 0
  };

  // 2) Top 5 themes by count
  const topThemesSql = `
    SELECT themeId, COUNT(*) AS count
    FROM Intervention
    WHERE themeId IS NOT NULL
    GROUP BY themeId
    ORDER BY count DESC
    LIMIT 5;
  `;
  const topThemes = await sequelize.query(topThemesSql, { type: QueryTypes.SELECT });

  // 3) Top 5 communes by count
  const topCommunesSql = `
    SELECT communeId, COUNT(*) AS count
    FROM Intervention
    WHERE communeId IS NOT NULL
    GROUP BY communeId
    ORDER BY count DESC
    LIMIT 5;
  `;
  const topCommunes = await sequelize.query(topCommunesSql, { type: QueryTypes.SELECT });

  // Normalize numeric fields (Sequelize may return strings depending on dialect)
  function toNumberFields(obj, fields) {
    fields.forEach(f => {
      if (obj[f] !== undefined && obj[f] !== null) obj[f] = Number(obj[f]);
    });
  }

  toNumberFields(aggregate, ['totalInterventions', 'inProgress', 'treated', 'archived']);
  topThemes.forEach(r => toNumberFields(r, ['count']));
  topCommunes.forEach(r => toNumberFields(r, ['count']));

  return {
    totalInterventions: aggregate.totalInterventions || 0,
    inProgress: aggregate.inProgress || 0,
    treated: aggregate.treated || 0,
    archived: aggregate.archived || 0,
    topThemes: topThemes || [],
    topCommunes: topCommunes || [],
  };
}

module.exports = {
  getStats,
};
