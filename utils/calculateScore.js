//utils/calculateScore.js
const calculateScore = (monthlyIncome, monthlyExpenses, debts, assets) => {
    const netIncome = monthlyIncome - monthlyExpenses;
    const netWorth = assets - debts;
  
    // Define your scoring logic here
    let score = 0;
    if (netIncome > 0) {
      score += 50;
    }
    if (netWorth > 0) {
      score += 50;
    }
  
    return score;
  };
  
  module.exports = calculateScore;
  