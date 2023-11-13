const express = require('express');
const financialDataService = require('../services/financialDataService');
const authMiddleware = require('../middleware/authMiddleware');

const financialDataRouter = express.Router();

financialDataRouter.post('/submit', authMiddleware, async (req, res) => {
  const { userId } = req;
  const { monthlyIncome, monthlyExpenses, debts, assets } = req.body;
  const result = await financialDataService.submitFinancialData(userId, monthlyIncome, monthlyExpenses, debts, assets);
  res.json(result);
});

financialDataRouter.get('/get', authMiddleware, async (req, res) => {
  const { userId } = req;
  const result = await financialDataService.getFinancialData(userId);
  res.json(result);
});

module.exports = financialDataRouter;
