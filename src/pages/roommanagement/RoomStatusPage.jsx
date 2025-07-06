// // import React, { useEffect, useState, useCallback } from 'react';
// // import { Plus, Edit, Trash2, CircleDot, X, Check, Loader2, Info } from 'lucide-react';
// // import { initializeApp } from 'firebase/app';
// // import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
// // import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';

// // const RoomStatusPage = () => {
// //   // State for Firebase instances and authentication status
// //   const [db, setDb] = useState(null);
// //   const [auth, setAuth] = useState(null);
// //   const [userId, setUserId] = useState(null);
// //   const [isAuthReady, setIsAuthReady] = useState(false);

// //   // State for managing room statuses
// //   const [statuses, setStatuses] = useState([]);
// //   const [newStatusName, setNewStatusName] = useState('');
// //   const [editingStatus, setEditingStatus] = useState(null); // { id: '...', name: '...' }
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // State for modal visibility and data
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
// //   const [statusToDelete, setStatusToDelete] = useState(null);

// //   // Initialize Firebase and authenticate
// //   useEffect(() => {
// //     try {
// //       const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// //       const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

// //       if (!Object.keys(firebaseConfig).length) {
// //         console.error("Firebase config is not defined. Please ensure __firebase_config is set.");
// //         setError("Firebase configuration is missing. Cannot connect to database.");
// //         setIsLoading(false);
// //         return;
// //       }

// //       const app = initializeApp(firebaseConfig);
// //       const firestoreDb = getFirestore(app);
// //       const firebaseAuth = getAuth(app);

// //       setDb(firestoreDb);
// //       setAuth(firebaseAuth);

// //       const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
// //         if (user) {
// //           setUserId(user.uid);
// //         } else {
// //           try {
// //             // Sign in anonymously if no user is authenticated
// //             if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
// //                 await signInWithCustomToken(firebaseAuth, __initial_auth_token);
// //             } else {
// //                 await signInAnonymously(firebaseAuth);
// //             }
// //           } catch (authError) {
// //             console.error("Firebase anonymous authentication failed:", authError);
// //             setError("Authentication failed. Please try again.");
// //           }
// //         }
// //         setIsAuthReady(true); // Auth state is ready, whether logged in or anonymous
// //       });

// //       return () => unsubscribe(); // Cleanup auth listener on unmount
// //     } catch (err) {
// //       console.error("Failed to initialize Firebase:", err);
// //       setError("Failed to initialize the application. Please check console for details.");
// //       setIsLoading(false);
// //     }
// //   }, []);

// //   // Fetch statuses when Firebase is ready
// //   useEffect(() => {
// //     if (!db || !isAuthReady || !userId) {
// //       return;
// //     }

// //     const statusesCollectionRef = collection(db, `artifacts/${__app_id}/public/data/roomStatuses`);
// //     // Note: orderBy is commented out as per instructions to avoid potential index issues.
// //     // If sorting is critical, fetch all and sort in memory.
// //     const q = query(statusesCollectionRef); // , orderBy("name", "asc")

// //     const unsubscribe = onSnapshot(q, (snapshot) => {
// //       const fetchedStatuses = snapshot.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       }));
// //       setStatuses(fetchedStatuses);
// //       setIsLoading(false);
// //     }, (err) => {
// //       console.error("Error fetching statuses:", err);
// //       setError("Failed to load statuses. Please try again.");
// //       setIsLoading(false);
// //     });

// //     return () => unsubscribe(); // Cleanup snapshot listener
// //   }, [db, isAuthReady, userId]); // Depend on db and auth readiness

// //   // Handles adding or updating a status
// //   const handleSaveStatus = async () => {
// //     if (!newStatusName.trim()) {
// //       setError("Status name cannot be empty.");
// //       return;
// //     }
// //     if (!db) {
// //       setError("Database not initialized.");
// //       return;
// //     }

// //     setError(null);
// //     setIsLoading(true);

// //     try {
// //       const statusesCollectionRef = collection(db, `artifacts/${__app_id}/public/data/roomStatuses`);

// //       if (editingStatus) {
// //         // Update existing status
// //         const statusDocRef = doc(db, `artifacts/${__app_id}/public/data/roomStatuses`, editingStatus.id);
// //         await updateDoc(statusDocRef, { name: newStatusName.trim() });
// //         setEditingStatus(null); // Clear editing state
// //       } else {
// //         // Add new status
// //         await addDoc(statusesCollectionRef, {
// //           name: newStatusName.trim(),
// //           createdAt: new Date(),
// //           updatedAt: new Date(),
// //         });
// //       }
// //       setNewStatusName(''); // Clear input field
// //       setIsModalOpen(false); // Close modal
// //     } catch (err) {
// //       console.error("Error saving status:", err);
// //       setError(`Failed to save status: ${err.message}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Prepares the modal for editing a status
// //   const handleEditClick = (status) => {
// //     setEditingStatus(status);
// //     setNewStatusName(status.name);
// //     setIsModalOpen(true);
// //   };

// //   // Opens the delete confirmation modal
// //   const handleDeleteClick = (status) => {
// //     setStatusToDelete(status);
// //     setIsDeleteConfirmModalOpen(true);
// //   };

// //   // Confirms and performs status deletion
// //   const confirmDeleteStatus = async () => {
// //     if (!statusToDelete || !db) {
// //       setError("No status selected for deletion or database not initialized.");
// //       return;
// //     }

// //     setError(null);
// //     setIsLoading(true);

