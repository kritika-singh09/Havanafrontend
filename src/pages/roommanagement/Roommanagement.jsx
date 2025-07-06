// // // import React from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { Hotel, Tag, CircleDot, LayoutGrid } from 'lucide-react'; // Added LayoutGrid for general room management icon

// // // const RoomManagementPage = () => {
// // //   const navigate = useNavigate();

// // //   return (
// // //     <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 text-gray-900 dark:text-white min-h-[calc(100vh-10rem)] flex flex-col">
// // //       <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-indigo-700 dark:text-indigo-400">
// // //         <LayoutGrid className="h-8 w-8 text-indigo-500" /> Room Management Overview
// // //       </h2>

// // //       <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
// // //         Welcome to the Room Management section. From here, you can manage various aspects of your hotel rooms,
// // //         including categories and statuses.
// // //       </p>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
// // //         {/* Card for Room Categories */}
// // //         <div
// // //           onClick={() => navigate('/room-management/category')}
// // //           className="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-start justify-between text-white"
// // //         >
// // //           <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-full p-3 mb-4">
// // //             <Tag className="h-8 w-8 text-white" />
// // //           </div>
// // //           <h3 className="text-2xl font-bold mb-2">Manage Categories</h3>
// // //           <p className="text-blue-100 dark:text-blue-200 text-base">
// // //             Define and organize different types of rooms (e.g., Standard, Deluxe, Suite).
// // //           </p>
// // //           <button className="mt-4 text-white font-semibold py-2 px-4 rounded-lg border border-white border-opacity-50 hover:bg-white hover:bg-opacity-30 transition-colors duration-200">
// // //             Go to Categories
// // //           </button>
// // //         </div>

// // //         {/* Card for Room Statuses */}
// // //         <div
// // //           onClick={() => navigate('/room-management/status')}
// // //           className="bg-gradient-to-br from-green-500 to-teal-600 dark:from-green-700 dark:to-teal-800 rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-start justify-between text-white"
// // //         >
// // //           <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-full p-3 mb-4">
// // //             <CircleDot className="h-8 w-8 text-white" />
// // //           </div>
// // //           <h3 className="text-2xl font-bold mb-2">Manage Statuses</h3>
// // //           <p className="text-green-100 dark:text-green-200 text-base">
// // //             Update and track the current availability and condition of rooms (e.g., Available, Occupied).
// // //           </p>
// // //           <button className="mt-4 text-white font-semibold py-2 px-4 rounded-lg border border-white border-opacity-50 hover:bg-white hover:bg-opacity-30 transition-colors duration-200">
// // //             Go to Statuses
// // //           </button>
// // //         </div>

// // //         {/* Optional: Add more cards for other room management features */}
// // //         {/*
// // //         <div
// // //           onClick={() => alert('Future Room Details Page')}
// // //           className="bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-700 dark:to-pink-800 rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-start justify-between text-white"
// // //         >
// // //           <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-full p-3 mb-4">
// // //             <Hotel className="h-8 w-8 text-white" />
// // //           </div>
// // //           <h3 className="text-2xl font-bold mb-2">View All Rooms</h3>
// // //           <p className="text-purple-100 dark:text-purple-200 text-base">
// // //             See a detailed list of all individual rooms and their properties.
// // //           </p>
// // //           <button className="mt-4 text-white font-semibold py-2 px-4 rounded-lg border border-white border-opacity-50 hover:bg-white hover:bg-opacity-30 transition-colors duration-200">
// // //             View Rooms
// // //           </button>
// // //         </div>
// // //         */}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RoomManagementPage;
// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   Hotel,
// //   Tag,
// //   CircleDot,
// //   LayoutGrid,
// //   BedSingle,
// //   Settings,
// //   ClipboardList,
// //   CalendarCheck,
// //   DollarSign,
// //   Image as ImageIcon,
// //   Users,
// //   Wrench,
// // } from 'lucide-react';

// // const RoomManagementPage = () => {
// //   const navigate = useNavigate();

