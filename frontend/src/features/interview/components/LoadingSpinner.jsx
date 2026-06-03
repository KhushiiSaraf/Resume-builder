function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0b0f19]">

      {/* Glow background */}
      <div className="absolute w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

      {/* Spinner */}
      <div className="relative flex items-center justify-center mb-6">
        <span className="absolute w-16 h-16 rounded-full bg-indigo-500/20 blur-xl animate-pulse"></span>

        <span className="w-10 h-10 border-2 border-white/20 border-t-indigo-400 rounded-full animate-spin"></span>
      </div>

      {/* Text */}
      <p className="text-gray-400 text-sm animate-pulse">
        Preparing your interview experience...
      </p>

    </div>
  );
}

export default LoadingSpinner;