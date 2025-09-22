import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import GreenButton from "../ui/GreenButton";
import GrayButton from "../ui/GrayButton";

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 z-10">
        {/* Close button */}
        <button
            onClick={onClose}
            className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
        >
            <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-slate-800 mb-3">{title}</h2>
        <p className="text-slate-600 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-4">
            <GrayButton onClick={onClose}>Cancel</GrayButton>
            <GreenButton onClick={onConfirm}>Confirm</GreenButton>
        </div>
        </div>
    </Dialog>
  );
}

export default ConfirmationModal;