// //   const managementOptions = [
// //     {
// //       title: 'Manage Room Types',
// //       description: 'Define and organize different categories of rooms (e.g., Standard, Deluxe, Suite).',
// //       icon: <Tag className="h-8 w-8 text-white" />,
// //       bgColor: 'from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800',
// //       path: '/room-management/category', // Corrected path back to 'category'
// //     },
// //     {
// //       title: 'Manage Room Statuses',
// //       description: 'Update and track the current availability and condition of rooms (e.g., Available, Occupied, Under Maintenance).',
// //       icon: <CircleDot className="h-8 w-8 text-white" />,
// //       bgColor: 'from-green-500 to-teal-600 dark:from-green-700 dark:to-teal-800',
// //       path: '/room-management/status', // Corrected path back to 'status'
// //     },
// //     {
// //       title: 'View & Manage All Rooms',
// //       description: 'Access a detailed list of all individual rooms, their numbers, types, and current status.',
// //       icon: <BedSingle className="h-8 w-8 text-white" />,
// //       bgColor: 'from-purple-500 to-pink-600 dark:from-purple-700 dark:to-pink-800',
// //       path: '/room-management/all-rooms',
// //     },
// //     {
// //       title: 'Manage Room Amenities',
// //       description: 'Define and assign amenities and features to different room types (e.g., Wi-Fi, AC, Mini Bar).',
// //       icon: <ClipboardList className="h-8 w-8 text-white" />,
// //       bgColor: 'from-red-500 to-orange-600 dark:from-red-700 dark:to-orange-800',
// //       path: '/room-management/amenities',
// //     },
// //     {
// //       title: 'Manage Pricing & Rates',
// //       description: 'Set and adjust pricing for different room types, seasons, and special events.',
// //       icon: <DollarSign className="h-8 w-8 text-white" />,
// //       bgColor: 'from-yellow-500 to-amber-600 dark:from-yellow-700 dark:to-amber-800',
// //       path: '/room-management/pricing',
// //     },
// //     {
// //       title: 'Manage Room Gallery',
// //       description: 'Upload and organize images for each room type and individual rooms.',
// //       icon: <ImageIcon className="h-8 w-8 text-white" />,
// //       bgColor: 'from-lime-500 to-green-600 dark:from-lime-700 dark:to-green-800',
// //       path: '/room-management/gallery',
// //     },
// //     {
// //       title: 'Room Occupancy & Capacity',
// //       description: 'Define and view the maximum occupancy for each room and track current guest numbers.',
// //       icon: <Users className="h-8 w-8 text-white" />,
// //       bgColor: 'from-cyan-500 to-blue-600 dark:from-cyan-700 dark:to-blue-800',
// //       path: '/room-management/occupancy',
// //     },
// //     {
// //       title: 'Maintenance & Housekeeping',
// //       description: 'Schedule and track room maintenance, cleaning, and repair tasks.',
// //       icon: <Wrench className="h-8 w-8 text-white" />,
// //       bgColor: 'from-gray-500 to-slate-600 dark:from-gray-700 dark:to-slate-800',
// //       path: '/room-management/maintenance',
// //     },
// //     {
// //       title: 'Room Settings & Configurations',
// //       description: 'Configure general settings related to room management, such as room numbering formats.',
// //       icon: <Settings className="h-8 w-8 text-white" />,
// //       bgColor: 'from-teal-500 to-emerald-600 dark:from-teal-700 dark:to-emerald-800',
// //       path: '/room-management/settings',
// //     },
// //   ];

// //   return (
// //     <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 text-gray-900 dark:text-white min-h-[calc(100vh-10rem)] flex flex-col">
// //       <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-indigo-700 dark:text-indigo-400">
// //         <LayoutGrid className="h-8 w-8 text-indigo-500" /> Room Management Dashboard
// //       </h2>

// //       <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
// //         Welcome to the central hub for managing all aspects of your hotel's rooms. Select an option below to get started.
// //       </p>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-grow">
// //         {managementOptions.map((option, index) => (
// //           <div
// //             key={index}
// //             onClick={() => navigate(option.path)}
// //             className={`bg-gradient-to-br ${option.bgColor} rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-start justify-between text-white`}
// //           >
// //             <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-full p-3 mb-4">
// //               {option.icon}
// //             </div>
// //             <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
// //             <p className="text-white text-opacity-80 text-base">
// //               {option.description}
// //             </p>
// //             <button className="mt-4 text-white font-semibold py-2 px-4 rounded-lg border border-white border-opacity-50 hover:bg-white hover:bg-opacity-30 transition-colors duration-200">
// //               Go to {option.title.replace('Manage ', '')}
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default RoomManagementPage;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Bed,
//   DoorOpen,
//   DollarSign,
//   Info,
//   X,
//   Check,
//   Loader2,
//   Image,
//   TextSelect,
//   Tag,
//   Maximize,
//   ToggleLeft,
//   CalendarDays,
//   Clock,
// } from 'lucide-react';
// import { createPortal } from 'react-dom';

// // --- Important: Configure your backend URL here ---
// const backendURL = 'https://havana-backend.vercel.app';

// const RoomManagementPage = () => {
//   // --- State Management ---
//   const [rooms, setRooms] = useState([]);
//   const [categories, setCategories] = useState([]); // To populate category dropdown
//   const [newRoomData, setNewRoomData] = useState({
//     title: '',
//     room_number: '',
//     category: '', // Stores category _id
//     price: '',
//     description: '',
//     extra_bed: false,
//     is_oos: false, // Is Out Of Service
//     status: true, // true for available, false for not available (general status)
//     photos: [''], // Array of photo URLs, start with one empty input
//   });
//   const [editingRoom, setEditingRoom] = useState(null);

//   // UI state for loading indicators
//   const [isLoadingRooms, setIsLoadingRooms] = useState(true);
//   const [isLoadingCategories, setIsLoadingCategories] = useState(true);
//   const [isFormSubmitting, setIsFormSubmitting] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // UI state for messages
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   // UI state for modal visibility
//   const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
//   const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
//   const [roomToDelete, setRoomToDelete] = useState(null);

//   // --- Utility Functions for UI Feedback ---
//   const showSuccess = (message) => {
//     setSuccessMessage(message);
//     const timer = setTimeout(() => setSuccessMessage(null), 3000);
//     return () => clearTimeout(timer);
//   };

