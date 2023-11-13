// backend/routes/financialRoutes.js

const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const authenticateUser = require('../security/authentication');
const validateInputs = require('../middleware/validation');
const FinancialData = require('../models/FinancialData');

router.post('/calculateFinancialHealth', validateInputs, async (req, res) => {
  try {
    const { monthlyIncome, monthlyExpenses, debts, assets } = req.body;

    const financialHealthScore = calculateFinancialHealth(monthlyIncome, monthlyExpenses, debts, assets);

    const token = jwt.sign({
      Role: 'Admin', // Replace with the user's role
      Issuer: 'Issuer', // Replace with the issuer
      Username: 'YourUserName', // Replace with the username
    }, process.env.SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour

    const result = await FinancialData.create({
      monthlyIncome,
      monthlyExpenses,
      debts,
      assets,
      financialHealthScore,
    });

    res.status(200).json({ financialHealthScore: result.financialHealthScore, token });
  } catch (error) {
    winston.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function calculateFinancialHealth(monthlyIncome, monthlyExpenses, debts, assets) {
  return ((monthlyIncome - monthlyExpenses) - debts + assets) / 1000;
}

module.exports = router;
