const FinancialData = require('../models/FinancialData');
const calculateScore = require('../utils/calculateScore');

const financialDataService = {
  submitFinancialData: async (userId, monthlyIncome, monthlyExpenses, debts, assets) => {
    try {
      const financialData = new FinancialData({
        userId,
        monthlyIncome,
        monthlyExpenses,
        debts,
        assets,
      });

      // Calculate financial health score
      financialData.score = calculateScore(monthlyIncome, monthlyExpenses, debts, assets);

      await financialData.save();

      return { success: true, message: 'Financial data submitted successfully', score: financialData.score };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getFinancialData: async (userId) => {
    try {
      const data = await FinancialData.find({ userId });
      if (!data || data.length === 0) {
        return { success: false, message: 'Financial data not found for the user' };
      }
  
      // Calculate financial health score for each data entry
      const financialDataWithScores = data.map((entry) => ({
        ...entry.toObject(),
        score: calculateScore(entry.monthlyIncome, entry.monthlyExpenses, entry.debts, entry.assets),
      }));
  
      return { success: true, data: financialDataWithScores };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  
};

module.exports = financialDataService;