//   const showError = (message) => {
//     setError(message);
//     const timer = setTimeout(() => setError(null), 5000);
//     return () => clearTimeout(timer);
//   };

//   // --- Fetch Rooms from API ---
//   const fetchRooms = async () => {
//     setIsLoadingRooms(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${backendURL}/api/rooms`);
//       // Map _id to id for React keys and internal use if needed
//       const formattedRooms = response.data.rooms.map(room => ({
//         ...room,
//         id: room._id, // Add id property
//       }));
//       setRooms(formattedRooms);
//     } catch (err) {
//       console.error('Failed to fetch rooms:', err);
//       showError('Failed to fetch rooms. Please ensure the backend is running and accessible.');
//       setRooms([]);
//     } finally {
//       setIsLoadingRooms(false);
//     }
//   };

//   // --- Fetch Categories for dropdown from API ---
//   const fetchCategories = async () => {
//     setIsLoadingCategories(true);
//     try {
//       const response = await axios.get(`${backendURL}/api/room-categories`);
//       // Map backend 'category' field to 'name' for display in frontend
//       const formattedCategories = response.data.categories.map(cat => ({
//         id: cat._id,
//         name: cat.category,
//       }));
//       setCategories(formattedCategories);
//     } catch (err) {
//       console.error('Failed to fetch categories:', err);
//       showError('Failed to load categories for room assignment.');
//       setCategories([]);
//     } finally {
//       setIsLoadingCategories(false);
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchRooms();
//     fetchCategories();
//   }, []);

//   // --- Handle Form Input Change ---
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewRoomData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   // Handle changes to individual photo URL inputs
//   const handlePhotoUrlChange = (index, e) => {
//     const newPhotos = [...newRoomData.photos];
//     newPhotos[index] = e.target.value;
//     setNewRoomData((prevData) => ({
//       ...prevData,
//       photos: newPhotos,
//     }));
//   };

//   // Add a new photo URL input field
//   const addPhotoInput = () => {
//     setNewRoomData((prevData) => ({
//       ...prevData,
//       photos: [...prevData.photos, ''],
//     }));
//   };

//   // Remove a photo URL input field
//   const removePhotoInput = (index) => {
//     setNewRoomData((prevData) => ({
//       ...prevData,
//       photos: prevData.photos.filter((_, i) => i !== index),
//     }));
//   };


//   // --- Handle Save (Add/Edit) Room to API ---
//   const handleSaveRoom = async (e) => {
//     e.preventDefault();
//     setError(null);

//     // Client-side validation
//     if (!newRoomData.title.trim() || !newRoomData.room_number.trim() || !newRoomData.category.trim() || !newRoomData.price) {
//       showError('Please fill in all required fields (Title, Room Number, Category, Price).');
//       return;
//     }
//     if (isNaN(parseFloat(newRoomData.price)) || parseFloat(newRoomData.price) <= 0) {
//       showError('Price must be a positive number.');
//       return;
//     }
//     // Filter out empty photo URLs before sending
//     const validPhotos = newRoomData.photos.filter(url => url.trim() !== '');

//     setIsFormSubmitting(true);
//     try {
//       const roomPayload = {
//         title: newRoomData.title.trim(),
//         room_number: newRoomData.room_number.trim(),
//         category: newRoomData.category, // This should be the category _id
//         price: parseFloat(newRoomData.price),
//         description: newRoomData.description.trim(),
//         extra_bed: newRoomData.extra_bed,
//         is_oos: newRoomData.is_oos,
//         status: newRoomData.status,
//         photos: validPhotos,
//       };

//       if (editingRoom) {
//         // Update existing room
//         await axios.put(`${backendURL}/api/rooms/${editingRoom.id}`, roomPayload);
//         showSuccess('Room updated successfully!');
//       } else {
//         // Add new room
//         await axios.post(`${backendURL}/api/rooms`, roomPayload);
//         showSuccess('Room added successfully!');
//       }

//       closeAddEditModal();
//       fetchRooms(); // Re-fetch rooms to update the list
//     } catch (err) {
//       console.error('Failed to save room:', err);
//       if (err.response) {
//         showError(`Failed to save room: ${err.response.data.message || err.response.statusText}`);
//       } else {
//         showError('An unknown error occurred while saving the room.');
//       }
//     } finally {
//       setIsFormSubmitting(false);
//     }
//   };

//   // --- Handle Edit Button Click ---
//   const handleEditClick = (room) => {
//     setEditingRoom(room);
//     setNewRoomData({
//       title: room.title || '',
//       room_number: room.room_number || '',
//       category: room.category || '', // This is the _id from the backend
//       price: room.price !== null ? String(room.price) : '',
//       description: room.description || '',
//       extra_bed: room.extra_bed || false,
//       is_oos: room.is_oos || false,
//       status: room.status, // Boolean
//       photos: room.photos && room.photos.length > 0 ? room.photos : [''], // Ensure at least one input field
//     });
//     setIsAddEditModalOpen(true);
//     setError(null);
//   };

