const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const authController = require('./controllers/authController');
const financialDataController = require('./controllers/financialDataController');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authController);
app.use('/financial-data', financialDataController);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
