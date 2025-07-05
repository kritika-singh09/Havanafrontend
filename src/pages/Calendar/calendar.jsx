
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios"; // Import axios

// const Calendar = () => {
//   const today = new Date();
//   const [month, setMonth] = useState(today.getMonth());
//   const [year, setYear] = useState(today.getFullYear());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [bookings, setBookings] = useState({}); // Stores bookings grouped by date
//   const [allBookings, setAllBookings] = useState([]); // Stores all fetched bookings for the month
//   const [filterText, setFilterText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const API_BASE_URL = "https://havana-backend.vercel.app/api/bookings";

//   const formatDate = (y, m, d) =>
//     `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

//   // Function to load bookings from the API
//   const loadBookings = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(API_BASE_URL); // Fetch all bookings
//       let fetchedBookings = [];

//       // Robustly handle different API response structures
//       if (Array.isArray(response.data)) {
//         fetchedBookings = response.data;
//       } else if (response.data && Array.isArray(response.data.bookings)) {
//         fetchedBookings = response.data.bookings;
//       } else if (response.data && Array.isArray(response.data.data)) {
//         fetchedBookings = response.data.data;
//       } else {
//         console.warn("Unexpected API response structure for calendar:", response.data);
//         setError("Received unexpected data format from server for calendar bookings.");
//         fetchedBookings = [];
//       }

//       // Filter bookings to only include those that start or end within the current month,
//       // or span across it.
//       const monthStart = new Date(year, month, 1);
//       const monthEnd = new Date(year, month + 1, 0); // Last day of the current month

//       const relevantBookings = fetchedBookings.filter(booking => {
//         // Ensure checkInDate and checkOutDate exist and are valid for Date constructor
//         const checkIn = booking.checkInDate ? new Date(booking.checkInDate) : null;
//         const checkOut = booking.checkOutDate ? new Date(booking.checkOutDate) : null;

//         if (!checkIn || !checkOut) return false; // Skip bookings without valid dates

//         // Check if booking starts, ends, or spans within the current month view
//         return (
//           (checkIn.getFullYear() === year && checkIn.getMonth() === month) ||
//           (checkOut.getFullYear() === year && checkOut.getMonth() === month) ||
//           (checkIn < monthStart && checkOut > monthEnd) // Spans across the entire month
//         );
//       });

//       setAllBookings(relevantBookings); // Store for current month's display

//       // Group bookings by check-in date for calendar dot display
//       const grouped = {};
//       relevantBookings.forEach((b) => {
//         // Ensure checkInDate is a valid date string (e.g., "YYYY-MM-DD")
//         const checkIn = b.checkInDate ? new Date(b.checkInDate).toISOString().split('T')[0] : null; // Take only YYYY-MM-DD part
//         if (checkIn) {
//           if (!grouped[checkIn]) grouped[checkIn] = [];
//           grouped[checkIn].push({ guest: b.name, room: b.roomNo });
//         }
//       });
//       setBookings(grouped);

//     } catch (err) {
//       console.error("Error loading bookings:", err);
//       if (err.response) {
//         setError(`Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`);
//       } else if (err.request) {
//         setError("Network error: No response from server. Check your connection or server status.");
//       } else {
//         setError("Error setting up request: " + err.message);
//       }
//       setBookings({}); // Clear bookings on error
//       setAllBookings([]); // Clear all bookings on error
//     } finally {
//       setLoading(false);
//     }
//   }, [year, month]); // Re-run when month or year changes

//   useEffect(() => {
//     loadBookings();
//   }, [loadBookings]);

//   const handlePrev = () => {
//     setSelectedDate(null); // Clear selected date on month change
//     if (month === 0) {
//       setMonth(11);
//       setYear((y) => y - 1);
//     } else {
//       setMonth((m) => m - 1);
//     }
//   };

//   const handleNext = () => {
//     setSelectedDate(null); // Clear selected date on month change
//     if (month === 11) {
//       setMonth(0);
//       setYear((y) => y + 1);
//     } else {
//       setMonth((m) => m + 1);
//     }
//   };

