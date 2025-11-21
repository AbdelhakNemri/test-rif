/**
 * Middleware isAdmin
 * Vérifie que `req.user` existe et que `req.user.role === 'Administrateur'`.
 * Si OK -> next(), sinon -> 403 Forbidden avec message JSON.
 */
module.exports = function isAdmin(req, res, next) {
  try {
    if (!req.user || req.user.role !== 'Administrateur') {
      return res.status(403).json({ message: 'Accès refusé. Rôle administrateur requis.' });
    }
    return next();
  } catch (err) {
    // En cas d'erreur inattendue, renvoyer 403 pour ne pas divulguer d'informations
    return res.status(403).json({ message: 'Accès refusé. Rôle administrateur requis.' });
  }
};