// //     try {
// //       const statusDocRef = doc(db, `artifacts/${__app_id}/public/data/roomStatuses`, statusToDelete.id);
// //       await deleteDoc(statusDocRef);
// //       setIsDeleteConfirmModalOpen(false); // Close modal
// //       setStatusToDelete(null); // Clear status to delete
// //     } catch (err) {
// //       console.error("Error deleting status:", err);
// //       setError(`Failed to delete status: ${err.message}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Closes the add/edit modal and resets state
// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setNewStatusName('');
// //     setEditingStatus(null);
// //     setError(null); // Clear any modal-specific errors
// //   };

// //   // Closes the delete confirmation modal
// //   const closeDeleteConfirmModal = () => {
// //     setIsDeleteConfirmModalOpen(false);
// //     setStatusToDelete(null);
// //     setError(null); // Clear any modal-specific errors
// //   };

// //   if (error && !isLoading) {
// //     return (
// //       <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-xl shadow-md dark:bg-red-900 dark:border-red-700 dark:text-red-300 flex items-center justify-center space-x-3">
// //         <Info size={24} />
// //         <p className="font-semibold text-lg">{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 text-gray-900 dark:text-white min-h-[calc(100vh-10rem)] flex flex-col">
// //       <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
// //         <CircleDot className="h-8 w-8 text-green-500" /> Room Status
// //       </h2>

// //       {/* Add New Status Button */}
// //       <div className="mb-6 flex justify-end">
// //         <button
// //           onClick={() => {
// //             setEditingStatus(null); // Ensure we're adding, not editing
// //             setNewStatusName(''); // Clear previous input
// //             setIsModalOpen(true);
// //           }}
// //           className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
// //         >
// //           <Plus size={24} />
// //           <span>Add New Status</span>
// //         </button>
// //       </div>

// //       {/* Loading Indicator */}
// //       {isLoading && (
// //         <div className="flex justify-center items-center py-10">
// //           <Loader2 className="animate-spin h-10 w-10 text-green-500" />
// //           <span className="ml-3 text-lg font-medium">Loading statuses...</span>
// //         </div>
// //       )}

// //       {/* Statuses List */}
// //       {!isLoading && statuses.length === 0 && (
// //         <div className="text-center py-10 text-gray-500 dark:text-gray-400">
// //           <p className="text-xl font-medium">No room statuses found. Add one to get started!</p>
// //         </div>
// //       )}

// //       {!isLoading && statuses.length > 0 && (
// //         <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex-1">
// //           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
// //             <thead className="bg-gray-50 dark:bg-gray-700">
// //               <tr>
// //                 <th
// //                   scope="col"
// //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
// //                 >
// //                   Status Name
// //                 </th>
// //                 <th
// //                   scope="col"
// //                   className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
// //                 >
// //                   Actions
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
// //               {statuses.map((status) => (
// //                 <tr key={status.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
// //                     {status.name}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                     <div className="flex justify-end space-x-3">
// //                       <button
// //                         onClick={() => handleEditClick(status)}
// //                         className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
// //                         title="Edit Status"
// //                       >
// //                         <Edit size={20} />
// //                       </button>
// //                       <button
// //                         onClick={() => handleDeleteClick(status)}
// //                         className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
// //                         title="Delete Status"
// //                       >
// //                         <Trash2 size={20} />
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* Add/Edit Status Modal */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md transform transition-all scale-100 opacity-100 animate-fade-in-up">
// //             <div className="flex justify-between items-center mb-6">
// //               <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
// //                 {editingStatus ? 'Edit Status' : 'Add New Status'}
// //               </h3>
// //               <button
// //                 onClick={closeModal}
// //                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
// //               >
// //                 <X size={28} />
// //               </button>
// //             </div>
// //             {error && (
// //               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 dark:bg-red-900 dark:border-red-700 dark:text-red-300">
// //                 <strong className="font-bold">Error!</strong>
// //                 <span className="block sm:inline ml-2">{error}</span>
// //               </div>
// //             )}
// //             <div className="mb-6">
// //               <label htmlFor="statusName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                 Status Name
// //               </label>
// //               <input
// //                 type="text"
// //                 id="statusName"
// //                 value={newStatusName}
// //                 onChange={(e) => setNewStatusName(e.target.value)}
// //                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
// //                 placeholder="e.g., Available, Occupied, Dirty"
// //               />
// //             </div>
// //             <div className="flex justify-end space-x-3">
// //               <button
// //                 onClick={closeModal}
// //                 className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium shadow-sm"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleSaveStatus}
// //                 disabled={isLoading}
// //                 className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-colors duration-200 font-medium shadow-md flex items-center justify-center space-x-2"
// //               >
// //                 {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Check size={20} />}
// //                 <span>{editingStatus ? 'Update Status' : 'Add Status'}</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Delete Confirmation Modal */}
// //       {isDeleteConfirmModalOpen && (
// //         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-sm transform transition-all scale-100 opacity-100 animate-fade-in-up">
// //             <div className="flex justify-between items-center mb-6">
// //               <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Confirm Deletion</h3>
// //               <button
// //                 onClick={closeDeleteConfirmModal}
// //                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
// //               >
// //                 <X size={28} />
// //               </button>
// //             </div>
// //             <p className="text-gray-700 dark:text-gray-300 mb-6">
// //               Are you sure you want to delete the status "
// //               <span className="font-semibold">{statusToDelete?.name}</span>"? This action cannot be undone.
// //             </p>
// //             <div className="flex justify-end space-x-3">
// //               <button
// //                 onClick={closeDeleteConfirmModal}
// //                 className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium shadow-sm"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={confirmDeleteStatus}
// //                 disabled={isLoading}
// //                 className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-colors duration-200 font-medium shadow-md flex items-center justify-center space-x-2"
// //               >
// //                 {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Trash2 size={20} />}
// //                 <span>Delete</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default RoomStatusPage;
// import React, { useState, useCallback, useMemo, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import toast, { Toaster } from 'react-hot-toast';

