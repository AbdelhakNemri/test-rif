/**
 * Theme service - business logic layer
 */
const themeModel = require('../models/theme.model');

async function createTheme(payload) {
  const { nom } = payload;
  
  if (!nom || nom.trim() === '') {
    const error = new Error('Le nom du thème est requis');
    error.status = 400;
    throw error;
  }

  return await themeModel.create({ nom: nom.trim() });
}

async function getAllThemes() {
  return await themeModel.findAll();
}

async function getThemeById(id) {
  return await themeModel.findById(id);
}

async function updateTheme(id, payload) {
  const { nom } = payload;
  
  if (nom !== undefined && nom.trim() === '') {
    const error = new Error('Le nom du thème ne peut pas être vide');
    error.status = 400;
    throw error;
  }

  const updateData = {};
  if (nom !== undefined) updateData.nom = nom.trim();

  return await themeModel.update(id, updateData);
}

async function deleteTheme(id) {
  return await themeModel.delete(id);
}

module.exports = {
  createTheme,
  getAllThemes,
  getThemeById,
  updateTheme,
  deleteTheme,
};
