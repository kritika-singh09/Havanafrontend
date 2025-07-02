import React, { useState } from "react";

const Calendar = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState({});
  const [newBooking, setNewBooking] = useState({ guest: "", room: "" });
  const [filterText, setFilterText] = useState("");

  const formatDate = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const getBookingCategory = (date) => {
    const count = bookings[date]?.length || 0;
    if (count >= 7) return "full";
    if (count >= 4) return "medium";
    if (count >= 1) return "low";
    return null;
  };

  const handleAddBooking = () => {
    if (!selectedDate || !newBooking.guest.trim() || !newBooking.room.trim()) return;
    setBookings((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newBooking],
    }));
    setNewBooking({ guest: "", room: "" });
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const weeks = [];
    let day = 1;

    for (let week = 0; week < 6; week++) {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const cellIndex = week * 7 + i;
        if (cellIndex < firstDay || day > daysInMonth) {
          days.push(<td key={i}></td>);
        } else {
          const dateKey = formatDate(year, month, day);
          const category = getBookingCategory(dateKey);
          const bgColor =
            category === "full"
              ? "bg-red-500 text-white"
              : category === "medium"
              ? "bg-yellow-300"
              : category === "low"
              ? "bg-green-400"
              : "bg-white";

          days.push(
            <td key={i} className="p-2">
              <div
                className={`w-12 h-12 rounded flex items-center justify-center cursor-pointer border ${bgColor} hover:ring`}
                onClick={() => {
                  setSelectedDate(dateKey);
                  setFilterText(""); // Reset filter on new selection
                }}
              >
                {day}
              </div>
            </td>
          );
          day++;
        }
      }
      weeks.push(<tr key={week}>{days}</tr>);
    }
    return weeks;
  };

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Filtered bookings
  const filteredBookings = (bookings[selectedDate] || []).filter(
    (b) =>
      b.guest.toLowerCase().includes(filterText.toLowerCase()) ||
      b.room.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
  <div className="w-full max-w-none p-4 sm:p-6 font-sans bg-white shadow rounded-none">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
      <button onClick={handlePrev} className="px-4 py-2 bg-gray-100 rounded text-sm sm:text-base w-full sm:w-auto">Prev</button>
      <h2 className="text-lg sm:text-xl font-bold">{`${monthNames[month]} ${year}`}</h2>
      <button onClick={handleNext} className="px-4 py-2 bg-gray-100 rounded text-sm sm:text-base w-full sm:w-auto">Next</button>
    </div>

    {/* Responsive Calendar Table */}
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 text-center min-w-[500px]">
        <thead>
          <tr className="bg-gray-50">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <th key={d} className="p-2 text-xs sm:text-sm">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>

    {selectedDate && (
      <div className="mt-6">
        <h3 className="text-base sm:text-lg font-semibold mb-2">Bookings for {selectedDate}</h3>

        {/* Filter Input */}
        <input
          type="text"
          placeholder="Search guest or room..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />

        {/* Filtered Bookings */}
        <ul className="list-disc list-inside text-sm text-gray-800 mb-4">
          {filteredBookings.length === 0 ? (
            <li className="text-gray-400 italic">No matching bookings</li>
          ) : (
            filteredBookings.map((b, i) => (
              <li key={i}><strong>{b.guest}</strong> - Room {b.room}</li>
            ))
          )}
        </ul>

        {/* New Booking Form */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Guest Name"
            value={newBooking.guest}
            onChange={(e) => setNewBooking((prev) => ({ ...prev, guest: e.target.value }))}
            className="border p-2 rounded w-full sm:w-1/3"
          />
          <input
            type="text"
            placeholder="Room No"
            value={newBooking.room}
            onChange={(e) => setNewBooking((prev) => ({ ...prev, room: e.target.value }))}
            className="border p-2 rounded w-full sm:w-1/3"
          />
          <button
            onClick={handleAddBooking}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            Add Booking
          </button>
        </div>
      </div>
    )}

    {/* Booking Legend */}
    <div className="mt-6 flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-green-400 rounded"></div> Low Booking
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-yellow-300 rounded"></div> Medium Booking
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-red-500 rounded"></div> Fully Booked
      </div>
    </div>
  </div>
);

};
export default Calendar;
