
// // import React, { useEffect, useState } from 'react';
// // import {
// //   Plus,
// //   Edit,
// //   Trash2,
// //   Tag,
// //   X,
// //   Check,
// //   Loader2,
// //   Info,
// //   BadgeInfo, // New icon for description
// //   DollarSign, // New icon for price
// //   Users, // New icon for capacity
// // } from 'lucide-react';
// // import { createPortal } from 'react-dom';

// // // --- Important Note: No API Calls Yet ---
// // // This component operates entirely on local React state.
// // // 'axios' and 'backendURL' are commented out.
// // // All data fetching, adding, editing, and deleting are simulated
// // // with 'setTimeout' to mimic network delays, providing a realistic
// // // user experience for UI/UX review before actual API integration.

// // const RoomCategoryPage = () => {
// //   // --- State Management ---
// //   const [categories, setCategories] = useState([]); // Stores our simulated categories
// //   const [newCategoryData, setNewCategoryData] = useState({
// //     name: '',
// //     description: '',
// //     defaultPrice: '', // Stored as string for input, parsed on save
// //     capacity: '', // Stored as string for input, parsed on save
// //   });
// //   const [editingCategory, setEditingCategory] = useState(null); // Category being edited (holds the category object)

// //   // UI state for loading indicators
// //   const [isLoading, setIsLoading] = useState(true); // For initial data fetch
// //   const [isFormSubmitting, setIsFormSubmitting] = useState(false); // For Add/Edit modal submission
// //   const [isDeleting, setIsDeleting] = useState(false); // For Delete confirmation

// //   // UI state for messages
// //   const [error, setError] = useState(null); // General error messages
// //   const [successMessage, setSuccessMessage] = useState(null); // Success messages

// //   // UI state for modal visibility
// //   const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
// //   const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
// //   const [categoryToDelete, setCategoryToDelete] = useState(null); // Category object selected for deletion

// //   // --- Utility Functions for UI Feedback ---
// //   // Shows a success message that automatically fades away
// //   const showSuccess = (message) => {
// //     setSuccessMessage(message);
// //     // Clear the message after 3 seconds
// //     const timer = setTimeout(() => setSuccessMessage(null), 3000);
// //     return () => clearTimeout(timer); // Cleanup on unmount/re-render
// //   };

// //   // Shows an error message that automatically fades away
// //   const showError = (message) => {
// //     setError(message);
// //     // Clear the message after 5 seconds
// //     const timer = setTimeout(() => setError(null), 5000);
// //     return () => clearTimeout(timer); // Cleanup on unmount/re-render
// //   };

// //   // --- Simulate Fetch Categories ---
// //   // This useEffect mimics fetching initial data from an API.
// //   useEffect(() => {
// //     setIsLoading(true);
// //     setError(null);
// //     // Simulate API call delay
// //     setTimeout(() => {
// //       // Load initial dummy data
// //       const initialCategories = [
// //         { id: '1', name: 'Standard Room', description: 'Comfortable room with a city view.', defaultPrice: 100.00, capacity: 2 },
// //         { id: '2', name: 'Deluxe Suite', description: 'Spacious suite with a separate living area and ocean view.', defaultPrice: 250.50, capacity: 4 },
// //         { id: '3', name: 'Family Room', description: 'Two interconnected rooms, perfect for families with kids.', defaultPrice: 180.00, capacity: 5 },
// //         { id: '4', name: 'Executive Suite', description: 'Premium suite with a dedicated workspace and panoramic views.', defaultPrice: 350.00, capacity: 2 },
// //       ];
// //       setCategories(initialCategories);
// //       setIsLoading(false);
// //     }, 1000); // Simulate 1 second loading time
// //   }, []);

// //   // --- Handle Form Input Change ---
// //   // Updates the newCategoryData state as the user types
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewCategoryData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   // --- Handle Save (Add/Edit) Category - LOCAL STATE ONLY ---
// //   // This function simulates saving data to an API.
// //   const handleSaveCategory = async (e) => {
// //     e.preventDefault(); // Prevent default form submission behavior
// //     setError(null); // Clear previous errors

// //     // Basic Client-Side Validation
// //     if (!newCategoryData.name.trim()) {
// //       showError('Category name cannot be empty.');
// //       return;
// //     }
// //     // Check if category name already exists (case-insensitive, exclude current editing category)
// //     const isDuplicate = categories.some(
// //       (cat) =>
// //         cat.name.toLowerCase() === newCategoryData.name.trim().toLowerCase() &&
// //         (editingCategory ? cat.id !== editingCategory.id : true)
// //     );
// //     if (isDuplicate) {
// //       showError('A category with this name already exists.');
// //       return;
// //     }

// //     if (newCategoryData.defaultPrice && isNaN(parseFloat(newCategoryData.defaultPrice))) {
// //       showError('Default price must be a valid number.');
// //       return;
// //     }
// //     if (newCategoryData.capacity && (!Number.isInteger(Number(newCategoryData.capacity)) || Number(newCategoryData.capacity) <= 0)) {
// //       showError('Capacity must be a positive whole number.');
// //       return;
// //     }

// //     setIsFormSubmitting(true);
// //     // Simulate API call delay
// //     setTimeout(() => {
// //       let updatedCategories;
// //       const categoryPayload = {
// //         name: newCategoryData.name.trim(),
// //         description: newCategoryData.description.trim(),
// //         // Parse numerical values to numbers or null if empty
// //         defaultPrice: newCategoryData.defaultPrice ? parseFloat(newCategoryData.defaultPrice) : null,
// //         capacity: newCategoryData.capacity ? parseInt(newCategoryData.capacity, 10) : null,
// //       };

// //       if (editingCategory) {
// //         // Update existing category in local state
// //         updatedCategories = categories.map((cat) =>
// //           cat.id === editingCategory.id ? { ...cat, ...categoryPayload } : cat
// //         );
// //         showSuccess('Room category updated successfully!');
// //       } else {
// //         // Add new category to local state with a simple unique ID for simulation
// //         const newId = String(Date.now() + Math.random().toString(36).substr(2, 5));
// //         updatedCategories = [...categories, { id: newId, ...categoryPayload }];
// //         showSuccess('Room category added successfully!');
// //       }

// //       setCategories(updatedCategories);
// //       closeAddEditModal(); // Close modal on success
// //       setIsFormSubmitting(false);
// //     }, 700); // Simulate submission delay
// //   };

// //   // --- Handle Edit Button Click ---
// //   const handleEditClick = (category) => {
// //     setEditingCategory(category);
// //     // Populate form fields with existing category data
// //     setNewCategoryData({
// //       name: category.name || '',
// //       description: category.description || '',
// //       // Ensure numerical values are converted to string for input fields
// //       defaultPrice: category.defaultPrice !== null ? String(category.defaultPrice) : '',
// //       capacity: category.capacity !== null ? String(category.capacity) : '',
// //     });
// //     setIsAddEditModalOpen(true);
// //     setError(null); // Clear any previous errors
// //   };

// //   // --- Handle Delete Button Click ---
// //   const handleDeleteClick = (category) => {
// //     setCategoryToDelete(category);
// //     setIsDeleteConfirmModalOpen(true);
// //     setError(null); // Clear any previous errors
// //   };

// //   // --- Confirm Delete Category - LOCAL STATE ONLY ---
// //   // This function simulates deleting data from an API.
// //   const confirmDeleteCategory = () => {
// //     if (!categoryToDelete) return; // Should not happen if modal is open

// //     setIsDeleting(true);
// //     setError(null); // Clear previous errors

// //     // Simulate API call delay
// //     setTimeout(() => {
// //       const updatedCategories = categories.filter((cat) => cat.id !== categoryToDelete.id);
// //       setCategories(updatedCategories);
// //       showSuccess(`Category "${categoryToDelete.name}" deleted successfully!`);
// //       closeDeleteConfirmModal(); // Close modal on success
// //       setIsDeleting(false);
// //     }, 500); // Simulate deletion delay
// //   };

// //   // --- Modal Close Handlers ---
// //   // Resets modal state and closes it for Add/Edit
// //   const closeAddEditModal = () => {
// //     setIsAddEditModalOpen(false);
// //     setNewCategoryData({ name: '', description: '', defaultPrice: '', capacity: '' });
// //     setEditingCategory(null);
// //     setError(null);
// //     setIsFormSubmitting(false);
// //   };

// //   // Resets modal state and closes it for Delete Confirmation
// //   const closeDeleteConfirmModal = () => {
// //     setIsDeleteConfirmModalOpen(false);
// //     setCategoryToDelete(null);
// //     setError(null);
// //     setIsDeleting(false);
// //   };

// //   // --- Reusable Modal Component (using createPortal) ---
// //   const Modal = ({ isOpen, onClose, title, children }) => {
// //     if (!isOpen) return null;

// //     return createPortal(
// //       <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
// //         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-auto p-6 relative transform transition-all duration-300 scale-100 opacity-100 animate-slide-up">
// //           <button
// //             onClick={onClose}
// //             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
// //             aria-label="Close modal"
// //           >
// //             <X size={24} />
// //           </button>
// //           <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
// //           {children}
// //         </div>
// //       </div>,
// //       document.body // Portals render into the document body
// //     );
// //   };

// //   return (
// //     <div className="w-full max-w-7xl mx-auto p-3 sm:p-8 font-sans bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-2xl rounded-2xl border border-gray-200 min-h-[calc(100vh-5rem)] flex flex-col">
// //       <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-700 dark:text-indigo-400">
// //         <Tag className="h-8 w-8 text-indigo-500" /> Room Categories Management
// //       </h2>

