/**
 * Dev stub middleware for token verification
 * - In development this middleware accepts an Authorization header of the form
 *   `Bearer <token>` where <token> can be 'admin' or 'user'.
 * - 'admin' => req.user = { id: 1, role: 'Administrateur' }
 * - 'user'  => req.user = { id: 2, role: 'Utilisateur' }
 * - If Authorization header is missing, responds 401 Unauthorized.
 *
 * Replace this with your real `verifyToken` that validates JWT in production.
 */
module.exports = function verifyToken(req, res, next) {
  const auth = req.headers['authorization'] || req.headers['Authorization'];
  if (!auth) return res.status(401).json({ message: 'No authorization header provided (dev stub).' });
  const parts = auth.split(' ');
  const token = parts.length === 2 ? parts[1] : parts[0];
  if (!token) return res.status(401).json({ message: 'Invalid authorization header (dev stub).' });

  // Simple dev mapping
  if (token.toLowerCase().includes('admin')) {
    req.user = { id: 1, role: 'Administrateur' };
  } else {
    req.user = { id: 2, role: 'Utilisateur' };
  }
  return next();
};
