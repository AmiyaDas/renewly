import Header from "./Header";
import { useState, useEffect, useContext } from "react";
import { categoryColorMap } from "../utils/data";
import CalendarEvent from "./CalendarEvent";
import { PreferencesContext } from "../context/PreferencesContext";
import { currencySymbols, formatBillingCycle } from "../utils/utils";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const days = ["S", "M", "T", "W", "T", "F", "S"];

const events = [
  {
    time: "All day",
    title: "Executive team meeting",
    location: "Small meeting room",
    color: "border-cyan-400",
  },
  {
    time: "All day",
    title: "Check product quality",
    location: "Warehouse No 2",
    color: "border-orange-400",
  },
  {
    time: "8:00 AM",
    title: "Teleconference team",
    location: "Video conference room",
    color: "border-red-400",
  },
  {
    time: "1:00 PM",
    title: "Have lunch with customers",
    location: "Restaurant",
    color: "border-pink-400",
  },
  {
    time: "5:00 PM",
    title: "Review first draft",
    location: "My house",
    color: "border-blue-400",
  },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [subscriptions, setSubscriptions] = useState([]);
  const { currency } = useContext(PreferencesContext);
  const { t } = useTranslation();

  useEffect(() => {
    const subs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("subscription_")) {
        try {
          const sub = JSON.parse(localStorage.getItem(key));
          subs.push(sub);
        } catch (e) {
          // ignore parsing errors
        }
      }
    }
    const arrangedSubs = subs
      .filter((sub) => {
        const renewal = new Date(sub.renewalDate);
        const now = new Date();
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        return renewal >= now && renewal <= nextYear;
      })
      .map((sub) => {
        let color = categoryColorMap[sub.category] || "border-gray-400";
        return {
          id: sub.id,
          title: sub.name,
          time: sub.renewalDate,
          price: sub.price,
          color: color,
          icon: sub.icon,
          billingCycle: sub.billingCycle,
        };
      });
    setSubscriptions(arrangedSubs);
  }, []);

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(year, currentDate.getMonth());

  const calendarGrid = (
    <>
      <div className="grid grid-cols-7 text-center mb-4 px-4 mt-8">
        {days.map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 text-sm"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center mb-4 px-4">
        {[
          // Empty slots for days before first day of month
          ...Array(new Date(year, currentDate.getMonth(), 1).getDay()).fill(
            null
          ),
          // Actual days in month
          ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
        ].map((day, index) =>
          day === null ? (
            <div key={`empty-${index}`} className="w-8 h-8" />
          ) : (
            <div
              key={day}
              onClick={() =>
                setCurrentDate(new Date(year, currentDate.getMonth(), day))
              }
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm cursor-pointer
                ${
                  day === currentDate.getDate()
                    ? "bg-red-400 text-white"
                    : subscriptions.some((event) => {
                        const d = new Date(event.time);
                        return (
                          d.getDate() === day &&
                          d.getMonth() === currentDate.getMonth() &&
                          d.getFullYear() === year
                        );
                      })
                    ? "bg-green-200 text-black"
                    : "text-gray-700"
                }`}
            >
              {day}
            </div>
          )
        )}
      </div>
    </>
  );

  const filteredEvents = subscriptions.filter((event) => {
    const eventDate = new Date(event.time);
    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const eventsList = (
    <div className="px-4 py-2">
      <div className="text-lg font-bold py-2">
        {filteredEvents.length
          ? t("upcoming_renewals")
          : "☹️ " + t("no_upcoming_renewals")}
      </div>
      <div className="flex flex-col gap-3">
        {filteredEvents
          .sort((a, b) => new Date(a.time) - new Date(b.time))
          .map((event) => (
            <CalendarEvent
              key={event.id}
              title={event.title}
              icon={event.icon}
              daysLeft={7}
              price={`${currencySymbols[currency] || ""}${
                event.price
              } ${formatBillingCycle(event.billingCycle)}`}
            />
          ))}
      </div>
    </div>
  );
  return (
    <div className="w-screen min-h-screen viewport">
      <Header
        showNavBack={true}
        title="Renewly"
        isAppTitle={true}
        showIcons={true}
      />
      <div className="flex justify-between items-center px-4 py-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 bg-transparent"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
            )
          }
        >
          <FaChevronLeft />
        </button>
        <h2 className="font-bold text-lg">
          {month} {year}
        </h2>
        <button
          className="px-3 py-1 rounded bg-gray-200 bg-transparent"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            )
          }
        >
          <FaChevronRight />
        </button>
      </div>
      {calendarGrid}

      {eventsList}
    </div>
  );
};

export default Calendar;
