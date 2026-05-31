const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewController } = require('../controller/interview.controller');
const uploadMiddleware = require('../middleware/file.middleware');

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of JD, self sdescription or resume pdf
 * @access private
 */
interviewRouter.post('/',authMiddleware, uploadMiddleware.upload.single('resume'), generateInterviewReportController);

/**
 * @route POST /api/report/:interviewId
 * @description get interview report by id
 * @access private
 */
interviewRouter.get('/report/:interviewId',authMiddleware, getInterviewReportByIdController)

/**
 * @route POST /api/interview
 * @description get all interview reports by a user
 * @access private
 */
interviewRouter.get('/',authMiddleware, getAllInterviewController)

module.exports = interviewRouter;