import Header from "./Header";
import { useState } from "react";

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
    <div className="space-y-3">
      {events.map((event, i) => (
        <div key={i} className={`pl-2 border-l-4 ${event.color}`}>
          <div className="text-xs text-gray-400">{event.time}</div>
          <div className="text-sm font-semibold">{event.title}</div>
          <div className="text-xs text-gray-400">{event.location}</div>
        </div>
      ))}
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
