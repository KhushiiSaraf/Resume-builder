import { useState, useEffect } from "react";
import { useParams } from "react-router";
import QuestionCard from '../components/QuestionCard';
import { useInterview } from "../hooks/useInterview";
import LoadingSpinner from "../components/LoadingSpinner";


export default function Interview() {
  const [activeTab, setActiveTab] = useState("technical");

  const { report, getReportById, loading } = useInterview();
  const { interviewId } = useParams();

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

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex flex-col md:flex-row">     
     
      {/* LEFT SIDEBAR */}
      <div className="md:w-60 w-full border-b md:border-b-0 md:border-r border-white/10 p-4 md:p-6">
      
        <h2 className="text-lg font-semibold text-gray-300 mb-4">
          Sections
        </h2>

        {[
          { key: "technical", label: "Technical Questions" },
          { key: "behavioral", label: "Behavioral Questions" },
          { key: "plan", label: "Preparation Plan" }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activeTab === item.key
                ? "bg-indigo-500/20 text-indigo-300"
                : "hover:bg-white/5 text-gray-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* CENTER CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="
  text-3xl md:text-5xl font-bold tracking-tight mb-2
  bg-gradient-to-r from-indigo-400 to-purple-400 
  bg-clip-text text-transparent
">
  {formattedTitle}
</h1>

        </div>

        {/* TECHNICAL */}
        {activeTab === "technical" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">
              Technical Questions
            </h2>

            <div className="space-y-3">
  {report.technicalQuestions.map((q, i) => (
    <QuestionCard key={i} q={q} />
  ))}
</div>
          </div>
        )}

        {/* BEHAVIORAL */}
        {activeTab === "behavioral" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">
              Behavioral Questions
            </h2>

            <div className="space-y-3">
  {report.behavioralQuestions.map((q, i) => (
    <QuestionCard key={i} q={q} />
  ))}
</div>
          </div>
        )}

        {/* PLAN */}
        {activeTab === "plan" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">
              Preparation Plan
            </h2>

            <div className="space-y-4">
  {report.preparationPlan.map((day, i) => (
    <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl">
      
      <p className="text-indigo-300 font-medium mb-2">
        Day {day.day}: {day.focus}
      </p>

      <ul className="list-disc ml-5 text-sm text-gray-400 space-y-1">
        {day.tasks.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ul>

    </div>
  ))}
</div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="md:w-72 w-full border-t md:border-t-0 md:border-l border-white/10 p-4 space-y-6 md:p-6">
        
        {/* MATCH SCORE */}
        <div className="p-5 bg-white/5 border border-white/10 rounded-xl text-center">
          <p className="text-sm text-gray-400 mb-2">Match Score</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {report.matchScore}%
          </p>
        </div>

        {/* SKILL GAPS */}
        <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-sm text-gray-300 mb-3">Skill Gaps</p>

          <div className="space-y-2">
            {report.skillGaps.map((s, i) => (
              <div
                key={i}
                className="flex justify-between text-sm bg-white/5 px-3 py-2 rounded-md"
              >
                <span>{s.skill}</span>
                <span className={
  s.severity === "high"
    ? "text-red-400"
    : s.severity === "medium"
    ? "text-yellow-400"
    : "text-green-400"
}>
  {s.severity}
</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

