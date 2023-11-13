// backend/middleware/validation.js

const { body } = require('express-validator');

const validationRules = [
  body('monthlyIncome').isNumeric(),
  body('monthlyExpenses').isNumeric(),
  body('debts').isNumeric(),
  body('assets').isNumeric(),
];

module.exports = validationRules;