// //       <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
// //         Define and manage different types of rooms available in your hotel. Each room category can have its own default pricing, capacity, and amenities.
// //       </p>

// //       {/* Global Success/Error Messages */}
// //       {successMessage && (
// //         <div className="bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100 px-4 py-3 rounded-lg flex items-center mb-4 transition-opacity duration-300 opacity-100 shadow-md border border-green-300">
// //           <Check size={20} className="mr-2 flex-shrink-0" /> {successMessage}
// //         </div>
// //       )}
// //       {error && (
// //         <div className="bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 px-4 py-3 rounded-lg flex items-center mb-4 transition-opacity duration-300 opacity-100 shadow-md border border-red-300">
// //           <Info size={20} className="mr-2 flex-shrink-0" /> {error}
// //         </div>
// //       )}

// //       {/* Add New Category Button */}
// //       <div className="mb-6 flex justify-end">
// //         <button
// //           onClick={() => {
// //             setEditingCategory(null); // Ensure we're adding, not editing
// //             setNewCategoryData({ name: '', description: '', defaultPrice: '', capacity: '' }); // Reset form
// //             setIsAddEditModalOpen(true); // Open the modal
// //             setError(null); // Clear any previous errors
// //           }}
// //           className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
// //           aria-label="Add New Room Category"
// //         >
// //           <Plus size={24} /> Add New Category
// //         </button>
// //       </div>

// //       {/* Loading, Empty, or Categories Table */}
// //       {isLoading ? (
// //         <div className="flex justify-center items-center py-10 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
// //           <Loader2 className="animate-spin h-10 w-10 text-indigo-500" />
// //           <span className="ml-3 text-lg text-gray-700 dark:text-gray-300">Loading categories...</span>
// //         </div>
// //       ) : categories.length === 0 ? (
// //         <div className="text-center text-gray-500 py-10 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
// //           <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found. Click "Add New Category" to get started.
// //         </div>
// //       ) : (
// //         <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
// //           <table className="min-w-full table-auto">
// //             <thead className="bg-gray-200 dark:bg-gray-700">
// //               <tr>
// //                 <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Category Name</th>
// //                 <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 hidden md:table-cell">Description</th>
// //                 <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 hidden lg:table-cell">Default Price</th>
// //                 <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 hidden lg:table-cell">Capacity</th>
// //                 <th className="px-6 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
// //               {categories.map((cat, index) => (
// //                 <tr
// //                   key={cat.id}
// //                   className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150`}
// //                 >
// //                   <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{cat.name}</td>
// //                   <td className="px-6 py-4 text-gray-700 dark:text-gray-300 hidden md:table-cell text-sm">
// //                     {cat.description || <span className="text-gray-400 italic">No description provided.</span>}
// //                   </td>
// //                   <td className="px-6 py-4 text-gray-700 dark:text-gray-300 hidden lg:table-cell text-sm">
// //                     {cat.defaultPrice !== null ? (
// //                       <span className="font-semibold text-green-700 dark:text-green-300">
// //                         ${cat.defaultPrice.toFixed(2)}
// //                       </span>
// //                     ) : (
// //                       <span className="text-gray-400 italic">N/A</span>
// //                     )}
// //                   </td>
// //                   <td className="px-6 py-4 text-gray-700 dark:text-gray-300 hidden lg:table-cell text-sm">
// //                     {cat.capacity !== null ? (
// //                       <span className="font-semibold text-blue-700 dark:text-blue-300">
// //                         {cat.capacity} Guests
// //                       </span>
// //                     ) : (
// //                       <span className="text-gray-400 italic">N/A</span>
// //                     )}
// //                   </td>
// //                   <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
// //                     <button
// //                       onClick={() => handleEditClick(cat)}
// //                       className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
// //                       title={`Edit ${cat.name}`}
// //                       aria-label={`Edit ${cat.name}`}
// //                     >
// //                       <Edit size={20} />
// //                     </button>
// //                     <button
// //                       onClick={() => handleDeleteClick(cat)}
// //                       className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
// //                       title={`Delete ${cat.name}`}
// //                       aria-label={`Delete ${cat.name}`}
// //                     >
// //                       <Trash2 size={20} />
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* Add/Edit Category Modal */}
// //       <Modal
// //         isOpen={isAddEditModalOpen}
// //         onClose={closeAddEditModal}
// //         title={editingCategory ? 'Edit Room Category' : 'Add New Room Category'}
// //       >
// //         <form onSubmit={handleSaveCategory} className="space-y-4">
// //           {/* Form-specific error (if any) */}
// //           {error && (
// //             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 dark:bg-red-900 dark:border-red-700 dark:text-red-300">
// //               <strong className="font-bold">Validation Error!</strong>
// //               <span className="block sm:inline ml-2">{error}</span>
// //             </div>
// //           )}

// //           <div>
// //             <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
// //               Category Name <span className="text-red-500">*</span>
// //             </label>
// //             <div className="relative rounded-md shadow-sm">
// //               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
// //                 <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
// //               </div>
// //               <input
// //                 type="text"
// //                 id="name"
// //                 name="name"
// //                 value={newCategoryData.name}
// //                 onChange={handleInputChange}
// //                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
// //                 required
// //                 aria-describedby="category-name-help"
// //                 placeholder="e.g., Standard Room"
// //               />
// //             </div>
// //             <p id="category-name-help" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
// //               A unique name for this room category.
// //             </p>
// //           </div>

// //           <div>
// //             <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
// //               Description
// //             </label>
// //             <div className="relative rounded-md shadow-sm">
// //               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
// //                 <BadgeInfo className="h-5 w-5 text-gray-400" aria-hidden="true" />
// //               </div>
// //               <textarea
// //                 id="description"
// //                 name="description"
// //                 value={newCategoryData.description}
// //                 onChange={handleInputChange}
// //                 rows="3"
// //                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
// //                 aria-describedby="category-description-help"
// //                 placeholder="e.g., Comfortable room with a city view and a queen-sized bed."
// //               ></textarea>
// //             </div>
// //             <p id="category-description-help" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
// //               A brief description of this room category's features and amenities.
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //             <div>
// //               <label htmlFor="defaultPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
// //                 Default Price (per night)
// //               </label>
// //               <div className="relative rounded-md shadow-sm">
// //                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
// //                   <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
// //                 </div>
// //                 <input
// //                   type="number"
// //                   id="defaultPrice"
// //                   name="defaultPrice"
// //                   value={newCategoryData.defaultPrice}
// //                   onChange={handleInputChange}
// //                   step="0.01" // Allows for decimal values
// //                   min="0"
// //                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
// //                   placeholder="0.00"
// //                   aria-describedby="category-price-help"
// //                 />
// //               </div>
// //               <p id="category-price-help" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
// //                 Base price for this category.
// //               </p>
// //             </div>

// //             <div>
// //               <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
// //                 Max Capacity (Guests)
// //               </label>
// //               <div className="relative rounded-md shadow-sm">
// //                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
// //                   <Users className="h-5 w-5 text-gray-400" aria-hidden="true" />
// //                 </div>
// //                 <input
// //                   type="number"
// //                   id="capacity"
// //                   name="capacity"
// //                   value={newCategoryData.capacity}
// //                   onChange={handleInputChange}
// //                   min="1"
// //                   step="1" // Ensures whole numbers
// //                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
// //                   placeholder="2"
// //                   aria-describedby="category-capacity-help"
// //                 />
// //               </div>
// //               <p id="category-capacity-help" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
// //                 Maximum number of guests this room category can accommodate.
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex justify-end space-x-3 mt-6">
// //             <button
// //               type="button"
// //               onClick={closeAddEditModal}
// //               className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
// //               disabled={isFormSubmitting}
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
// //               disabled={isFormSubmitting}
// //             >
// //               {isFormSubmitting && <Loader2 size={20} className="animate-spin" />}
// //               {editingCategory ? 'Update Category' : 'Add Category'}
// //             </button>
// //           </div>
// //         </form>
// //       </Modal>

// //       {/* Delete Confirmation Modal */}
// //       <Modal
// //         isOpen={isDeleteConfirmModalOpen}
// //         onClose={closeDeleteConfirmModal}
// //         title="Confirm Deletion"
// //       >
// //         <div className="text-gray-700 dark:text-gray-300 mb-6 text-center">
// //           <p className="text-lg mb-3">
// //             Are you sure you want to delete the room category{' '}
// //             <strong className="font-semibold text-red-600 dark:text-red-400">"{categoryToDelete?.name}"</strong>?
// //           </p>
// //           <p className="text-sm">
// //             This action cannot be undone and may affect existing rooms assigned to this category.
// //           </p>
// //         </div>
// //         <div className="flex justify-center space-x-3 mt-6">
// //           <button
// //             type="button"
// //             onClick={closeDeleteConfirmModal}
// //             className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
// //             disabled={isDeleting}
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             type="button"
// //             onClick={confirmDeleteCategory}
// //             className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
// //             disabled={isDeleting}
// //           >
// //             {isDeleting && <Loader2 size={20} className="animate-spin" />}
// //             Delete
// //           </button>
// //         </div>
// //       </Modal>

