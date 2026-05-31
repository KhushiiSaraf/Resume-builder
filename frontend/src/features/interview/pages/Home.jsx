import React, { useState, useRef, useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
export default function Home() {

  const { loading, generateReport, getAllReports, reports, setReports } = useInterview();
  const [fileName, setFileName] = useState("No file chosen");
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef(null);


  const navigate = useNavigate();

  const { user } = useAuth()

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    const resumeFile = resumeInputRef.current.files[0];
    await generateReport({ jobDescription, selfDescription, resumeFile });
  }
// console.log("user in Home:", user)
 useEffect(() => {
    setReports([])
    getAllReports()
}, [user?.id])

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0b0f19] px-4 py-10 md:py-16 overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[300px] h-[300px] bg-indigo-600/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[250px] h-[250px] bg-purple-600/20 blur-3xl rounded-full bottom-[-80px] right-[-80px]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-6xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">

        {/* SAME TEXT */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 
bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
          Generate Interview Plan
        </h1>

        <p className="text-sm text-gray-400 text-center mb-8 max-w-xl mx-auto">
          Get a personalized interview preparation plan based on the job description and your background.
        </p>

        <form className="space-y-8">

          {/* GRID LAYOUT */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* LEFT: JOB DESCRIPTION */}
            <div className="flex flex-col">
              <h2 className="text-base font-semibold text-gray-200 mb-3">
                Job Description
              </h2>
              <textarea
                value={jobDescription}
                onChange={(e) => { setJobDescription(e.target.value) }}
                rows="10"
                placeholder="Paste the job description..."
                className="flex-1 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* RIGHT: PROFILE */}
            <div className="flex flex-col gap-6">

              <h2 className="text-base font-semibold text-gray-200 mb-1">
                Your Details
              </h2>
              {/* Resume */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-400/30 transition">

                {/* 🔹 HEADER ROW (title + badge) */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-200">
                    Upload Resume
                  </h3>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                    BEST RESULTS
                  </span>
                </div>

                {/* 🔹 UPLOAD BOX */}
                <label className="block border border-dashed border-white/10 rounded-lg p-6 text-center hover:border-indigo-400/40 transition cursor-pointer">

                  <p className="text-sm text-gray-400">
                    Click to upload PDF
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {fileName}
                  </p>

                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                    ref={resumeInputRef}
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
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-purple-400/30 transition">
                <p className="text-sm text-gray-300 mb-2">
                  About You
                </p>

                <textarea
                  value={selfDescription}
                  onChange={(e) => { setSelfDescription(e.target.value) }}
                  rows="5"
                  placeholder="Write a short description about yourself..."
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>

              {/* Helper */}
              <div className="bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs p-3 rounded-lg text-center">
                Either a Resume or a Self Description is required to generate your interview plan.
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-lg font-medium text-white
              bg-gradient-to-r from-indigo-500 to-purple-500
              transition-all duration-200 ease-out
              hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]
              hover:-translate-y-[1px]
              active:scale-[0.98]
            "
            onClick={handleGenerateReport}
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>

        </form>
        {reports.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Previous Reports</h2>
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:border-indigo-400/30 transition flex items-center justify-between"
                >
                  <div>
                    <p className="text-gray-200 font-medium">{report.title}</p>
                    <p className="text-gray-400 text-sm">{new Date(report.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Match Score</p>
                    <p className="text-lg font-bold text-white">
                      {report.matchScore}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}