import Header from "./Header";
import { useState, useEffect, useContext } from "react";
import { categoryColorMap } from "../utils/data";
import CalendarEvent from "./CalendarEvent";
import { PreferencesContext } from "../context/PreferencesContext";
import { currencySymbols, formatBillingCycle } from "../utils/utils";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { generateRenewalEvents } from "../utils/utils";

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
  const [viewType, setViewType] = useState("month"); // "month" or "year"
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

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
    const arrangedSubs = subs.flatMap((sub) => generateRenewalEvents(sub, categoryColorMap, viewType === "year"));
    setSubscriptions(arrangedSubs);
    window.addEventListener("storage", () => {
      const subs = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("subscription_")) {
          try {
            const sub = JSON.parse(localStorage.getItem(key));
            subs.push(sub);
          } catch (e) {}
        }
      }
      const updatedSubs = subs.flatMap((sub) =>
        generateRenewalEvents(sub, categoryColorMap, viewType === "year")
      );
      setSubscriptions(updatedSubs);
    });
    return () => window.removeEventListener("storage", () => {});
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
              onClick={() => {
                const clickedDate = new Date(year, currentDate.getMonth(), day);
                setCurrentDate(clickedDate);
                setSelectedDate(clickedDate);
                const eventsForDate = subscriptions.filter(e => {
                  const d = new Date(e.time);
                  return (
                    d.getDate() === clickedDate.getDate() &&
                    d.getMonth() === clickedDate.getMonth() &&
                    d.getFullYear() === clickedDate.getFullYear()
                  );
                });
                setSelectedEvents(eventsForDate);
              }}
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
    if (viewType === "month") {
      return (
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    }
    return eventDate.getFullYear() === currentDate.getFullYear();
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
              daysLeft={
                (() => {
                  const diffDays = Math.ceil((new Date(event.time) - new Date()) / (1000 * 60 * 60 * 24));
                  return diffDays < 0 ? -1 : diffDays;
                })()
              }
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
      <div className="flex justify-center gap-4 py-2">
        <button
          className={`px-3 py-1 rounded ${viewType === "month" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setViewType("month")}
        >
          Month View
        </button>
        <button
          className={`px-3 py-1 rounded ${viewType === "year" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setViewType("year")}
        >
          Year View
        </button>
      </div>
      {viewType === "month" && (
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
      )}
      {viewType === "month" ? (
        <>
          {calendarGrid}
          {selectedEvents.length > 0 && (
            <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex justify-center items-center z-50">
              <div className="bg-white p-4 rounded w-80 max-h-[80vh] overflow-y-auto">
                <h3 className="font-bold mb-2">
                  Subscriptions for {selectedDate.toLocaleDateString()}
                </h3>
                <ul className="flex flex-col gap-2">
                  {selectedEvents.map(ev => (
                    <li key={ev.id} className="border p-2 rounded flex items-center gap-2">
                      {ev.icon && <img src={ev.icon} alt={ev.title} className="w-6 h-6" />}
                      <div>
                        <div className="font-semibold">{ev.title}</div>
                        <div>Price: {ev.price}</div>
                        <div>Renewal Date: {new Date(ev.time).toLocaleDateString()}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-2 px-3 py-1 rounded bg-gray-200"
                  onClick={() => setSelectedEvents([])}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {eventsList}
        </>
      ) : (
        <div className="grid grid-cols-3 gap-4 px-4">
          {Array.from({ length: 12 }, (_, m) => (
            <div key={m} className="p-2 border rounded">
              <h4 className="text-sm font-bold text-center">
                {new Date(0, m).toLocaleString("default", { month: "short" })}
              </h4>
              <ul className="mt-2 text-xs">
                {Array.from(
                  new Map(
                    subscriptions
                      .filter(e => new Date(e.time).getMonth() === m)
                      .sort((a,b)=> new Date(a.time) - new Date(b.time))
                      .map(e => [e.id, e])
                  ).values()
                ).map(e => (
                  <li key={e.id} className="flex items-center gap-2">
                    {e.icon && <img src={e.icon} alt={e.title} className="w-4 h-4" />}
                    {e.title} - {e.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
