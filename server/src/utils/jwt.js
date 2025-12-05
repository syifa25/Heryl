const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev_secret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

module.exports = {
  signToken: (payload) => jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN }),
  verifyToken: (token) => jwt.verify(token, SECRET)
};
