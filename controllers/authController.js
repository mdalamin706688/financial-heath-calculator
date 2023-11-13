const express = require('express');
const authService = require('../services/authService');

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.register(email, password);
  res.json(result);
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json(result);
});

module.exports = authRouter;
