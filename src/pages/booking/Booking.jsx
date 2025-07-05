// // import React, { useState, useEffect, useCallback } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import toast, { Toaster } from "react-hot-toast";

// // const ITEMS_PER_PAGE = 10;
// // const backendURL = "https://havana-backend.vercel.app";

// // const Booking = () => {
// //   const [bookings, setBookings] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [displayedBookings, setDisplayedBookings] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// //   const [bookingToDeleteId, setBookingToDeleteId] = useState(null);
// //   const navigate = useNavigate();

// //   const fetchBookingsData = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get(`${backendURL}/api/bookings`);
// //       const data = Array.isArray(response.data) ? response.data : (response.data.bookings || []);
// //       setBookings(data);
// //     } catch (error) {
// //       console.error("Error fetching bookings:", error);
// //       toast.error("Failed to fetch bookings.");
// //       setBookings([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchBookingsData();
// //   }, [fetchBookingsData]);

// //   useEffect(() => {
// //     const filtered = bookings.filter((b) =>
// //       (b.name || "").toLowerCase().includes(searchTerm.toLowerCase().trim())
// //     );
// //     setDisplayedBookings(filtered);
// //     setCurrentPage(1);
// //   }, [searchTerm, bookings]);

// //   const totalPages = Math.ceil(displayedBookings.length / ITEMS_PER_PAGE);
// //   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
// //   const currentBookings = displayedBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

// //   const deleteBooking = async (id) => {
// //     const response = await axios.delete(`${backendURL}/api/bookings/${id}`);
// //     return response.data;
// //   };

// //   const confirmDelete = async () => {
// //     setShowDeleteModal(false);
// //     if (!bookingToDeleteId) return;

// //     try {
// //       const result = await deleteBooking(bookingToDeleteId);
// //       toast.success(result.message || "Booking deleted");
// //       await fetchBookingsData();
// //     } catch (error) {
// //       console.error("Error deleting booking:", error);
// //       toast.error("Failed to delete booking");
// //     } finally {
// //       setBookingToDeleteId(null);
// //     }
// //   };

// //   const handleDelete = (id) => {
// //     setBookingToDeleteId(id);
// //     setShowDeleteModal(true);
// //   };

// //   const cancelDelete = () => {
// //     setShowDeleteModal(false);
// //     setBookingToDeleteId(null);
// //   };

// //   const handleEdit = (booking) => {
// //     navigate(`/booking/edit/${booking._id}`, {
// //       state: { editingData: booking },
// //     });
// //   };

// //   const handleDownloadXLSXClick = async () => {
// //     try {
// //       const response = await axios.get(`${backendURL}/api/bookings/exportBookingsExcel`, {
// //         responseType: "blob",
// //       });
// //       const blob = new Blob([response.data], {
// //         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //       });
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement("a");
// //       a.href = url;
// //       a.download = "bookings.xlsx";
// //       document.body.appendChild(a);
// //       a.click();
// //       a.remove();
// //       window.URL.revokeObjectURL(url);
// //       toast.success("XLSX downloaded!");
// //     } catch (error) {
// //       console.error("Download error:", error);
// //       toast.error("Failed to download XLSX.");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
// //       <Toaster position="top-right" />

// //       {showDeleteModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
// //           <div className="bg-white p-6 rounded shadow-xl w-full max-w-sm">
// //             <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
// //             <p className="mb-6">Are you sure you want to delete this booking?</p>
// //             <div className="flex justify-end space-x-4">
// //               <button onClick={cancelDelete} className="bg-gray-300 px-4 py-2 rounded">
// //                 Cancel
// //               </button>
// //               <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded">
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
// //         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
// //           <h1 className="text-xl sm:text-2xl font-bold mb-4 md:mb-0">Bookings Overview</h1>
// //           <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
// //             <button
// //               onClick={handleDownloadXLSXClick}
// //               className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
// //             >
// //               Download XLSX
// //             </button>
// //             <button
// //               onClick={() => navigate("/booking/add")}
// //               className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
// //             >
// //               Add Booking
// //             </button>
// //           </div>
// //         </div>

// //         <input
// //           type="text"
// //           placeholder="Search bookings by guest name..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="w-full border px-4 py-2 rounded mb-4 text-sm sm:text-base"
// //         />