//   // --- Handle Delete Button Click ---
//   const handleDeleteClick = (room) => {
//     setRoomToDelete(room);
//     setIsDeleteConfirmModalOpen(true);
//     setError(null);
//   };

//   // --- Confirm Delete Room with API ---
//   const confirmDeleteRoom = async () => {
//     if (!roomToDelete) return;
//     setIsDeleting(true);
//     setError(null);
//     try {
//       await axios.delete(`${backendURL}/api/rooms/${roomToDelete.id}`);
//       showSuccess(`Room "${roomToDelete.title} - ${roomToDelete.room_number}" deleted successfully!`);
//       closeDeleteConfirmModal();
//       fetchRooms(); // Re-fetch rooms to update the list
//     } catch (err) {
//       console.error('Failed to delete room:', err);
//       showError('Failed to delete room. Please try again.');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // --- Modal Close Handlers ---
//   const closeAddEditModal = () => {
//     setIsAddEditModalOpen(false);
//     setNewRoomData({
//       title: '',
//       room_number: '',
//       category: '',
//       price: '',
//       description: '',
//       extra_bed: false,
//       is_oos: false,
//       status: true,
//       photos: [''],
//     });
//     setEditingRoom(null);
//     setError(null);
//     setIsFormSubmitting(false);
//   };

//   const closeDeleteConfirmModal = () => {
//     setIsDeleteConfirmModalOpen(false);
//     setRoomToDelete(null);
//     setError(null);
//     setIsDeleting(false);
//   };

//   // --- Reusable Modal Component (using createPortal) ---
//   const Modal = ({ isOpen, onClose, title, children }) => {
//     if (!isOpen) return null;

//     return createPortal(
//       <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-auto p-6 relative transform transition-all duration-300 scale-100 opacity-100 animate-slide-up my-8">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//             aria-label="Close modal"
//           >
//             <X size={24} />
//           </button>
//           <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
//           {children}
//         </div>
//       </div>,
//       document.body
//     );
//   };

//   // Helper to find category name by ID
//   const getCategoryNameById = (categoryId) => {
//     const category = categories.find(cat => cat.id === categoryId);
//     return category ? category.name : 'Unknown Category';
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-3 sm:p-8 font-sans bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-2xl rounded-2xl border border-gray-200 min-h-[calc(100vh-5rem)] flex flex-col">
//       <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-700 dark:text-indigo-400">
//         <Bed className="h-8 w-8 text-indigo-500" /> Room Management
//       </h2>

//       <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
//         Manage individual rooms, their details, status, and associated categories.
//       </p>

//       {/* Global Success/Error Messages */}
//       {successMessage && (
//         <div className="bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100 px-4 py-3 rounded-lg flex items-center mb-4 transition-opacity duration-300 opacity-100 shadow-md border border-green-300">
//           <Check size={20} className="mr-2 flex-shrink-0" /> {successMessage}
//         </div>
//       )}
//       {error && (
//         <div className="bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 px-4 py-3 rounded-lg flex items-center mb-4 transition-opacity duration-300 opacity-100 shadow-md border border-red-300">
//           <Info size={20} className="mr-2 flex-shrink-0" /> {error}
//         </div>
//       )}

//       {/* Add New Room Button */}
//       <div className="mb-6 flex justify-end">
//         <button
//           onClick={() => {
//             setEditingRoom(null);
//             setNewRoomData({
//               title: '',
//               room_number: '',
//               category: '',
//               price: '',
//               description: '',
//               extra_bed: false,
//               is_oos: false,
//               status: true,
//               photos: [''],
//             });
//             setIsAddEditModalOpen(true);
//             setError(null);
//           }}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
//           aria-label="Add New Room"
//         >
//           <Plus size={24} /> Add New Room
//         </button>
//       </div>

//       {/* Loading, Empty, or Rooms Table */}
//       {isLoadingRooms || isLoadingCategories ? (
//         <div className="flex justify-center items-center py-10 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
//           <Loader2 className="animate-spin h-10 w-10 text-indigo-500" />
//           <span className="ml-3 text-lg text-gray-700 dark:text-gray-300">Loading rooms and categories...</span>
//         </div>
//       ) : rooms.length === 0 ? (
//         <div className="text-center text-gray-500 py-10 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
//           <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No rooms found. Click "Add New Room" to get started.
//         </div>
//       ) : (
//         <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-200 dark:bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Room Number</th>
//                 <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Title</th>
//                 <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 hidden md:table-cell">Category</th>
//                 <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 hidden lg:table-cell">Price</th>
//                 <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 hidden sm:table-cell">Status</th>
//                 <th className="px-6 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//               {rooms.map((room, index) => (
//                 <tr
//                   key={room.id}
//                   className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150`}
//                 >
//                   <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{room.room_number}</td>
//                   <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{room.title}</td>
//                   <td className="px-6 py-4 text-gray-700 dark:text-gray-300 hidden md:table-cell text-sm">
//                     {getCategoryNameById(room.category)}
//                   </td>
//                   <td className="px-6 py-4 text-gray-700 dark:text-gray-300 hidden lg:table-cell text-sm">
//                     <span className="font-semibold text-green-700 dark:text-green-300">
//                       ${room.price.toFixed(2)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 hidden sm:table-cell">
//                     <span className={`px-2 py-1 rounded-full text-xs font-semibold
//                       ${room.status && !room.is_oos ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' :
//                         room.is_oos ? 'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100' :
//                         'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'}`}>
//                       {room.is_oos ? 'Out of Service' : (room.status ? 'Available' : 'Unavailable')}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
//                     <button
//                       onClick={() => handleEditClick(room)}
//                       className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
//                       title={`Edit ${room.title}`}
//                       aria-label={`Edit ${room.title}`}
//                     >
//                       <Edit size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteClick(room)}
//                       className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
//                       title={`Delete ${room.title}`}
//                       aria-label={`Delete ${room.title}`}
//                     >
//                       <Trash2 size={20} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Add/Edit Room Modal */}
//       <Modal
//         isOpen={isAddEditModalOpen}
//         onClose={closeAddEditModal}
//         title={editingRoom ? 'Edit Room' : 'Add New Room'}
//       >
//         <form onSubmit={handleSaveRoom} className="space-y-4">
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 dark:bg-red-900 dark:border-red-700 dark:text-red-300">
//               <strong className="font-bold">Validation Error!</strong>
//               <span className="block sm:inline ml-2">{error}</span>
//             </div>
//           )}

