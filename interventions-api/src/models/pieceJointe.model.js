/**
 * src/models/pieceJointe.model.js
 *
 * Sequelize-backed PieceJointe (Attachment) model wrapper providing CRUD functions:
 * - create(pieceJointe)
 * - findAll()
 * - findById(id)
 * - findByInterventionId(interventionId)
 * - update(id, pieceJointe)
 * - delete(id)
 *
 * Table: PieceJointe with columns (id, interventionId, url, type)
 */
const { sequelize } = require('./sequelize');
const { DataTypes } = require('sequelize');

// Define PieceJointe model
const PieceJointe = sequelize.models.PieceJointe || sequelize.define('PieceJointe', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  interventionId: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    allowNull: false,
    field: 'intervention_id'
  },
  url: { 
    type: DataTypes.STRING(500), 
    allowNull: false 
  },
  type: { 
    type: DataTypes.STRING(100), 
    allowNull: false,
    comment: 'Type de fichier: image/jpeg, application/pdf, etc.'
  },
}, {
  tableName: 'PieceJointe',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

async function create(pieceJointe) {
  const { interventionId, url, type } = pieceJointe;
  const created = await PieceJointe.create({ interventionId, url, type });
  return created.get({ plain: true });
}

async function findAll() {
  const rows = await PieceJointe.findAll({ 
    attributes: ['id', 'interventionId', 'url', 'type'] 
  });
  return rows.map(r => r.get({ plain: true }));
}

async function findById(id) {
  const row = await PieceJointe.findByPk(Number(id), { 
    attributes: ['id', 'interventionId', 'url', 'type'] 
  });
  return row ? row.get({ plain: true }) : null;
}

async function findByInterventionId(interventionId) {
  const rows = await PieceJointe.findAll({ 
    where: { interventionId: Number(interventionId) },
    attributes: ['id', 'interventionId', 'url', 'type']
  });
  return rows.map(r => r.get({ plain: true }));
}

async function update(id, pieceJointe) {
  const instance = await PieceJointe.findByPk(Number(id));
  if (!instance) return null;
  
  if (pieceJointe.url !== undefined) instance.url = pieceJointe.url;
  if (pieceJointe.type !== undefined) instance.type = pieceJointe.type;
  if (pieceJointe.interventionId !== undefined) instance.interventionId = pieceJointe.interventionId;
  
  await instance.save();
  return instance.get({ plain: true });
}

async function remove(id) {
  const destroyed = await PieceJointe.destroy({ where: { id: Number(id) } });
  return destroyed > 0;
}

module.exports = {
  PieceJointe,
  create,
  findAll,
  findById,
  findByInterventionId,
  update,
  delete: remove,
};