//   const getBookingCategory = (date) => {
//     const count = bookings[date]?.length || 0;
//     if (count >= 7) return "full";
//     if (count >= 4) return "medium";
//     if (count >= 1) return "low";
//     return null;
//   };

//   const renderCalendar = () => {
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const firstDay = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
//     const weeks = [];
//     let day = 1;

//     for (let week = 0; week < 6; week++) {
//       const days = [];
//       for (let i = 0; i < 7; i++) {
//         const cellIndex = week * 7 + i;
//         if (cellIndex < firstDay || day > daysInMonth) {
//           days.push(<td key={`${week}-${i}-empty`} className="p-2"></td>);
//         } else {
//           const dateKey = formatDate(year, month, day);
//           const category = getBookingCategory(dateKey);
//           const isToday =
//             dateKey === formatDate(today.getFullYear(), today.getMonth(), today.getDate());
//           const isSelected = selectedDate === dateKey;

//           // Adjusted colors to be more 'Havana Bistro'
//           const dotColor =
//             category === "full"
//               ? "bg-red-600" // Deeper red for full
//               : category === "medium"
//               ? "bg-amber-500" // Richer amber for medium
//               : category === "low"
//               ? "bg-emerald-600" // Deeper emerald for low
//               : "";

//           const todayHighlight = isToday
//             ? "border-blue-700 shadow-lg" // Stronger blue for today, more prominent shadow
//             : "border-gray-300"; // Softer border

//           const selectedHighlight = isSelected
//             ? "bg-blue-200 border-blue-800 shadow-xl scale-[1.03]" // More pronounced selection
//             : "bg-white";

//           days.push(
//             <td key={`${week}-${i}-${day}`} className="p-1 sm:p-2">
//               <div
//                 className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out
//                                 ${selectedHighlight} ${todayHighlight} border-2
//                                 hover:bg-amber-50 hover:border-amber-300 hover:shadow-md`} // Hover to warm tone
//                 onClick={() => {
//                   setSelectedDate(dateKey);
//                 }}
//               >
//                 <span className="text-sm sm:text-base font-semibold text-gray-800">{day}</span>
//                 {category && (
//                   <span className={`mt-1 w-2 h-2 rounded-full ${dotColor}`}></span>
//                 )}
//               </div>
//             </td>
//           );
//           day++;
//         }
//       }
//       weeks.push(<tr key={`week-${week}`}>{days}</tr>);
//     }
//     return weeks;
//   };

//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December",
//   ];

//   // Filter the bookings for the selected date based on filterText (room number)
//   const bookingsForSelectedDate = selectedDate ? (bookings[selectedDate] || []) : [];

//   const filteredBookings = bookingsForSelectedDate.filter(
//     (b) =>
//       b.room.toLowerCase().includes(filterText.toLowerCase())
//   );

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 font-serif bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 shadow-2xl rounded-xl border border-gray-300">
//       {/* Calendar Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b pb-4 border-gray-300">
//         <button
//           onClick={handlePrev}
//           className="px-6 py-2 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out text-base sm:text-lg w-full sm:w-auto mb-3 sm:mb-0 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
//         >
//           &larr; Previous
//         </button>
//         <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3 sm:mb-0">
//           {`${monthNames[month]} ${year}`}
//         </h2>
//         <button
//           onClick={handleNext}
//           className="px-6 py-2 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out text-base sm:text-lg w-full sm:w-auto transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
//         >
//           Next &rarr;
//         </button>
//       </div>

//       {loading && (
//         <div className="flex justify-center items-center py-8">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-700"></div>
//           <p className="ml-4 text-lg text-blue-800">Loading bookings...</p>
//         </div>
//       )}
//       {error && <p className="text-center text-red-700 bg-red-100 p-3 rounded-md border border-red-400">{error}</p>}

