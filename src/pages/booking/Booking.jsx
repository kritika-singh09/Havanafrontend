


// // import React, { useState, useEffect, useCallback } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import toast, { Toaster } from "react-hot-toast";

// // // --- Icon Components (No changes needed, their size is handled by parent elements) ---
// // const DownloadIcon = () => (
// //   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //   </svg>
// // );

// // const AddUserIcon = () => (
// //   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6-3a9 9 0 11-9 9V7.5M10.5 10.5h.01M16 16.5h.01" />
// //   </svg>
// // );

// // const SearchIcon = () => (
// //   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-1.5 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //   </svg>
// // );

// // const EditIcon = () => (
// //   <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
// //   </svg>
// // );

// // const DeleteIcon = () => (
// //   <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
// //   </svg>
// // );

// // const ConfirmIcon = () => (
// //   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mb-2 sm:mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //   </svg>
// // );

// // // --- Constants ---
// // const ITEMS_PER_PAGE = 10;
// // const backendURL = "https://havana-backend.vercel.app";

// // // --- Main Booking Component ---
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
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-3 sm:p-6 md:p-8 font-sans text-gray-800">
// //       <Toaster position="top-right" reverseOrder={false} />

// //       {/* Delete Confirmation Modal */}
// //       {showDeleteModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4 animate-fade-in"> {/* Smaller padding */}
// //           <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md transform scale-95 animate-scale-up-modal border-t-4 border-yellow-500"> {/* Smaller max-width, padding */}
// //             <div className="flex flex-col items-center mb-4 sm:mb-6"> {/* Reduced margin */}
// //               <ConfirmIcon />
// //               <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1.5 mt-1.5 sm:mb-2 sm:mt-2 text-center">Confirm Deletion</h3> {/* Smaller text */}
// //               <p className="text-gray-700 text-center text-sm sm:text-base">Are you sure you want to permanently delete this booking? This action cannot be undone.</p> {/* Smaller text */}
// //             </div>
// //             <div className="flex justify-center space-x-3 sm:space-x-4"> {/* Reduced space */}
// //               <button
// //                 onClick={cancelDelete}
// //                 className="flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base" 
// //                 title="Cancel deletion"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={confirmDelete}
// //                 className="flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base" 
// //                 title="Confirm and delete booking"
// //               >
// //                 <DeleteIcon /> <span className="ml-1">Delete</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200"> {/* Reduced padding */}
// //         {/* Header Section */}
// //         <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-3 sm:pb-4 border-b border-gray-300"> {/* Reduced margin/padding */}
// //           <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-0 flex items-center text-center md:text-left w-full justify-center md:justify-start"> {/* Smaller text, centered on small */}
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> {/* Smaller icon */}
// //               <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>
// //             </svg>
// //             Bookings Overview
// //           </h1>
// //           <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto"> {/* Reduced spacing */}
// //             <button
// //               onClick={handleDownloadXLSXClick}
// //               className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 text-sm sm:text-base" 
// //               title="Download all bookings as XLSX"
// //             >
// //               <DownloadIcon /> <span className="hidden sm:inline">Download XLSX</span> <span className="sm:hidden">Download</span> {/* Conditionally hide text for smallest screens */}
// //             </button>
// //             <button
// //               onClick={() => navigate("/booking/add")}
// //               className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-sm sm:text-base" 
// //               title="Add a new booking"
// //             >
// //               <AddUserIcon /> <span className="hidden sm:inline">Add New Booking</span> <span className="sm:hidden">Add Booking</span> 
// //             </button>
// //           </div>
// //         </div>

// //         {/* Search Bar */}
// //         <div className="relative mb-5 sm:mb-6">
// //           <input
// //             type="text"
// //             placeholder="Search by guest name..." 
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-white placeholder-gray-500
// //                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base" 
// //             title="Search for bookings by guest name"
// //           />
// //           <div className="absolute left-3 top-1/2 -translate-y-1/2"> {/* Adjusted left position */}
// //             <SearchIcon />
// //           </div>
// //         </div>

