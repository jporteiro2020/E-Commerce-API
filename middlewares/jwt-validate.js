const jwt = require('jsonwebtoken')

const TOKEN_SECRET = 'NoDeberiasSaberCualEsElTokenSecreto';

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' });
  }

  try {
    const verified = jwt.verify(token, TOKEN_SECRET);
    req.user = verified
    next(); // continuamos
  } catch (error) {
    res.status(400).json({error: 'El Token no es válido'});
  }
}

// middleware para decodificar el token
const decodeToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' });
  }

  try {
    return jwt.decode(token, TOKEN_SECRET);
  } catch (error) {
    res.status(400).json({error: 'El Token no es válido'});
  }
}

module.exports = {
  verifyToken,
  decodeToken,
  TOKEN_SECRET
};