// //       {/* Basic Tailwind CSS keyframes for animations (place in your main CSS file) */}
// //       <style>
// //         {`
// //         @keyframes fadeIn {
// //           from { opacity: 0; }
// //           to { opacity: 1; }
// //         }
// //         @keyframes slideUp {
// //           from { transform: translateY(20px); opacity: 0; }
// //           to { transform: translateY(0); opacity: 1; }
// //         }
// //         .animate-fade-in {
// //           animation: fadeIn 0.2s ease-out forwards;
// //         }
// //         .animate-slide-up {
// //           animation: slideUp 0.3s ease-out forwards;
// //         }
// //         `}
// //       </style>
// //     </div>
// //   );
// // };

// // export default RoomCategoryPage;
// import React, { useState, useEffect, useCallback } from 'react';
// import { createPortal } from 'react-dom';
// import toast, { Toaster } from 'react-hot-toast'; // For consistent toast notifications

// // Lucide React Icons (replacing custom SVGs for consistency with original RoomCategoryPage)
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Tag,
//   X,
//   Check,
//   Loader2,
//   Info,
//   BadgeInfo, // Icon for description
//   DollarSign, // Icon for price
//   Users, // Icon for capacity
//   AlertTriangle, // For delete confirmation icon
// } from 'lucide-react';

// // --- Main RoomCategoryPage Component ---
// const RoomCategoryPage = () => {
//   // --- State Management ---
//   const [categories, setCategories] = useState([]); // Stores our simulated categories
//   const [searchTerm, setSearchTerm] = useState(''); // For search input
//   const [currentPage, setCurrentPage] = useState(1); // For pagination
//   const [displayedCategories, setDisplayedCategories] = useState([]); // Categories filtered by search
//   const [newCategoryData, setNewCategoryData] = useState({
//     name: '',
//     description: '',
//     defaultPrice: '', // Stored as string for input, parsed on save
//     capacity: '', // Stored as string for input, parsed on save
//   });
//   const [editingCategory, setEditingCategory] = useState(null); // Category being edited (holds the category object)

//   // UI state for loading indicators
//   const [isLoading, setIsLoading] = useState(true); // For initial data fetch
//   const [isFormSubmitting, setIsFormSubmitting] = useState(false); // For Add/Edit modal submission
//   const [isDeleting, setIsDeleting] = useState(false); // For Delete confirmation

//   // UI state for modal visibility
//   const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
//   const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null); // Category object selected for deletion

//   // --- Constants ---
//   const ITEMS_PER_PAGE = 10; // Same as Booking page

//   // --- Simulate Fetch Categories ---
//   // This useEffect mimics fetching initial data from an API.
//   const fetchCategoriesData = useCallback(() => {
//     setIsLoading(true);
//     // Simulate API call delay
//     setTimeout(() => {
//       // Load initial dummy data
//       const initialCategories = [
//         { id: '1', name: 'Standard Room', description: 'Comfortable room with a city view.', defaultPrice: 100.00, capacity: 2 },
//         { id: '2', name: 'Deluxe Suite', description: 'Spacious suite with a separate living area and ocean view.', defaultPrice: 250.50, capacity: 4 },
//         { id: '3', name: 'Family Room', description: 'Two interconnected rooms, perfect for families with kids.', defaultPrice: 180.00, capacity: 5 },
//         { id: '4', name: 'Executive Suite', description: 'Premium suite with a dedicated workspace and panoramic views.', defaultPrice: 350.00, capacity: 2 },
//         { id: '5', name: 'Penthouse', description: 'Luxurious top-floor suite with private terrace and city skyline views.', defaultPrice: 750.00, capacity: 3 },
//         { id: '6', name: 'Economy Room', description: 'Compact and affordable room, ideal for solo travelers.', defaultPrice: 75.00, capacity: 1 },
//         { id: '7', name: 'Twin Room', description: 'Room with two single beds, suitable for friends or colleagues.', defaultPrice: 120.00, capacity: 2 },
//         { id: '8', name: 'King Suite', description: 'Large suite with a king-sized bed and a sitting area.', defaultPrice: 300.00, capacity: 2 },
//         { id: '9', name: 'Accessible Room', description: 'Specially designed room for guests with mobility needs.', defaultPrice: 110.00, capacity: 2 },
//         { id: '10', name: 'Studio Apartment', description: 'Self-contained unit with a kitchenette, ideal for longer stays.', defaultPrice: 200.00, capacity: 3 },
//         { id: '11', name: 'Grand Deluxe', description: 'Spacious room with modern amenities and a garden view.', defaultPrice: 170.00, capacity: 2 },
//         { id: '12', name: 'Presidential Suite', description: 'The ultimate luxury experience with multiple rooms and exclusive services.', defaultPrice: 1500.00, capacity: 6 },
//       ];
//       setCategories(initialCategories);
//       setIsLoading(false);
//     }, 1000); // Simulate 1 second loading time
//   }, []);

//   useEffect(() => {
//     fetchCategoriesData();
//   }, [fetchCategoriesData]);

//   // --- Filter and Paginate Categories ---
//   useEffect(() => {
//     const filtered = categories.filter((cat) =>
//       (cat.name || '').toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
//       (cat.description || '').toLowerCase().includes(searchTerm.toLowerCase().trim())
//     );
//     setDisplayedCategories(filtered);
//     setCurrentPage(1); // Reset to first page on search or category change
//   }, [searchTerm, categories]);

//   const totalPages = Math.ceil(displayedCategories.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentCategories = displayedCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   // --- Handle Form Input Change ---
//   // Updates the newCategoryData state as the user types
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewCategoryData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // --- Handle Save (Add/Edit) Category - LOCAL STATE ONLY ---
//   // This function simulates saving data to an API.
//   const handleSaveCategory = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     toast.dismiss(); // Clear any existing toasts

//     // Basic Client-Side Validation
//     if (!newCategoryData.name.trim()) {
//       toast.error('Category name cannot be empty.');
//       return;
//     }
//     // Check if category name already exists (case-insensitive, exclude current editing category)
//     const isDuplicate = categories.some(
//       (cat) =>
//         cat.name.toLowerCase() === newCategoryData.name.trim().toLowerCase() &&
//         (editingCategory ? cat.id !== editingCategory.id : true)
//     );
//     if (isDuplicate) {
//       toast.error('A category with this name already exists.');
//       return;
//     }

//     if (newCategoryData.defaultPrice && isNaN(parseFloat(newCategoryData.defaultPrice))) {
//       toast.error('Default price must be a valid number.');
//       return;
//     }
//     if (newCategoryData.capacity && (!Number.isInteger(Number(newCategoryData.capacity)) || Number(newCategoryData.capacity) <= 0)) {
//       toast.error('Capacity must be a positive whole number.');
//       return;
//     }

//     setIsFormSubmitting(true);
//     // Simulate API call delay
//     setTimeout(() => {
//       let updatedCategories;
//       const categoryPayload = {
//         name: newCategoryData.name.trim(),
//         description: newCategoryData.description.trim(),
//         // Parse numerical values to numbers or null if empty
//         defaultPrice: newCategoryData.defaultPrice ? parseFloat(newCategoryData.defaultPrice) : null,
//         capacity: newCategoryData.capacity ? parseInt(newCategoryData.capacity, 10) : null,
//       };

//       if (editingCategory) {
//         // Update existing category in local state
//         updatedCategories = categories.map((cat) =>
//           cat.id === editingCategory.id ? { ...cat, ...categoryPayload } : cat
//         );
//         toast.success('Room category updated successfully!');
//       } else {
//         // Add new category to local state with a simple unique ID for simulation
//         const newId = String(Date.now() + Math.random().toString(36).substr(2, 5));
//         updatedCategories = [...categories, { id: newId, ...categoryPayload }];
//         toast.success('Room category added successfully!');
//       }

//       setCategories(updatedCategories);
//       closeAddEditModal(); // Close modal on success
//       setIsFormSubmitting(false);
//     }, 700); // Simulate submission delay
//   };

//   // --- Handle Edit Button Click ---
//   const handleEditClick = (category) => {
//     setEditingCategory(category);
//     // Populate form fields with existing category data
//     setNewCategoryData({
//       name: category.name || '',
//       description: category.description || '',
//       // Ensure numerical values are converted to string for input fields
//       defaultPrice: category.defaultPrice !== null ? String(category.defaultPrice) : '',
//       capacity: category.capacity !== null ? String(category.capacity) : '',
//     });
//     setIsAddEditModalOpen(true);
//     toast.dismiss(); // Clear any previous toasts
//   };

//   // --- Handle Delete Button Click ---
//   const handleDeleteClick = (category) => {
//     setCategoryToDelete(category);
//     setIsDeleteConfirmModalOpen(true);
//     toast.dismiss(); // Clear any previous toasts
//   };

//   // --- Confirm Delete Category - LOCAL STATE ONLY ---
//   // This function simulates deleting data from an API.
//   const confirmDeleteCategory = () => {
//     if (!categoryToDelete) return; // Should not happen if modal is open

//     setIsDeleting(true);
//     toast.dismiss(); // Clear previous toasts

//     // Simulate API call delay
//     setTimeout(() => {
//       const updatedCategories = categories.filter((cat) => cat.id !== categoryToDelete.id);
//       setCategories(updatedCategories);
//       toast.success(`Category "${categoryToDelete.name}" deleted successfully!`);
//       closeDeleteConfirmModal(); // Close modal on success
//       setIsDeleting(false);
//     }, 500); // Simulate deletion delay
//   };

//   // --- Modal Close Handlers ---
//   // Resets modal state and closes it for Add/Edit
//   const closeAddEditModal = () => {
//     setIsAddEditModalOpen(false);
//     setNewCategoryData({ name: '', description: '', defaultPrice: '', capacity: '' });
//     setEditingCategory(null);
//     setIsFormSubmitting(false);
//     toast.dismiss(); // Clear any toasts when closing modal
//   };