// // Lucide React Icons
// import {
//   ChevronLeft,
//   ChevronRight,
//   CalendarDays, // Main icon for Room Status Calendar
//   Info,
//   X,
//   Check,
//   Loader2,
//   AlertTriangle, // For general modals
//   CircleCheck, // Icon for 'Active' status
//   CircleDotDashed, // Icon for 'Inactive' status
//   Search, // Icon for search bar
// } from 'lucide-react';

// // Map status (boolean) to their corresponding Lucide icons and colors
// const activeStatusDisplay = {
//   true: { name: 'Active', icon: CircleCheck, colorClass: 'bg-green-100 text-green-700 border-green-300' },
//   false: { name: 'Inactive', icon: CircleDotDashed, colorClass: 'bg-red-100 text-red-700 border-red-300' },
// };

// // --- Reusable Modal Component (using createPortal) ---
// const Modal = ({ isOpen, onClose, title, children, icon: IconComponent }) => {
//   if (!isOpen) return null;

//   return createPortal(
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4 animate-fade-in">
//       <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md transform scale-95 animate-scale-up-modal border-t-4 border-blue-500">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//           aria-label="Close modal"
//         >
//           <X size={24} />
//         </button>
//         <div className="flex flex-col items-center mb-4 sm:mb-6">
//           {IconComponent && <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mb-2 sm:mb-3" />}
//           <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1.5 mt-1.5 sm:mb-2 sm:mt-2 text-center">{title}</h3>
//         </div>
//         {children}
//       </div>
//     </div>,
//     document.body // Portals render into the document body
//   );
// };


// // --- Helper Functions for Calendar Logic ---
// const getDaysInMonth = (year, month) => {
//   return new Date(year, month + 1, 0).getDate();
// };

// const getFirstDayOfMonth = (year, month) => {
//   return new Date(year, month, 1).getDay(); // 0 for Sunday, 6 for Saturday
// };

// const formatDateToYYYYMMDD = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// // --- Main RoomStatusPage Component ---
// const RoomStatusPage = () => {
//   const today = useMemo(() => {
//     const d = new Date();
//     d.setHours(0, 0, 0, 0); // Normalize to start of day
//     return d;
//   }, []);

//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());
//   const [currentYear, setCurrentYear] = useState(today.getFullYear());
//   const [searchTerm, setSearchTerm] = useState(''); // For room number search

//   // State for all rooms fetched from API
//   const [allRooms, setAllRooms] = useState([]);
//   // State for all bookings fetched from API
//   const [allBookings, setAllBookings] = useState([]);

//   // Filtered rooms based on search term
//   const filteredRooms = useMemo(() => {
//     if (!searchTerm) {
//       return allRooms;
//     }
//     return allRooms.filter(room =>
//       room.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
//     );
//   }, [allRooms, searchTerm]);

//   // Derived dynamic room status data (roomId -> dateString -> isActive: boolean)
//   // This will be calculated based on allRooms, allBookings, currentMonth, currentYear
//   const [roomDailyActiveStatus, setRoomDailyActiveStatus] = useState({});

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for status change modal
//   const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
//   const [selectedRoomId, setSelectedRoomId] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null); // Date object
//   const [currentIsActive, setCurrentIsActive] = useState(true); // Boolean for active/inactive toggle

//   // --- Fetch Rooms and Bookings from API and Initialize Statuses ---
//   useEffect(() => {
//     const fetchRoomsBookingsAndInitializeStatuses = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         // Fetch Rooms
//         const roomsResponse = await fetch('https://havana-backend.vercel.app:5000/api/rooms');
//         if (!roomsResponse.ok) {
//           throw new Error(`HTTP error fetching rooms! status: ${roomsResponse.status}`);
//         }
//         const roomsData = await roomsResponse.json();
//         const fetchedRooms = roomsData.map(room => ({
//           id: room._id,
//           name: room.roomNumber, // Assuming roomNumber is the display name
//         }));
//         setAllRooms(fetchedRooms);

//         // Fetch Bookings
//         const bookingsResponse = await fetch('https://havana-backend.vercel.app/api/bookings');
//         if (!bookingsResponse.ok) {
//           throw new Error(`HTTP error fetching bookings! status: ${bookingsResponse.status}`);
//         }
//         const bookingsData = await bookingsResponse.json();
//         setAllBookings(bookingsData);

//         // --- Determine active/inactive status for each room and day ---
//         const newRoomDailyActiveStatus = {};
//         const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

//         fetchedRooms.forEach(room => {
//           newRoomDailyActiveStatus[room.id] = {};
//           for (let day = 1; day <= daysInCurrentMonth; day++) {
//             const date = new Date(currentYear, currentMonth, day);
//             date.setHours(0, 0, 0, 0); // Normalize to start of day for comparison
//             const dateString = formatDateToYYYYMMDD(date);

//             let isRoomActive = true; // Assume active by default

//             // Check if this room is booked on this specific day
//             for (const booking of bookingsData) {
//               // Ensure booking.room is an object with an _id, or directly the room ID string
//               const bookedRoomId = booking.room?._id || booking.room;

