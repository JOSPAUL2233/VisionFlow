import { X } from "lucide-react";

function ProjectModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 p-7 relative border border-slate-200">
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