//           {/* Title */}
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
//               Room Title <span className="text-red-500">*</span>
//             </label>
//             <div className="relative rounded-md shadow-sm">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <Bed className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </div>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={newRoomData.title}
//                 onChange={handleInputChange}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
//                 required
//                 placeholder="e.g., Deluxe King"
//               />
//             </div>
//           </div>

//           {/* Room Number */}
//           <div>
//             <label htmlFor="room_number" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
//               Room Number <span className="text-red-500">*</span>
//             </label>
//             <div className="relative rounded-md shadow-sm">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <DoorOpen className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </div>
//               <input
//                 type="text"
//                 id="room_number"
//                 name="room_number"
//                 value={newRoomData.room_number}
//                 onChange={handleInputChange}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
//                 required
//                 placeholder="e.g., 101"
//               />
//             </div>
//           </div>

//           {/* Category */}
//           <div>
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
//               Category <span className="text-red-500">*</span>
//             </label>
//             <div className="relative rounded-md shadow-sm">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </div>
//               <select
//                 id="category"
//                 name="category"
//                 value={newRoomData.category}
//                 onChange={handleInputChange}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
//                 required
//                 disabled={isLoadingCategories}
//               >
//                 <option value="">{isLoadingCategories ? 'Loading categories...' : 'Select a category'}</option>
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Price */}
//           <div>
//             <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
//               Price (per night) <span className="text-red-500">*</span>
//             </label>
//             <div className="relative rounded-md shadow-sm">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </div>
//               <input
//                 type="number"
//                 id="price"
//                 name="price"
//                 value={newRoomData.price}
//                 onChange={handleInputChange}
//                 step="0.01"
//                 min="0"
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
//                 required
//                 placeholder="0.00"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
//               Description
//             </label>
//             <div className="relative rounded-md shadow-sm">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <TextSelect className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </div>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={newRoomData.description}
//                 onChange={handleInputChange}
//                 rows="3"
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
//                 placeholder="Brief description of the room..."
//               ></textarea>
//             </div>
//           </div>

//           {/* Checkboxes */}
//           <div className="flex items-center space-x-6">
//             <div className="flex items-center">
//               <input
//                 id="extra_bed"
//                 name="extra_bed"
//                 type="checkbox"
//                 checked={newRoomData.extra_bed}
//                 onChange={handleInputChange}
//                 className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
//               />
//               <label htmlFor="extra_bed" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
//                 Extra Bed
//               </label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 id="is_oos"
//                 name="is_oos"
//                 type="checkbox"
//                 checked={newRoomData.is_oos}
//                 onChange={handleInputChange}
//                 className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
//               />
//               <label htmlFor="is_oos" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
//                 Out of Service
//               </label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 id="status"
//                 name="status"
//                 type="checkbox"
//                 checked={newRoomData.status}
//                 onChange={handleInputChange}
//                 className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
//               />
//               <label htmlFor="status" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
//                 Active (Available)
//               </label>
//             </div>
//           </div>

//           {/* Photos */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
//               Photos (URLs)
//             </label>
//             {newRoomData.photos.map((photoUrl, index) => (
//               <div key={index} className="flex items-center mt-2">
//                 <div className="relative flex-grow rounded-md shadow-sm">
//                   <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                     <Image className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                   </div>
//                   <input
//                     type="url"
//                     value={photoUrl}
//                     onChange={(e) => handlePhotoUrlChange(index, e)}
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
//                     placeholder="https://example.com/room-photo.jpg"
//                   />
//                 </div>
//                 {newRoomData.photos.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removePhotoInput(index)}
//                     className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     <X size={20} />
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addPhotoInput}
//               className="mt-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm flex items-center gap-1"
//             >
//               <Plus size={16} /> Add Another Photo URL
//             </button>
//           </div>

