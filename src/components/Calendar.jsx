import Header from "./Header";
import { useState, useEffect } from "react";
import { categoryColorMap } from "../utils/data";
import CalendarEvent from "./CalendarEvent";

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
  const [currentDate] = useState(new Date(2020, 0, 9));
  const [subscriptions, setSubscriptions] = useState([]);

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
    const arrangedSubs = subs.map((sub) => {
      let color = categoryColorMap[sub.category] || "border-gray-400";
      return {
        // id: sub.id,
        title: sub.name,
        time: sub.renewalDate,
        price: sub.price,
        color: color,
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
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm cursor-pointer
              ${
                day === currentDate.getDate()
                  ? "bg-red-400 text-white"
                  : "text-gray-700"
              }`}
          >
            {day}
          </div>
        ))}
      </div>
    </>
  );

  const eventsList = (
    <div className="px-4 py-2">
      <div className="text-lg font-bold py-2">Upcoming renewals</div>
      <div className="">
        {subscriptions.map((event) => (
          <CalendarEvent
            key={event.id}
            title={event.title}
            price={event.price}
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
      {calendarGrid}

      {eventsList}
    </div>
  );
};

export default Calendar;
