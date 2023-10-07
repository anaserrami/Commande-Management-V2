const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'anas-errami-bdcc2';

function generateToken(user) {
  const payload = {
    id: user.id,
    nom: user.nom,
    password: user.password,
    idRole: user.idRole
  };

  const options = {
    expiresIn: '2h'
  };

  return jwt.sign(payload, secretKey, options);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded; // Attach decoded user data to the request object
    next();
  });
}

function authorizeRole(roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.sendStatus(403);
    }
    next();
  };
}

module.exports = { generateToken, authenticateToken, authorizeRole };