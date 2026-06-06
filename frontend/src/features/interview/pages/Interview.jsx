import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import LoadingSpinner from "../components/LoadingSpinner";
import CountUp from "react-countup";

export default function Interview() {
  const [activeTab, setActiveTab] = useState("technical");
  const [openIndex, setOpenIndex] = useState(null);

  const { report, getReportById, loading } = useInterview();
  const { interviewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading) return <LoadingSpinner />;
  if (!report) return <LoadingSpinner />;

  const formattedTitle = report.title
    ? report.title.charAt(0).toUpperCase() + report.title.slice(1)
    : "Interview Preparation";

  return (<div className="min-h-screen bg-[#0b0f19] text-gray-200 px-4 md:px-8 py-6">

    {/* BACK BUTTON ONLY */}
    <div className="mb-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="text-sm text-gray-400 hover:text-white transition"
      >
        ← Back to Home
      </button>
    </div>

    {/* MAIN LAYOUT */}
    <div className="flex flex-col md:flex-row gap-8">

      {/* LEFT CONTENT */}
      <div className="flex-1 max-w-4xl">

        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight
          bg-linear-to-r from-indigo-400 to-purple-400 
          bg-clip-text text-transparent 
          leading-[1.2] pb-1 mb-2">
          {formattedTitle}
        </h1>

        {/* TABS */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { key: "technical", label: "Technical Questions" },
            { key: "behavioral", label: "Behavioral Questions" },
            { key: "plan", label: "Preparation Plan" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-sm transition
              ${activeTab === tab.key
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-400/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="space-y-6">

          {/* TECHNICAL */}
          {activeTab === "technical" && (
            <div className="space-y-3">
              {report.technicalQuestions.map((q, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:border-indigo-400/30"
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-200">
                      {q.question}
                    </p>
                    <span className="text-lg transition rotate-0">
                      {openIndex === i ? "–" : "+"}
                    </span>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === i
                        ? "max-h-96 opacity-100 mt-3"
                        : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="text-[15px] text-gray-400 space-y-3">

                  <div>
                    <p className="text-xs uppercase tracking-wide text-indigo-300 mb-1">
                      Intention
                    </p>
                    <p className="leading-relaxed">
                      {q.intention}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-purple-300 mb-1">
                      How to Answer
                    </p>
                    <p className="leading-relaxed">
                      {q.HowToAnswer}
                    </p>
                  </div>

                </div>
               </div>
            </div>
          ))}
         </div>
          )}

          {/* BEHAVIORAL */}
          {activeTab === "behavioral" && (
            <div className="space-y-3">
              {report.behavioralQuestions.map((q, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:border-indigo-400/30"
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-200">
                      {q.question}
                    </p>
                    <span className="text-lg transition rotate-0">
                      {openIndex === i ? "–" : "+"}
                    </span>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === i
                        ? "max-h-96 opacity-100 mt-3"
                        : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="text-[15px] text-gray-400 space-y-3">

                  <div>
                    <p className="text-xs uppercase tracking-wide text-indigo-300 mb-1">
                      Intention
                    </p>
                    <p className="leading-relaxed">
                      {q.intention}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-purple-300 mb-1">
                      How to Answer
                    </p>
                    <p className="leading-relaxed">
                      {q.HowToAnswer}
                    </p>
                  </div>

                </div>
              </div>
             </div>
            ))}
          </div>
        )}

          {/* PLAN */}
          {activeTab === "plan" && (
            <div className="space-y-0">
             {report.preparationPlan.map((day, i) => (
               <div key={i} className="flex gap-4">

              {/* LEFT LINE + DOT */}
              <div className="flex flex-col items-center">
                
                {/* DOT */}
                <div className="w-3 h-3 rounded-full bg-indigo-400 mt-2"></div>

                {/* LINE */}
                {i !== report.preparationPlan.length - 1 && (
                  <div className="w-0.5 h-full bg-white/10"></div>
                )}
              </div>

              {/* CONTENT */}
              <div className="pb-8">
                <p className="text-indigo-300 font-semibold">
                  Day {day.day}
                </p>

                <p className="text-gray-200 text-sm mb-2">
                  {day.focus}
                </p>

                <ul className="list-disc ml-5 text-sm text-gray-400 space-y-1">
                  {day.tasks.map((task, idx) => (
                    <li key={idx}>{task}</li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
          )}

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-72 shrink-0 space-y-6 md:sticky md:top-6 h-fit">

        {/* MATCH SCORE */}
        <div className="p-5 bg-white/5 border border-white/10 rounded-xl text-center">
          <p className="text-sm text-gray-400 mb-2">Match Score</p>
          <p className="text-3xl font-bold text-indigo-300">
              <CountUp
                end={report.matchScore}
                duration={1.5}
              />
               %
          </p>
        </div>

        {/* SKILL GAPS */}
        <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-3">

            <p className="text-sm text-gray-300">Skill Gaps</p>

            {/* COLOR LEGEND */}
            <div className="flex items-center gap-2">

              {/* RED */}
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400 cursor-pointer peer"></div>
                <span className="absolute hidden peer-hover:block text-[10px] bg-[#111827] border border-white/10 text-gray-300 px-2 py-1 rounded -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  High 
                </span>
              </div>

              {/* YELLOW */}
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 cursor-pointer peer"></div>
                <span className="absolute hidden peer-hover:block text-[10px] bg-[#111827] border border-white/10 text-gray-300 px-2 py-1 rounded -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  Medium 
                </span>
              </div>

              {/* GREEN */}
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 cursor-pointer peer"></div>
                <span className="absolute hidden peer-hover:block text-[10px] bg-[#111827] border border-white/10 text-gray-300 px-2 py-1 rounded -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  Low 
                </span>
              </div>

            </div>

          </div>

          <div className="space-y-2">
            {report.skillGaps.map((s, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-md border text-sm
                ${s.severity === "high"
                    ? "border-red-400/40"
                    : s.severity === "medium"
                      ? "border-yellow-400/40"
                      : "border-green-400/40"
                  }`}
              >
                {s.skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}