import { IoClose } from "react-icons/io5";

export default function SubscriptionModal({ isOpen, onClose, modalData }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl relative p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
            alt="Netflix"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{modalData.name}</h2>
            <p className="text-gray-600 text-sm">{`₹` + modalData.price}</p>
          </div>
        </div>

        {/* Info section */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Billing Cycle</span>
            <span className="font-medium">{modalData.billingCycle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Next Payment</span>
            <span className="font-medium">{modalData.renewalDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Subscribed</span>
            <span className="font-medium">{modalData.startDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Category</span>
            <span className="font-medium">{modalData.category}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button className="w-full bg-black text-white py-2 rounded-xl font-medium hover:bg-gray-800 transition">
            Mark as Cancelled
          </button>
          <button className="w-full text-red-600 font-medium hover:underline">
            Delete Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