//   // Resets modal state and closes it for Delete Confirmation
//   const closeDeleteConfirmModal = () => {
//     setIsDeleteConfirmModalOpen(false);
//     setCategoryToDelete(null);
//     setIsDeleting(false);
//     toast.dismiss(); // Clear any toasts when closing modal
//   };

//   // --- Reusable Modal Component (using createPortal) ---
//   const Modal = ({ isOpen, onClose, title, children, icon: IconComponent }) => {
//     if (!isOpen) return null;

//     return createPortal(
//       <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4 animate-fade-in">
//         <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md transform scale-95 animate-scale-up-modal border-t-4 border-blue-500">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//             aria-label="Close modal"
//           >
//             <X size={24} />
//           </button>
//           <div className="flex flex-col items-center mb-4 sm:mb-6">
//             {IconComponent && <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mb-2 sm:mb-3" />}
//             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1.5 mt-1.5 sm:mb-2 sm:mt-2 text-center">{title}</h3>
//           </div>
//           {children}
//         </div>
//       </div>,
//       document.body // Portals render into the document body
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-2 sm:p-3 md:p-6 font-sans text-gray-800">
//       <Toaster position="top-right" reverseOrder={false} />

//       {/* Delete Confirmation Modal (Styled like Booking's delete modal) */}
//       <Modal
//         isOpen={isDeleteConfirmModalOpen}
//         onClose={closeDeleteConfirmModal}
//         title="Confirm Deletion"
//         icon={AlertTriangle} // Using Lucide icon for consistency
//       >
//         <div className="text-gray-700 mb-6 text-center">
//           <p className="text-lg mb-3">
//             Are you sure you want to delete the room category{' '}
//             <strong className="font-semibold text-red-600">"{categoryToDelete?.name}"</strong>?
//           </p>
//           <p className="text-sm">
//             This action cannot be undone and may affect existing rooms assigned to this category.
//           </p>
//         </div>
//         <div className="flex justify-center space-x-3 sm:space-x-4 mt-6">
//           <button
//             onClick={closeDeleteConfirmModal}
//             className="flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
//             disabled={isDeleting}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={confirmDeleteCategory}
//             className="flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
//             disabled={isDeleting}
//           >
//             {isDeleting && <Loader2 size={20} className="animate-spin mr-2" />} Delete
//           </button>
//         </div>
//       </Modal>

//       <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
//         {/* Header Section (Styled like Booking's header) */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-3 sm:pb-4 border-b border-gray-300">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-0 flex items-center text-center md:text-left w-full justify-center md:justify-start">
//             <Tag className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-700" />
//             Room Categories
//           </h1>
//           <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
//             <button
//               onClick={() => {
//                 setEditingCategory(null); // Ensure we're adding, not editing
//                 setNewCategoryData({ name: '', description: '', defaultPrice: '', capacity: '' }); // Reset form
//                 setIsAddEditModalOpen(true); // Open the modal
//                 toast.dismiss(); // Clear any previous toasts
//               }}
//               className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-sm sm:text-base"
//               title="Add a new room category"
//             >
//               <Plus size={20} className="mr-1.5 sm:mr-2" /> <span className="hidden sm:inline">Add New Category</span> <span className="sm:hidden">Add Category</span>
//             </button>
//           </div>
//         </div>

//         {/* Search Bar (Styled like Booking's search bar) */}
//         <div className="relative mb-5 sm:mb-6">
//           <input
//             type="text"
//             placeholder="Search by category name or description..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-gray-800 placeholder-gray-400
//                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
//             title="Search for room categories"
//           />
//           <div className="absolute left-3 top-1/2 -translate-y-1/2">
//             <Tag size={16} className="text-gray-500" /> {/* Using Tag icon for search */}
//           </div>
//         </div>

//         {/* Loading Spinner / Categories Table */}
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center py-10 sm:py-16">
//             <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div>
//             <p className="text-base sm:text-xl text-blue-800 font-medium">Fetching room categories...</p>
//           </div>
//         ) : currentCategories.length === 0 && searchTerm === '' ? (
//           <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
//             <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found. Click "Add New Category" to get started.
//           </div>
//         ) : currentCategories.length === 0 && searchTerm !== '' ? (
//           <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
//             <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found for your search criteria.
//           </div>
//         ) : (
//           <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-blue-50">
//                 <tr>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Category Name</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden xs:table-cell">Description</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3 hidden sm:table-cell">Default Price</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Capacity</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider sm:px-4 sm:py-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {currentCategories.map((cat, index) => (
//                   <tr key={cat.id} className="hover:bg-blue-50 transition-colors duration-200 ease-in-out">
//                     <td className="px-2 py-2 text-xs sm:text-sm text-gray-900 font-semibold">{cat.name}</td>
//                     <td className="px-2 py-2 text-xs sm:text-sm text-gray-700 hidden xs:table-cell">
//                       {cat.description || <span className="text-gray-400 italic">No description provided.</span>}
//                     </td>
//                     <td className="px-2 py-2 text-xs sm:text-sm text-green-700 font-bold hidden sm:table-cell">
//                       {cat.defaultPrice !== null ? `$${cat.defaultPrice.toFixed(2)}` : <span className="text-gray-400 italic">N/A</span>}
//                     </td>
//                     <td className="px-2 py-2 text-xs sm:text-sm text-blue-800 font-bold">
//                       {cat.capacity !== null ? `${cat.capacity} Guests` : <span className="text-gray-400 italic">N/A</span>}
//                     </td>
//                     <td className="px-2 py-2 text-xs sm:text-sm flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2 items-start sm:items-center">
//                       <button
//                         onClick={() => handleEditClick(cat)}
//                         className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150 focus:outline-none focus:underline text-xs sm:text-sm"
//                         title={`Edit ${cat.name}`}
//                       >
//                         <Edit size={14} className="mr-0.5 sm:mr-1" /> Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(cat)}
//                         className="flex items-center text-red-600 hover:text-red-800 font-medium transition-colors duration-150 focus:outline-none focus:underline text-xs sm:text-sm"
//                         title={`Delete ${cat.name}`}
//                       >
//                         <Trash2 size={14} className="mr-0.5 sm:mr-1" /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination (Styled like Booking's pagination) */}
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

//       {/* Add/Edit Category Modal */}
//       <Modal
//         isOpen={isAddEditModalOpen}
//         onClose={closeAddEditModal}
//         title={editingCategory ? 'Edit Room Category' : 'Add New Room Category'}
//         icon={editingCategory ? Edit : Plus}
//       >
//         <form onSubmit={handleSaveCategory} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Category Name <span className="text-red-500">*</span>
//             </label>
//             <div className="relative rounded-md shadow-sm">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </div>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={newCategoryData.name}
//                 onChange={handleInputChange}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                 required
//                 aria-describedby="category-name-help"
//                 placeholder="e.g., Standard Room"
//               />
//             </div>
//             <p id="category-name-help" className="mt-1 text-sm text-gray-500">
//               A unique name for this room category.
//             </p>
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <div className="relative rounded-md shadow-sm">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <BadgeInfo className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </div>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={newCategoryData.description}
//                 onChange={handleInputChange}
//                 rows="3"
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                 aria-describedby="category-description-help"
//                 placeholder="e.g., Comfortable room with a city view and a queen-sized bed."
//               ></textarea>
//             </div>
//             <p id="category-description-help" className="mt-1 text-sm text-gray-500">
//               A brief description of this room category's features and amenities.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="defaultPrice" className="block text-sm font-medium text-gray-700 mb-1">
//                 Default Price (per night)
//               </label>
//               <div className="relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   type="number"
//                   id="defaultPrice"
//                   name="defaultPrice"
//                   value={newCategoryData.defaultPrice}
//                   onChange={handleInputChange}
//                   step="0.01" // Allows for decimal values
//                   min="0"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                   placeholder="0.00"
//                   aria-describedby="category-price-help"
//                 />
//               </div>
//               <p id="category-price-help" className="mt-1 text-sm text-gray-500">
//                 Base price for this category.
//               </p>
//             </div>

//             <div>
//               <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
//                 Max Capacity (Guests)
//               </label>
//               <div className="relative rounded-md shadow-sm">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <Users className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   type="number"
//                   id="capacity"
//                   name="capacity"
//                   value={newCategoryData.capacity}
//                   onChange={handleInputChange}
//                   min="1"
//                   step="1" // Ensures whole numbers
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                   placeholder="2"
//                   aria-describedby="category-capacity-help"
//                 />
//               </div>
//               <p id="category-capacity-help" className="mt-1 text-sm text-gray-500">
//                 Maximum number of guests this room category can accommodate.
//               </p>
//             </div>
//           </div>

//           <div className="flex justify-end space-x-3 mt-6">
//             <button
//               type="button"
//               onClick={closeAddEditModal}
//               className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//               disabled={isFormSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-5 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//               disabled={isFormSubmitting}
//             >
//               {isFormSubmitting && <Loader2 size={20} className="animate-spin" />}
//               {editingCategory ? 'Update Category' : 'Add Category'}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Basic Tailwind CSS keyframes for animations (place in your main CSS file) */}
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

// export default RoomCategoryPage;




