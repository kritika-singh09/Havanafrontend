

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

//   // Load bookings from localStorage and group by checkIn date
//   useEffect(() => {
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
//     if (count >= 7) return "full";
//     if (count >= 4) return "medium";
//     if (count >= 1) return "low";
//     return null;
//   };

//   const renderCalendar = () => {
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const firstDay = new Date(year, month, 1).getDay();
//     const weeks = [];
//     let day = 1;

//     for (let week = 0; week < 6; week++) {
//       const days = [];
//       for (let i = 0; i < 7; i++) {
//         const cellIndex = week * 7 + i;
//         if (cellIndex < firstDay || day > daysInMonth) {
//           days.push(<td key={i}></td>);
//         } else {
//           const dateKey = formatDate(year, month, day);
//           const category = getBookingCategory(dateKey);
//           const isToday =
//             dateKey === formatDate(today.getFullYear(), today.getMonth(), today.getDate());

//           const dotColor =
//             category === "full"
//               ? "bg-red-500"
//               : category === "medium"
//               ? "bg-yellow-400"
//               : category === "low"
//               ? "bg-green-500"
//               : "";

//           const todayHighlight = isToday ? "ring-2 ring-blue-400" : "";

//           days.push(
//             <td key={i} className="p-2">
//               <div
//                 className={`w-12 h-12 rounded flex flex-col items-center justify-center cursor-pointer border bg-white hover:ring ${todayHighlight}`}
//                 onClick={() => {
//                   setSelectedDate(dateKey);
//                   setFilterText("");
//                 }}
//               >
//                 <span className="text-sm">{day}</span>
//                 {isToday && category && (
//                   <span className={`mt-1 w-2 h-2 rounded-full ${dotColor}`}></span>
//                 )}
//               </div>
//             </td>
//           );
//           day++;
//         }
//       }
//       weeks.push(<tr key={week}>{days}</tr>);
//     }
//     return weeks;
//   };

//   const monthNames = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//   ];

//   const filteredBookings = (bookings[selectedDate] || []).filter(
//     (b) =>
//       b.guest.toLowerCase().includes(filterText.toLowerCase()) ||
//       b.room.toLowerCase().includes(filterText.toLowerCase())
//   );

//   return (
//     <div className="w-full max-w-none p-4 sm:p-6 font-sans bg-white shadow rounded-none">
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
//         <button onClick={handlePrev} className="px-4 py-2 bg-gray-100 rounded text-sm sm:text-base w-full sm:w-auto">
//           Prev
//         </button>
//         <h2 className="text-lg sm:text-xl font-bold">{`${monthNames[month]} ${year}`}</h2>
//         <button onClick={handleNext} className="px-4 py-2 bg-gray-100 rounded text-sm sm:text-base w-full sm:w-auto">
//           Next
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-300 text-center min-w-[500px]">
//           <thead>
//             <tr className="bg-gray-50">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//                 <th key={d} className="p-2 text-xs sm:text-sm">{d}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>{renderCalendar()}</tbody>
//         </table>
//       </div>

//       {selectedDate && (
//         <div className="mt-6">
//           <h3 className="text-base sm:text-lg font-semibold mb-2">Bookings for {selectedDate}</h3>

//           <input
//             type="text"
//             placeholder="Search guest or room..."
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             className="mb-4 p-2 border rounded w-full"
//           />

//           <ul className="list-disc list-inside text-sm text-gray-800 mb-4">
//             {filteredBookings.length === 0 ? (
//               <li className="text-gray-400 italic">No matching bookings</li>
//             ) : (
//               filteredBookings.map((b, i) => (
//                 <li key={i}><strong>{b.guest}</strong> - Room {b.room}</li>
//               ))
//             )}
//           </ul>
//         </div>
//       )}

//       <div className="mt-6 flex flex-wrap gap-4 text-sm">
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 bg-green-400 rounded"></div> Low Booking
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 bg-yellow-300 rounded"></div> Medium Booking
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 bg-red-500 rounded"></div> Fully Booked
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calendar;
import React, { useState, useEffect } from "react";