//               if (bookedRoomId === room.id) {
//                 const checkIn = new Date(booking.checkInDate);
//                 const checkOut = new Date(booking.checkOutDate);
//                 checkIn.setHours(0, 0, 0, 0); // Normalize
//                 checkOut.setHours(0, 0, 0, 0); // Normalize

//                 // A room is inactive if the current day falls within the booking period
//                 // Note: checkOutDate is typically the *day after* the last night, so use < for checkOut
//                 if (date.getTime() >= checkIn.getTime() && date.getTime() < checkOut.getTime()) {
//                   isRoomActive = false;
//                   break; // Found an overlapping booking, no need to check further for this day
//                 }
//               }
//             }
//             newRoomDailyActiveStatus[room.id][dateString] = isRoomActive;
//           }
//         });
//         setRoomDailyActiveStatus(newRoomDailyActiveStatus);

//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(`Failed to load data: ${err.message}. Please ensure the backend server is running and accessible.`);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRoomsBookingsAndInitializeStatuses();
//   }, [currentMonth, currentYear]); // Re-fetch when month/year changes

//   // --- Calendar Navigation Handlers ---
//   const goToPreviousMonth = () => {
//     setCurrentMonth((prevMonth) => {
//       if (prevMonth === 0) {
//         setCurrentYear((prevYear) => prevYear - 1);
//         return 11;
//       }
//       return prevMonth - 1;
//     });
//   };

//   const goToNextMonth = () => {
//     setCurrentMonth((prevMonth) => {
//       if (prevMonth === 11) {
//         setCurrentYear((prevYear) => prevYear + 1);
//         return 0;
//       }
//       return prevMonth + 1;
//     });
//   };

//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   // --- Handle Cell Click to Change Status (Local Simulation) ---
//   const handleCellClick = (roomId, date) => {
//     // Cannot change status for past dates
//     if (date.getTime() < today.getTime()) {
//       toast.error("Cannot change status for past dates.");
//       return;
//     }

//     setSelectedRoomId(roomId);
//     setSelectedDate(date);
//     const dateString = formatDateToYYYYMMDD(date);
//     // Get current active status for the selected room and date, default to true (active)
//     setCurrentIsActive(roomDailyActiveStatus[roomId]?.[dateString] !== undefined ? roomDailyActiveStatus[roomId][dateString] : true);
//     setIsStatusChangeModalOpen(true);
//   };

//   // --- Save Status Change (Local Simulation) ---
//   const handleSaveStatusChange = () => {
//     if (!selectedRoomId || !selectedDate) {
//       toast.error('Invalid status change data.');
//       return;
//     }

//     setIsLoading(true); // Simulate saving
//     toast.dismiss(); // Clear any existing toasts
//     const dateString = formatDateToYYYYMMDD(selectedDate);
//     const roomName = allRooms.find(r => r.id === selectedRoomId)?.name;
//     const newStatusName = currentIsActive ? 'Active' : 'Inactive';

//     setTimeout(() => {
//       // Update local state to reflect the change
//       setRoomDailyActiveStatus(prev => ({
//         ...prev,
//         [selectedRoomId]: {
//           ...prev[selectedRoomId],
//           [dateString]: currentIsActive
//         }
//       }));
//       toast.success(`Status for ${roomName} on ${selectedDate.toLocaleDateString('en-GB')} updated to ${newStatusName}.`);
//       closeStatusChangeModal();
//       setIsLoading(false);
//     }, 500);
//   };

//   // --- Close Status Change Modal ---
//   const closeStatusChangeModal = () => {
//     setIsStatusChangeModalOpen(false);
//     setSelectedRoomId(null);
//     setSelectedDate(null);
//     setCurrentIsActive(true); // Reset to default
//     setIsLoading(false); // Ensure loading is reset
//   };

//   // --- Render Calendar Grid ---
//   const renderRoomStatusGrid = useCallback(() => {
//     const daysInMonth = getDaysInMonth(currentYear, currentMonth);
//     const gridCells = [];

//     // Header row for days of the month
//     const dateHeaders = [];
//     for (let day = 1; day <= daysInMonth; day++) {
//       dateHeaders.push(
//         <div key={`day-header-${day}`} className="p-2 text-center font-semibold text-gray-700 border-b border-gray-200">
//           {day}
//         </div>
//       );
//     }
//     // Add an empty cell for the room name column header
//     gridCells.push(
//       <div key="room-name-header" className="sticky left-0 bg-blue-50 z-10 p-2 text-left font-bold text-blue-700 border-b border-r border-gray-200">
//         Room
//       </div>
//     );
//     gridCells.push(...dateHeaders);


//     // Room rows
//     filteredRooms.forEach(room => {
//       // Room name cell (sticky)
//       gridCells.push(
//         <div key={`room-name-${room.id}`} className="sticky left-0 bg-blue-50 z-10 p-2 text-left font-medium text-gray-900 border-r border-gray-200">
//           {room.name}
//         </div>
//       );

//       // Status cells for each day
//       for (let day = 1; day <= daysInMonth; day++) {
//         const date = new Date(currentYear, currentMonth, day);
//         date.setHours(0, 0, 0, 0); // Normalize
//         const dateString = formatDateToYYYYMMDD(date);
//         const isActive = roomDailyActiveStatus[room.id]?.[dateString]; // This can be true, false, or undefined

//         const displayInfo = activeStatusDisplay[isActive !== undefined ? isActive : true]; // Default to active if not set
//         const StatusIcon = displayInfo.icon;