//       {/* Calendar Grid */}
//       <div className="overflow-x-auto relative z-10 bg-white rounded-xl shadow-lg p-2 sm:p-4 border border-gray-200">
//         <table className="w-full border-collapse text-center">
//           <thead>
//             <tr className="bg-blue-50 border-b border-blue-200">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//                 <th key={d} className="p-3 text-sm sm:text-base font-bold text-blue-800 uppercase tracking-wider">
//                   {d}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>{renderCalendar()}</tbody>
//         </table>
//       </div>

//       {/* Booking Details Section */}
//       {selectedDate && (
//         <div className="mt-10 p-7 bg-white border border-gray-200 rounded-xl shadow-xl transform transition-all duration-300 ease-in-out scale-100 hover:scale-[1.005]">
//           <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-5 flex items-center">
//             Bookings for <span className="text-blue-800 ml-3">{selectedDate}</span>
//           </h3>
//           <input
//             type="text"
//             placeholder="Search bookings by room number..."
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             className="mb-6 p-4 border border-gray-400 rounded-lg w-full text-lg text-gray-800 placeholder-gray-500
//                        focus:outline-none focus:ring-3 focus:ring-amber-500 focus:border-transparent transition duration-200 ease-in-out font-sans"
//           />
//           <ul className="list-none p-0 text-base text-gray-800 space-y-3">
//             {filteredBookings.length === 0 ? (
//               <li className="text-gray-600 italic p-3 bg-gray-50 rounded-md border border-gray-200 font-sans">
//                 No matching bookings for this date and room filter.
//               </li>
//             ) : (
//               filteredBookings.map((b, i) => (
//                 <li key={i} className="flex items-center gap-3 p-3 bg-blue-100 rounded-md shadow-sm border border-blue-200">
//                   <span className="h-3 w-3 bg-blue-800 rounded-full flex-shrink-0"></span>
//                   <p className="text-lg font-sans">
//                     <strong className="text-gray-900">{b.guest}</strong> - Room <span className="font-semibold text-blue-800">{b.room}</span>
//                   </p>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       )}

