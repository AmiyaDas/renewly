import { IoClose, IoCreate } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import { useNavigate } from "react-router-dom";

export default function SubscriptionModal({ isOpen, onClose, subscription }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { currency } = useContext(PreferencesContext);
  const currencySymbols = { USD: "$", EUR: "€", INR: "₹", GBP: "£" };
  const navigate = useNavigate();
  if (!isOpen || !subscription) return null;

  const onDeleteSubscription = () => {
    setIsRemoving(true);
    setTimeout(() => {
      localStorage.removeItem(`subscription_${subscription.name}`);
      onClose(true);
    }, 300);
  };

  const onEditSubscription = () => {
    navigate(`/subscription/${subscription.name}`, { state: { subscription } });
  };

  const onMarkCancelled = () => {
    const updatedSub = { ...subscription, status: "cancelled" };
    localStorage.setItem(`subscription_${subscription.name}`, JSON.stringify(updatedSub));
    onClose(true); // trigger refresh in parent
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
      <div className={`bg-white w-[90%] max-w-md rounded-2xl shadow-xl relative p-6 transition-all duration-300 ${isRemoving ? 'fade-out-modal' : 'animate-modal-enter'}`}>
        <button
          onClick={onEditSubscription}
          aria-label="Edit Subscription"
          className="absolute top-4 right-12 text-gray-500 hover:text-gray-800"
        >
          <IoCreate size={24} />
        </button>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <img
            src={subscription.icon}
            alt={subscription.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{subscription.name}</h2>
            <p className="text-green-600 text-lg">
              {currencySymbols[currency] || ""}{subscription.price}
            </p>
          </div>
        </div>

        {/* Info section */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Billing Cycle</span>
            <span className="font-medium">{subscription.billingCycle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Next Payment</span>
            <span className="font-medium">{subscription.renewalDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Subscribed</span>
            <span className="font-medium">{subscription.startDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Category</span>
            <span className="font-medium">{subscription.category}</span>
          </div>
        </div>
        {/* Confirmation box */}
        {showConfirmDelete && deletConfirmBox}

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button 
            onClick={onMarkCancelled}
            className="w-full bg-yellow-500 text-white py-2 rounded-xl font-medium hover:bg-yellow-600 transition">
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