// //         {/* Loading Spinner / Bookings Table */}
// //         {loading ? (
// //           <div className="flex flex-col items-center justify-center py-10 sm:py-16"> {/* Reduced padding */}
// //             <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div> {/* Slightly smaller spinner */}
// //             <p className="text-base sm:text-xl text-blue-800 font-medium">Fetching booking data...</p> {/* Smaller text */}
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-blue-50">
// //                 <tr>
// //                   {/* Adjusted header text sizes */}
// //                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Photo</th>
// //                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Name</th>
// //                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden xs:table-cell">ID No.</th> {/* Hidden on smallest, visible on xs */}
// //                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden sm:table-cell">Phone</th> {/* Hidden on xs, visible on sm */}
// //                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Room</th>
// //                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden md:table-cell">Check-In</th> {/* Hidden on sm, visible on md */}
// //                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden md:table-cell">Check-Out</th> {/* Hidden on sm, visible on md */}
// //                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Guests</th>
// //                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-100">
// //                 {currentBookings.length > 0 ? (
// //                   currentBookings.map((b) => (
// //                     <tr key={b._id} className="hover:bg-blue-50 transition-colors duration-200 ease-in-out">
// //                       <td className="px-2 py-2 sm:px-4 sm:py-3"> {/* Reduced padding */}
// //                         <img src={b.photoUrl || 'https://placehold.co/48x48/E0FBFC/29335C?text=Guest'} alt="Guest" className="w-12 h-12 xs:w-14 xs:h-14 object-cover rounded-full border-2 border-gray-300 shadow-md transform transition-transform hover:scale-105" /> {/* Smaller image */}
// //                       </td>
// //                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-900 font-semibold">{b.name}</td> {/* Smaller text */}
// //                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden xs:table-cell">{b.idProofNumber}</td> {/* Smaller text, responsive visibility */}
// //                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">{b.mobileNo || b.phoneNo}</td> {/* Smaller text, responsive visibility */}
// //                       <td className="px-2 py-2 text-xs sm:text-sm text-blue-800 font-bold">{b.roomNo}</td> {/* Smaller text */}
// //                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden md:table-cell">{b.checkInDate ? new Date(b.checkInDate).toLocaleDateString('en-GB') : 'N/A'}</td> {/* Smaller text, responsive visibility */}
// //                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden md:table-cell">{b.checkOutDate ? new Date(b.checkOutDate).toLocaleDateString('en-GB') : 'N/A'}</td> {/* Smaller text, responsive visibility */}
// //                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 font-medium"> {/* Smaller text */}
// //                         {(parseInt(b.noOfAdults) || 0) + (parseInt(b.noOfChildren) || 0)}
// //                       </td>
// //                       <td className="px-2 py-2 text-xs sm:text-sm flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2 items-start sm:items-center"> {/* Smaller text, adjusted spacing/layout */}
// //                         <button
// //                           onClick={() => handleEdit(b)}
// //                           className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150 focus:outline-none focus:underline text-xs sm:text-sm"
// //                           title="Edit booking"
// //                         >
// //                           <EditIcon /> <span className="ml-0.5 sm:ml-1">Edit</span> 
// //                         </button>
// //                         <button
// //                           onClick={() => handleDelete(b._id)}
// //                           className="flex items-center text-red-600 hover:text-red-800 font-medium transition-colors duration-150 focus:outline-none focus:underline text-xs sm:text-sm"
// //                           title="Delete booking"
// //                         >
// //                           <DeleteIcon /> <span className="ml-0.5 sm:ml-1">Delete</span> {/* Smaller margin */}
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 ) : (
// //                   <tr>
// //                     <td colSpan="9" className="text-center py-6 text-gray-500 italic text-sm sm:text-lg bg-gray-50"> {/* Reduced padding, smaller text */}
// //                       No bookings found for your search criteria.
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Pagination */}
// //         {totalPages > 1 && (
// //           <div className="flex justify-center mt-6 flex-wrap gap-1.5 sm:gap-2"> {/* Reduced margin and gap */}
// //             {Array.from({ length: totalPages }, (_, i) => (
// //               <button
// //                 key={i}
// //                 onClick={() => setCurrentPage(i + 1)}
// //                 className={`mx-0.5 my-0.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border-2 text-sm font-semibold transition duration-200 ease-in-out
// //                   ${currentPage === i + 1
// //                     ? "bg-blue-800 text-white border-blue-800 shadow-md transform scale-105"
// //                     : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
// //                   }
// //                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-xs sm:text-base`} 
// //                 title={`Go to page ${i + 1}`}
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

// // --- Icon Components (No changes needed, their size is handled by parent elements) ---
// const DownloadIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//   </svg>
// );

// const AddUserIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6-3a9 9 0 11-9 9V7.5M10.5 10.5h.01M16 16.5h.01" />
//   </svg>
// );

// const SearchIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-1.5 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//   </svg>
// );

// const EditIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//   </svg>
// );

// const DeleteIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//   </svg>
// );

// const ViewIcon = () => ( // New View Icon component
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//   </svg>
// );

// const ConfirmIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mb-2 sm:mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//   </svg>
// );

