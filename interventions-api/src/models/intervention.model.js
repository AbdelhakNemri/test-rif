/**
 * src/models/intervention.model.js
 *
 * Sequelize-backed Intervention model wrapper providing CRUD functions:
 * - create(intervention)
 * - findAll()
 * - findById(id)
 * - update(id, intervention)
 * - delete(id)
 *
 * Table: Intervention with columns (id, communeId, themeId, utilisateurId, nomUsager, 
 * prenomUsager, question, reponse, statut, dateCreation, dateReponse, satisfaction)
 */
const { sequelize } = require('./sequelize');
const { DataTypes } = require('sequelize');

// Define Intervention model
const Intervention = sequelize.models.Intervention || sequelize.define('Intervention', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  communeId: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    allowNull: false,
    field: 'commune_id'
  },
  themeId: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    allowNull: false,
    field: 'theme_id'
  },
  utilisateurId: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    allowNull: false,
    field: 'utilisateur_id'
  },
  nomUsager: { 
    type: DataTypes.STRING(100), 
    allowNull: false,
    field: 'nom_usager'
  },
  prenomUsager: { 
    type: DataTypes.STRING(100), 
    allowNull: false,
    field: 'prenom_usager'
  },
  question: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  reponse: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  statut: { 
    type: DataTypes.ENUM('En attente', 'En cours', 'Résolu', 'Fermé'), 
    allowNull: false,
    defaultValue: 'En attente'
  },
  dateCreation: { 
    type: DataTypes.DATE, 
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'date_creation'
  },
  dateReponse: { 
    type: DataTypes.DATE, 
    allowNull: true,
    field: 'date_reponse'
  },
  satisfaction: { 
    type: DataTypes.INTEGER, 
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  },
}, {
  tableName: 'Intervention',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

async function create(intervention) {
  const created = await Intervention.create(intervention);
  return created.get({ plain: true });
}

async function findAll(options = {}) {
  const rows = await Intervention.findAll(options);
  return rows.map(r => r.get({ plain: true }));
}

async function findById(id) {
  const row = await Intervention.findByPk(Number(id));
  return row ? row.get({ plain: true }) : null;
}

async function update(id, intervention) {
  const instance = await Intervention.findByPk(Number(id));
  if (!instance) return null;
  
  const updatableFields = [
    'communeId', 'themeId', 'utilisateurId', 'nomUsager', 'prenomUsager',
    'question', 'reponse', 'statut', 'dateReponse', 'satisfaction'
  ];
  
  updatableFields.forEach(field => {
    if (intervention[field] !== undefined) {
      instance[field] = intervention[field];
    }
  });
  
  await instance.save();
  return instance.get({ plain: true });
}

async function remove(id) {
  const destroyed = await Intervention.destroy({ where: { id: Number(id) } });
  return destroyed > 0;
}

module.exports = {
  Intervention,
  create,
  findAll,
  findById,
  update,
  delete: remove,
};