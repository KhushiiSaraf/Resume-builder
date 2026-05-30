const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { generateInterviewReportController } = require('../controller/interview.controller');
const uploadMiddleware = require('../middleware/file.middleware');

const interviewRouter = express.Router();


interviewRouter.post('/',authMiddleware, uploadMiddleware.upload.single('resume'), generateInterviewReportController);

module.exports = interviewRouter;