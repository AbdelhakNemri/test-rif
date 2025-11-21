/**
 * src/models/theme.model.js
 *
 * Sequelize-backed Theme model wrapper providing CRUD functions:
 * - create(theme)
 * - findAll()
 * - findById(id)
 * - update(id, theme)
 * - delete(id)
 *
 * Table: Theme with columns (id, nom)
 */
const { sequelize } = require('./sequelize');
const { DataTypes } = require('sequelize');

// Define Theme model
const Theme = sequelize.models.Theme || sequelize.define('Theme', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nom: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
}, {
  tableName: 'Theme',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

async function create(theme) {
  const { nom } = theme;
  const created = await Theme.create({ nom });
  return created.get({ plain: true });
}

async function findAll() {
  const rows = await Theme.findAll({ attributes: ['id', 'nom'] });
  return rows.map(r => r.get({ plain: true }));
}

async function findById(id) {
  const row = await Theme.findByPk(Number(id), { attributes: ['id', 'nom'] });
  return row ? row.get({ plain: true }) : null;
}

async function update(id, theme) {
  const instance = await Theme.findByPk(Number(id));
  if (!instance) return null;
  if (theme.nom !== undefined) instance.nom = theme.nom;
  await instance.save();
  return instance.get({ plain: true });
}

async function remove(id) {
  const destroyed = await Theme.destroy({ where: { id: Number(id) } });
  return destroyed > 0;
}

module.exports = {
  Theme,
  create,
  findAll,
  findById,
  update,
  delete: remove,
};