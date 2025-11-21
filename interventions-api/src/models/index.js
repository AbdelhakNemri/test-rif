/**
 * src/models/index.js
 * Central export for all models with associations defined
 */
const { sequelize, User } = require('./sequelize');
const userModel = require('./user.model');
const communeModel = require('./commune.model');
const themeModel = require('./theme.model');
const interventionModel = require('./intervention.model');
const pieceJointeModel = require('./pieceJointe.model');

// Get model classes
const { Theme } = themeModel;
const { Intervention } = interventionModel;
const { PieceJointe } = pieceJointeModel;

// Define associations
// Intervention belongs to Commune, Theme, and User
Intervention.belongsTo(sequelize.models.Commune, { 
  foreignKey: 'commune_id', 
  as: 'commune' 
});

Intervention.belongsTo(Theme, { 
  foreignKey: 'theme_id', 
  as: 'theme' 
});

Intervention.belongsTo(User, { 
  foreignKey: 'utilisateur_id', 
  as: 'utilisateur' 
});

// PieceJointe belongs to Intervention
PieceJointe.belongsTo(Intervention, { 
  foreignKey: 'intervention_id', 
  as: 'intervention' 
});

// Intervention has many PieceJointe
Intervention.hasMany(PieceJointe, { 
  foreignKey: 'intervention_id', 
  as: 'piecesJointes' 
});

module.exports = {
  sequelize,
  User,
  Theme,
  Intervention,
  PieceJointe,
  userModel,
  communeModel,
  themeModel,
  interventionModel,
  pieceJointeModel,
};
