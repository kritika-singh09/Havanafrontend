
// import React, { useState, useEffect } from "react";

// const Calendar = () => {
//   const today = new Date();
//   const [month, setMonth] = useState(today.getMonth());
//   const [year, setYear] = useState(today.getFullYear());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [bookings, setBookings] = useState({});
//   const [filterText, setFilterText] = useState("");

//   const formatDate = (y, m, d) =>
//     `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

//   const loadBookings = () => {
//     const stored = JSON.parse(localStorage.getItem("bookings")) || [];
//     const grouped = {};

//     stored.forEach((b) => {
//       const checkIn = b.checkIn;
//       if (checkIn) {
//         if (!grouped[checkIn]) grouped[checkIn] = [];
//         grouped[checkIn].push({ guest: b.name, room: b.roomNo });
//       }
//     });

//     setBookings(grouped);
//   };

//   useEffect(() => {
//     loadBookings();

//     // 🟢 Listen for external changes to localStorage
//     const handleStorageChange = (event) => {
//       if (event.key === "bookings") {
//         loadBookings();
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   const handlePrev = () => {
//     if (month === 0) {
//       setMonth(11);
//       setYear((y) => y - 1);
//     } else {
//       setMonth((m) => m - 1);
//     }
//   };

//   const handleNext = () => {
//     if (month === 11) {
//       setMonth(0);
//       setYear((y) => y + 1);
//     } else {
//       setMonth((m) => m + 1);
//     }
//   };

//   const getBookingCategory = (date) => {
//     const count = bookings[date]?.length || 0;
//     if (count >= 7) return "full"; // e.g., 7+ bookings: full
//     if (count >= 4) return "medium"; // e.g., 4-6 bookings: medium
//     if (count >= 1) return "low"; // e.g., 1-3 bookings: low
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
//           // Empty cells before the 1st day or after the last day
//           days.push(<td key={`${week}-${i}-empty`} className="p-2"></td>);
//         } else {
//           const dateKey = formatDate(year, month, day);
//           const category = getBookingCategory(dateKey);
//           const isToday =
//             dateKey === formatDate(today.getFullYear(), today.getMonth(), today.getDate());
//           const isSelected = selectedDate === dateKey;

//           // Dynamic dot color based on booking category
//           const dotColor =
//             category === "full"
//               ? "bg-red-500"
//               : category === "medium"
//               ? "bg-amber-400" // Changed from yellow-400 for a slightly richer tone
//               : category === "low"
//               ? "bg-emerald-500" // Changed from green-500 for a more vibrant green
//               : "";

//           // Styling for today's date
//           const todayHighlight = isToday
//             ? "border-blue-500 shadow-md" // More prominent border and shadow
//             : "border-gray-200";

//           // Styling for selected date
//           const selectedHighlight = isSelected
//             ? "bg-blue-100 border-blue-600 shadow-lg scale-105" // Stronger visual for selected
//             : "bg-white";

//           days.push(
//             <td key={`${week}-${i}-${day}`} className="p-1 sm:p-2"> {/* Reduced padding slightly */}
//               <div
//                 className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ease-in-out
//                             ${selectedHighlight} ${todayHighlight}
//                             hover:bg-blue-50 hover:border-blue-400 hover:shadow-md`}
//                 onClick={() => {
//                   setSelectedDate(dateKey);
//                   setFilterText("");
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

//   const filteredBookings = (bookings[selectedDate] || []).filter(
//     (b) =>
//       b.guest.toLowerCase().includes(filterText.toLowerCase()) ||
//       b.room.toLowerCase().includes(filterText.toLowerCase())
//   );

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 font-sans bg-gray-50 shadow-xl rounded-lg"> {/* Enhanced overall container */}
//       {/* Calendar Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4 border-gray-200"> {/* Added bottom border */}
//         <button
//           onClick={handlePrev}
//           className="px-5 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 transition duration-150 ease-in-out text-sm sm:text-base w-full sm:w-auto mb-2 sm:mb-0"
//         >
//           &larr; Previous
//         </button>
//         <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2 sm:mb-0">
//           {`${monthNames[month]} ${year}`}
//         </h2>
//         <button
//           onClick={handleNext}
//           className="px-5 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 transition duration-150 ease-in-out text-sm sm:text-base w-full sm:w-auto"
//         >
//           Next &rarr;
//         </button>
//       </div>

//       {/* Calendar Grid */}
//       <div className="overflow-x-auto relative z-10"> {/* Added z-index for potential overlapping elements */}
//         <table className="w-full border-collapse text-center"> {/* Changed border to border-collapse */}
//           <thead>
//             <tr className="bg-gray-100 border-b border-gray-200"> {/* Lighter background for header, added bottom border */}
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//                 <th key={d} className="p-3 text-sm sm:text-base font-semibold text-gray-700"> {/* Increased padding, adjusted font */}
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
//         <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md"> {/* Enhanced container for details */}
//           <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
//             Bookings for <span className="text-blue-600 ml-2">{selectedDate}</span>
//           </h3>
//           <input
//             type="text"
//             placeholder="Search guest or room..."
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             className="mb-4 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out text-base text-gray-700" // Enhanced input styling
//           />
//           <ul className="list-disc list-inside text-base text-gray-800 space-y-2"> {/* Added space-y */}
//             {filteredBookings.length === 0 ? (
//               <li className="text-gray-500 italic">No matching bookings for this date.</li> 
//             ) : (
//               filteredBookings.map((b, i) => (
//                 <li key={i} className="flex items-center gap-2">
//                     <span className="h-2 w-2 bg-blue-500 rounded-full"></span> {/* Custom bullet */}
//                     <strong className="text-gray-900">{b.guest}</strong> - Room <span className="font-medium text-blue-700">{b.room}</span>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       )}

//       {/* Legend */}
//       <div className="mt-8 pt-4 border-t border-gray-200 flex flex-wrap justify-center gap-6 text-sm sm:text-base text-gray-700"> {/* Added top border, centered legend */}
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-sm"></div> Low Booking (1-3)
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 bg-amber-400 rounded-full shadow-sm"></div> Medium Booking (4-6)
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div> Fully Booked (7+)
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
      // You can adjust this to fetch bookings for the current month/year
      // or fetch all and filter client-side if the dataset is small.
      // For a calendar, fetching by month is generally better.
      // Assuming your backend /search API can handle date range or just all bookings for now.
      // If your /search endpoint only takes roomNo, we'll fetch all and filter client-side first.
      // If it can take dates, modify the URL below.

      // For simplicity, let's fetch all bookings first and filter by room number locally
      // or modify the backend search API to include date filtering if needed.

      // Let's assume the /search endpoint can be used to filter by room number
      // and we want to get all bookings relevant to the current calendar month/year
      // and then apply the room search filter on top.

      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0); // Last day of the current month

      // Make a request to get all bookings within the current month range
      // (assuming your main /api/bookings endpoint can filter by dates,
      // or you have a specific endpoint for monthly bookings)
      // If not, you might need to fetch all and filter in frontend, or enhance backend.

      // For now, let's just fetch ALL bookings and filter.
      // If the number of bookings is large, you'd want to modify your API to support date range queries.
      const response = await axios.get(API_BASE_URL); // Fetch all bookings
      const fetchedBookings = response.data; // Assuming response.data is an array of booking objects

      // Filter bookings to only include those that start or end within the current month,
      // or span across it.
      const relevantBookings = fetchedBookings.filter(booking => {
          const checkIn = new Date(booking.checkInDate); // Assuming field is checkInDate
          const checkOut = new Date(booking.checkOutDate); // Assuming field is checkOutDate

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
        const checkIn = b.checkInDate ? b.checkInDate.split('T')[0] : null; // Take only YYYY-MM-DD part
        if (checkIn) {
          if (!grouped[checkIn]) grouped[checkIn] = [];
          grouped[checkIn].push({ guest: b.name, room: b.roomNo });
        }
      });
      setBookings(grouped);

    } catch (err) {
      console.error("Error loading bookings:", err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [year, month]); // Re-run when month or year changes

  useEffect(() => {
    loadBookings();
    // No need for localStorage listener anymore
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

          const dotColor =
            category === "full"
              ? "bg-red-500"
              : category === "medium"
              ? "bg-amber-400"
              : category === "low"
              ? "bg-emerald-500"
              : "";

          const todayHighlight = isToday
            ? "border-blue-500 shadow-md"
            : "border-gray-200";

          const selectedHighlight = isSelected
            ? "bg-blue-100 border-blue-600 shadow-lg scale-105"
            : "bg-white";

          days.push(
            <td key={`${week}-${i}-${day}`} className="p-1 sm:p-2">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ease-in-out
                               ${selectedHighlight} ${todayHighlight}
                               hover:bg-blue-50 hover:border-blue-400 hover:shadow-md`}
                onClick={() => {
                  setSelectedDate(dateKey);
                  // setFilterText(""); // Keep filter text, as it's for room search now
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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 font-sans bg-gray-50 shadow-xl rounded-lg">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4 border-gray-200">
        <button
          onClick={handlePrev}
          className="px-5 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 transition duration-150 ease-in-out text-sm sm:text-base w-full sm:w-auto mb-2 sm:mb-0"
        >
          &larr; Previous
        </button>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2 sm:mb-0">
          {`${monthNames[month]} ${year}`}
        </h2>
        <button
          onClick={handleNext}
          className="px-5 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 transition duration-150 ease-in-out text-sm sm:text-base w-full sm:w-auto"
        >
          Next &rarr;
        </button>
      </div>

      {loading && <p className="text-center text-blue-600">Loading bookings...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Calendar Grid */}
      <div className="overflow-x-auto relative z-10">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <th key={d} className="p-3 text-sm sm:text-base font-semibold text-gray-700">
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
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
            Bookings for <span className="text-blue-600 ml-2">{selectedDate}</span>
          </h3>
          <input
            type="text"
            placeholder="Search by room number..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="mb-4 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out text-base text-gray-700"
          />
          <ul className="list-disc list-inside text-base text-gray-800 space-y-2">
            {filteredBookings.length === 0 ? (
              <li className="text-gray-500 italic">No matching bookings for this date and room filter.</li>
            ) : (
              filteredBookings.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                  <strong className="text-gray-900">{b.guest}</strong> - Room <span className="font-medium text-blue-700">{b.room}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 pt-4 border-t border-gray-200 flex flex-wrap justify-center gap-6 text-sm sm:text-base text-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-sm"></div> Low Booking (1-3)
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-400 rounded-full shadow-sm"></div> Medium Booking (4-6)
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div> Fully Booked (7+)
        </div>
      </div>
    </div>
  );
};

export default Calendar;