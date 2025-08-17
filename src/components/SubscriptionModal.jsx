import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function SubscriptionModal({ isOpen, onClose, modalData }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  if (!isOpen) return null;

  const onDeleteSubscription = () => {
    localStorage.removeItem(`subscription_${modalData.name}`);
    onClose();
  };

  const deletConfirmBox = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl text-lg shadow-2xl border border-gray-200 w-[90%] max-w-sm">
        <p className="mb-4 text-center">
          Are you sure you want to delete this subscription?
        </p>
        <div className="flex justify-between">
          <button
            onClick={onDeleteSubscription}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setShowConfirmDelete(false)}
            className="mt-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

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
            src={modalData.icon}
            alt="Netflix"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{modalData.name}</h2>
            <p className="text-green-600 text-lg">{`₹` + modalData.price}</p>
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
        {/* Confirmation box */}
        {showConfirmDelete && deletConfirmBox}

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button className="w-full bg-black text-white py-2 rounded-xl font-medium hover:bg-gray-800 transition">
            Mark as Cancelled
          </button>
          <button
            className="w-full text-red-600 font-medium hover:underline"
            onClick={() => setShowConfirmDelete(true)}
          >
            Delete Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
