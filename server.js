const express = require('express');
const dotenv = require('dotenv');

// Init
const app = express();

// Load env vars.
dotenv.config({ path: './config/env.env' });

// Custom Modules.
const connectDB = require('./config/db');
connectDB();

// Create Server.
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT} in ${process.env.NODE_ENV} mode`);
});