//       {/* Legend */}
//       <div className="mt-10 pt-6 border-t border-gray-300 flex flex-wrap justify-center gap-x-8 gap-y-4 text-base sm:text-lg text-gray-700 font-sans">
//         <div className="flex items-center gap-3">
//           <div className="w-5 h-5 bg-emerald-600 rounded-full shadow-md"></div> <span className="font-medium">Low Booking</span> (1-3)
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="w-5 h-5 bg-amber-500 rounded-full shadow-md"></div> <span className="font-medium">Medium Booking</span> (4-6)
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="w-5 h-5 bg-red-600 rounded-full shadow-md"></div> <span className="font-medium">Fully Booked</span> (7+)
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calendar;


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
          days.push(<td key={`${week}-${i}-empty`} className="p-2"></td>);
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
            <td key={`${week}-${i}-${day}`} className="p-1 sm:p-2">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out
                          ${selectedHighlight} ${todayHighlight} border-2
                          hover:bg-amber-50 hover:border-amber-300 hover:shadow-md`} // Hover to warm tone
                onClick={() => {
                  setSelectedDate(dateKey);
                }}
              >
                <span className="text-sm sm:text-base font-semibold text-gray-800">{day}</span>
                {category && (
                  <span className={`mt-1 w-2 h-2 rounded-full ${dotColor}`}></span>
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
      b.room.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 font-sans bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-2xl rounded-2xl border border-gray-200">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b-2 border-amber-300"> {/* Stronger bottom border, more spacing */}
        <button
          onClick={handlePrev}
          className="px-7 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-xl shadow-lg hover:from-blue-800 hover:to-blue-950 transition duration-300 ease-in-out text-base sm:text-lg w-full sm:w-auto mb-4 sm:mb-0 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-70 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Previous
        </button>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 sm:mb-0 drop-shadow-sm text-center">
          {`${monthNames[month]} ${year}`}
        </h2>
        <button
          onClick={handleNext}
          className="px-7 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-xl shadow-lg hover:from-blue-800 hover:to-blue-950 transition duration-300 ease-in-out text-base sm:text-lg w-full sm:w-auto transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-70 flex items-center justify-center gap-2"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 bg-blue-50 rounded-lg shadow-inner">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="ml-4 text-xl font-semibold text-blue-800">Loading bookings, please wait...</p>
        </div>
      )}
      {error && (
        <div className="text-center text-red-800 bg-red-100 p-4 rounded-lg border border-red-400 font-medium text-lg shadow-sm">
          <p className="font-bold mb-2">Error:</p>
          <p>{error}</p>
          <p className="mt-2 text-sm text-red-600">Please try refreshing the page or contact support if the issue persists.</p>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200 overflow-hidden"> {/* More rounded, deeper shadow, more padding */}
        <table className="w-full border-collapse text-center table-fixed"> {/* table-fixed for consistent column widths */}
          <thead>
            <tr className="bg-blue-600 text-white rounded-t-xl overflow-hidden shadow-inner"> {/* Darker blue, text white, rounded top corners */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <th key={d} className="p-4 text-lg sm:text-xl font-extrabold uppercase tracking-widest border-r border-blue-700 last:border-r-0"> {/* Larger, bolder, wider tracking, separator */}
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
        <div className="mt-12 p-8 bg-blue-50 border border-blue-200 rounded-2xl shadow-2xl transform transition-all duration-500 ease-in-out scale-100 hover:scale-[1.005]"> {/* More padding, accent color background, deeper shadow, smoother transition */}
          <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-6 flex items-center justify-between border-b pb-4 border-blue-300"> {/* Stronger title, flex for button */}
            Bookings for <span className="text-amber-600 ml-3">{selectedDate}</span>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-gray-600 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 p-2 rounded-full"
              title="Clear selected date"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </h3>
          <input
            type="text"
            placeholder="Search by room number or guest name..." // More descriptive placeholder
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="mb-8 p-4 border border-gray-300 rounded-xl w-full text-lg text-gray-800 placeholder-gray-500
                         focus:outline-none focus:ring-4 focus:ring-amber-300 focus:border-transparent transition duration-300 ease-in-out font-sans shadow-inner" // More padding, rounded, shadow-inner, stronger focus ring
          />
          <ul className="list-none p-0 text-base text-gray-800 space-y-4"> {/* Increased space between list items */}
            {filteredBookings.length === 0 ? (
              <li className="text-gray-700 italic p-5 bg-white rounded-xl border border-gray-300 shadow-sm text-center text-xl font-medium"> {/* Larger text, better padding, bg-white */}
                No matching bookings for this date.
              </li>
            ) : (
              filteredBookings.map((b, i) => (
                <li key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white rounded-xl shadow-md border border-gray-200 transform transition-transform hover:scale-[1.01] hover:shadow-lg cursor-pointer"> {/* Enhanced card, hover effects */}
                  <div className="flex items-center gap-4">
                    <span className="h-4 w-4 bg-blue-600 rounded-full flex-shrink-0 shadow-md"></span> {/* Larger, more prominent bullet */}
                    <p className="text-xl font-medium text-gray-900">
                      <strong className="text-blue-800">{b.guest}</strong>
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-gray-700 ml-8 sm:ml-0">
                    Room <span className="font-extrabold text-blue-900">{b.room}</span>
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Legend */}
      <div className="mt-12 pt-8 border-t-2 border-gray-300 flex flex-wrap justify-center gap-x-10 gap-y-6 text-lg sm:text-xl text-gray-800 font-semibold"> {/* More spacing, stronger border, larger text, bolder */}
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-emerald-600 rounded-full shadow-lg border border-emerald-700"></div> <span className="font-bold">Low Booking</span> (1-3)
        </div>
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-amber-500 rounded-full shadow-lg border border-amber-600"></div> <span className="font-bold">Medium Booking</span> (4-6)
        </div>
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-red-600 rounded-full shadow-lg border border-red-700"></div> <span className="font-bold">Fully Booked</span> (7+)
        </div>
      </div>
    </div>
  );
};

export default Calendar;