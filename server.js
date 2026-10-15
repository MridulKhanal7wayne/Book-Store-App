const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// Routes
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Books API is running...');
});

async function startServer() {
  if (!process.env.CONNECT_STRING) {
    console.error('CRITICAL: CONNECT_STRING is not defined in environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.CONNECT_STRING);
    console.log('Connected to MongoDB successfully');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

startServer();