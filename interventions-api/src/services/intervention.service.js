/**
 * Intervention service - business logic layer
 */
const interventionModel = require('../models/intervention.model');

async function createIntervention(payload) {
  const { 
    communeId, 
    themeId, 
    utilisateurId, 
    nomUsager, 
    prenomUsager, 
    question,
    statut 
  } = payload;

  // Validation des champs requis
  if (!communeId || !themeId || !utilisateurId) {
    const error = new Error('Commune, thème et utilisateur sont requis');
    error.status = 400;
    throw error;
  }

  if (!nomUsager || nomUsager.trim() === '') {
    const error = new Error('Le nom de l\'usager est requis');
    error.status = 400;
    throw error;
  }

  if (!prenomUsager || prenomUsager.trim() === '') {
    const error = new Error('Le prénom de l\'usager est requis');
    error.status = 400;
    throw error;
  }

  if (!question || question.trim() === '') {
    const error = new Error('La question est requise');
    error.status = 400;
    throw error;
  }

  const interventionData = {
    communeId: Number(communeId),
    themeId: Number(themeId),
    utilisateurId: Number(utilisateurId),
    nomUsager: nomUsager.trim(),
    prenomUsager: prenomUsager.trim(),
    question: question.trim(),
    statut: statut || 'En attente',
    dateCreation: new Date()
  };

  return await interventionModel.create(interventionData);
}

async function getAllInterventions(filters = {}) {
  const options = {};
  
  // Ajout des filtres si présents
  if (filters.statut) {
    options.where = { statut: filters.statut };
  }
  
  // Inclure les relations si demandé
  if (filters.includeRelations) {
    options.include = [
      { association: 'commune' },
      { association: 'theme' },
      { association: 'utilisateur' },
      { association: 'piecesJointes' }
    ];
  }

  return await interventionModel.findAll(options);
}

async function getInterventionById(id) {
  const intervention = await interventionModel.findById(id);
  
  if (!intervention) {
    return null;
  }

  // Charger les relations
  const { Intervention } = require('../models/intervention.model');
  const fullIntervention = await Intervention.findByPk(Number(id), {
    include: [
      { association: 'commune' },
      { association: 'theme' },
      { association: 'utilisateur' },
      { association: 'piecesJointes' }
    ]
  });

  return fullIntervention ? fullIntervention.get({ plain: true }) : null;
}

async function updateIntervention(id, payload) {
  const { 
    communeId, 
    themeId, 
    nomUsager, 
    prenomUsager, 
    question,
    reponse,
    statut,
    satisfaction 
  } = payload;

  const updateData = {};

  if (communeId !== undefined) updateData.communeId = Number(communeId);
  if (themeId !== undefined) updateData.themeId = Number(themeId);
  if (nomUsager !== undefined && nomUsager.trim() !== '') updateData.nomUsager = nomUsager.trim();
  if (prenomUsager !== undefined && prenomUsager.trim() !== '') updateData.prenomUsager = prenomUsager.trim();
  if (question !== undefined && question.trim() !== '') updateData.question = question.trim();
  if (reponse !== undefined) updateData.reponse = reponse.trim();
  if (statut !== undefined) {
    updateData.statut = statut;
    // Si on passe à "Résolu" ou "Fermé", mettre la date de réponse
    if ((statut === 'Résolu' || statut === 'Fermé') && reponse) {
      updateData.dateReponse = new Date();
    }
  }
  if (satisfaction !== undefined) {
    if (satisfaction < 1 || satisfaction > 5) {
      const error = new Error('La satisfaction doit être entre 1 et 5');
      error.status = 400;
      throw error;
    }
    updateData.satisfaction = satisfaction;
  }

  return await interventionModel.update(id, updateData);
}

async function deleteIntervention(id) {
  return await interventionModel.delete(id);
}

module.exports = {
  createIntervention,
  getAllInterventions,
  getInterventionById,
  updateIntervention,
  deleteIntervention,
};
