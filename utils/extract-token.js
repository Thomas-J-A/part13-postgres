const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../utils/config');

const extractToken = (req, res, next) => {
  // Get auth header if sent
  const authorization = req.get('authorization');

  // Check that there is a bearer token sent
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      // Decode payload of jwt token
      req.tokenPayload = jwt.verify(authorization.substring(7), TOKEN_SECRET);
    } catch {
      // Decoding token failed
      return res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    // No bearer token sent
    return res.status(401).json({ error: 'Token is missing' });
  }

  next();
};

module.exports = extractToken;