//           <div className="flex justify-end space-x-3 mt-6">
//             <button
//               type="button"
//               onClick={closeAddEditModal}
//               className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//               disabled={isFormSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//               disabled={isFormSubmitting}
//             >
//               {isFormSubmitting && <Loader2 size={20} className="animate-spin" />}
//               {editingRoom ? 'Update Room' : 'Add Room'}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         isOpen={isDeleteConfirmModalOpen}
//         onClose={closeDeleteConfirmModal}
//         title="Confirm Deletion"
//       >
//         <div className="text-gray-700 dark:text-gray-300 mb-6 text-center">
//           <p className="text-lg mb-3">
//             Are you sure you want to delete room{' '}
//             <strong className="font-semibold text-red-600 dark:text-red-400">"{roomToDelete?.title} - {roomToDelete?.room_number}"</strong>?
//           </p>
//           <p className="text-sm">
//             This action cannot be undone.
//           </p>
//         </div>
//         <div className="flex justify-center space-x-3 mt-6">
//           <button
//             type="button"
//             onClick={closeDeleteConfirmModal}
//             className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//             disabled={isDeleting}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={confirmDeleteRoom}
//             className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//             disabled={isDeleting}
//           >
//             {isDeleting && <Loader2 size={20} className="animate-spin" />}
//             Delete
//           </button>
//         </div>
//       </Modal>

//       {/* Basic Tailwind CSS keyframes for animations (place in your main CSS file if preferred) */}
//       <style>
//         {`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { transform: translateY(20px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.2s ease-out forwards;
//         }
//         .animate-slide-up {
//           animation: slideUp 0.3s ease-out forwards;
//         }
//         `}
//       </style>
//     </div>
//   );
// };

// export default RoomManagementPage;


import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Removed: No longer using axios
import {
  Plus,
  Edit,
  Trash2,
  Bed,
  DoorOpen,
  DollarSign,
  Info,
  X,
  Check,
  Loader2,
  Image,
  TextSelect,
  Tag,
} from 'lucide-react';
import { createPortal } from 'react-dom';

// --- Important: No backend URL needed as API is removed ---
// const backendURL = 'https://havana-backend.vercel.app'; // Removed

