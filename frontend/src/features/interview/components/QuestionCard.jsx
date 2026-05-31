import { useState } from "react";

function QuestionCard({ q }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
      
      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 flex justify-between items-center hover:bg-white/5 transition"
      >
        <p className="text-sm md:text-base text-gray-100">
          {q.question}
        </p>

        <span className="text-gray-400">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* CONTENT */}
      {open && (
        <div className="px-4 pb-4 space-y-2 text-sm text-gray-400">
          
          <p>
            <span className="text-indigo-300">Intention:</span>{" "}
            {q.intention}
          </p>

          <p>
            <span className="text-purple-300">How to Answer:</span>{" "}
            {q.HowToAnswer}
          </p>

        </div>
      )}
    </div>
  );
}

export default QuestionCard;