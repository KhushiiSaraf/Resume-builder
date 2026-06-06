require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.VITE_FRONTEND_URL, // frontend origin
    credentials: true // allow cookies to be sent
}));
app.use(cookieParser());


// require all routes
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes')

// use all routes
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

module.exports = app;