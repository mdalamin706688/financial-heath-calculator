// backend/tests/financialCalculator.test.js

const request = require('supertest');
const app = require('../app');

describe('POST /calculateFinancialHealth', () => {
  it('calculates financial health score', async () => {
    const response = await request(app)
      .post('/calculateFinancialHealth')
      .send({
        monthlyIncome: 5000,
        monthlyExpenses: 3000,
        debts: 1000,
        assets: 2000,
      })
      .set('Authorization', 'Bearer YOUR_TEST_JWT_TOKEN'); // Replace with a test JWT token

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('financialHealthScore');
  });

  // Add more test cases as needed
});
