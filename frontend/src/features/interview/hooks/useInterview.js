import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { InterviewContext } from "../interview.context"
import { generateInterviewReport, getInterviewReportById, getAllInterviewReports } from "../services/interview.api"

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const [error, setError] = useState(null);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }
    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const navigate = useNavigate();

const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    setError(null);
    try {
        const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
        setReport(response.interviewReport);
        navigate(`/interview/${response.interviewReport._id}`)
    } catch (error) {
        setError(error.response?.data?.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
}

const getReportById = async (interviewId) => {
    setLoading(true);
    setError(null);
    try {
        const response = await getInterviewReportById(interviewId);
        setReport(response.interviewReport);
    } catch (error) {
        setError(error.response?.data?.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
}

const getAllReports = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await getAllInterviewReports();
        setReports(response.interviewReports);
    } catch (error) {
        setError(error.response?.data?.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
}

    return {
        loading,
        report,
        reports,
        error,
        generateReport,
        getReportById,
        getAllReports,
        setReport,
        setReports
    }
}