const RoomManagementPage = () => {
  // --- State Management ---
  const [rooms, setRooms] = useState([]); // Room data will be managed locally
  const [categories, setCategories] = useState([ // Dummy categories for local use
    { id: 'cat1', name: 'Standard' },
    { id: 'cat2', name: 'Deluxe' },
    { id: 'cat3', name: 'Suite' },
  ]);
  const [newRoomData, setNewRoomData] = useState({
    title: '',
    room_number: '',
    category: '', // Stores category _id
    price: '',
    description: '',
    extra_bed: false,
    is_oos: false, // Is Out Of Service
    status: true, // true for available, false for not available (general status)
    photos: [''], // Array of photo URLs, start with one empty input
  });
  const [editingRoom, setEditingRoom] = useState(null);

  // UI state for loading indicators (mostly for simulation now)
  const [isLoadingRooms, setIsLoadingRooms] = useState(false); // Changed to false, no API calls
  const [isLoadingCategories, setIsLoadingCategories] = useState(false); // Changed to false, no API calls
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // UI state for messages
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // UI state for modal visibility
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  // --- Utility Functions for UI Feedback ---
  const showSuccess = (message) => {
    setSuccessMessage(message);
    const timer = setTimeout(() => setSuccessMessage(null), 3000);
    return () => clearTimeout(timer);
  };

  const showError = (message) => {
    setError(message);
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  };

  // --- Simulate Fetching Data (no API) ---
  useEffect(() => {
    // In a real scenario without an API, you might load initial data from localStorage
    // or just start with an empty array.
    // For demonstration, we can add some dummy data
    setRooms([
      {
        id: 'room1',
        title: 'Cozy Single',
        room_number: '101',
        category: 'cat1',
        price: 75.00,
        description: 'A comfortable single room.',
        extra_bed: false,
        is_oos: false,
        status: true,
        photos: ['https://via.placeholder.com/150/0000FF/808080?text=Room+101'],
      },
      {
        id: 'room2',
        title: 'Double Deluxe',
        room_number: '205',
        category: 'cat2',
        price: 120.00,
        description: 'Spacious room with a double bed.',
        extra_bed: true,
        is_oos: false,
        status: true,
        photos: ['https://via.placeholder.com/150/FF0000/FFFFFF?text=Room+205'],
      },
      {
        id: 'room3',
        title: 'Executive Suite',
        room_number: '301',
        category: 'cat3',
        price: 250.00,
        description: 'Luxurious suite with city views.',
        extra_bed: false,
        is_oos: true, // Out of Service
        status: false,
        photos: ['https://via.placeholder.com/150/00FF00/000000?text=Room+301'],
      },
    ]);
    // Categories are already hardcoded
  }, []);

  // --- Handle Form Input Change ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoomData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle changes to individual photo URL inputs
  const handlePhotoUrlChange = (index, e) => {
    const newPhotos = [...newRoomData.photos];
    newPhotos[index] = e.target.value;
    setNewRoomData((prevData) => ({
      ...prevData,
      photos: newPhotos,
    }));
  };

  // Add a new photo URL input field
  const addPhotoInput = () => {
    setNewRoomData((prevData) => ({
      ...prevData,
      photos: [...prevData.photos, ''],
    }));
  };

  // Remove a photo URL input field
  const removePhotoInput = (index) => {
    setNewRoomData((prevData) => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index),
    }));
  };


  // --- Handle Save (Add/Edit) Room to Local State ---
  const handleSaveRoom = async (e) => {
    e.preventDefault();
    setError(null);
    setIsFormSubmitting(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async operation

    // Client-side validation
    if (!newRoomData.title.trim() || !newRoomData.room_number.trim() || !newRoomData.category.trim() || !newRoomData.price) {
      showError('Please fill in all required fields (Title, Room Number, Category, Price).');
      setIsFormSubmitting(false);
      return;
    }
    if (isNaN(parseFloat(newRoomData.price)) || parseFloat(newRoomData.price) <= 0) {
      showError('Price must be a positive number.');
      setIsFormSubmitting(false);
      return;
    }
    // Filter out empty photo URLs before sending
    const validPhotos = newRoomData.photos.filter(url => url.trim() !== '');

    try {
      const roomPayload = {
        title: newRoomData.title.trim(),
        room_number: newRoomData.room_number.trim(),
        category: newRoomData.category,
        price: parseFloat(newRoomData.price),
        description: newRoomData.description.trim(),
        extra_bed: newRoomData.extra_bed,
        is_oos: newRoomData.is_oos,
        status: newRoomData.status,
        photos: validPhotos,
      };

      if (editingRoom) {
        // Update existing room in local state
        setRooms(prevRooms => prevRooms.map(room =>
          room.id === editingRoom.id ? { ...roomPayload, id: room.id } : room
        ));
        showSuccess('Room updated successfully!');
      } else {
        // Add new room to local state
        const newId = `room${Date.now()}`; // Generate a unique ID
        setRooms(prevRooms => [...prevRooms, { ...roomPayload, id: newId }]);
        showSuccess('Room added successfully!');
      }

      closeAddEditModal();
    } catch (err) {
      // This catch block is mostly for client-side errors now, as there's no network
      console.error('Failed to save room:', err);
      showError('An error occurred while saving the room.');
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // --- Handle Edit Button Click ---
  const handleEditClick = (room) => {
    setEditingRoom(room);
    setNewRoomData({
      title: room.title || '',
      room_number: room.room_number || '',
      category: room.category || '',
      price: room.price !== null ? String(room.price) : '',
      description: room.description || '',
      extra_bed: room.extra_bed || false,
      is_oos: room.is_oos || false,
      status: room.status,
      photos: room.photos && room.photos.length > 0 ? room.photos : [''],
    });
    setIsAddEditModalOpen(true);
    setError(null);
  };

  // --- Handle Delete Button Click ---
  const handleDeleteClick = (room) => {
    setRoomToDelete(room);
    setIsDeleteConfirmModalOpen(true);
    setError(null);
  };

  // --- Confirm Delete Room from Local State ---
  const confirmDeleteRoom = async () => {
    if (!roomToDelete) return;
    setIsDeleting(true);
    setError(null);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async operation

    try {
      setRooms(prevRooms => prevRooms.filter(room => room.id !== roomToDelete.id));
      showSuccess(`Room "${roomToDelete.title} - ${roomToDelete.room_number}" deleted successfully!`);
      closeDeleteConfirmModal();
    } catch (err) {
      console.error('Failed to delete room:', err);
      showError('An error occurred while deleting the room.');
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Modal Close Handlers ---
  const closeAddEditModal = () => {
    setIsAddEditModalOpen(false);
    setNewRoomData({
      title: '',
      room_number: '',
      category: '',
      price: '',
      description: '',
      extra_bed: false,
      is_oos: false,
      status: true,
      photos: [''],
    });
    setEditingRoom(null);
    setError(null);
    setIsFormSubmitting(false);
  };

  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setRoomToDelete(null);
    setError(null);
    setIsDeleting(false);
  };

  // --- Reusable Modal Component (using createPortal) ---
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return createPortal(
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-auto p-6 relative transform transition-all duration-300 scale-100 opacity-100 animate-slide-up my-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
          {children}
        </div>
      </div>,
      document.body
    );
  };

  // Helper to find category name by ID
  const getCategoryNameById = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-8 font-sans bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-2xl rounded-2xl border border-gray-200 min-h-[calc(100vh-5rem)] flex flex-col">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-700 dark:text-indigo-400">
        <Bed className="h-8 w-8 text-indigo-500" /> Room Management
      </h2>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Manage individual rooms, their details, status, and associated categories (local data simulation).
      </p>

      {/* Global Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100 px-4 py-3 rounded-lg flex items-center mb-4 transition-opacity duration-300 opacity-100 shadow-md border border-green-300">
          <Check size={20} className="mr-2 flex-shrink-0" /> {successMessage}
        </div>
      )}
      {error && (
        <div className="bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 px-4 py-3 rounded-lg flex items-center mb-4 transition-opacity duration-300 opacity-100 shadow-md border border-red-300">
          <Info size={20} className="mr-2 flex-shrink-0" /> {error}
        </div>
      )}

      {/* Add New Room Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => {
            setEditingRoom(null);
            setNewRoomData({
              title: '',
              room_number: '',
              category: '',
              price: '',
              description: '',
              extra_bed: false,
              is_oos: false,
              status: true,
              photos: [''],
            });
            setIsAddEditModalOpen(true);
            setError(null);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
          aria-label="Add New Room"
        >
          <Plus size={24} /> Add New Room
        </button>
      </div>

      {/* Loading, Empty, or Rooms Table */}
      {isLoadingRooms || isLoadingCategories ? ( // These will always be false now
        <div className="flex justify-center items-center py-10 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
          <Loader2 className="animate-spin h-10 w-10 text-indigo-500" />
          <span className="ml-3 text-lg text-gray-700 dark:text-gray-300">Loading rooms and categories...</span>
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center text-gray-500 py-10 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
          <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No rooms found. Click "Add New Room" to get started.
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Room Number</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Title</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 hidden md:table-cell">Category</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 hidden lg:table-cell">Price</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 hidden sm:table-cell">Status</th>
                <th className="px-6 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {rooms.map((room, index) => (
                <tr
                  key={room.id}
                  className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{room.room_number}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{room.title}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 hidden md:table-cell text-sm">
                    {getCategoryNameById(room.category)}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 hidden lg:table-cell text-sm">
                    <span className="font-semibold text-green-700 dark:text-green-300">
                      ${room.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${room.status && !room.is_oos ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' :
                        room.is_oos ? 'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100' :
                        'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'}`}>
                      {room.is_oos ? 'Out of Service' : (room.status ? 'Available' : 'Unavailable')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(room)}
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                      title={`Edit ${room.title}`}
                      aria-label={`Edit ${room.title}`}
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(room)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                      title={`Delete ${room.title}`}
                      aria-label={`Delete ${room.title}`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Room Modal */}
      <Modal
        isOpen={isAddEditModalOpen}
        onClose={closeAddEditModal}
        title={editingRoom ? 'Edit Room' : 'Add New Room'}
      >
        <form onSubmit={handleSaveRoom} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 dark:bg-red-900 dark:border-red-700 dark:text-red-300">
              <strong className="font-bold">Validation Error!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Room Title <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Bed className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={newRoomData.title}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                required
                placeholder="e.g., Deluxe King"
              />
            </div>
          </div>

          {/* Room Number */}
          <div>
            <label htmlFor="room_number" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Room Number <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <DoorOpen className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="room_number"
                name="room_number"
                value={newRoomData.room_number}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                required
                placeholder="e.g., 101"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <select
                id="category"
                name="category"
                value={newRoomData.category}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                required
                disabled={isLoadingCategories}
              >
                <option value="">{isLoadingCategories ? 'Loading categories...' : 'Select a category'}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Price (per night) <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={newRoomData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                required
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Description
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <TextSelect className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <textarea
                id="description"
                name="description"
                value={newRoomData.description}
                onChange={handleInputChange}
                rows="3"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Brief description of the room..."
              ></textarea>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                id="extra_bed"
                name="extra_bed"
                type="checkbox"
                checked={newRoomData.extra_bed}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="extra_bed" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                Extra Bed
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="is_oos"
                name="is_oos"
                type="checkbox"
                checked={newRoomData.is_oos}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="is_oos" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                Out of Service
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="status"
                name="status"
                type="checkbox"
                checked={newRoomData.status}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="status" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                Active (Available)
              </label>
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Photos (URLs)
            </label>
            {newRoomData.photos.map((photoUrl, index) => (
              <div key={index} className="flex items-center mt-2">
                <div className="relative flex-grow rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Image className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => handlePhotoUrlChange(index, e)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://example.com/room-photo.jpg"
                  />
                </div>
                {newRoomData.photos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhotoInput(index)}
                    className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPhotoInput}
              className="mt-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm flex items-center gap-1"
            >
              <Plus size={16} /> Add Another Photo URL
            </button>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={closeAddEditModal}
              className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              disabled={isFormSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              disabled={isFormSubmitting}
            >
              {isFormSubmitting && <Loader2 size={20} className="animate-spin" />}
              {editingRoom ? 'Update Room' : 'Add Room'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={closeDeleteConfirmModal}
        title="Confirm Deletion"
      >
        <div className="text-gray-700 dark:text-gray-300 mb-6 text-center">
          <p className="text-lg mb-3">
            Are you sure you want to delete room{' '}
            <strong className="font-semibold text-red-600 dark:text-red-400">"{roomToDelete?.title} - {roomToDelete?.room_number}"</strong>?
          </p>
          <p className="text-sm">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-center space-x-3 mt-6">
          <button
            type="button"
            onClick={closeDeleteConfirmModal}
            className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDeleteRoom}
            className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 size={20} className="animate-spin" />}
            Delete
          </button>
        </div>
      </Modal>

      {/* Basic Tailwind CSS keyframes for animations (place in your main CSS file if preferred) */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
        `}
      </style>
    </div>
  );
};

export default RoomManagementPage;