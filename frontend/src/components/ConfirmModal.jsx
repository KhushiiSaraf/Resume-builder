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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111827] border border-white/10 rounded-xl p-6 w-full max-w-sm shadow-xl animate-[fadeIn_0.2s_ease-out]"
      >
        <h2 className="text-lg font-semibold text-gray-200 mb-2">
          {title}
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          {/* Cancel */}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
          >
            {cancelText}
          </button>

          {/* Confirm */}
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}