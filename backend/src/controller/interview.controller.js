const pdfParse = require('pdf-parse')
const { generateInterviewReport } = require('../../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');

async function generateInterviewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file uploaded' });
        }

        const resumeBuffer = req.file.buffer;
        const resumeContent = await pdfParse(resumeBuffer);
        const resumeText = resumeContent.text;

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user._id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })
        console.log("AI Response:", JSON.stringify(interviewReportByAi, null, 2))

        res.status(201).json({
            message: 'Interview report generated successfully',
            interviewReport
        })
    } catch (error) {
        console.error("Error generating interview report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { generateInterviewReportController };