import { toast } from "sonner";

const confirmDelete = ({
    title = "Delete?",
    description = "This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    successMessage = "Deleted successfully",
    errorMessage = "Failed to delete",
}) => {
    toast.custom((t) => (
        <div className="bg-white shadow-lg rounded-lg p-4 w-[320px] border">
            <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
            <p className="text-sm text-gray-600 mb-4">{description}</p>

            <div className="flex justify-end gap-3">
                <button
                    onClick={() => toast.dismiss(t)}
                    className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100"
                >
                    {cancelText}
                </button>

                <button
                    onClick={async () => {
                        toast.dismiss(t);
                        try {
                            await onConfirm();
                            toast.success(successMessage);
                        } catch (err) {
                            toast.error(errorMessage);
                        }
                    }}
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                >
                    {confirmText}
                </button>
            </div>
        </div>
    ));
};

export default confirmDelete;
