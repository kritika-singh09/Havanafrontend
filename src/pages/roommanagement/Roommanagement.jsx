
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