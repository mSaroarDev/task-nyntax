import { CircleX } from "lucide-react";

export const PopupModal = ({ onCloseButton, children, modalHeader }) => (
  <>
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 px-5 bg-black bg-opacity-50">
      <div className="w-full h-auto max-w-2xl p-6 overflow-y-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-blue-900">{modalHeader}</h2>

          <button
            onClick={onCloseButton}
            className="text-2xl font-extrabold text-blue-900"
          >
            <CircleX className="w-5 h-5" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  </>
);
