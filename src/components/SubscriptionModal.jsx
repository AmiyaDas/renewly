import { IoClose, IoCreate } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import { useNavigate } from "react-router-dom";
import { currencySymbols } from "../utils/utils";
import { useTranslation } from "react-i18next";

export default function SubscriptionModal({ isOpen, onClose, subscription }) {
  const { t, i18n } = useTranslation();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { currency } = useContext(PreferencesContext);
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
    const updatedSub = { ...subscription, status: "cancelled", cancelledDate: new Date().toISOString() };
    localStorage.setItem(
      `subscription_${subscription.name}`,
      JSON.stringify(updatedSub)
    );
    onClose(true); // trigger refresh in parent
  };

  const onMarkActiveubscription = () => {
    const updatedSub = { ...subscription, status: "active", cancelledDate: null };
    localStorage.setItem(
      `subscription_${subscription.name}`,
      JSON.stringify(updatedSub)
    );
    onClose(true); // trigger refresh in parent
  };
  const deletConfirmBox = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl text-lg shadow-2xl border border-gray-200 dark:border-gray-800 w-[90%] max-w-sm">
        <p className="mb-4 text-center text-gray-900 dark:text-gray-100">{t("confirm_delete_subscription")}</p>
        <div className="flex justify-between">
          <button
            onClick={onDeleteSubscription}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            {t("delete")}
          </button>
          <button
            onClick={() => setShowConfirmDelete(false)}
            className="mt-2 bg-black dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`subs bg-white dark:bg-gray-900 w-[90%] max-w-md rounded-2xl shadow-xl relative p-6 transition-all duration-300 ${
          isRemoving ? "fade-out-modal" : "animate-modal-enter"
        }`}
      >
        <button
          onClick={onEditSubscription}
          aria-label="Edit Subscription"
          className="absolute top-4 right-12 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          <IoCreate size={24} />
        </button>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          <IoClose size={24} />
        </button>

        {/* Header */}
        <div className="app-info flex items-center space-x-3 mb-6">
          <img
            src={subscription.icon}
            alt={subscription.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{subscription.name}</h2>
            <p className="text-green-600 dark:text-green-400 text-lg">
              {currencySymbols[currency] || ""}
              {subscription.price}
            </p>
          </div>
        </div>

        {/* Info section */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">{t("billing_cycle")}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{subscription.billingCycle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">{t("next_payment")}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{subscription.renewalDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">{t("subscribed")}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{subscription.startDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">{t("catgory")}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{subscription.category}</span>
          </div>
        </div>
        {/* Confirmation box */}
        {showConfirmDelete && deletConfirmBox}

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-3">
          {subscription.status === "active" ? (
          <button
            onClick={onMarkCancelled}
            className="w-full bg-yellow-500 dark:bg-yellow-600 text-white py-2 rounded-xl font-medium hover:bg-yellow-600 dark:hover:bg-yellow-700 transition"
            disabled={subscription.status === "cancelled"}
          >
            {t("mark_cancel")}
          </button>
          ) : (
          <button
            className="w-full text-white bg-green-400 dark:bg-green-700 font-medium hover:underline py-2 rounded-xl font-medium hover:bg-green-600 dark:hover:bg-green-800 transition"
            onClick={onMarkActiveubscription}
          >
            {t("mark_active")}
          </button>
          )}
          <button
            className="w-full text-red-600 dark:text-red-400 font-medium hover:underline"
            onClick={() => setShowConfirmDelete(true)}
          >
            {t("delete_subscription")}
          </button>
        </div>
      </div>
    </div>
  );
}