// //         {loading ? (
// //           <p className="text-center py-8">Loading bookings...</p>
// //         ) : (
// //           <div className="overflow-x-auto border rounded">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Photo</th>
// //                   <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Name</th>
// //                   <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">ID Number</th>
// //                   <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Phone</th>
// //                   <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Room</th>
// //                   <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Check-In</th>
// //                   <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Check-Out</th>
// //                   <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Guests</th>
// //                   <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-100">
// //                 {currentBookings.length > 0 ? (
// //                   currentBookings.map((b) => (
// //                     <tr key={b._id}>
// //                       <td className="px-2 py-2 sm:px-4 sm:py-2">
// //                         <img src={b.photoUrl} alt="Photo" className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
// //                       </td>
// //                       <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.name}</td>
// //                       <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.idProofNumber}</td>
// //                       <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.mobileNo || b.phoneNo}</td>
// //                       <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.roomNo}</td>
// //                       <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.checkInDate?.toString().slice(0, 10)}</td>
// //                       <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.checkOutDate?.toString().slice(0, 10)}</td>
// //                       <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">
// //                         {(parseInt(b.noOfAdults) || 0) + (parseInt(b.noOfChildren) || 0)}
// //                       </td>
// //                       <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
// //                         <button
// //                           onClick={() => handleEdit(b)}
// //                           className="text-blue-600 hover:underline"
// //                         >
// //                           Edit
// //                         </button>
// //                         <button
// //                           onClick={() => handleDelete(b._id)}
// //                           className="text-red-600 hover:underline"
// //                         >
// //                           Delete
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 ) : (
// //                   <tr>
// //                     <td colSpan="9" className="text-center py-6 text-gray-500 italic text-sm">
// //                       No bookings found for your search criteria.
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {totalPages > 1 && (
// //           <div className="flex justify-center mt-6 flex-wrap">
// //             {Array.from({ length: totalPages }, (_, i) => (
// //               <button
// //                 key={i}
// //                 onClick={() => setCurrentPage(i + 1)}
// //                 className={`mx-1 my-1 px-3 py-1 sm:px-4 sm:py-2 rounded border text-sm sm:text-base ${
// //                   currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-700"
// //                 }`}
// //               >
// //                 {i + 1}
// //               </button>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Booking;


// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// // Heroicons - directly embedding SVG paths for simplicity and no new dependencies
// const DownloadIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//   </svg>
// );

// const AddUserIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6-3a9 9 0 11-9 9V7.5M10.5 10.5h.01M16 16.5h.01" />
//   </svg>
// );

// const SearchIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//   </svg>
// );

// const EditIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//   </svg>
// );

// const DeleteIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//   </svg>
// );

// const ConfirmIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//   </svg>
// );


// const ITEMS_PER_PAGE = 10;
// const backendURL = "https://havana-backend.vercel.app";

// const Booking = () => {
//   const [bookings, setBookings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [displayedBookings, setDisplayedBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [bookingToDeleteId, setBookingToDeleteId] = useState(null);
//   const navigate = useNavigate();

//   const fetchBookingsData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${backendURL}/api/bookings`);
//       const data = Array.isArray(response.data) ? response.data : (response.data.bookings || []);
//       setBookings(data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       toast.error("Failed to fetch bookings.");
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchBookingsData();
//   }, [fetchBookingsData]);

//   useEffect(() => {
//     const filtered = bookings.filter((b) =>
//       (b.name || "").toLowerCase().includes(searchTerm.toLowerCase().trim())
//     );
//     setDisplayedBookings(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, bookings]);

//   const totalPages = Math.ceil(displayedBookings.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentBookings = displayedBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   const deleteBooking = async (id) => {
//     const response = await axios.delete(`${backendURL}/api/bookings/${id}`);
//     return response.data;
//   };

//   const confirmDelete = async () => {
//     setShowDeleteModal(false);
//     if (!bookingToDeleteId) return;

//     try {
//       const result = await deleteBooking(bookingToDeleteId);
//       toast.success(result.message || "Booking deleted");
//       await fetchBookingsData();
//     } catch (error) {
//       console.error("Error deleting booking:", error);
//       toast.error("Failed to delete booking");
//     } finally {
//       setBookingToDeleteId(null);
//     }
//   };

//   const handleDelete = (id) => {
//     setBookingToDeleteId(id);
//     setShowDeleteModal(true);
//   };

//   const cancelDelete = () => {
//     setShowDeleteModal(false);
//     setBookingToDeleteId(null);
//   };

//   const handleEdit = (booking) => {
//     navigate(`/booking/edit/${booking._id}`, {
//       state: { editingData: booking },
//     });
//   };

//   const handleDownloadXLSXClick = async () => {
//     try {
//       const response = await axios.get(`${backendURL}/api/bookings/exportBookingsExcel`, {
//         responseType: "blob",
//       });
//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "bookings.xlsx";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//       toast.success("XLSX downloaded!");
//     } catch (error) {
//       console.error("Download error:", error);
//       toast.error("Failed to download XLSX.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4 sm:p-6 md:p-8 font-sans text-gray-800">
//       <Toaster position="top-right" reverseOrder={false} />

//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 animate-fade-in">
//           <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform scale-95 animate-scale-up-modal border-t-4 border-yellow-500">
//             <div className="flex flex-col items-center mb-6">
//               <ConfirmIcon />
//               <h3 className="text-2xl font-bold text-gray-800 mb-2 mt-2">Confirm Deletion</h3>
//               <p className="text-gray-700 text-center">Are you sure you want to permanently delete this booking? This action cannot be undone.</p>
//             </div>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={cancelDelete}
//                 className="flex items-center px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
//                 title="Cancel deletion"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="flex items-center px-6 py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 title="Confirm and delete booking"
//               >
//                 <DeleteIcon /> Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl border border-gray-200">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-300">
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 md:mb-0 flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 mr-3 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>
//             </svg>
//             Bookings Overview
//           </h1>
//           <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
//             <button
//               onClick={handleDownloadXLSXClick}
//               className="flex items-center justify-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
//               title="Download all bookings as XLSX"
//             >
//               <DownloadIcon /> Download XLSX
//             </button>
//             <button
//               onClick={() => navigate("/booking/add")}
//               className="flex items-center justify-center px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//               title="Add a new booking"
//             >
//               <AddUserIcon /> Add New Booking
//             </button>
//           </div>
//         </div>

//         <div className="relative mb-6">
//           <input
//             type="text"
//             placeholder="Search bookings by guest name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg pl-12 pr-5 py-3 text-lg text-gray-800 placeholder-gray-500
//                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm"
//             title="Search for bookings by guest name"
//           />
//           <div className="absolute left-4 top-1/2 -translate-y-1/2">
//             <SearchIcon />
//           </div>
//         </div>


//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-16">
//             <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-700 mb-4"></div>
//             <p className="text-xl text-blue-800 font-medium">Fetching booking data...</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-blue-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Photo</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Name</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">ID Number</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Phone</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Room</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Check-In</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Check-Out</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Guests</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {currentBookings.length > 0 ? (
//                   currentBookings.map((b) => (
//                     <tr key={b._id} className="hover:bg-blue-50 transition-colors duration-200 ease-in-out">
//                       <td className="px-4 py-3">
//                         <img src={b.photoUrl || 'https://via.placeholder.com/64x64?text=Guest'} alt="Guest" className="w-16 h-16 object-cover rounded-full border-2 border-gray-300 shadow-md transform transition-transform hover:scale-105" />
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{b.name}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{b.idProofNumber}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{b.mobileNo || b.phoneNo}</td>
//                       <td className="px-4 py-3 text-sm text-blue-800 font-bold">{b.roomNo}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{b.checkInDate ? new Date(b.checkInDate).toLocaleDateString('en-GB') : 'N/A'}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{b.checkOutDate ? new Date(b.checkOutDate).toLocaleDateString('en-GB') : 'N/A'}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700 font-medium">
//                         {(parseInt(b.noOfAdults) || 0) + (parseInt(b.noOfChildren) || 0)}
//                       </td>
//                       <td className="px-4 py-3 text-sm flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 items-start sm:items-center">
//                         <button
//                           onClick={() => handleEdit(b)}
//                           className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150 focus:outline-none focus:underline"
//                           title="Edit booking"
//                         >
//                           <EditIcon /> <span className="ml-1">Edit</span>
//                         </button>
//                         <button
//                           onClick={() => handleDelete(b._id)}
//                           className="flex items-center text-red-600 hover:text-red-800 font-medium transition-colors duration-150 focus:outline-none focus:underline"
//                           title="Delete booking"
//                         >
//                           <DeleteIcon /> <span className="ml-1">Delete</span>
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="9" className="text-center py-10 text-gray-500 italic text-lg bg-gray-50">
//                       No bookings found for your search criteria.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {totalPages > 1 && (
//           <div className="flex justify-center mt-8 flex-wrap gap-2">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`mx-1 my-1 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg border-2 text-base font-semibold transition duration-200 ease-in-out
//                   ${currentPage === i + 1
//                     ? "bg-blue-800 text-white border-blue-800 shadow-md transform scale-105"
//                     : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
//                   }
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
//                 title={`Go to page ${i + 1}`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Booking;


import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Heroicons - directly embedding SVG paths for simplicity and no new dependencies
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const AddUserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6-3a9 9 0 11-9 9V7.5M10.5 10.5h.01M16 16.5h.01" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ConfirmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);


const ITEMS_PER_PAGE = 10;
const backendURL = "https://havana-backend.vercel.app";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedBookings, setDisplayedBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDeleteId, setBookingToDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchBookingsData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendURL}/api/bookings`);
      const data = Array.isArray(response.data) ? response.data : (response.data.bookings || []);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookingsData();
  }, [fetchBookingsData]);

  useEffect(() => {
    const filtered = bookings.filter((b) =>
      (b.name || "").toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setDisplayedBookings(filtered);
    setCurrentPage(1);
  }, [searchTerm, bookings]);

  const totalPages = Math.ceil(displayedBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBookings = displayedBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const deleteBooking = async (id) => {
    const response = await axios.delete(`${backendURL}/api/bookings/${id}`);
    return response.data;
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    if (!bookingToDeleteId) return;

    try {
      const result = await deleteBooking(bookingToDeleteId);
      toast.success(result.message || "Booking deleted");
      await fetchBookingsData();
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking");
    } finally {
      setBookingToDeleteId(null);
    }
  };

  const handleDelete = (id) => {
    setBookingToDeleteId(id);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBookingToDeleteId(null);
  };

  const handleEdit = (booking) => {
    navigate(`/booking/edit/${booking._id}`, {
      state: { editingData: booking },
    });
  };

  const handleDownloadXLSXClick = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/bookings/exportBookingsExcel`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bookings.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("XLSX downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download XLSX.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4 sm:p-6 md:p-8 font-sans text-gray-800">
      <Toaster position="top-right" reverseOrder={false} />

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform scale-95 animate-scale-up-modal border-t-4 border-yellow-500">
            <div className="flex flex-col items-center mb-6">
              <ConfirmIcon />
              <h3 className="text-2xl font-bold text-gray-800 mb-2 mt-2">Confirm Deletion</h3>
              <p className="text-gray-700 text-center">Are you sure you want to permanently delete this booking? This action cannot be undone.</p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={cancelDelete}
                className="flex items-center px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
                title="Cancel deletion"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex items-center px-6 py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                title="Confirm and delete booking"
              >
                <DeleteIcon /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-300">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 md:mb-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 mr-3 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>
            </svg>
            Bookings Overview
          </h1>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
            <button
              onClick={handleDownloadXLSXClick}
              className="flex items-center justify-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
              title="Download all bookings as XLSX"
            >
              <DownloadIcon /> Download XLSX
            </button>
            <button
              onClick={() => navigate("/booking/add")}
              className="flex items-center justify-center px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              title="Add a new booking"
            >
              <AddUserIcon /> Add New Booking
            </button>
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search bookings by guest name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-12 pr-5 py-3 text-lg text-gray-800 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm"
            title="Search for bookings by guest name"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>


        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-700 mb-4"></div>
            <p className="text-xl text-blue-800 font-medium">Fetching booking data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Photo</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">ID Number</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Room</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Check-In</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Check-Out</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Guests</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentBookings.length > 0 ? (
                  currentBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-blue-50 transition-colors duration-200 ease-in-out">
                      <td className="px-4 py-3">
                        <img src={b.photoUrl || 'https://placehold.co/64x64/E0FBFC/29335C?text=Guest'} alt="Guest" className="w-16 h-16 object-cover rounded-full border-2 border-gray-300 shadow-md transform transition-transform hover:scale-105" />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{b.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{b.idProofNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{b.mobileNo || b.phoneNo}</td>
                      <td className="px-4 py-3 text-sm text-blue-800 font-bold">{b.roomNo}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{b.checkInDate ? new Date(b.checkInDate).toLocaleDateString('en-GB') : 'N/A'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{b.checkOutDate ? new Date(b.checkOutDate).toLocaleDateString('en-GB') : 'N/A'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                        {(parseInt(b.noOfAdults) || 0) + (parseInt(b.noOfChildren) || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 items-start sm:items-center">
                        <button
                          onClick={() => handleEdit(b)}
                          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150 focus:outline-none focus:underline"
                          title="Edit booking"
                        >
                          <EditIcon /> <span className="ml-1">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="flex items-center text-red-600 hover:text-red-800 font-medium transition-colors duration-150 focus:outline-none focus:underline"
                          title="Delete booking"
                        >
                          <DeleteIcon /> <span className="ml-1">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-10 text-gray-500 italic text-lg bg-gray-50">
                      No bookings found for your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 my-1 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg border-2 text-base font-semibold transition duration-200 ease-in-out
                  ${currentPage === i + 1
                    ? "bg-blue-800 text-white border-blue-800 shadow-md transform scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
                title={`Go to page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;