//         const isPastDate = date.getTime() < today.getTime();
//         const isToday = date.getTime() === today.getTime();

//         let cellClasses = `p-2 text-center text-xs sm:text-sm flex items-center justify-center border-b border-gray-200 cursor-pointer transition-colors duration-150 relative overflow-hidden`;

//         cellClasses += ` ${displayInfo.colorClass}`;

//         if (isPastDate) {
//           cellClasses += ' opacity-70 cursor-not-allowed'; // Dim past dates
//         } else {
//           cellClasses += ' hover:bg-blue-100 hover:border-blue-300';
//         }

//         if (isToday) {
//           cellClasses += ' ring-2 ring-blue-500 ring-offset-1'; // Highlight today
//         }

//         gridCells.push(
//           <div
//             key={`${room.id}-${dateString}`}
//             className={cellClasses}
//             onClick={!isPastDate ? () => handleCellClick(room.id, date) : undefined}
//             title={`${room.name} on ${date.toLocaleDateString('en-GB')}: ${displayInfo.name}`}
//             role="button"
//             tabIndex={isPastDate ? -1 : 0}
//           >
//             {StatusIcon && <StatusIcon size={18} />}
//             <span className="hidden sm:inline ml-1">{displayInfo.name}</span>
//           </div>
//         );
//       }
//     });

//     // Calculate grid columns dynamically
//     const gridColumns = `grid-cols-${daysInMonth + 1}`; // +1 for the room name column

//     return (
//       <div className={`grid ${gridColumns} auto-rows-min overflow-x-auto`}>
//         {gridCells}
//       </div>
//     );
//   }, [currentMonth, currentYear, filteredRooms, roomDailyActiveStatus, today, handleCellClick]);


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-2 sm:p-3 md:p-6 font-sans text-gray-800">
//       <Toaster position="top-right" reverseOrder={false} />

//       {/* Status Change Modal */}
//       <Modal
//         isOpen={isStatusChangeModalOpen}
//         onClose={closeStatusChangeModal}
//         title="Change Room Status"
//         icon={Check} // Using Check icon for status change
//       >
//         <div className="text-gray-700 mb-6">
//           <p className="text-lg font-semibold mb-2">
//             Room: <span className="text-blue-700">{allRooms.find(r => r.id === selectedRoomId)?.name}</span>
//           </p>
//           <p className="text-lg font-semibold mb-4">
//             Date: <span className="text-blue-700">{selectedDate?.toLocaleDateString('en-GB')}</span>
//           </p>

//           <label htmlFor="active-toggle" className="block text-sm font-medium text-gray-700 mb-2">
//             Set Status:
//           </label>
//           <div className="flex items-center space-x-4">
//             <label className="inline-flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="status"
//                 value="true"
//                 checked={currentIsActive === true}
//                 onChange={() => setCurrentIsActive(true)}
//                 className="form-radio h-5 w-5 text-green-600"
//                 disabled={isLoading}
//               />
//               <span className="ml-2 text-gray-900 font-medium">Active</span>
//             </label>
//             <label className="inline-flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="status"
//                 value="false"
//                 checked={currentIsActive === false}
//                 onChange={() => setCurrentIsActive(false)}
//                 className="form-radio h-5 w-5 text-red-600"
//                 disabled={isLoading}
//               />
//               <span className="ml-2 text-gray-900 font-medium">Inactive</span>
//             </label>
//           </div>
//         </div>
//         <div className="flex justify-end space-x-3 mt-6">
//           <button
//             onClick={closeStatusChangeModal}
//             className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
//             disabled={isLoading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSaveStatusChange}
//             className="flex items-center px-4 py-2 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//             disabled={isLoading}
//           >
//             {isLoading && <Loader2 size={20} className="animate-spin mr-2" />} Save Changes
//           </button>
//         </div>
//       </Modal>

//       <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-3 sm:pb-4 border-b border-gray-300">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-0 flex items-center text-center md:text-left w-full justify-center md:justify-start">
//             <CalendarDays className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-700" />
//             Room Active/Inactive Status
//           </h1>
//         </div>

//         {/* Search Bar for Room Number */}
//         {error && ( // Display error message if there's an API error
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center">
//             <Info size={20} className="mr-2 flex-shrink-0" />
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
//         <div className="relative mb-5 sm:mb-6">
//           <input
//             type="text"
//             placeholder="Search by room number (e.g., Room 101)..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-gray-800 placeholder-gray-400
//                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
//             title="Search for rooms by number"
//           />
//           <div className="absolute left-3 top-1/2 -translate-y-1/2">
//             <Search size={16} className="text-gray-500" />
//           </div>
//         </div>

//         {/* Calendar Navigation */}
//         <div className="flex justify-between items-center mb-6 p-3 bg-blue-50 rounded-lg shadow-inner">
//           <button
//             onClick={goToPreviousMonth}
//             className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-200"
//             aria-label="Previous Month"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <h2 className="text-xl font-bold text-gray-900">
//             {monthNames[currentMonth]} {currentYear}
//           </h2>
//           <button
//             onClick={goToNextMonth}
//             className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-200"
//             aria-label="Next Month"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>

//         {/* Loading Indicator */}
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center py-10 sm:py-16">
//             <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div>
//             <p className="text-base sm:text-xl text-blue-800 font-medium">Loading room statuses...</p>
//           </div>
//         ) : filteredRooms.length === 0 && searchTerm === '' ? (
//           <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
//             <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No rooms found to manage statuses.
//           </div>
//         ) : filteredRooms.length === 0 && searchTerm !== '' ? (
//           <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
//             <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No rooms found matching your search.
//           </div>
//         ) : (
//           <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
//             {renderRoomStatusGrid()}
//           </div>
//         )}

