import React from "react";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm sm:max-w-md rounded-xl border border-white/10 bg-[#111827] p-5 shadow-xl animate-[fadeIn_0.2s_ease-out] sm:p-6"
      >
        <h2 className="mb-2 text-base font-semibold text-gray-200 sm:text-lg">
          {title}
        </h2>

        <p className="mb-6 text-sm leading-5 text-gray-400 sm:text-sm">
          {message}
        </p>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          {/* Cancel */}
          <button
            onClick={onClose}
            className="w-full rounded-lg px-4 py-2 text-sm text-gray-400 transition hover:text-white sm:w-auto"
          >
            {cancelText}
          </button>

          {/* Confirm */}
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full rounded-lg bg-red-500/80 px-4 py-2 text-sm text-white transition hover:bg-red-500 sm:w-auto"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}