// import React, { useState, useEffect, useCallback } from 'react';
// import { createPortal } from 'react-dom';
// import toast, { Toaster } from 'react-hot-toast'; // For consistent toast notifications
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// // Lucide React Icons
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Tag,
//   X,
//   Check,
//   Loader2,
//   Info,
//   BadgeInfo, // Icon for description
//   DollarSign, // Icon for price
//   Users, // Icon for capacity
//   AlertTriangle, // For delete confirmation icon
//   BedSingle, // New icon for room category card
//   CalendarPlus, // New icon for 'Book Now' button
// } from 'lucide-react';

// // --- Main RoomCategoryPage Component ---
// const RoomCategoryPage = () => {
//   // --- State Management ---
//   const [categories, setCategories] = useState([]); // Stores our simulated categories
//   const [searchTerm, setSearchTerm] = useState(''); // For search input
//   const [currentPage, setCurrentPage] = useState(1); // For pagination
//   const [displayedCategories, setDisplayedCategories] = useState([]); // Categories filtered by search
//   const [newCategoryData, setNewCategoryData] = useState({
//     name: '',
//     description: '',
//     defaultPrice: '', // Stored as string for input, parsed on save
//     capacity: '', // Stored as string for input, parsed on save
//   });
//   const [editingCategory, setEditingCategory] = useState(null); // Category being edited (holds the category object)

//   // UI state for loading indicators
//   const [isLoading, setIsLoading] = useState(true); // For initial data fetch
//   const [isFormSubmitting, setIsFormSubmitting] = useState(false); // For Add/Edit modal submission
//   const [isDeleting, setIsDeleting] = useState(false); // For Delete confirmation

//   // UI state for modal visibility
//   const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
//   const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null); // Category object selected for deletion

//   // --- Router Navigation ---
//   const navigate = useNavigate(); // Initialize useNavigate

//   // --- Constants ---
//   const ITEMS_PER_PAGE = 8; // Adjusted for card layout, typically fewer items per page

//   // --- Simulate Fetch Categories ---
//   // This useEffect mimics fetching initial data from an API.
//   const fetchCategoriesData = useCallback(() => {
//     setIsLoading(true);
//     // Simulate API call delay
//     setTimeout(() => {
//       // Load initial dummy data
//       const initialCategories = [
//         { id: '1', name: 'Standard Room', description: 'Comfortable room with a city view.', defaultPrice: 100.00, capacity: 2, imageUrl: 'https://placehold.co/400x250/E0FBFC/29335C?text=Standard+Room' },
//         { id: '2', name: 'Deluxe Suite', description: 'Spacious suite with a separate living area and ocean view.', defaultPrice: 250.50, capacity: 4, imageUrl: 'https://placehold.co/400x250/C8E6C9/388E3C?text=Deluxe+Suite' },
//         { id: '3', name: 'Family Room', description: 'Two interconnected rooms, perfect for families with kids.', defaultPrice: 180.00, capacity: 5, imageUrl: 'https://placehold.co/400x250/FFECB3/FFA000?text=Family+Room' },
//         { id: '4', name: 'Executive Suite', description: 'Premium suite with a dedicated workspace and panoramic views.', defaultPrice: 350.00, capacity: 2, imageUrl: 'https://placehold.co/400x250/D1C4E9/5E35B1?text=Executive+Suite' },
//         { id: '5', name: 'Penthouse', description: 'Luxurious top-floor suite with private terrace and city skyline views.', defaultPrice: 750.00, capacity: 3, imageUrl: 'https://placehold.co/400x250/FFCDD2/D32F2F?text=Penthouse' },
//         { id: '6', name: 'Economy Room', description: 'Compact and affordable room, ideal for solo travelers.', defaultPrice: 75.00, capacity: 1, imageUrl: 'https://placehold.co/400x250/BBDEFB/1976D2?text=Economy+Room' },
//         { id: '7', name: 'Twin Room', description: 'Room with two single beds, suitable for friends or colleagues.', defaultPrice: 120.00, capacity: 2, imageUrl: 'https://placehold.co/400x250/DCEDC8/689F38?text=Twin+Room' },
//         { id: '8', name: 'King Suite', description: 'Large suite with a king-sized bed and a sitting area.', defaultPrice: 300.00, capacity: 2, imageUrl: 'https://placehold.co/400x250/F8BBD0/C2185B?text=King+Suite' },
//         { id: '9', name: 'Accessible Room', description: 'Specially designed room for guests with mobility needs.', defaultPrice: 110.00, capacity: 2, imageUrl: 'https://placehold.co/400x250/CFD8DC/455A64?text=Accessible+Room' },
//         { id: '10', name: 'Studio Apartment', description: 'Self-contained unit with a kitchenette, ideal for longer stays.', defaultPrice: 200.00, capacity: 3, imageUrl: 'https://placehold.co/400x250/D7CCC8/795548?text=Studio+Apt' },
//         { id: '11', name: 'Grand Deluxe', description: 'Spacious room with modern amenities and a garden view.', defaultPrice: 170.00, capacity: 2, imageUrl: 'https://placehold.co/400x250/FFF9C4/FBC02D?text=Grand+Deluxe' },
//         { id: '12', name: 'Presidential Suite', description: 'The ultimate luxury experience with multiple rooms and exclusive services.', defaultPrice: 1500.00, capacity: 6, imageUrl: 'https://placehold.co/400x250/E1F5FE/0288D1?text=Presidential+Suite' },
//       ];
//       setCategories(initialCategories);
//       setIsLoading(false);
//     }, 1000); // Simulate 1 second loading time
//   }, []);

//   useEffect(() => {
//     fetchCategoriesData();
//   }, [fetchCategoriesData]);

//   // --- Filter and Paginate Categories ---
//   useEffect(() => {
//     const filtered = categories.filter((cat) =>
//       (cat.name || '').toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
//       (cat.description || '').toLowerCase().includes(searchTerm.toLowerCase().trim())
//     );
//     setDisplayedCategories(filtered);
//     setCurrentPage(1); // Reset to first page on search or category change
//   }, [searchTerm, categories]);

//   const totalPages = Math.ceil(displayedCategories.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentCategories = displayedCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   // --- Handle Form Input Change ---
//   // Updates the newCategoryData state as the user types
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewCategoryData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // --- Handle Save (Add/Edit) Category - LOCAL STATE ONLY ---
//   // This function simulates saving data to an API.
//   const handleSaveCategory = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     toast.dismiss(); // Clear any existing toasts

//     // Basic Client-Side Validation
//     if (!newCategoryData.name.trim()) {
//       toast.error('Category name cannot be empty.');
//       return;
//     }
//     // Check if category name already exists (case-insensitive, exclude current editing category)
//     const isDuplicate = categories.some(
//       (cat) =>
//         cat.name.toLowerCase() === newCategoryData.name.trim().toLowerCase() &&
//         (editingCategory ? cat.id !== editingCategory.id : true)
//     );
//     if (isDuplicate) {
//       toast.error('A category with this name already exists.');
//       return;
//     }

//     if (newCategoryData.defaultPrice && isNaN(parseFloat(newCategoryData.defaultPrice))) {
//       toast.error('Default price must be a valid number.');
//       return;
//     }
//     if (newCategoryData.capacity && (!Number.isInteger(Number(newCategoryData.capacity)) || Number(newCategoryData.capacity) <= 0)) {
//       toast.error('Capacity must be a positive whole number.');
//       return;
//     }

//     setIsFormSubmitting(true);
//     // Simulate API call delay
//     setTimeout(() => {
//       let updatedCategories;
//       const categoryPayload = {
//         name: newCategoryData.name.trim(),
//         description: newCategoryData.description.trim(),
//         // Parse numerical values to numbers or null if empty
//         defaultPrice: newCategoryData.defaultPrice ? parseFloat(newCategoryData.defaultPrice) : null,
//         capacity: newCategoryData.capacity ? parseInt(newCategoryData.capacity, 10) : null,
//         imageUrl: `https://placehold.co/400x250/A7FFEB/004D40?text=${newCategoryData.name.replace(/\s/g, '+')}` // Generate new image URL
//       };

//       if (editingCategory) {
//         // Update existing category in local state
//         updatedCategories = categories.map((cat) =>
//           cat.id === editingCategory.id ? { ...cat, ...categoryPayload } : cat
//         );
//         toast.success('Room category updated successfully!');
//       } else {
//         // Add new category to local state with a simple unique ID for simulation
//         const newId = String(Date.now() + Math.random().toString(36).substr(2, 5));
//         updatedCategories = [...categories, { id: newId, ...categoryPayload }];
//         toast.success('Room category added successfully!');
//       }

//       setCategories(updatedCategories);
//       closeAddEditModal(); // Close modal on success
//       setIsFormSubmitting(false);
//     }, 700); // Simulate submission delay
//   };

//   // --- Handle Edit Button Click ---
//   const handleEditClick = (category) => {
//     setEditingCategory(category);
//     // Populate form fields with existing category data
//     setNewCategoryData({
//       name: category.name || '',
//       description: category.description || '',
//       // Ensure numerical values are converted to string for input fields
//       defaultPrice: category.defaultPrice !== null ? String(category.defaultPrice) : '',
//       capacity: category.capacity !== null ? String(category.capacity) : '',
//     });
//     setIsAddEditModalOpen(true);
//     toast.dismiss(); // Clear any previous toasts
//   };

//   // --- Handle Delete Button Click ---
//   const handleDeleteClick = (category) => {
//     setCategoryToDelete(category);
//     setIsDeleteConfirmModalOpen(true);
//     toast.dismiss(); // Clear any previous toasts
//   };

