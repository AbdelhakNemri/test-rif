/**
 * src/models/commune.model.js
 *
 * Sequelize-backed Commune model wrapper providing CRUD functions:
 * - create(commune)
 * - findAll()
 * - findById(id)
 * - update(id, commune)
 * - delete(id)
 *
 * Table assumed: `Commune` with columns (id, nom, codePostal, created_at, updated_at)
 */
const { sequelize } = require('./sequelize');
const { DataTypes } = require('sequelize');

// Define model (safe to call repeatedly; Sequelize will return existing model if defined)
const Commune = sequelize.models.Commune || sequelize.define('Commune', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING(255), allowNull: false },
  codePostal: { type: DataTypes.STRING(20), allowNull: false },
}, {
  tableName: 'Commune',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

async function create(commune) {
  const { nom, codePostal } = commune;
  const created = await Commune.create({ nom, codePostal });
  return created.get({ plain: true });
}

async function findAll() {
  const rows = await Commune.findAll({ attributes: ['id', 'nom', 'codePostal'] });
  return rows.map(r => r.get({ plain: true }));
}

async function findById(id) {
  const row = await Commune.findByPk(Number(id), { attributes: ['id', 'nom', 'codePostal'] });
  return row ? row.get({ plain: true }) : null;
}

async function update(id, commune) {
  const instance = await Commune.findByPk(Number(id));
  if (!instance) return null;
  if (commune.nom !== undefined) instance.nom = commune.nom;
  if (commune.codePostal !== undefined) instance.codePostal = commune.codePostal;
  await instance.save();
  return instance.get({ plain: true });
}

async function remove(id) {
  const destroyed = await Commune.destroy({ where: { id: Number(id) } });
  return destroyed > 0;
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  delete: remove,
};