// // --- Constants ---
// const ITEMS_PER_PAGE = 10;
// const backendURL = "https://havana-backend.vercel.app";

// // --- Main Booking Component ---
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
//       console.log("Fetched bookings data:", data);
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

//   const handleEdit = (booking) => {
//     console.log("Attempting to navigate to edit page for booking:", booking);
//     if (!booking || !booking._id) {
//         console.error("Booking object or _id is missing, cannot navigate to edit page.", booking);
//         toast.error("Cannot edit: Booking ID is missing.");
//         return;
//     }
//     const navigatePath = `/booking/edit/${booking._id}`;
//     console.log("Navigating to:", navigatePath);
//     navigate(navigatePath, {
//       state: { editingData: booking },
//     });
//   };

//   // NEW: handleView function
//   const handleView = (booking) => {
//     console.log("Attempting to navigate to view page for booking:", booking);
//     if (!booking || !booking._id) {
//         console.error("Booking object or _id is missing, cannot navigate to view page.", booking);
//         toast.error("Cannot view: Booking ID is missing.");
//         return;
//     }
//     const navigatePath = `/booking/view/${booking._id}`;
//     console.log("Navigating to:", navigatePath);
//     navigate(navigatePath, {
//       state: { viewingData: booking }, // Pass the booking data for viewing
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
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-3 sm:p-6 md:p-8 font-sans text-gray-800">
//       <Toaster position="top-right" reverseOrder={false} />

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4 animate-fade-in">
//           <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md transform scale-95 animate-scale-up-modal border-t-4 border-yellow-500">
//             <div className="flex flex-col items-center mb-4 sm:mb-6">
//               <ConfirmIcon />
//               <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1.5 mt-1.5 sm:mb-2 sm:mt-2 text-center">Confirm Deletion</h3>
//               <p className="text-gray-700 text-center text-sm sm:text-base">Are you sure you want to permanently delete this booking? This action cannot be undone.</p>
//             </div>
//             <div className="flex justify-center space-x-3 sm:space-x-4">
//               <button
//                 onClick={cancelDelete}
//                 className="flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
//                 title="Cancel deletion"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
//                 title="Confirm and delete booking"
//               >
//                 <DeleteIcon /> <span className="ml-1">Delete</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-3 sm:pb-4 border-b border-gray-300">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-0 flex items-center text-center md:text-left w-full justify-center md:justify-start">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>
//             </svg>
//             Bookings Overview
//           </h1>
//           <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
//             <button
//               onClick={handleDownloadXLSXClick}
//               className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 text-sm sm:text-base"
//               title="Download all bookings as XLSX"
//             >
//               <DownloadIcon /> <span className="hidden sm:inline">Download XLSX</span> <span className="sm:hidden">Download</span>
//             </button>
//             <button
//               onClick={() => navigate("/booking/add")}
//               className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-sm sm:text-base"
//               title="Add a new booking"
//             >
//               <AddUserIcon /> <span className="hidden sm:inline">Add New Booking</span> <span className="sm:hidden">Add Booking</span>
//             </button>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="relative mb-5 sm:mb-6">
//           <input
//             type="text"
//             placeholder="Search by guest name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-white placeholder-gray-500
//                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
//             title="Search for bookings by guest name"
//           />
//           <div className="absolute left-3 top-1/2 -translate-y-1/2">
//             <SearchIcon />
//           </div>
//         </div>