//   // --- Confirm Delete Category - LOCAL STATE ONLY ---
//   // This function simulates deleting data from an API.
//   const confirmDeleteCategory = () => {
//     if (!categoryToDelete) return; // Should not happen if modal is open

//     setIsDeleting(true);
//     toast.dismiss(); // Clear previous toasts

//     // Simulate API call delay
//     setTimeout(() => {
//       const updatedCategories = categories.filter((cat) => cat.id !== categoryToDelete.id);
//       setCategories(updatedCategories);
//       toast.success(`Category "${categoryToDelete.name}" deleted successfully!`);
//       closeDeleteConfirmModal(); // Close modal on success
//       setIsDeleting(false);
//     }, 500); // Simulate deletion delay
//   };

//   // --- Handle Book Now Click ---
//   const handleBookNowClick = (categoryName) => {
//     toast.success(`Navigating to booking page for ${categoryName}!`);
//     navigate('/booking/add'); // Navigate to the AddBooking page
//   };

//   // --- Modal Close Handlers ---
//   // Resets modal state and closes it for Add/Edit
//   const closeAddEditModal = () => {
//     setIsAddEditModalOpen(false);
//     setNewCategoryData({ name: '', description: '', defaultPrice: '', capacity: '' });
//     setEditingCategory(null);
//     setIsFormSubmitting(false);
//     toast.dismiss(); // Clear any toasts when closing modal
//   };

//   // Resets modal state and closes it for Delete Confirmation
//   const closeDeleteConfirmModal = () => {
//     setIsDeleteConfirmModalOpen(false);
//     setCategoryToDelete(null);
//     setIsDeleting(false);
//     toast.dismiss(); // Clear any toasts when closing modal
//   };

//   // --- Reusable Modal Component (using createPortal) ---
//   const Modal = ({ isOpen, onClose, title, children, icon: IconComponent }) => {
//     if (!isOpen) return null;

//     return createPortal(
//       <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4 animate-fade-in">
//         <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md transform scale-95 animate-scale-up-modal border-t-4 border-blue-500">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//             aria-label="Close modal"
//           >
//             <X size={24} />
//           </button>
//           <div className="flex flex-col items-center mb-4 sm:mb-6">
//             {IconComponent && <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mb-2 sm:mb-3" />}
//             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1.5 mt-1.5 sm:mb-2 sm:mt-2 text-center">{title}</h3>
//           </div>
//           {children}
//         </div>
//       </div>,
//       document.body // Portals render into the document body
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-2 sm:p-3 md:p-6 font-sans text-gray-800">
//       <Toaster position="top-right" reverseOrder={false} />

//       {/* Delete Confirmation Modal (Styled like Booking's delete modal) */}
//       <Modal
//         isOpen={isDeleteConfirmModalOpen}
//         onClose={closeDeleteConfirmModal}
//         title="Confirm Deletion"
//         icon={AlertTriangle} // Using Lucide icon for consistency
//       >
//         <div className="text-gray-700 mb-6 text-center">
//           <p className="text-lg mb-3">
//             Are you sure you want to delete the room category{' '}
//             <strong className="font-semibold text-red-600">"{categoryToDelete?.name}"</strong>?
//           </p>
//           <p className="text-sm">
//             This action cannot be undone and may affect existing rooms assigned to this category.
//           </p>
//         </div>
//         <div className="flex justify-center space-x-3 sm:space-x-4 mt-6">
//           <button
//             onClick={closeDeleteConfirmModal}
//             className="flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
//             disabled={isDeleting}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={confirmDeleteCategory}
//             className="flex items-center px-4 py-1.5 sm:px-6 sm:py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
//             disabled={isDeleting}
//           >
//             {isDeleting && <Loader2 size={20} className="animate-spin mr-2" />} Delete
//           </button>
//         </div>
//       </Modal>

//       <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
//         {/* Header Section (Styled like Booking's header) */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-3 sm:pb-4 border-b border-gray-300">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-0 flex items-center text-center md:text-left w-full justify-center md:justify-start">
//             <Tag className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-700" />
//             Room Categories
//           </h1>
//           <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
//             <button
//               onClick={() => {
//                 setEditingCategory(null); // Ensure we're adding, not editing
//                 setNewCategoryData({ name: '', description: '', defaultPrice: '', capacity: '' }); // Reset form
//                 setIsAddEditModalOpen(true); // Open the modal
//                 toast.dismiss(); // Clear any previous toasts
//               }}
//               className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-sm sm:text-base"
//               title="Add a new room category"
//             >
//               <Plus size={20} className="mr-1.5 sm:mr-2" /> <span className="hidden sm:inline">Add New Category</span> <span className="sm:hidden">Add Category</span>
//             </button>
//           </div>
//         </div>

//         {/* Search Bar (Styled like Booking's search bar) */}
//         <div className="relative mb-5 sm:mb-6">
//           <input
//             type="text"
//             placeholder="Search by category name or description..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-gray-800 placeholder-gray-400
//                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
//             title="Search for room categories"
//           />
//           <div className="absolute left-3 top-1/2 -translate-y-1/2">
//             <Tag size={16} className="text-gray-500" /> {/* Using Tag icon for search */}
//           </div>
//         </div>

//         {/* Loading Spinner / Categories Display */}
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center py-10 sm:py-16">
//             <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div>
//             <p className="text-base sm:text-xl text-blue-800 font-medium">Fetching room categories...</p>
//           </div>
//         ) : displayedCategories.length === 0 && searchTerm === '' ? (
//           <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
//             <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found. Click "Add New Category" to get started.
//           </div>
//         ) : displayedCategories.length === 0 && searchTerm !== '' ? (
//           <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
//             <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found for your search criteria.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {currentCategories.map((cat) => (
//               <div
//                 key={cat.id}
//                 className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-200 hover:scale-103 hover:shadow-xl"
//               >
//                 <img
//                   src={cat.imageUrl}
//                   alt={cat.name}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x250/E0E0E0/616161?text=Room+Image"; }}
//                 />
//                 <div className="p-4 flex flex-col flex-grow">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
//                     <BedSingle size={20} className="mr-2 text-blue-600" /> {cat.name}
//                   </h3>
//                   <p className="text-gray-700 text-sm mb-3 flex-grow">
//                     {cat.description || <span className="text-gray-400 italic">No description provided.</span>}
//                   </p>
//                   <div className="flex items-center justify-between text-gray-800 mb-2">
//                     <span className="flex items-center text-lg font-semibold text-green-700">
//                       <DollarSign size={18} className="mr-1" />
//                       {cat.defaultPrice !== null ? `${cat.defaultPrice.toFixed(2)}` : 'N/A'}
//                     </span>
//                     <span className="flex items-center text-lg font-semibold text-blue-800">
//                       <Users size={18} className="mr-1" />
//                       {cat.capacity !== null ? `${cat.capacity} Guests` : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center mt-4">
//                     <button
//                       onClick={() => handleBookNowClick(cat.name)}
//                       className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-semibold w-full sm:w-auto"
//                       title={`Book ${cat.name}`}
//                     >
//                       <CalendarPlus size={16} className="mr-1" /> Book

//                     </button>
//                     <div className="flex space-x-2 w-full sm:w-auto mt-2 sm:mt-0"> {/* Added w-full and mt-2 for responsiveness */}
//                       <button
//                         onClick={() => handleEditClick(cat)}
//                         className="flex items-center justify-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm w-1/2 sm:w-auto"
//                         title={`Edit ${cat.name}`}
//                       >
//                         <Edit size={16} className="mr-1" /> Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(cat)}
//                         className="flex items-center justify-center px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm w-1/2 sm:w-auto"
//                         title={`Delete ${cat.name}`}
//                       >
//                         <Trash2 size={16} className="mr-1" /> Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination (Styled like Booking's pagination) */}
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

//       {/* Add/Edit Category Modal */}
//       <Modal
//         isOpen={isAddEditModalOpen}
//         onClose={closeAddEditModal}
//         title={editingCategory ? 'Edit Room Category' : 'Add New Room Category'}
//         icon={editingCategory ? Edit : Plus}
//       >
//         <form onSubmit={handleSaveCategory} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Category Name <span className="text-red-500">*</span>
//             </label>
//             <div className="relative rounded-md shadow-sm">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </div>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={newCategoryData.name}
//                 onChange={handleInputChange}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                 required
//                 aria-describedby="category-name-help"
//                 placeholder="e.g., Standard Room"
//               />
//             </div>
//             <p id="category-name-help" className="mt-1 text-sm text-gray-500">
//               A unique name for this room category.
//             </p>
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <div className="relative rounded-md shadow-sm">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <BadgeInfo className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </div>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={newCategoryData.description}
//                 onChange={handleInputChange}
//                 rows="3"
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                 aria-describedby="category-description-help"
//                 placeholder="e.g., Comfortable room with a city view and a queen-sized bed."
//               ></textarea>
//             </div>
//             <p id="category-description-help" className="mt-1 text-sm text-gray-500">
//               A brief description of this room category's features and amenities.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="defaultPrice" className="block text-sm font-medium text-gray-700 mb-1">
//                 Default Price (per night)
//               </label>
//               <div className="relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   type="number"
//                   id="defaultPrice"
//                   name="defaultPrice"
//                   value={newCategoryData.defaultPrice}
//                   onChange={handleInputChange}
//                   step="0.01" // Allows for decimal values
//                   min="0"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                   placeholder="0.00"
//                   aria-describedby="category-price-help"
//                 />
//               </div>
//               <p id="category-price-help" className="mt-1 text-sm text-gray-500">
//                 Base price for this category.
//               </p>
//             </div>

