const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const config = require('../config');

const authService = {
  register: async (email, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  login: async (email, password) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return { success: false, message: 'User not found' };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { success: false, message: 'Invalid password' };
      }

      const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
      return { success: true, token };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};

module.exports = authService;