//         {/* Loading Spinner / Bookings Table */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-10 sm:py-16">
//             <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div>
//             <p className="text-base sm:text-xl text-blue-800 font-medium">Fetching booking data...</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-blue-50">
//                 <tr>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Photo</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Name</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden xs:table-cell">ID No.</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden sm:table-cell">Phone</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Room</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden md:table-cell">Check-In</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden md:table-cell">Check-Out</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Guests</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {currentBookings.length > 0 ? (
//                   currentBookings.map((b) => (
//                     <tr key={b._id} className="hover:bg-blue-50 transition-colors duration-200 ease-in-out">
//                       <td className="px-2 py-2 sm:px-4 sm:py-3">
//                         <img src={b.photoUrl || 'https://placehold.co/48x48/E0FBFC/29335C?text=Guest'} alt="Guest" className="w-12 h-12 xs:w-14 xs:h-14 object-cover rounded-full border-2 border-gray-300 shadow-md transform transition-transform hover:scale-105" />
//                       </td>
//                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-900 font-semibold">{b.name}</td>
//                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden xs:table-cell">{b.idProofNumber}</td>
//                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">{b.mobileNo || b.phoneNo}</td>
//                       <td className="px-2 py-2 text-xs sm:text-sm text-blue-800 font-bold">{b.roomNo}</td>
//                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden md:table-cell">{b.checkInDate ? new Date(b.checkInDate).toLocaleDateString('en-GB') : 'N/A'}</td>
//                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden md:table-cell">{b.checkOutDate ? new Date(b.checkOutDate).toLocaleDateString('en-GB') : 'N/A'}</td>
//                       <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 font-medium">
//                         {(parseInt(b.noOfAdults) || 0) + (parseInt(b.noOfChildren) || 0)}
//                       </td>
//                       <td className="px-2 py-2 text-xs sm:text-sm flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2 items-start sm:items-center">
//                         {/* New View Button */}
//                         <button
//                           onClick={() => handleView(b)}
//                           className="flex items-center text-green-600 hover:text-green-800 font-medium transition-colors duration-150 focus:outline-none focus:underline text-xs sm:text-sm"
//                           title="View booking details"
//                         >
//                           <ViewIcon /> <span className="ml-0.5 sm:ml-1">View</span>
//                         </button>
//                         {/* Existing Edit Button */}
//                         <button
//                           onClick={() => handleEdit(b)}
//                           className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150 focus:outline-none focus:underline text-xs sm:text-sm"
//                           title="Edit booking"
//                         >
//                           <EditIcon /> <span className="ml-0.5 sm:ml-1">Edit</span>
//                         </button>
//                         {/* Existing Delete Button */}
//                         <button
//                           onClick={() => handleDelete(b._id)}
//                           className="flex items-center text-red-600 hover:text-red-800 font-medium transition-colors duration-150 focus:outline-none focus:underline text-xs sm:text-sm"
//                           title="Delete booking"
//                         >
//                           <DeleteIcon /> <span className="ml-0.5 sm:ml-1">Delete</span>
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="9" className="text-center py-6 text-gray-500 italic text-sm sm:text-lg bg-gray-50">
//                       No bookings found for your search criteria.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-6 flex-wrap gap-1.5 sm:gap-2">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`mx-0.5 my-0.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border-2 text-sm font-semibold transition duration-200 ease-in-out
//                   ${currentPage === i + 1
//                     ? "bg-blue-800 text-white border-blue-800 shadow-md transform scale-105"
//                     : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
//                   }
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-xs sm:text-base`}
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

// --- Icon Components (No changes needed, their size is handled by parent elements) ---
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const AddUserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6-3a9 9 0 11-9 9V7.5M10.5 10.5h.01M16 16.5h.01" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-1.5 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ViewIcon = () => ( // New View Icon component
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ConfirmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mb-2 sm:mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

// --- Constants ---
const ITEMS_PER_PAGE = 10;
const backendURL = "https://havana-backend.vercel.app";

// --- Main Booking Component ---
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
      console.log("Fetched bookings data:", data);
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

  // Function to cancel the delete operation and close the modal
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBookingToDeleteId(null);
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    if (!bookingToDeleteId) return;

    try {
      const result = await deleteBooking(bookingToDeleteId);
      toast.success(result.message || "Booking deleted successfully!");
      await fetchBookingsData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking.");
    } finally {
      setBookingToDeleteId(null);
    }
  };

  const handleDelete = (id) => {
    setBookingToDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleEdit = (booking) => {
    console.log("Attempting to navigate to edit page for booking:", booking);
    if (!booking || !booking._id) {
        console.error("Booking object or _id is missing, cannot navigate to edit page.", booking);
        toast.error("Cannot edit: Booking ID is missing.");
        return;
    }
    const navigatePath = `/booking/edit/${booking._id}`;
    console.log("Navigating to:", navigatePath);
    navigate(navigatePath, {
      state: { editingData: booking },
    });
  };

  // NEW: handleView function
  const handleView = (booking) => {
    console.log("Attempting to navigate to view page for booking:", booking);
    if (!booking || !booking._id) {
        console.error("Booking object or _id is missing, cannot navigate to view page.", booking);
        toast.error("Cannot view: Booking ID is missing.");
        return;
    }
    const navigatePath = `/booking/view/${booking._id}`;
    console.log("Navigating to:", navigatePath);
    navigate(navigatePath, {
      state: { viewingData: booking }, // Pass the booking data for viewing
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-2 sm:p-3 md:p-6 font-sans text-gray-800">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4 animate-fade-in">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md transform scale-95 animate-scale-up-modal border-t-4 border-yellow-500">
            <div className="flex flex-col items-center mb-4 sm:mb-6">
              <ConfirmIcon />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1.5 mt-1.5 sm:mb-2 sm:mt-2 text-center">Confirm Deletion</h3>
              <p className="text-gray-700 text-center text-sm sm:text-base">Are you sure you want to permanently delete this booking? This action cannot be undone.</p>
            </div>
            <div className="flex justify-center space-x-3 sm:space-x-4">
              <button
                onClick={cancelDelete}
                className="flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
                title="Cancel deletion"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
                title="Confirm and delete booking"
              >
                <DeleteIcon /> <span className="ml-1">Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-3 sm:pb-4 border-b border-gray-300">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-0 flex items-center text-center md:text-left w-full justify-center md:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>
            </svg>
            Bookings Overview
          </h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
            <button
              onClick={handleDownloadXLSXClick}
              className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 text-sm sm:text-base"
              title="Download all bookings as XLSX"
            >
              <DownloadIcon /> <span className="hidden sm:inline">Download XLSX</span> <span className="sm:hidden">Download</span>
            </button>
            <button
              onClick={() => navigate("/booking/add")}
              className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-sm sm:text-base"
              title="Add a new booking"
            >
              <AddUserIcon /> <span className="hidden sm:inline">Add New Booking</span> <span className="sm:hidden">Add Booking</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5 sm:mb-6">
          <input
            type="text"
            placeholder="Search by guest name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
            title="Search for bookings by guest name"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>

        {/* Loading Spinner / Bookings Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-16">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div>
            <p className="text-base sm:text-xl text-blue-800 font-medium">Fetching booking data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Photo</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Name</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden xs:table-cell">ID No.</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden sm:table-cell">Phone</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Room</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden md:table-cell">Check-In</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden md:table-cell">Check-Out</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Guests</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentBookings.length > 0 ? (
                  currentBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-blue-50 transition-colors duration-200 ease-in-out">
                      <td className="px-2 py-2 sm:px-4 sm:py-3">
                        <img src={b.photoUrl || 'https://placehold.co/48x48/E0FBFC/29335C?text=Guest'} alt="Guest" className="w-12 h-12 xs:w-14 xs:h-14 object-cover rounded-full border-2 border-gray-300 shadow-md transform transition-transform hover:scale-105" />
                      </td>
                      <td className="px-2 py-2 text-xs sm:text-sm text-gray-900 font-semibold">{b.name}</td>
                      <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden xs:table-cell">{b.idProofNumber}</td>
                      <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">{b.mobileNo || b.phoneNo}</td>
                      <td className="px-2 py-2 text-xs sm:text-sm text-blue-800 font-bold">{b.roomNo}</td>
                      <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden md:table-cell">{b.checkInDate ? new Date(b.checkInDate).toLocaleDateString('en-GB') : 'N/A'}</td>
                      <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden md:table-cell">{b.checkOutDate ? new Date(b.checkOutDate).toLocaleDateString('en-GB') : 'N/A'}</td>
                      <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 font-medium">
                        {(parseInt(b.noOfAdults) || 0) + (parseInt(b.noOfChildren) || 0)}
                      </td>
                      <td className="px-2 py-2 text-xs sm:text-sm flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2 items-start sm:items-center">
                        {/* New View Button */}
                        <button
                          onClick={() => handleView(b)}
                          className="flex items-center text-green-600 hover:text-green-800 font-medium transition-colors duration-150 focus:outline-none focus:underline text-xs sm:text-sm"
                          title="View booking details"
                        >
                          <ViewIcon /> <span className="ml-0.5 sm:ml-1">View</span>
                        </button>
                        {/* Existing Edit Button */}
                        <button
                          onClick={() => handleEdit(b)}
                          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150 focus:outline-none focus:underline text-xs sm:text-sm"
                          title="Edit booking"
                        >
                          <EditIcon /> <span className="ml-0.5 sm:ml-1">Edit</span>
                        </button>
                        {/* Existing Delete Button */}
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="flex items-center text-red-600 hover:text-red-800 font-medium transition-colors duration-150 focus:outline-none focus:underline text-xs sm:text-sm"
                          title="Delete booking"
                        >
                          <DeleteIcon /> <span className="ml-0.5 sm:ml-1">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-gray-500 italic text-sm sm:text-lg bg-gray-50">
                      No bookings found for your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 flex-wrap gap-1.5 sm:gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-0.5 my-0.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border-2 text-sm font-semibold transition duration-200 ease-in-out
                  ${currentPage === i + 1
                    ? "bg-blue-800 text-white border-blue-800 shadow-md transform scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-xs sm:text-base`}
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