//             <div>
//               <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
//                 Max Capacity (Guests)
//               </label>
//               <div className="relative rounded-md shadow-sm">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <Users className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   type="number"
//                   id="capacity"
//                   name="capacity"
//                   value={newCategoryData.capacity}
//                   onChange={handleInputChange}
//                   min="1"
//                   step="1" // Ensures whole numbers
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                   placeholder="2"
//                   aria-describedby="category-capacity-help"
//                 />
//               </div>
//               <p id="category-capacity-help" className="mt-1 text-sm text-gray-500">
//                 Maximum number of guests this room category can accommodate.
//               </p>
//             </div>
//           </div>

//           <div className="flex justify-end space-x-3 mt-6">
//             <button
//               type="button"
//               onClick={closeAddEditModal}
//               className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//               disabled={isFormSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-5 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//               disabled={isFormSubmitting}
//             >
//               {isFormSubmitting && <Loader2 size={20} className="animate-spin" />}
//               {editingCategory ? 'Update Category' : 'Add Category'}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Basic Tailwind CSS keyframes for animations (place in your main CSS file) */}
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

// export default RoomCategoryPage;
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast'; // For consistent toast notifications
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Lucide React Icons
import {
  Plus,
  Edit,
  Trash2,
  Tag,
  X,
  Check,
  Loader2,
  Info,
  BadgeInfo, // Icon for description
  DollarSign, // Icon for price
  Users, // Icon for capacity
  AlertTriangle, // For delete confirmation icon
  BedSingle, // Icon for room category card
  CalendarPlus, // Icon for 'Book Now' button
  CircleDotDashed, // New icon for 'Inactive' status
  CircleCheck, // New icon for 'Active' status
  Image, // New icon for 'Pictures' button
} from 'lucide-react';

