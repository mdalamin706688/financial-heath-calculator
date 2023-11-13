const mongoose = require('mongoose');

const financialDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  monthlyIncome: { type: Number, required: true },
  monthlyExpenses: { type: Number, required: true },
  debts: { type: Number, required: true },
  assets: { type: Number, required: true },
  score: { type: Number, default: 0 }, // Add this line

});

const FinancialData = mongoose.model('FinancialData', financialDataSchema);

module.exports = FinancialData;