const Calendar = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState({});
  const [filterText, setFilterText] = useState("");

  const formatDate = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const loadBookings = () => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    const grouped = {};

    stored.forEach((b) => {
      const checkIn = b.checkIn;
      if (checkIn) {
        if (!grouped[checkIn]) grouped[checkIn] = [];
        grouped[checkIn].push({ guest: b.name, room: b.roomNo });
      }
    });

    setBookings(grouped);
  };

  useEffect(() => {
    loadBookings();

    // 🟢 Listen for external changes to localStorage
    const handleStorageChange = (event) => {
      if (event.key === "bookings") {
        loadBookings();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
    if (count >= 7) return "full"; // e.g., 7+ bookings: full
    if (count >= 4) return "medium"; // e.g., 4-6 bookings: medium
    if (count >= 1) return "low"; // e.g., 1-3 bookings: low
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
          // Empty cells before the 1st day or after the last day
          days.push(<td key={`${week}-${i}-empty`} className="p-2"></td>);
        } else {
          const dateKey = formatDate(year, month, day);
          const category = getBookingCategory(dateKey);
          const isToday =
            dateKey === formatDate(today.getFullYear(), today.getMonth(), today.getDate());
          const isSelected = selectedDate === dateKey;

          // Dynamic dot color based on booking category
          const dotColor =
            category === "full"
              ? "bg-red-500"
              : category === "medium"
              ? "bg-amber-400" // Changed from yellow-400 for a slightly richer tone
              : category === "low"
              ? "bg-emerald-500" // Changed from green-500 for a more vibrant green
              : "";

          // Styling for today's date
          const todayHighlight = isToday
            ? "border-blue-500 shadow-md" // More prominent border and shadow
            : "border-gray-200";

          // Styling for selected date
          const selectedHighlight = isSelected
            ? "bg-blue-100 border-blue-600 shadow-lg scale-105" // Stronger visual for selected
            : "bg-white";

          days.push(
            <td key={`${week}-${i}-${day}`} className="p-1 sm:p-2"> {/* Reduced padding slightly */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ease-in-out
                            ${selectedHighlight} ${todayHighlight}
                            hover:bg-blue-50 hover:border-blue-400 hover:shadow-md`}
                onClick={() => {
                  setSelectedDate(dateKey);
                  setFilterText("");
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

  const filteredBookings = (bookings[selectedDate] || []).filter(
    (b) =>
      b.guest.toLowerCase().includes(filterText.toLowerCase()) ||
      b.room.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 font-sans bg-gray-50 shadow-xl rounded-lg"> {/* Enhanced overall container */}
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4 border-gray-200"> {/* Added bottom border */}
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

      {/* Calendar Grid */}
      <div className="overflow-x-auto relative z-10"> {/* Added z-index for potential overlapping elements */}
        <table className="w-full border-collapse text-center"> {/* Changed border to border-collapse */}
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200"> {/* Lighter background for header, added bottom border */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <th key={d} className="p-3 text-sm sm:text-base font-semibold text-gray-700"> {/* Increased padding, adjusted font */}
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
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md"> {/* Enhanced container for details */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
            Bookings for <span className="text-blue-600 ml-2">{selectedDate}</span>
          </h3>
          <input
            type="text"
            placeholder="Search guest or room..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="mb-4 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out text-base text-gray-700" // Enhanced input styling
          />
          <ul className="list-disc list-inside text-base text-gray-800 space-y-2"> {/* Added space-y */}
            {filteredBookings.length === 0 ? (
              <li className="text-gray-500 italic">No matching bookings for this date.</li> 
            ) : (
              filteredBookings.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-blue-500 rounded-full"></span> {/* Custom bullet */}
                    <strong className="text-gray-900">{b.guest}</strong> - Room <span className="font-medium text-blue-700">{b.room}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 pt-4 border-t border-gray-200 flex flex-wrap justify-center gap-6 text-sm sm:text-base text-gray-700"> {/* Added top border, centered legend */}
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