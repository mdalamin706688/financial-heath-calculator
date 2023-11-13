// backend/security/authentication.js

const jwt = require('jsonwebtoken');
const winston = require('winston');
const dotenv = require('dotenv');

dotenv.config();

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    winston.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateUser;
