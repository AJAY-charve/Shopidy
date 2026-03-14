import { toast } from "sonner";
import { FaExclamationTriangle, FaTimes, FaTrash } from "react-icons/fa";

const confirmDelete = ({
  title = "Delete Item?",
  description = "This action cannot be undone. This will permanently delete the item.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  successMessage = "Deleted successfully",
  errorMessage = "Failed to delete",
}) => {
  toast.custom(
    (t) => (
      <div className="bg-white rounded-xl shadow-2xl w-[350px] border border-gray-200 overflow-hidden animate-in slide-in-from-top-2 duration-300">
        {/* Header with Icon */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FaExclamationTriangle className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm text-white/90">Confirm Action</p>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-gray-600 text-sm mb-4">{description}</p>

          {/* Warning Message */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-amber-700 flex items-center gap-2">
              <FaExclamationTriangle className="text-amber-500" />
              This action is permanent and cannot be reversed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => toast.dismiss(t)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </button>

            <button
              onClick={async () => {
                toast.dismiss(t);
                try {
                  await onConfirm();
                  toast.success(successMessage, {
                    icon: "✅",
                    className: "bg-green-50 border-green-200",
                  });
                } catch (err) {
                  toast.error(errorMessage, {
                    icon: "❌",
                    className: "bg-red-50 border-red-200",
                  });
                }
              }}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <FaTrash className="text-sm" />
              {confirmText}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Please confirm you want to proceed with this action.
          </p>
        </div>
      </div>
    ),
    {
      position: "top-center",
      duration: Infinity,
    },
  );
};

export default confirmDelete;