//         {/* Status Legend */}
//         <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
//           <h3 className="text-lg font-bold text-gray-900 mb-3">Status Legend:</h3>
//           <div className="grid grid-cols-2 gap-4">
//             {Object.entries(activeStatusDisplay).map(([key, data]) => {
//               const StatusIcon = data.icon;
//               return (
//                 <div key={key} className={`flex items-center p-2 rounded-md border ${data.colorClass}`}>
//                   <StatusIcon size={18} className="mr-2" />
//                   <span className="font-medium">{data.name}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Basic Tailwind CSS keyframes for animations */}
//       <style>
//         {`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes scaleUpModal {
//           from { transform: scale(0.95); opacity: 0; }
//           to { transform: scale(1); opacity: 1; }
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.2s ease-out forwards;
//         }
//         .animate-scale-up-modal {
//           animation: scaleUpModal 0.3s ease-out forwards;
//         }
//         `}
//       </style>
//     </div>
//   );
// };

// export default RoomStatusPage;
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'; // Import axios

// Lucide React Icons
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays, // Main icon for Room Status Calendar
  Info,
  X,
  Check,
  Loader2,
  AlertTriangle, // For general modals
  CircleCheck, // Icon for 'Active' status
  CircleDotDashed, // Icon for 'Inactive' status
  Search, // Icon for search bar
} from 'lucide-react';

// Map status (boolean) to their corresponding Lucide icons and colors
const activeStatusDisplay = {
  true: { name: 'Available', icon: CircleCheck, colorClass: 'bg-green-100 text-green-700 border-green-300' },
  false: { name: 'Booked', icon: CircleDotDashed, colorClass: 'bg-red-100 text-red-700 border-red-300' },
};

// API Base URL
const API_BASE_URL = "https://havana-backend.vercel.app/api";

// --- Reusable Modal Component (using createPortal) ---
const Modal = ({ isOpen, onClose, title, children, icon: IconComponent }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4 animate-fade-in">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md transform scale-95 animate-scale-up-modal border-t-4 border-blue-500">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          {IconComponent && <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mb-2 sm:mb-3" />}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1.5 mt-1.5 sm:mb-2 sm:mt-2 text-center">{title}</h3>
        </div>
        {children}
      </div>
    </div>,
    document.body // Portals render into the document body
  );
};


// --- Helper Functions for Calendar Logic ---
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay(); // 0 for Sunday, 6 for Saturday
};

