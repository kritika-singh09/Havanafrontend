
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios"; // Import axios

const Calendar = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState({}); // Stores bookings grouped by date
  const [allBookings, setAllBookings] = useState([]); // Stores all fetched bookings for the month
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://havana-backend.vercel.app/api/bookings";

  const formatDate = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  // Function to load bookings from the API
  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL); // Fetch all bookings
      let fetchedBookings = [];

      // Robustly handle different API response structures
      if (Array.isArray(response.data)) {
        fetchedBookings = response.data;
      } else if (response.data && Array.isArray(response.data.bookings)) {
        fetchedBookings = response.data.bookings;
      } else if (response.data && Array.isArray(response.data.data)) {
        fetchedBookings = response.data.data;
      } else {
        console.warn("Unexpected API response structure for calendar:", response.data);
        setError("Received unexpected data format from server for calendar bookings.");
        fetchedBookings = [];
      }

      // Filter bookings to only include those that start or end within the current month,
      // or span across it.
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0); // Last day of the current month

      const relevantBookings = fetchedBookings.filter(booking => {
        // Ensure checkInDate and checkOutDate exist and are valid for Date constructor
        const checkIn = booking.checkInDate ? new Date(booking.checkInDate) : null;
        const checkOut = booking.checkOutDate ? new Date(booking.checkOutDate) : null;

        if (!checkIn || !checkOut) return false; // Skip bookings without valid dates

        // Check if booking starts, ends, or spans within the current month view
        return (
          (checkIn.getFullYear() === year && checkIn.getMonth() === month) ||
          (checkOut.getFullYear() === year && checkOut.getMonth() === month) ||
          (checkIn < monthStart && checkOut > monthEnd) // Spans across the entire month
        );
      });

      setAllBookings(relevantBookings); // Store for current month's display

      // Group bookings by check-in date for calendar dot display
      const grouped = {};
      relevantBookings.forEach((b) => {
        // Ensure checkInDate is a valid date string (e.g., "YYYY-MM-DD")
        const checkIn = b.checkInDate ? new Date(b.checkInDate).toISOString().split('T')[0] : null; // Take only YYYY-MM-DD part
        if (checkIn) {
          if (!grouped[checkIn]) grouped[checkIn] = [];
          grouped[checkIn].push({ guest: b.name, room: b.roomNo });
        }
      });
      setBookings(grouped);

    } catch (err) {
      console.error("Error loading bookings:", err);
      if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`);
      } else if (err.request) {
        setError("Network error: No response from server. Check your connection or server status.");
      } else {
        setError("Error setting up request: " + err.message);
      }
      setBookings({}); // Clear bookings on error
      setAllBookings([]); // Clear all bookings on error
    } finally {
      setLoading(false);
    }
  }, [year, month]); // Re-run when month or year changes

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handlePrev = () => {
    setSelectedDate(null); // Clear selected date on month change
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    setSelectedDate(null); // Clear selected date on month change
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

  const renderCalendar = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
    const weeks = [];
    let day = 1;

    for (let week = 0; week < 6; week++) {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const cellIndex = week * 7 + i;
        if (cellIndex < firstDay || day > daysInMonth) {
          days.push(<td key={`${week}-${i}-empty`} className="p-0.5 sm:p-2"></td>); {/* Reduced padding */}
        } else {
          const dateKey = formatDate(year, month, day);
          const category = getBookingCategory(dateKey);
          const isToday =
            dateKey === formatDate(today.getFullYear(), today.getMonth(), today.getDate());
          const isSelected = selectedDate === dateKey;

          // Adjusted colors to be more 'Havana Bistro'
          const dotColor =
            category === "full"
              ? "bg-red-600" // Deeper red for full
              : category === "medium"
              ? "bg-amber-500" // Richer amber for medium
              : category === "low"
              ? "bg-emerald-600" // Deeper emerald for low
              : "";

          const todayHighlight = isToday
            ? "border-blue-700 shadow-lg" // Stronger blue for today, more prominent shadow
            : "border-gray-300"; // Softer border

          const selectedHighlight = isSelected
            ? "bg-blue-200 border-blue-800 shadow-xl scale-[1.03]" // More pronounced selection
            : "bg-white";

          days.push(
            <td key={`${week}-${i}-${day}`} className="p-0.5 sm:p-2"> {/* Reduced padding */}
              <div
                className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out
                            ${selectedHighlight} ${todayHighlight} border-2
                            hover:bg-amber-50 hover:border-amber-300 hover:shadow-md`} // Hover to warm tone
                onClick={() => {
                  setSelectedDate(dateKey);
                }}
              >
                {/* Adjusted font size for day number, added 'xs' breakpoint for very small phones */}
                <span className="text-xs xs:text-sm sm:text-base md:text-lg font-semibold text-gray-800">{day}</span>
                {category && (
                  <span className={`mt-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${dotColor}`}></span> 
                )}
              </div>
            </td>
          );
          day++;
        }
      }
      weeks.push(<tr key={`week-${week}`}>{days}</tr>);
    }
    return weeks;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Filter the bookings for the selected date based on filterText (room number)
  const bookingsForSelectedDate = selectedDate ? (bookings[selectedDate] || []) : [];

  const filteredBookings = bookingsForSelectedDate.filter(
    (b) =>
      b.room.toLowerCase().includes(filterText.toLowerCase()) ||
      b.guest.toLowerCase().includes(filterText.toLowerCase()) // Added guest name search
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-8 font-sans bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-2xl rounded-2xl border border-gray-200"> {/* Reduced overall padding for smallest screens */}
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-10 pb-3 sm:pb-6 border-b-2 border-amber-300"> {/* Reduced margin/padding */}
        <button
          onClick={handlePrev}
          // Adjusted font size for button text and padding
          className="px-4 py-1.5 sm:px-7 sm:py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-xl shadow-lg hover:from-blue-800 hover:to-blue-950 transition duration-300 ease-in-out text-xs sm:text-lg w-full sm:w-auto mb-3 sm:mb-0 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-70 flex items-center justify-center gap-1.5 sm:gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 sm:w-5 sm:h-5"> {/* Smaller icon */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Previous
        </button>
        {/* Adjusted font size for month/year title */}
        <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-3 sm:mb-0 drop-shadow-sm text-center"> {/* Smaller on xs and sm */}
          {`${monthNames[month]} ${year}`}
        </h2>
        <button
          onClick={handleNext}
          // Adjusted font size for button text and padding
          className="px-4 py-1.5 sm:px-7 sm:py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-xl shadow-lg hover:from-blue-800 hover:to-blue-950 transition duration-300 ease-in-out text-xs sm:text-lg w-full sm:w-auto transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-70 flex items-center justify-center gap-1.5 sm:gap-2"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 sm:w-5 sm:h-5"> {/* Smaller icon */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-4 sm:py-12 bg-blue-50 rounded-lg shadow-inner"> {/* Reduced padding */}
          <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 border-t-4 border-b-4 border-blue-600 mb-3 sm:mb-4"></div> {/* Smaller spinner */}
          {/* Adjusted font size for loading text */}
          <p className="ml-2 text-sm sm:text-xl font-semibold text-blue-800">Loading bookings, please wait...</p> {/* Smaller text */}
        </div>
      )}
      {error && (
        <div className="text-center text-red-800 bg-red-100 p-2 sm:p-4 rounded-lg border border-red-400 font-medium text-xs sm:text-lg shadow-sm"> {/* Reduced padding/text size */}
          {/* Adjusted font size for error text */}
          <p className="font-bold mb-0.5 sm:mb-2 text-sm sm:text-lg">Error:</p>
          <p className="text-xs sm:text-base">{error}</p>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">Please try refreshing the page or contact support if the issue persists.</p>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl p-2 sm:p-6 border border-gray-200 overflow-x-auto"> {/* Reduced padding */}
        <table className="w-full border-collapse text-center table-fixed"> {/* table-fixed for consistent column widths */}
          <thead>
            <tr className="bg-blue-600 text-white rounded-t-xl overflow-hidden shadow-inner"> {/* Darker blue, text white, rounded top corners */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                // Adjusted font size for day names and padding
                <th key={d} className="p-1 text-xs sm:p-4 sm:text-lg font-extrabold uppercase tracking-widest border-r border-blue-700 last:border-r-0">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderCalendar()}</tbody>
        </table>
      </div>

      {/* Booking Details Section */}
      {selectedDate && (
        <div className="mt-6 sm:mt-12 p-4 sm:p-8 bg-blue-50 border border-blue-200 rounded-2xl shadow-2xl transform transition-all duration-500 ease-in-out scale-100 hover:scale-[1.005]"> {/* Reduced padding */}
          {/* Adjusted font size for booking details title and button size */}
          <h3 className="text-xl xs:text-2xl sm:text-4xl font-extrabold text-blue-900 mb-3 sm:mb-6 flex items-center justify-between border-b pb-2 sm:pb-4 border-blue-300">
            Bookings for <span className="text-amber-600 ml-1.5 sm:ml-3">{selectedDate}</span> {/* Reduced margin */}
            <button
              onClick={() => setSelectedDate(null)}
              className="text-gray-600 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 p-0.5 sm:p-2 rounded-full"
              title="Clear selected date"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-7 sm:h-7"> {/* Smaller icon */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </h3>
          <input
            type="text"
            placeholder="Search by room number or guest name..." // More descriptive placeholder
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            // Adjusted font size for input field and padding
            className="mb-4 sm:mb-8 p-2.5 sm:p-4 border border-gray-300 rounded-xl w-full text-sm sm:text-lg text-white placeholder-gray-500
                        focus:outline-none focus:ring-4 focus:ring-amber-300 focus:border-transparent transition duration-300 ease-in-out font-sans shadow-inner" // More padding, rounded, shadow-inner, stronger focus ring
          />
          <ul className="list-none p-0 text-sm sm:text-base text-gray-800 space-y-2 sm:space-y-4"> {/* Reduced space and text size */}
            {filteredBookings.length === 0 ? (
              // Adjusted font size for 'No matching bookings' text and padding
              <li className="text-gray-700 italic p-3 sm:p-5 bg-white rounded-xl border border-gray-300 shadow-sm text-center text-sm sm:text-xl font-medium">
                No matching bookings for this date.
              </li>
            ) : (
              filteredBookings.map((b, i) => (
                <li key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 p-3 sm:gap-4 sm:p-5 bg-white rounded-xl shadow-md border border-gray-200 transform transition-transform hover:scale-[1.01] hover:shadow-lg cursor-pointer"> {/* Enhanced card, hover effects, reduced gap and padding */}
                  <div className="flex items-center gap-1.5 sm:gap-4"> {/* Reduced gap */}
                    <span className="h-2.5 w-2.5 sm:h-4 sm:w-4 bg-blue-600 rounded-full flex-shrink-0 shadow-md"></span> {/* Smaller bullet */}
                    {/* Adjusted font size for guest name */}
                    <p className="text-sm sm:text-xl font-medium text-gray-900">
                      <strong className="text-blue-800">{b.guest}</strong>
                    </p>
                  </div>
                  {/* Adjusted font size for room number */}
                  <p className="text-sm sm:text-lg font-semibold text-gray-700 ml-4 sm:ml-0"> {/* Adjusted margin for mobile */}
                    Room <span className="font-extrabold text-blue-900">{b.room}</span>
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 sm:mt-12 pt-4 sm:pt-8 border-t-2 border-gray-300 flex flex-wrap justify-center gap-x-3 gap-y-3 sm:gap-x-10 sm:gap-y-6 text-sm sm:text-xl text-gray-800 font-semibold"> {/* Reduced spacing and text size */}
        <div className="flex items-center gap-1.5 sm:gap-4"> {/* Reduced gap */}
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-emerald-600 rounded-full shadow-lg border border-emerald-700"></div> {/* Smaller dot */}
          {/* Adjusted font size for legend text */}
          <span className="font-bold text-xs sm:text-base">Low Booking</span> (1-3)
        </div>
        <div className="flex items-center gap-1.5 sm:gap-4"> {/* Reduced gap */}
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-amber-500 rounded-full shadow-lg border border-amber-600"></div> {/* Smaller dot */}
          {/* Adjusted font size for legend text */}
          <span className="font-bold text-xs sm:text-base">Medium Booking</span> (4-6)
        </div>
        <div className="flex items-center gap-1.5 sm:gap-4"> {/* Reduced gap */}
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-red-600 rounded-full shadow-lg border border-red-700"></div> {/* Smaller dot */}
          {/* Adjusted font size for legend text */}
          <span className="font-bold text-xs sm:text-base">Fully Booked</span> (7+)
        </div>
      </div>
    </div>
  );
};

export default Calendar;