// --- Main RoomCategoryPage Component ---
const RoomCategoryPage = () => {
  // --- State Management ---
  const [categories, setCategories] = useState([]); // Stores our simulated categories
  const [searchTerm, setSearchTerm] = useState(''); // For search input
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [displayedCategories, setDisplayedCategories] = useState([]); // Categories filtered by search
  const [newCategoryData, setNewCategoryData] = useState({
    name: '',
    description: '',
    defaultPrice: '', // Stored as string for input, parsed on save
    capacity: '', // Stored as string for input, parsed on save
    isActive: true, // New field: default to active
  });
  const [editingCategory, setEditingCategory] = useState(null); // Category being edited (holds the category object)

  // UI state for loading indicators
  const [isLoading, setIsLoading] = useState(true); // For initial data fetch
  const [isFormSubmitting, setIsFormSubmitting] = useState(false); // For Add/Edit modal submission
  const [isDeleting, setIsDeleting] = useState(false); // For Delete confirmation

  // UI state for modal visibility
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Category object selected for deletion

  // --- Router Navigation ---
  const navigate = useNavigate(); // Initialize useNavigate

  // --- Constants ---
  const ITEMS_PER_PAGE = 8; // Adjusted for card layout, typically fewer items per page

  // --- Simulate Fetch Categories ---
  // This useEffect mimics fetching initial data from an API.
  const fetchCategoriesData = useCallback(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      // Load initial dummy data
      const initialCategories = [
        { id: '1', name: 'Standard Room', description: 'Comfortable room with a city view.', defaultPrice: 100.00, capacity: 2, isActive: true, imageUrl: 'https://placehold.co/400x250/E0FBFC/29335C?text=Standard+Room' },
        { id: '2', name: 'Deluxe Suite', description: 'Spacious suite with a separate living area and ocean view.', defaultPrice: 250.50, capacity: 4, isActive: true, imageUrl: 'https://placehold.co/400x250/C8E6C9/388E3C?text=Deluxe+Suite' },
        { id: '3', name: 'Family Room', description: 'Two interconnected rooms, perfect for families with kids.', defaultPrice: 180.00, capacity: 5, isActive: true, imageUrl: 'https://placehold.co/400x250/FFECB3/FFA000?text=Family+Room' },
        { id: '4', name: 'Executive Suite', description: 'Premium suite with a dedicated workspace and panoramic views.', defaultPrice: 350.00, capacity: 2, isActive: true, imageUrl: 'https://placehold.co/400x250/D1C4E9/5E35B1?text=Executive+Suite' },
        { id: '5', name: 'Penthouse', description: 'Luxurious top-floor suite with private terrace and city skyline views.', defaultPrice: 750.00, capacity: 3, isActive: false, imageUrl: 'https://placehold.co/400x250/FFCDD2/D32F2F?text=Penthouse' },
        { id: '6', name: 'Economy Room', description: 'Compact and affordable room, ideal for solo travelers.', defaultPrice: 75.00, capacity: 1, isActive: true, imageUrl: 'https://placehold.co/400x250/BBDEFB/1976D2?text=Economy+Room' },
        { id: '7', name: 'Twin Room', description: 'Room with two single beds, suitable for friends or colleagues.', defaultPrice: 120.00, capacity: 2, isActive: true, imageUrl: 'https://placehold.co/400x250/DCEDC8/689F38?text=Twin+Room' },
        { id: '8', name: 'King Suite', description: 'Large suite with a king-sized bed and a sitting area.', defaultPrice: 300.00, capacity: 2, isActive: true, imageUrl: 'https://placehold.co/400x250/F8BBD0/C2185B?text=King+Suite' },
        { id: '9', name: 'Accessible Room', description: 'Specially designed room for guests with mobility needs.', defaultPrice: 110.00, capacity: 2, isActive: true, imageUrl: 'https://placehold.co/400x250/CFD8DC/455A64?text=Accessible+Room' },
        { id: '10', name: 'Studio Apartment', description: 'Self-contained unit with a kitchenette, ideal for longer stays.', defaultPrice: 200.00, capacity: 3, isActive: false, imageUrl: 'https://placehold.co/400x250/D7CCC8/795548?text=Studio+Apt' },
        { id: '11', name: 'Grand Deluxe', description: 'Spacious room with modern amenities and a garden view.', defaultPrice: 170.00, capacity: 2, isActive: true, imageUrl: 'https://placehold.co/400x250/FFF9C4/FBC02D?text=Grand+Deluxe' },
        { id: '12', name: 'Presidential Suite', description: 'The ultimate luxury experience with multiple rooms and exclusive services.', defaultPrice: 1500.00, capacity: 6, isActive: true, imageUrl: 'https://placehold.co/400x250/E1F5FE/0288D1?text=Presidential+Suite' },
      ];
      setCategories(initialCategories);
      setIsLoading(false);
    }, 1000); // Simulate 1 second loading time
  }, []);

  useEffect(() => {
    fetchCategoriesData();
  }, [fetchCategoriesData]);

  // --- Filter and Paginate Categories ---
  useEffect(() => {
    const filtered = categories.filter((cat) =>
      (cat.name || '').toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      (cat.description || '').toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setDisplayedCategories(filtered);
    setCurrentPage(1); // Reset to first page on search or category change
  }, [searchTerm, categories]);

  const totalPages = Math.ceil(displayedCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCategories = displayedCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // --- Handle Form Input Change ---
  // Updates the newCategoryData state as the user types
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCategoryData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // --- Handle Save (Add/Edit) Category - LOCAL STATE ONLY ---
  // This function simulates saving data to an API.
  const handleSaveCategory = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    toast.dismiss(); // Clear any existing toasts

    // Basic Client-Side Validation
    if (!newCategoryData.name.trim()) {
      toast.error('Category name cannot be empty.');
      return;
    }
    // Check if category name already exists (case-insensitive, exclude current editing category)
    const isDuplicate = categories.some(
      (cat) =>
        cat.name.toLowerCase() === newCategoryData.name.trim().toLowerCase() &&
        (editingCategory ? cat.id !== editingCategory.id : true)
    );
    if (isDuplicate) {
      toast.error('A category with this name already exists.');
      return;
    }

    if (newCategoryData.defaultPrice && isNaN(parseFloat(newCategoryData.defaultPrice))) {
      toast.error('Default price must be a valid number.');
      return;
    }
    if (newCategoryData.capacity && (!Number.isInteger(Number(newCategoryData.capacity)) || Number(newCategoryData.capacity) <= 0)) {
      toast.error('Capacity must be a positive whole number.');
      return;
    }

    setIsFormSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      let updatedCategories;
      const categoryPayload = {
        name: newCategoryData.name.trim(),
        description: newCategoryData.description.trim(),
        // Parse numerical values to numbers or null if empty
        defaultPrice: newCategoryData.defaultPrice ? parseFloat(newCategoryData.defaultPrice) : null,
        capacity: newCategoryData.capacity ? parseInt(newCategoryData.capacity, 10) : null,
        isActive: newCategoryData.isActive, // Include isActive
        imageUrl: `https://placehold.co/400x250/A7FFEB/004D40?text=${newCategoryData.name.replace(/\s/g, '+')}` // Generate new image URL
      };

      if (editingCategory) {
        // Update existing category in local state
        updatedCategories = categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...categoryPayload } : cat
        );
        toast.success('Room category updated successfully!');
      } else {
        // Add new category to local state with a simple unique ID for simulation
        const newId = String(Date.now() + Math.random().toString(36).substr(2, 5));
        updatedCategories = [...categories, { id: newId, ...categoryPayload }];
        toast.success('Room category added successfully!');
      }

      setCategories(updatedCategories);
      closeAddEditModal(); // Close modal on success
      setIsFormSubmitting(false);
    }, 700); // Simulate submission delay
  };

  // --- Handle Edit Button Click ---
  const handleEditClick = (category) => {
    toast.info(`Navigating to edit page for ${category.name}!`);
    navigate(`/booking/edit/${category.id}`, { state: { editingData: category } });
  };

  // --- Handle Delete Button Click ---
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmModalOpen(true);
    toast.dismiss(); // Clear any previous toasts
  };

  // --- Confirm Delete Category - LOCAL STATE ONLY ---
  // This function simulates deleting data from an API.
  const confirmDeleteCategory = () => {
    if (!categoryToDelete) return; // Should not happen if modal is open

    setIsDeleting(true);
    toast.dismiss(); // Clear previous toasts

    // Simulate API call delay
    setTimeout(() => {
      const updatedCategories = categories.filter((cat) => cat.id !== categoryToDelete.id);
      setCategories(updatedCategories);
      toast.success(`Category "${categoryToDelete.name}" deleted successfully!`);
      closeDeleteConfirmModal(); // Close modal on success
      setIsDeleting(false);
    }, 500); // Simulate deletion delay
  };

  // --- Handle Book Now Click ---
  const handleBookNowClick = (categoryName) => {
    toast.success(`Navigating to booking page for ${categoryName}!`);
    navigate('/booking/add'); // Navigate to the AddBooking page
  };

  // --- Handle Pictures Click ---
  const handlePicturesClick = (categoryName) => {
    toast.info(`Simulating viewing pictures for ${categoryName}!`);
    // In a real app, this would open a photo gallery modal or navigate to a dedicated gallery page.
  };

  // --- Modal Close Handlers ---
  // Resets modal state and closes it for Add/Edit
  const closeAddEditModal = () => {
    setIsAddEditModalOpen(false);
    setNewCategoryData({ name: '', description: '', defaultPrice: '', capacity: '', isActive: true }); // Reset isActive
    setEditingCategory(null);
    setIsFormSubmitting(false);
    toast.dismiss(); // Clear any toasts when closing modal
  };

  // Resets modal state and closes it for Delete Confirmation
  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setCategoryToDelete(null);
    setIsDeleting(false);
    toast.dismiss(); // Clear any toasts when closing modal
  };

  // --- Reusable Modal Component (using createPortal) ---
  const Modal = ({ isOpen, onClose, title, children, icon: IconComponent }) => {
    if (!isOpen) return null;

    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4 animate-fade-in">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md transform scale-95 animate-scale-up-modal border-t-4 border-blue-500">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-2 sm:p-3 md:p-6 font-sans text-gray-800">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Delete Confirmation Modal (Styled like Booking's delete modal) */}
      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={closeDeleteConfirmModal}
        title="Confirm Deletion"
        icon={AlertTriangle} // Using Lucide icon for consistency
      >
        <div className="text-gray-700 mb-6 text-center">
          <p className="text-lg mb-3">
            Are you sure you want to delete the room category{' '}
            <strong className="font-semibold text-red-600">"{categoryToDelete?.name}"</strong>?
          </p>
          <p className="text-sm">
            This action cannot be undone and may affect existing rooms assigned to this category.
          </p>
        </div>
        <div className="flex justify-center space-x-3 sm:space-x-4 mt-6">
          <button
            onClick={closeDeleteConfirmModal}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={confirmDeleteCategory}
            className="flex items-center px-4 py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 size={20} className="animate-spin mr-2" />} Delete
          </button>
        </div>
      </Modal>

      <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
        {/* Header Section (Styled like Booking's header) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-3 sm:pb-4 border-b border-gray-300">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-0 flex items-center text-center md:text-left w-full justify-center md:justify-start">
            <Tag className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-700" />
            Room Categories
          </h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
            <button
              onClick={() => {
                setEditingCategory(null); // Ensure we're adding, not editing
                setNewCategoryData({ name: '', description: '', defaultPrice: '', capacity: '', isActive: true }); // Reset form
                setIsAddEditModalOpen(true); // Open the modal
                toast.dismiss(); // Clear any previous toasts
              }}
              className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-sm sm:text-base"
              title="Add a new room category"
            >
              <Plus size={20} className="mr-1.5 sm:mr-2" /> <span className="hidden sm:inline">Add New Category</span> <span className="sm:hidden">Add Category</span>
            </button>
          </div>
        </div>

        {/* Search Bar (Styled like Booking's search bar) */}
        <div className="relative mb-5 sm:mb-6">
          <input
            type="text"
            placeholder="Search by category name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-gray-800 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
            title="Search for room categories"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Tag size={16} className="text-gray-500" /> {/* Using Tag icon for search */}
          </div>
        </div>

        {/* Loading Spinner / Categories Display */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-16">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div>
            <p className="text-base sm:text-xl text-blue-800 font-medium">Fetching room categories...</p>
          </div>
        ) : displayedCategories.length === 0 && searchTerm === '' ? (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
            <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found. Click "Add New Category" to get started.
          </div>
        ) : displayedCategories.length === 0 && searchTerm !== '' ? (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
            <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found for your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-200 hover:scale-103 hover:shadow-xl"
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x250/E0E0E0/616161?text=Room+Image"; }}
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <BedSingle size={20} className="mr-2 text-blue-600" /> {cat.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3 flex-grow">
                    {cat.description || <span className="text-gray-400 italic">No description provided.</span>}
                  </p>
                  <div className="flex items-center justify-between text-gray-800 mb-2">
                    <span className="flex items-center text-lg font-semibold text-green-700">
                      <DollarSign size={18} className="mr-1" />
                      {cat.defaultPrice !== null ? `${cat.defaultPrice.toFixed(2)}` : 'N/A'}
                    </span>
                    <span className="flex items-center text-lg font-semibold text-blue-800">
                      <Users size={18} className="mr-1" />
                      {cat.capacity !== null ? `${cat.capacity} Guests` : 'N/A'}
                    </span>
                  </div>
                  {/* Status Badge */}
                  <div className="mb-4">
                    {cat.isActive ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CircleCheck size={16} className="mr-1" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        <CircleDotDashed size={16} className="mr-1" /> Inactive
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-between items-center mt-auto gap-2">
                    <button
                      onClick={() => handleBookNowClick(cat.name)}
                      className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-semibold flex-grow sm:flex-grow-0"
                      title={`Book ${cat.name}`}
                    >
                      <CalendarPlus size={16} className="mr-1" /> Book Now
                    </button>
                    <button
                      onClick={() => handlePicturesClick(cat.name)}
                      className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm font-semibold flex-grow sm:flex-grow-0"
                      title={`View pictures for ${cat.name}`}
                    >
                      <Image size={16} className="mr-1" /> Pictures
                    </button>
                    <div className="flex space-x-2 flex-grow sm:flex-grow-0 mt-2 sm:mt-0">
                      <button
                        onClick={() => handleEditClick(cat)}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm flex-grow"
                        title={`Edit ${cat.name}`}
                      >
                        <Edit size={16} className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(cat)}
                        className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm flex-grow"
                        title={`Delete ${cat.name}`}
                      >
                        <Trash2 size={16} className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination (Styled like Booking's pagination) */}
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

      {/* Add/Edit Category Modal */}
      <Modal
        isOpen={isAddEditModalOpen}
        onClose={closeAddEditModal}
        title={editingCategory ? 'Edit Room Category' : 'Add New Room Category'}
        icon={editingCategory ? Edit : Plus}
      >
        <form onSubmit={handleSaveCategory} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={newCategoryData.name}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                required
                aria-describedby="category-name-help"
                placeholder="e.g., Standard Room"
              />
            </div>
            <p id="category-name-help" className="mt-1 text-sm text-gray-500">
              A unique name for this room category.
            </p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <BadgeInfo className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <textarea
                id="description"
                name="description"
                value={newCategoryData.description}
                onChange={handleInputChange}
                rows="3"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                aria-describedby="category-description-help"
                placeholder="e.g., Comfortable room with a city view and a queen-sized bed."
              ></textarea>
            </div>
            <p id="category-description-help" className="mt-1 text-sm text-gray-500">
              A brief description of this room category's features and amenities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="defaultPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Default Price (per night)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="number"
                  id="defaultPrice"
                  name="defaultPrice"
                  value={newCategoryData.defaultPrice}
                  onChange={handleInputChange}
                  step="0.01" // Allows for decimal values
                  min="0"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  placeholder="0.00"
                  aria-describedby="category-price-help"
                />
              </div>
              <p id="category-price-help" className="mt-1 text-sm text-gray-500">
                Base price for this category.
              </p>
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                Max Capacity (Guests)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Users className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={newCategoryData.capacity}
                  onChange={handleInputChange}
                  min="1"
                  step="1" // Ensures whole numbers
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  placeholder="2"
                  aria-describedby="category-capacity-help"
                />
              </div>
              <p id="category-capacity-help" className="mt-1 text-sm text-gray-500">
                Maximum number of guests this room category can accommodate.
              </p>
            </div>
          </div>

          {/* New: isActive toggle */}
          <div className="flex items-center mt-4">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={newCategoryData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Category is Active
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={closeAddEditModal}
              className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              disabled={isFormSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              disabled={isFormSubmitting}
            >
              {isFormSubmitting && <Loader2 size={20} className="animate-spin" />}
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Basic Tailwind CSS keyframes for animations (place in your main CSS file) */}
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

export default RoomCategoryPage;