const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// --- Main RoomStatusPage Component ---
const RoomStatusPage = () => {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0); // Normalize to start of day
    return d;
  }, []);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [searchTerm, setSearchTerm] = useState(''); // For room number search

  const [allRooms, setAllRooms] = useState([]);
  const [allBookings, setAllBookings] = useState([]); // Raw bookings data

  // Filtered rooms based on search term
  const filteredRooms = useMemo(() => {
    if (!searchTerm) {
      return allRooms;
    }
    return allRooms.filter(room =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }, [allRooms, searchTerm]);

  // Derived dynamic room status data (roomId -> dateString -> isActive: boolean)
  // This will be calculated based on allRooms, allBookings, currentMonth, currentYear
  const [roomDailyActiveStatus, setRoomDailyActiveStatus] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for status change modal
  const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // Date object
  const [currentIsActive, setCurrentIsActive] = useState(true); // Boolean for active/inactive toggle

  // --- Fetch Rooms and Bookings from API and Initialize Statuses ---
  const fetchRoomsBookingsAndInitializeStatuses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch Rooms
      const roomsResponse = await axios.get(`${API_BASE_URL}/rooms`);
      const fetchedRooms = roomsResponse.data.map(room => ({
        id: room._id,
        name: room.roomNumber, // Assuming roomNumber is the display name
      }));
      setAllRooms(fetchedRooms);

      // Fetch Bookings
      const bookingsResponse = await axios.get(`${API_BASE_URL}/bookings`);
      let fetchedBookingsData = [];

      // Robustly handle different API response structures for bookings
      if (Array.isArray(bookingsResponse.data)) {
        fetchedBookingsData = bookingsResponse.data;
      } else if (bookingsResponse.data && Array.isArray(bookingsResponse.data.bookings)) {
        fetchedBookingsData = bookingsResponse.data.bookings;
      } else if (bookingsResponse.data && Array.isArray(bookingsResponse.data.data)) {
        fetchedBookingsData = bookingsResponse.data.data;
      } else {
        console.warn("Unexpected API response structure for bookings:", bookingsResponse.data);
        setError("Received unexpected data format from server for bookings.");
        fetchedBookingsData = [];
      }
      setAllBookings(fetchedBookingsData);

      // --- Determine active/inactive status for each room and day ---
      const newRoomDailyActiveStatus = {};
      const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

      fetchedRooms.forEach(room => {
        newRoomDailyActiveStatus[room.id] = {};
        for (let day = 1; day <= daysInCurrentMonth; day++) {
          const date = new Date(currentYear, currentMonth, day);
          date.setHours(0, 0, 0, 0); // Normalize to start of day for comparison
          const dateString = formatDateToYYYYMMDD(date);

          let isRoomActive = true; // Assume active by default

          // Check if this room is booked on this specific day
          for (const booking of fetchedBookingsData) {
            // Ensure booking.room is an object with an _id, or directly the room ID string
            const bookedRoomId = booking.room?._id || booking.room;

            if (bookedRoomId === room.id) {
              const checkIn = new Date(booking.checkInDate);
              const checkOut = new Date(booking.checkOutDate);
              checkIn.setHours(0, 0, 0, 0); // Normalize
              checkOut.setHours(0, 0, 0, 0); // Normalize

              // A room is inactive if the current day falls within the booking period
              // Note: checkOutDate is typically the *day after* the last night, so use < for checkOut
              if (date.getTime() >= checkIn.getTime() && date.getTime() < checkOut.getTime()) {
                isRoomActive = false;
                break; // Found an overlapping booking, no need to check further for this day
              }
            }
          }
          newRoomDailyActiveStatus[room.id][dateString] = isRoomActive;
        }
      });
      setRoomDailyActiveStatus(newRoomDailyActiveStatus);

    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`);
      } else if (err.request) {
        setError("Network error: No response from server. Check your connection or server status.");
      } else {
        setError("Error setting up request: " + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentMonth, currentYear, today]); // Re-fetch when month/year changes

  useEffect(() => {
    fetchRoomsBookingsAndInitializeStatuses();
  }, [fetchRoomsBookingsAndInitializeStatuses]);

  // --- Calendar Navigation Handlers ---
  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // --- Handle Cell Click to Change Status (Local Simulation) ---
  const handleCellClick = (roomId, date) => {
    // Cannot change status for past dates
    if (date.getTime() < today.getTime()) {
      toast.error("Cannot change status for past dates.");
      return;
    }

    setSelectedRoomId(roomId);
    setSelectedDate(date);
    const dateString = formatDateToYYYYMMDD(date);
    // Get current active status for the selected room and date, default to true (active)
    setCurrentIsActive(roomDailyActiveStatus[roomId]?.[dateString] !== undefined ? roomDailyActiveStatus[roomId][dateString] : true);
    setIsStatusChangeModalOpen(true);
  };

  // --- Save Status Change (Local Simulation) ---
  // IMPORTANT: This part remains a LOCAL SIMULATION as there's no API to toggle room status directly.
  // If you need to *truly* change a room's availability (not tied to a booking), your backend
  // would need an endpoint for this. For now, it's a frontend-only visual change.
  const handleSaveStatusChange = () => {
    if (!selectedRoomId || !selectedDate) {
      toast.error('Invalid status change data.');
      return;
    }

    setIsLoading(true); // Simulate saving
    toast.dismiss(); // Clear any existing toasts
    const dateString = formatDateToYYYYMMDD(selectedDate);
    const roomName = allRooms.find(r => r.id === selectedRoomId)?.name;
    const newStatusName = currentIsActive ? 'Available' : 'Booked';

    setTimeout(() => {
      // Update local state to reflect the change
      setRoomDailyActiveStatus(prev => ({
        ...prev,
        [selectedRoomId]: {
          ...prev[selectedRoomId],
          [dateString]: currentIsActive
        }
      }));
      toast.success(`Status for ${roomName} on ${selectedDate.toLocaleDateString('en-GB')} updated to ${newStatusName}.`);
      closeStatusChangeModal();
      setIsLoading(false);
    }, 500);
  };

  // --- Close Status Change Modal ---
  const closeStatusChangeModal = () => {
    setIsStatusChangeModalOpen(false);
    setSelectedRoomId(null);
    setSelectedDate(null);
    setCurrentIsActive(true); // Reset to default
    setIsLoading(false); // Ensure loading is reset
  };

  // --- Render Calendar Grid ---
  const renderRoomStatusGrid = useCallback(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const gridCells = [];

    // Header row for days of the month
    const dateHeaders = [];
    for (let day = 1; day <= daysInMonth; day++) {
      dateHeaders.push(
        <div key={`day-header-${day}`} className="p-2 text-center font-semibold text-gray-700 border-b border-gray-200 text-xs sm:text-base">
          {day}
        </div>
      );
    }
    // Add an empty cell for the room name column header
    gridCells.push(
      <div key="room-name-header" className="sticky left-0 bg-blue-50 z-10 p-2 text-left font-bold text-blue-700 border-b border-r border-gray-200 text-sm sm:text-lg">
        Room
      </div>
    );
    gridCells.push(...dateHeaders);


    // Room rows
    filteredRooms.forEach(room => {
      // Room name cell (sticky)
      gridCells.push(
        <div key={`room-name-${room.id}`} className="sticky left-0 bg-blue-50 z-10 p-2 text-left font-medium text-gray-900 border-r border-gray-200 text-sm sm:text-base">
          {room.name}
        </div>
      );

      // Status cells for each day
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        date.setHours(0, 0, 0, 0); // Normalize
        const dateString = formatDateToYYYYMMDD(date);
        const isActive = roomDailyActiveStatus[room.id]?.[dateString]; // This can be true, false, or undefined

        const displayInfo = activeStatusDisplay[isActive !== undefined ? isActive : true]; // Default to active if not set
        const StatusIcon = displayInfo.icon;

        const isPastDate = date.getTime() < today.getTime();
        const isToday = date.getTime() === today.getTime();

        let cellClasses = `p-2 text-center text-xs sm:text-sm flex items-center justify-center border-b border-gray-200 cursor-pointer transition-colors duration-150 relative overflow-hidden`;

        cellClasses += ` ${displayInfo.colorClass}`;

        if (isPastDate) {
          cellClasses += ' opacity-70 cursor-not-allowed'; // Dim past dates
        } else {
          cellClasses += ' hover:bg-blue-100 hover:border-blue-300';
        }

        if (isToday) {
          cellClasses += ' ring-2 ring-blue-500 ring-offset-1'; // Highlight today
        }

        gridCells.push(
          <div
            key={`${room.id}-${dateString}`}
            className={cellClasses}
            onClick={!isPastDate ? () => handleCellClick(room.id, date) : undefined}
            title={`${room.name} on ${date.toLocaleDateString('en-GB')}: ${displayInfo.name}`}
            role="button"
            tabIndex={isPastDate ? -1 : 0}
          >
            {StatusIcon && <StatusIcon size={18} />}
            <span className="hidden sm:inline ml-1">{displayInfo.name}</span>
          </div>
        );
      }
    });

    // Calculate grid columns dynamically
    const gridColumns = `grid-cols-${daysInMonth + 1}`; // +1 for the room name column

    return (
      <div className={`grid ${gridColumns} auto-rows-min overflow-x-auto`}>
        {gridCells}
      </div>
    );
  }, [currentMonth, currentYear, filteredRooms, roomDailyActiveStatus, today, handleCellClick]);


  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-8 font-sans bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-2xl rounded-2xl border border-gray-200">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Status Change Modal */}
      <Modal
        isOpen={isStatusChangeModalOpen}
        onClose={closeStatusChangeModal}
        title="Change Room Status"
        icon={Check}
      >
        <div className="text-gray-700 mb-6">
          <p className="text-lg font-semibold mb-2">
            Room: <span className="text-blue-700">{allRooms.find(r => r.id === selectedRoomId)?.name}</span>
          </p>
          <p className="text-lg font-semibold mb-4">
            Date: <span className="text-blue-700">{selectedDate?.toLocaleDateString('en-GB')}</span>
          </p>

          <label htmlFor="active-toggle" className="block text-sm font-medium text-gray-700 mb-2">
            Set Status:
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="status"
                value="true"
                checked={currentIsActive === true}
                onChange={() => setCurrentIsActive(true)}
                className="form-radio h-5 w-5 text-green-600"
                disabled={isLoading}
              />
              <span className="ml-2 text-gray-900 font-medium">Available</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="status"
                value="false"
                checked={currentIsActive === false}
                onChange={() => setCurrentIsActive(false)}
                className="form-radio h-5 w-5 text-red-600"
                disabled={isLoading}
              />
              <span className="ml-2 text-gray-900 font-medium">Booked</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={closeStatusChangeModal}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveStatusChange}
            className="flex items-center px-4 py-2 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            disabled={isLoading}
          >
            {isLoading && <Loader2 size={20} className="animate-spin mr-2" />} Save Changes
          </button>
        </div>
      </Modal>

      <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-3 sm:pb-4 border-b border-gray-300">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-0 flex items-center text-center md:text-left w-full justify-center md:justify-start">
            <CalendarDays className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-700" />
            Room Status Calendar
          </h1>
        </div>

        {/* Search Bar for Room Number */}
        {error && ( // Display error message if there's an API error
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center">
            <Info size={20} className="mr-2 flex-shrink-0" />
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="relative mb-5 sm:mb-6">
          <input
            type="text"
            placeholder="Search by room number (e.g., Room 101)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-gray-800 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
            title="Search for rooms by number"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search size={16} className="text-gray-500" />
          </div>
        </div>

        {/* Calendar Navigation (Styled like your Calendar component) */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-10 pb-3 sm:pb-6 border-b-2 border-amber-300">
          <button
            onClick={goToPreviousMonth}
            className="px-4 py-1.5 sm:px-7 sm:py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-xl shadow-lg hover:from-blue-800 hover:to-blue-950 transition duration-300 ease-in-out text-xs sm:text-lg w-full sm:w-auto mb-3 sm:mb-0 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-70 flex items-center justify-center gap-1.5 sm:gap-2"
            aria-label="Previous Month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 sm:w-5 sm:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Previous
          </button>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-3 sm:mb-0 drop-shadow-sm text-center">
            {`${monthNames[currentMonth]} ${currentYear}`}
          </h2>
          <button
            onClick={goToNextMonth}
            className="px-4 py-1.5 sm:px-7 sm:py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-xl shadow-lg hover:from-blue-800 hover:to-blue-950 transition duration-300 ease-in-out text-xs sm:text-lg w-full sm:w-auto transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-70 flex items-center justify-center gap-1.5 sm:gap-2"
            aria-label="Next Month"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 sm:w-5 sm:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Loading Indicator */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-16">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div>
            <p className="text-base sm:text-xl text-blue-800 font-medium">Loading room statuses...</p>
          </div>
        ) : filteredRooms.length === 0 && searchTerm === '' ? (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
            <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No rooms found to manage statuses.
          </div>
        ) : filteredRooms.length === 0 && searchTerm !== '' ? (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
            <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No rooms found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
            {renderRoomStatusGrid()}
          </div>
        )}

        {/* Status Legend */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Status Legend:</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(activeStatusDisplay).map(([key, data]) => {
              const StatusIcon = data.icon;
              return (
                <div key={key} className={`flex items-center p-2 rounded-md border ${data.colorClass}`}>
                  <StatusIcon size={18} className="mr-2" />
                  <span className="font-medium">{data.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Basic Tailwind CSS keyframes for animations */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUpModal {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scale-up-modal {
          animation: scaleUpModal 0.3s ease-out forwards;
        }
        `}
      </style>
    </div>
  );
};

export default RoomStatusPage;