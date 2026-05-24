const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// require all routes
const authRouter = require('./routes/auth.routes');

// use all routes
app.use('/api/auth', authRouter);

module.exports = app;