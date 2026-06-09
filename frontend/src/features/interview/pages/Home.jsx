import React, { useState, useRef, useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import ConfirmModal from "../../../components/ConfirmModal";
import { Trash2, NotepadText, UserRoundPen, Files } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

export default function Home() {

  const { loading, generateReport, getAllReports, deleteReport, reports, setReports, error } = useInterview();
  const [fileName, setFileName] = useState("No file chosen");
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [validationError, setValidationError] = useState("");
  const resumeInputRef = useRef(null);

  //step state for multi-step form
  const [step, setStep] = useState(1);
  const formRef = useRef(null);

  //confirm delete modal
  const [selectedReportId, setSelectedReportId] = useState(null);

  //loading message while generating report
  const [loadingMessage, setLoadingMessage] = useState("");

  const navigate = useNavigate();

  const { user } = useAuth()

  // const handleGenerateReport = async (e) => {
  //   e.preventDefault();

  //   const resumeFile = resumeInputRef.current?.files?.[0];

  //   if (!resumeFile && !selfDescription.trim()) {
  //     setValidationError("Please upload a resume or provide your self-description.");
  //     return;
  //   }

  //   setValidationError("");
  //   await generateReport({ jobDescription, selfDescription, resumeFile });
  // };

  const handleGenerateReport = async (e) => {
    e.preventDefault();

    const resumeFile = resumeInputRef.current?.files?.[0];

    if (!resumeFile && !selfDescription.trim()) {
      setValidationError(
        "Please upload a resume or provide your self-description."
      );
      return;
    }

    setValidationError("");

    const messages = [
      "Analyzing your profile...",
      "Matching against target role...",
      "Identifying skill gaps...",
      "Generating interview questions...",
      "Building your preparation roadmap...",
      "Still working... free AI models can take a little longer."
    ];

    let index = 0;

    setLoadingMessage(messages[0]);

    const interval = setInterval(() => {
      index++;

      if (index < messages.length) {
        setLoadingMessage(messages[index]);
      }
    }, 4000);

    try {
      await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
    } finally {
      clearInterval(interval);
      setLoadingMessage("");
    }
  };


  useEffect(() => {
    setReports([])
    getAllReports()
  }, [user?.id])


  return (

    <div className="relative min-h-screen flex flex-col bg-[#0b0f19] px-4 py-10 md:py-16 overflow-x-hidden">

      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-100 h-100 bg-indigo-600/15 blur-[100px] rounded-full -top-25 -left-25" />
        <div className="absolute w-87.5 h-87.5 bg-purple-600/15 blur-[100px] rounded-full -top-20 -right-20" />

      </div>

      {/* Hero Section */}
      <motion.div className="flex flex-col items-center justify-center text-center px-4 py-20" initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>

        <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent mb-4">
          Crack Your Next Interview with AI
        </h1>

        <p className="text-gray-400 max-w-xl mb-6">
          Get personalized interview questions, skill gap analysis, and a step-by-step preparation plan tailored just for you.
        </p>

        <button
          onClick={() => {
            formRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 py-3 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.35)] transition text-gray-200 
          font-medium active:scale-[0.97]
          active:shadow-none "
        >
          Get Started
        </button>

      </motion.div>


      <div className="h-px w-full max-w-4xl mx-auto bg-linear-to-r from-transparent via-white/10 to-transparent my-12"></div>

      <motion.div id="form-section" ref={formRef} className="mt-10 md:mt-16 flex justify-center" initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}      >
        {/* Card */}
        <div className="relative w-full max-w-6xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">

          {/* Card Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 
            bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
            <span className="text-gray-200">Create Your</span> Personalized Interview Plan
          </h1>

          <p className="text-sm text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Paste a job description and tell us a bit about yourself to get a personalized interview preparation plan.
          </p>

          <div className="flex items-center justify-center gap-6 mb-8">

            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium
                ${step >= 1
                  ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                  : "bg-white/10 text-gray-400"}`}>
                1
              </div>
              <span className={`text-sm ${step === 1 ? "text-white" : "text-gray-400"}`}>
                Job
              </span>
            </div>

            <div className="w-10 h-px bg-white/10"></div>

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium
              ${step >= 2
                  ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                  : "bg-white/10 text-gray-400"}`}>
                2
              </div>
              <span className={`text-sm ${step === 2 ? "text-white" : "text-gray-400"}`}>
                Profile
              </span>
            </div>

          </div>

          {/* Form */}
          <form className="space-y-8" onSubmit={handleGenerateReport}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div className="space-y-6" key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >

                  <div>
                    <h2 className="text-lg font-semibold text-gray-200 mb-2 flex items-center gap-2">
                      <NotepadText size={16} />
                      Target Job Description
                    </h2>

                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows="10"
                      placeholder="Paste the job description..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!jobDescription.trim()) return;
                        setStep(2);
                      }}
                      className={`
                            px-6 py-2 rounded-lg
                                transition-all duration-200 ease-out
                              hover:-translate-y-px
                              hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]
                              active:scale-[0.97]
                              active:shadow-none
                            ${!jobDescription.trim()
                          ? "bg-white/10 text-gray-500 cursor-not-allowed"
                          : "bg-linear-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:-translate-y-px active:scale-[0.97]"
                        }
                      `}
                      disabled={!jobDescription.trim()}
                    >
                      Next →
                    </button>
                  </div>

                </motion.div>
              )}
              {step === 2 && (
                <motion.div className="space-y-6" key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}>

                  <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                    <UserRoundPen size={16} />Your Profile
                  </h2>

                  {/* Resume */}
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <label className="block border border-dashed border-white/10 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400/40">

                      <p className="text-sm text-gray-400">
                        Upload Resume (PDF)
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {fileName}
                      </p>

                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        ref={resumeInputRef}
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setFileName(e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* OR */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-xs text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                  </div>

                  {/* About */}
                  <textarea
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                    rows="5"
                    placeholder="Write about your skills..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-200"
                  />

                  {/* Buttons */}
                  <div className="flex justify-between items-center">

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-gray-400 hover:text-white"
                    >
                      ← Back
                    </button>

                    {(validationError || error) && (
                      <div className="text-red-500 text-sm text-center">
                        {validationError || error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className={`
                        px-8 py-3 rounded-lg font-medium text-white
                        bg-linear-to-r from-indigo-500 to-purple-500
                        flex items-center justify-center gap-2
                        transition-all duration-200
                        hover:-translate-y-px
                        hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]
                        active:scale-[0.97]
                        ${loading ? "opacity-70 cursor-not-allowed" : ""}
                      `}
                    >
                      {loading && (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      )}

                      {loading ? "Generating..." : "Generate My Plan"}
                    </button>
                    {loading && (
                      <p className="mt-3 text-center text-sm md:text-base text-indigo-300 animate-pulse">
                        {loadingMessage}
                      </p>
                    )}

                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </form>


        </div>
      </motion.div>

      <div className="h-px w-full max-w-6xl mx-auto bg-white/10 my-12"></div>
      {/* All Reports */}
      <div className="flex justify-center">
        <div className="w-full max-w-6xl mt-12">

          {/* Heading */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <Files size={16} strokeWidth={1.5} />Your Previous Reports
            </h2>

            {reports.length > 0 && (
              <span className="text-xs text-gray-500">
                {reports.length} total
              </span>
            )}
          </div>

          {/* EMPTY STATE */}
          {reports.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 border border-white/10 rounded-xl bg-white/5">

              <p className="text-gray-300 text-lg mb-2">
                No reports yet
              </p>

              <p className="text-gray-500 text-sm mb-6 max-w-sm">
                Generate your first interview plan to see personalized questions and insights.
              </p>

              <button
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-white text-sm hover:opacity-90 transition active:scale-[0.97]"
              >
                Create First Plan
              </button>
            </div>
          ) : (
            /* LIST */
            <div className="space-y-3">
              {reports.map((report, i) => (
                <motion.div
                  key={report._id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer transition-all hover:border-indigo-400/30 hover:-translate-y-px hover:shadow-md hover:scale-[1.01] duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium">
                        {report.title}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">
                          Match Score
                        </p>
                        <p className="text-lg font-bold text-white">
                          {report.matchScore}%
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReportId(report._id);
                        }}
                        className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              <ConfirmModal
                open={!!selectedReportId}
                onClose={() => setSelectedReportId(null)}
                onConfirm={() => deleteReport(selectedReportId)}
                title="Delete Report"
                message="This report will be permanently deleted."
                confirmText="Delete"
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}