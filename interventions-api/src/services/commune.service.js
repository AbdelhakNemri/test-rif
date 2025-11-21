/**
 * src/services/commune.service.js
 *
 * Business logic for Commune resource. Validates required fields and
 * delegates persistence to the model layer.
 */
const communeModel = require('../models/commune.model');

async function createCommune(data) {
  const { nom, codePostal } = data || {};
  if (!nom || !codePostal) {
    const err = new Error('Champs requis manquants: nom et codePostal');
    err.status = 400;
    throw err;
  }
  return communeModel.create({ nom, codePostal });
}

async function getAllCommunes() {
  return communeModel.findAll();
}

async function getCommuneById(id) {
  return communeModel.findById(id);
}

async function updateCommune(id, updateData) {
  if (!updateData || (updateData.nom === undefined && updateData.codePostal === undefined)) {
    const err = new Error('Aucun champ mis à jour');
    err.status = 400;
    throw err;
  }
  return communeModel.update(id, updateData);
}

async function deleteCommune(id) {
  return communeModel.delete(id);
}

module.exports = {
  createCommune,
  getAllCommunes,
  getCommuneById,
  updateCommune,
  deleteCommune,
};
