
// // import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'; // Import memo
// // import { createPortal } from 'react-dom';
// // import toast, { Toaster } from 'react-hot-toast';
// // import { useNavigate } from 'react-router-dom';

// // // Lucide React Icons
// // import {
// //   Plus,
// //   Edit,
// //   Trash2,
// //   Tag,
// //   X,
// //   Loader2,
// //   Info,
// //   BadgeInfo,
// //   DollarSign,
// //   Users,
// //   AlertTriangle,
// //   BedSingle,
// //   CalendarPlus,
// //   Image,
// //   // Removed unused icons for brevity
// // } from 'lucide-react';


// // // --- Memoized Individual Form Field Components ---
// // // These components will only re-render if their direct props change.
// // // For example, NameInput will only re-render if its 'value' or 'onChange' prop changes.
// // // Since 'onChange' (handleInputChange) is memoized via useCallback, it will be stable.
// // // So, only 'value' changing will trigger a re-render for these specific inputs.

// // const NameInput = memo(({ value, onChange }) => (
// //   <div>
// //     <label htmlFor="name" className="block text-sm font-semibold text-white mb-1.5">
// //       Category Name <span className="text-red-500">*</span>
// //     </label>
// //     <div className="relative">
// //       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
// //         <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
// //       </div>
// //       <input
// //         type="text"
// //         id="name"
// //         name="name"
// //         value={value}
// //         onChange={onChange}
// //         className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
// //                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all duration-200"
// //         required
// //         aria-describedby="category-name-help"
// //         placeholder="e.g., Deluxe Suite, Executive Room"
// //       />
// //     </div>
// //     <p id="category-name-help" className="mt-2 text-xs text-white">
// //       A unique and descriptive name for this room type.
// //     </p>
// //   </div>
// // ));
// // NameInput.displayName = 'NameInput'; // For better debugging in React Dev Tools

// // const DescriptionInput = memo(({ value, onChange }) => (
// //   <div>
// //     <label htmlFor="description" className="block text-sm font-semibold text-white mb-1.5">
// //       Description
// //     </label>
// //     <div className="relative">
// //       <div className="absolute top-3 left-3 flex items-center pointer-events-none">
// //         <BadgeInfo className="h-5 w-5 text-gray-400" aria-hidden="true" />
// //       </div>
// //       <textarea
// //         id="description"
// //         name="description"
// //         value={value}
// //         onChange={onChange}
// //         rows="4"
// //         className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
// //                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all duration-200 resize-y"
// //         aria-describedby="category-description-help"
// //         placeholder="e.g., A spacious room featuring a king-sized bed, city views, and a private balcony."
// //       ></textarea>
// //     </div>
// //     <p id="category-description-help" className="mt-2 text-xs text-white">
// //       Detail the amenities and unique selling points of this category.
// //     </p>
// //   </div>
// // ));
// // DescriptionInput.displayName = 'DescriptionInput';

// // const CapacityInput = memo(({ value, onChange }) => (
// //   <div>
// //     <label htmlFor="capacity" className="block text-sm font-semibold text-white mb-1.5">
// //       Max Capacity (Guests) <span className="text-red-500">*</span>
// //     </label>
// //     <div className="relative">
// //       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
// //         <Users className="h-5 w-5 text-gray-400" aria-hidden="true" />
// //       </div>
// //       <input
// //         type="number"
// //         id="capacity"
// //         name="capacity"
// //         value={value}
// //         onChange={onChange}
// //         min="1"
// //         step="1"
// //         className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
// //                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all duration-200"
// //         placeholder="e.g., 2"
// //         aria-describedby="category-capacity-help"
// //         required
// //       />
// //     </div>
// //     <p id="category-capacity-help" className="mt-2 text-xs text-white">
// //       The maximum number of guests this room category can accommodate.
// //     </p>
// //   </div>
// // ));
// // CapacityInput.displayName = 'CapacityInput';

// // const ImageUrlInput = memo(({ value, onChange }) => (
// //   <div>
// //     <label htmlFor="imageUrl" className="block text-sm font-semibold text-white mb-1.5">
// //       Main Image URL
// //     </label>
// //     <div className="relative">
// //       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
// //         <Image className="h-5 w-5 text-gray-400" aria-hidden="true" />
// //       </div>
// //       <input
// //         type="url"
// //         id="imageUrl"
// //         name="imageUrl"
// //         value={value}
// //         onChange={onChange}
// //         className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
// //                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all duration-200"
// //         placeholder="e.g., https://example.com/room-image.jpg"
// //         aria-describedby="category-image-help"
// //       />
// //     </div>
// //     <p id="category-image-help" className="mt-2 text-xs text-white">
// //       URL for the primary image of this room category.
// //     </p>
// //   </div>
// // ));
// // ImageUrlInput.displayName = 'ImageUrlInput';

// // const IsActiveToggle = memo(({ checked, onChange }) => (
// //   <div className="flex items-center mt-6 pt-3 border-t border-gray-200">
// //     <input
// //       id="isActive"
// //       name="isActive"
// //       type="checkbox"
// //       checked={checked}
// //       onChange={onChange}
// //       className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md transition-colors duration-200"
// //     />
// //     <label htmlFor="isActive" className="ml-3 block text-base font-medium text-white cursor-pointer">
// //       Category is Active
// //     </label>
// //   </div>
// // ));
// // IsActiveToggle.displayName = 'IsActiveToggle';

// // // --- Main RoomCategoryPage Component ---
// // const RoomCategoryPage = () => {
// //   // --- State Management ---
// //   const [categories, setCategories] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [guestSearchCount, setGuestSearchCount] = useState('');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [displayedCategories, setDisplayedCategories] = useState([]);
// //   const [newCategoryData, setNewCategoryData] = useState({
// //     name: '',
// //     description: '',
// //     capacity: '',
// //     isActive: true,
// //     imageUrl: '',
// //     pictures: [],
// //   });
// //   const [editingCategory, setEditingCategory] = useState(null);

// //   // UI state for loading indicators
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isFormSubmitting, setIsFormSubmitting] = useState(false);
// //   const [isDeleting, setIsDeleting] = useState(false);

// //   // UI state for modal visibility
// //   const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
// //   const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
// //   const [categoryToDelete, setCategoryToDelete] = useState(null);

// //   // New: State for Image Gallery Modal
// //   const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
// //   const [selectedCategoryForGallery, setSelectedCategoryForGallery] = useState(null);

// //   // --- Router Navigation ---
// //   const navigate = useNavigate();

// //   // --- Constants ---
// //   const ITEMS_PER_PAGE = 8;
// //   const API_BASE_URL = 'https://havana-backend.vercel.app/api/room-categories';

// //   // --- Fetch Categories from API ---
// //   const fetchCategoriesData = useCallback(async () => {
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch(API_BASE_URL);
// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({ message: response.statusText }));
// //         throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`);
// //       }
// //       const data = await response.json();

// //       let processedCategories = [];
// //       if (data && Array.isArray(data.categories)) {
// //         processedCategories = data.categories.map(cat => ({
// //           _id: cat._id,
// //           name: cat.category,
// //           isActive: cat.status === 'Active',
// //           description: cat.description || '',
// //           defaultPrice: typeof cat.defaultPrice === 'number' ? cat.defaultPrice : 0, // Assuming a defaultPrice exists
// //           capacity: cat.capacity || 1,
// //           imageUrl: cat.imageUrl || `https://placehold.co/400x250/F0F0F0/666666?text=${cat.category.replace(/\s/g, '+')}`,
// //           pictures: Array.isArray(cat.pictures) ? cat.pictures : [],
// //         }));
// //       } else {
// //         console.warn("API response for room categories did not contain a 'categories' array. Received:", data);
// //         processedCategories = [];
// //       }

// //       setCategories(processedCategories);
// //       toast.success('Room categories loaded successfully!');
// //     } catch (error) {
// //       console.error('Failed to fetch room categories:', error);
// //       toast.error(`Failed to load room categories: ${error.message}. Please check console.`);
// //       setCategories([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchCategoriesData();
// //   }, [fetchCategoriesData]);

// //   // --- Filter and Paginate Categories ---
// //   useEffect(() => {
// //     const filtered = Array.isArray(categories)
// //       ? categories.filter((cat) => {
// //           const matchesSearchTerm =
// //             (cat.name || '').toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
// //             (cat.description || '').toLowerCase().includes(searchTerm.toLowerCase().trim());

// //           const guestCountNum = parseInt(guestSearchCount, 10);
// //           const matchesGuestCount =
// //             isNaN(guestCountNum) || guestCountNum <= 0 || (cat.capacity && cat.capacity >= guestCountNum);

// //           return matchesSearchTerm && matchesGuestCount;
// //         })
// //       : [];

// //     setDisplayedCategories(filtered);
// //     setCurrentPage(1);
// //   }, [searchTerm, guestSearchCount, categories]);

// //   const totalPages = Math.ceil(displayedCategories.length / ITEMS_PER_PAGE);
// //   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
// //   const currentCategories = displayedCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

// //   // --- Handle Form Input Change ---
// //   // This function is stable due to useCallback and correctly updates state immutably.
// //   const handleInputChange = useCallback((e) => {
// //     const { name, value, type, checked } = e.target;
// //     setNewCategoryData(prevData => ({
// //       ...prevData,
// //       [name]: type === 'checkbox' ? checked : value,
// //     }));
// //   }, []);

// //   // --- Handle Save (Add/Edit) Category - API INTEGRATED ---
// //   const handleSaveCategory = useCallback(async (e) => {
// //     e.preventDefault();
// //     toast.dismiss();

// //     if (!newCategoryData.name.trim()) {
// //       toast.error('Category name cannot be empty.');
// //       return;
// //     }
// //     const isDuplicate = categories.some(
// //       (cat) =>
// //         cat.name.toLowerCase() === newCategoryData.name.trim().toLowerCase() &&
// //         (editingCategory ? cat._id !== editingCategory._id : true)
// //     );
// //     if (isDuplicate) {
// //       toast.error('A category with this name already exists.');
// //       return;
// //     }

// //     if (newCategoryData.capacity && (!Number.isInteger(Number(newCategoryData.capacity)) || Number(newCategoryData.capacity) <= 0)) {
// //       toast.error('Capacity must be a positive whole number.');
// //       return;
// //     }

// //     setIsFormSubmitting(true);
// //     try {
// //       const categoryPayload = {
// //         category: newCategoryData.name.trim(),
// //         status: newCategoryData.isActive ? 'Active' : 'Inactive',
// //         description: newCategoryData.description.trim(),
// //         capacity: newCategoryData.capacity ? parseInt(newCategoryData.capacity, 10) : 1,
// //         imageUrl: newCategoryData.imageUrl,
// //         pictures: newCategoryData.pictures // Ensure pictures are sent
// //       };

// //       let response;
// //       if (editingCategory) {
// //         response = await fetch(`${API_BASE_URL}/${editingCategory._id}`, {
// //           method: 'PUT',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(categoryPayload),
// //         });
// //         if (!response.ok) {
// //           throw new Error(`Failed to update category: ${response.statusText}`);
// //         }
// //         toast.success('Room category updated successfully!');
// //       } else {
// //         response = await fetch(API_BASE_URL, {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(categoryPayload),
// //         });
// //         if (!response.ok) {
// //           throw new Error(`Failed to add category: ${response.statusText}`);
// //         }
// //         toast.success('Room category added successfully!');
// //       }

// //       await fetchCategoriesData();
// //       closeAddEditModal();
// //     } catch (error) {
// //       console.error('Error saving room category:', error);
// //       toast.error(`Error saving category: ${error.message}`);
// //     } finally {
// //       setIsFormSubmitting(false);
// //     }
// //   }, [newCategoryData, categories, editingCategory, fetchCategoriesData]); // Added newCategoryData here for full dependency clarity

// //   // --- Other handlers (handleEditClick, handleDeleteClick, etc.) also wrapped in useCallback
// //   const handleEditClick = useCallback((category) => {
// //     setNewCategoryData({
// //       name: category.name || '',
// //       description: category.description || '',
// //       capacity: category.capacity || '',
// //       isActive: category.isActive,
// //       imageUrl: category.imageUrl || '',
// //       pictures: category.pictures || [],
// //     });
// //     setEditingCategory(category);
// //     setIsAddEditModalOpen(true);
// //     toast.dismiss();
// //   }, []);

// //   const handleDeleteClick = useCallback((category) => {
// //     setCategoryToDelete(category);
// //     setIsDeleteConfirmModalOpen(true);
// //     toast.dismiss();
// //   }, []);

// //   const confirmDeleteCategory = useCallback(async () => {
// //     if (!categoryToDelete) return;

// //     setIsDeleting(true);
// //     toast.dismiss();

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/${categoryToDelete._id}`, {
// //         method: 'DELETE',
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Failed to delete category: ${response.statusText}`);
// //       }

// //       toast.success(`Category "${categoryToDelete.name}" deleted successfully!`);
// //       await fetchCategoriesData();
// //       closeDeleteConfirmModal();
// //     } catch (error) {
// //       console.error('Error deleting room category:', error);
// //       toast.error(`Error deleting category: ${error.message}`);
// //     } finally {
// //       setIsDeleting(false);
// //     }
// //   }, [categoryToDelete, fetchCategoriesData]);

// //   const handleBookNowClick = useCallback((categoryName) => {
// //     toast.success(`Navigating to booking page for ${categoryName}!`);
// //     navigate('/booking/add'); // Assuming this path exists
// //   }, [navigate]);

// //   const handlePicturesClick = useCallback((category) => {
// //     setSelectedCategoryForGallery(category);
// //     setIsGalleryModalOpen(true);
// //   }, []);

// //   // Correctly resets state when modal is closed
// //   const closeAddEditModal = useCallback(() => {
// //     setIsAddEditModalOpen(false);
// //     // This ensures newCategoryData is reset only when the modal is explicitly closed
// //     setNewCategoryData({ name: '', description: '', capacity: '', isActive: true, imageUrl: '', pictures: [] });
// //     setEditingCategory(null);
// //     setIsFormSubmitting(false);
// //     toast.dismiss();
// //   }, []);

// //   const closeDeleteConfirmModal = useCallback(() => {
// //     setIsDeleteConfirmModalOpen(false);
// //     setCategoryToDelete(null);
// //     setIsDeleting(false);
// //     toast.dismiss();
// //   }, []);

// //   const closeGalleryModal = useCallback(() => {
// //     setIsGalleryModalOpen(false);
// //     setSelectedCategoryForGallery(null);
// //   }, []);

// //   // Memoized Modal component for reusability and performance
// //   const MemoizedModal = memo(({ isOpen, onClose, title, children, icon: IconComponent, modalWidthClass = 'max-w-md' }) => {
// //     if (!isOpen) return null;

// //     return createPortal(
// //       <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4 animate-fade-in">
// //         <div className={`bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full ${modalWidthClass} transform scale-95 animate-scale-up-modal border-t-4 border-blue-500`}>
// //           <button
// //             onClick={onClose}
// //             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
// //             aria-label="Close modal"
// //           >
// //             <X size={24} />
// //           </button>
// //           <div className="flex flex-col items-center mb-4 sm:mb-6">
// //             {IconComponent && <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mb-2 sm:mb-3" />}
// //             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1.5 mt-1.5 sm:mb-2 sm:mt-2 text-center">{title}</h3>
// //           </div>
// //           {children}
// //         </div>
// //       </div>,
// //       document.body
// //     );
// //   });
// //   MemoizedModal.displayName = 'MemoizedModal';

// //   const ImageGalleryModal = memo(({ isOpen, onClose, category }) => {
// //     if (!isOpen || !category) return null;

// //     return createPortal(
// //       <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-3 sm:p-4 animate-fade-in">
// //         <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl transform scale-95 animate-scale-up-modal border-t-4 border-purple-500">
// //           <button
// //             onClick={onClose}
// //             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
// //             aria-label="Close gallery modal"
// //           >
// //             <X size={24} />
// //           </button>
// //           <div className="flex flex-col items-center mb-4 sm:mb-6">
// //             <Image className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600 mb-2 sm:mb-3" />
// //             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1.5 mt-1.5 sm:mb-2 sm:mt-2 text-center">
// //               Pictures for {category.name}
// //             </h3>
// //           </div>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
// //             {category.pictures && category.pictures.length > 0 ? (
// //               category.pictures.map((pic, index) => (
// //                 <div key={index} className="relative w-full pb-[75%] rounded-lg overflow-hidden shadow-md group">
// //                   <img
// //                     src={pic}
// //                     alt={`${category.name} - ${index + 1}`}
// //                     className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
// //                     onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/E0E0E0/616161?text=Image+Not+Found"; }}
// //                   />
// //                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
// //                     <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                       View
// //                     </span>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="col-span-full text-center text-gray-500 py-6">
// //                 <Info className="inline-block h-5 w-5 mr-1 text-gray-400" /> No pictures available for this category.
// //               </div>
// //             )}
// //           </div>
// //           <div className="flex justify-end mt-6">
// //             <button
// //               onClick={onClose}
// //               className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       </div>,
// //       document.body
// //     );
// //   });
// //   ImageGalleryModal.displayName = 'ImageGalleryModal';

// //   // The form content, now primarily composed of memoized sub-components.
// //   // The outer form `useMemo` is still beneficial for its structural elements and `handleSaveCategory`.
// //   const AddEditCategoryFormContent = useMemo(() => {
// //     // console.log('AddEditCategoryFormContent re-evaluating (outer memo)...'); // Added for debugging
// //     return (
// //       <form onSubmit={handleSaveCategory} className="space-y-5">
// //         <NameInput
// //           value={newCategoryData.name}
// //           onChange={handleInputChange}
// //         />

// //         <DescriptionInput
// //           value={newCategoryData.description}
// //           onChange={handleInputChange}
// //         />

// //         <CapacityInput
// //           value={newCategoryData.capacity}
// //           onChange={handleInputChange}
// //         />

// //         <ImageUrlInput
// //           value={newCategoryData.imageUrl}
// //           onChange={handleInputChange}
// //         />

// //         <IsActiveToggle
// //           checked={newCategoryData.isActive}
// //           onChange={handleInputChange}
// //         />

// //         <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
// //           <button
// //             type="button"
// //             onClick={closeAddEditModal}
// //             className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold
// //                          hover:bg-gray-100 transition-colors duration-200 shadow-sm
// //                          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
// //             disabled={isFormSubmitting}
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             type="submit"
// //             className="px-6 py-2.5 bg-blue-800 text-white rounded-lg font-semibold
// //                          hover:bg-blue-900 transition-all duration-200 flex items-center justify-center gap-2
// //                          disabled:opacity-50 disabled:cursor-not-allowed shadow-md
// //                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transform hover:scale-[1.02]"
// //             disabled={isFormSubmitting}
// //           >
// //             {isFormSubmitting && <Loader2 size={20} className="animate-spin" />}
// //             {editingCategory ? 'Update Category' : 'Add Category'}
// //           </button>
// //         </div>
// //       </form>
// //     );
// //   }, [newCategoryData, handleInputChange, handleSaveCategory, closeAddEditModal, editingCategory, isFormSubmitting]);


// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-2 sm:p-3 md:p-6 font-sans text-gray-800">
// //       <Toaster position="top-right" reverseOrder={false} />

// //       {/* Delete Confirmation Modal */}
// //       <MemoizedModal
// //         isOpen={isDeleteConfirmModalOpen}
// //         onClose={closeDeleteConfirmModal}
// //         title="Confirm Deletion"
// //         icon={AlertTriangle}
// //         modalWidthClass="max-w-md"
// //       >
// //         <div className="text-gray-700 mb-6 text-center">
// //           <p className="text-lg mb-3">
// //             Are you sure you want to delete the room category{' '}
// //             <strong className="font-semibold text-red-600">"{categoryToDelete?.name}"</strong>?
// //           </p>
// //           <p className="text-sm">
// //             This action cannot be undone and may affect existing rooms assigned to this category.
// //           </p>
// //         </div>
// //         <div className="flex justify-center space-x-3 sm:space-x-4 mt-6">
// //           <button
// //             onClick={closeDeleteConfirmModal}
// //             className="flex items-center px-4 py-2 bg-gray-300 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
// //             disabled={isDeleting}
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={confirmDeleteCategory}
// //             className="flex items-center px-4 py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
// //             disabled={isDeleting}
// //           >
// //             {isDeleting && <Loader2 size={20} className="animate-spin mr-2" />} Delete
// //           </button>
// //         </div>
// //       </MemoizedModal>

// //       {/* Image Gallery Modal */}
// //       <ImageGalleryModal
// //         isOpen={isGalleryModalOpen}
// //         onClose={closeGalleryModal}
// //         category={selectedCategoryForGallery}
// //       />

// //       <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
// //         {/* Header Section */}
// //         <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-3 sm:pb-4 border-b border-gray-300">
// //           <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 md:mb-0 flex items-center text-center md:text-left w-full justify-center md:justify-start">
// //             <Tag className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-700" />
// //             Room Categories
// //           </h1>
// //           <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
// //             <button
// //               onClick={() => {
// //                 setEditingCategory(null);
// //                 // Reset state only when explicitly adding a new category
// //                 setNewCategoryData({ name: '', description: '', capacity: '', isActive: true, imageUrl: '', pictures: [] });
// //                 setIsAddEditModalOpen(true);
// //                 toast.dismiss();
// //               }}
// //               className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-sm sm:text-base"
// //               title="Add a new room category"
// //             >
// //               <Plus size={20} className="mr-1.5 sm:mr-2" /> <span className="hidden sm:inline">Add New Category</span> <span className="sm:hidden">Add Category</span>
// //             </button>
// //           </div>
// //         </div>

// //         {/* Search Bars */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 sm:mb-6">
// //           <div className="relative">
// //             <input
// //               type="text"
// //               placeholder="Search by category name or description..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-white placeholder-gray-400
// //                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
// //               title="Search for room categories by name or description"
// //             />
// //             <div className="absolute left-3 top-1/2 -translate-y-1/2">
// //               <Tag size={16} className="text-gray-500" />
// //             </div>
// //           </div>

// //           <div className="relative">
// //             <input
// //               type="number"
// //               placeholder="Search by guests capacity..."
// //               value={guestSearchCount}
// //               onChange={(e) => setGuestSearchCount(e.target.value)}
// //               min="0"
// //               className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-white placeholder-gray-400
// //                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
// //               title="Search for room categories by maximum guest capacity"
// //             />
// //             <div className="absolute left-3 top-1/2 -translate-y-1/2">
// //               <Users size={16} className="text-gray-500" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Loading Spinner / Categories Display */}
// //         {isLoading ? (
// //           <div className="flex flex-col items-center justify-center py-10 sm:py-16">
// //             <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div>
// //             <p className="text-base sm:text-xl text-blue-800 font-medium">Fetching room categories...</p>
// //           </div>
// //         ) : displayedCategories.length === 0 && (searchTerm === '' && guestSearchCount === '') ? (
// //           <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
// //             <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found. Click "Add New Category" to get started.
// //           </div>
// //         ) : displayedCategories.length === 0 && (searchTerm !== '' || guestSearchCount !== '') ? (
// //           <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
// //             <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found for your search criteria.
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //             {currentCategories.map((cat) => (
// //               <div
// //                 key={cat._id}
// //                 className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-200 hover:scale-103 hover:shadow-xl flex flex-col"
// //               >
// //                 <div className="relative w-full h-48 sm:h-56 overflow-hidden">
// //                   <img
// //                     src={cat.imageUrl}
// //                     alt={cat.name}
// //                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
// //                     onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/E0E0E0/616161?text=Room+Image"; }}
// //                   />
// //                   <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
// //                     ${cat.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'} shadow-md`}>
// //                     {cat.isActive ? 'Active' : 'Inactive'}
// //                   </span>
// //                 </div>

// //                 <div className="p-4 flex flex-col flex-grow">
// //                   <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
// //                     <BedSingle size={20} className="mr-2 text-blue-600" /> {cat.name}
// //                   </h3>
// //                   <p className="text-gray-700 text-sm mb-3 flex-grow">
// //                     {cat.description || <span className="text-gray-400 italic">No description provided.</span>}
// //                   </p>

// //                   <div className="flex items-center justify-between text-gray-800 mb-4">
// //                     <span className="flex items-center text-lg font-semibold text-green-700">
// //                       <DollarSign size={18} className="mr-1" />
// //                       ₹{typeof cat.defaultPrice === 'number' ? cat.defaultPrice.toFixed(2) : 'N/A'}
// //                     </span>
// //                     <span className="flex items-center text-lg font-semibold text-blue-800">
// //                       <Users size={18} className="mr-1" />
// //                       {cat.capacity !== null ? `${cat.capacity} Guests` : 'N/A'}
// //                     </span>
// //                   </div>

// //                   <div className="flex flex-col gap-2 mt-auto">
// //                     <div className="grid grid-cols-2 gap-2">
// //                       <button
// //                         onClick={() => handleBookNowClick(cat.name)}
// //                         className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
// //                         title={`Book ${cat.name}`}
// //                       >
// //                         <CalendarPlus size={16} className="mr-1" /> Book
// //                       </button>
// //                       <button
// //                         onClick={() => handlePicturesClick(cat)}
// //                         className="flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
// //                         title={`View pictures for ${cat.name}`}
// //                       >
// //                         <Image size={16} className="mr-1" /> Pictures
// //                       </button>
// //                     </div>
// //                     <div className="grid grid-cols-2 gap-2">
// //                       <button
// //                         onClick={() => handleEditClick(cat)}
// //                         className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
// //                         title={`Edit ${cat.name}`}
// //                       >
// //                         <Edit size={16} className="mr-1" /> Edit
// //                       </button>
// //                       <button
// //                         onClick={() => handleDeleteClick(cat)}
// //                         className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
// //                         title={`Delete ${cat.name}`}
// //                       >
// //                         <Trash2 size={16} className="mr-1" /> Delete
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {totalPages > 1 && (
// //           <div className="flex justify-center mt-6 flex-wrap gap-1.5 sm:gap-2">
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


// //       <MemoizedModal // Use the memoized modal here
// //         isOpen={isAddEditModalOpen}
// //         onClose={closeAddEditModal}
// //         title={editingCategory ? 'Edit Room Category' : 'Add New Room Category'}
// //         icon={editingCategory ? Edit : Plus}
// //         modalWidthClass="max-w-xl md:max-w-2xl" // Keep the increased width
// //       >
// //         {/* Pass the memoized form content as children */}
// //         {AddEditCategoryFormContent}
// //       </MemoizedModal>


// //       <style>
// //         {`
// //         @keyframes fadeIn {
// //           from { opacity: 0; }
// //           to { opacity: 1; }
// //         }
// //         @keyframes scaleUpModal {
// //           from { transform: scale(0.95); opacity: 0; }
// //           to { transform: scale(1); opacity: 1; }
// //         }
// //         .animate-fade-in {
// //           animation: fadeIn 0.2s ease-out forwards;
// //         }
// //         .animate-scale-up-modal {
// //           animation: scaleUpModal 0.3s ease-out forwards;
// //         }

// //         /* Custom scrollbar for image gallery */
// //         .custom-scrollbar::-webkit-scrollbar {
// //             width: 8px;
// //             height: 8px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-track {
// //             background: #f1f1f1;
// //             border-radius: 10px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-thumb {
// //             background: #888;
// //             border-radius: 10px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
// //             background: #555;
// //         }
// //         `}
// //       </style>
// //     </div>
// //   );
// // };

// // export default RoomCategoryPage;
// import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
// import { createPortal } from 'react-dom';
// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// // Lucide React Icons
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Tag,
//   X,
//   Loader2,
//   Info,
//   BadgeInfo,
//   DollarSign,
//   Users,
//   AlertTriangle,
//   BedSingle,
//   CalendarPlus,
//   Image,
// } from 'lucide-react';

// // --- Memoized Individual Form Field Components ---
// const NameInput = memo(({ value, onChange }) => (
//   <div>
//     <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
//       Category Name <span className="text-red-500">*</span>
//     </label>
//     <div className="relative">
//       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//         <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
//       </div>
//       <input
//         type="text"
//         id="name"
//         name="name"
//         value={value}
//         onChange={onChange}
//         className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
//                    focus:outline-none focus:ring-0 focus:border-blue-500
//                    active:outline-none active:ring-0 active:border-blue-500
//                    focus-visible:outline-none focus-visible:ring-0 focus-visible:border-blue-500
//                    text-gray-900"
//         required
//         aria-describedby="category-name-help"
//         placeholder="e.g., Deluxe Suite, Executive Room"
//       />
//     </div>
//     <p id="category-name-help" className="mt-2 text-xs text-gray-500">
//       A unique and descriptive name for this room type.
//     </p>
//   </div>
// ));
// NameInput.displayName = 'NameInput';

// const DescriptionInput = memo(({ value, onChange }) => (
//   <div>
//     <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">
//       Description
//     </label>
//     <div className="relative">
//       <div className="absolute top-3 left-3 flex items-center pointer-events-none">
//         <BadgeInfo className="h-5 w-5 text-gray-400" aria-hidden="true" />
//       </div>
//       <textarea
//         id="description"
//         name="description"
//         value={value}
//         onChange={onChange}
//         rows="4"
//         className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
//                    focus:outline-none focus:ring-0 focus:border-blue-500
//                    active:outline-none active:ring-0 active:border-blue-500
//                    focus-visible:outline-none focus-visible:ring-0 focus-visible:border-blue-500
//                    text-gray-900 resize-y"
//         aria-describedby="category-description-help"
//         placeholder="e.g., A spacious room featuring a king-sized bed, city views, and a private balcony."
//       ></textarea>
//     </div>
//     <p id="category-description-help" className="mt-2 text-xs text-gray-500">
//       Detail the amenities and unique selling points of this category.
//     </p>
//   </div>
// ));
// DescriptionInput.displayName = 'DescriptionInput';

// const CapacityInput = memo(({ value, onChange }) => (
//   <div>
//     <label htmlFor="capacity" className="block text-sm font-semibold text-gray-700 mb-1.5">
//       Max Capacity (Guests) <span className="text-red-500">*</span>
//     </label>
//     <div className="relative">
//       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//         <Users className="h-5 w-5 text-gray-400" aria-hidden="true" />
//       </div>
//       <input
//         type="number"
//         id="capacity"
//         name="capacity"
//         value={value}
//         onChange={onChange}
//         min="1"
//         step="1"
//         className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
//                    focus:outline-none focus:ring-0 focus:border-blue-500
//                    active:outline-none active:ring-0 active:border-blue-500
//                    focus-visible:outline-none focus-visible:ring-0 focus-visible:border-blue-500
//                    text-gray-900"
//         placeholder="e.g., 2"
//         aria-describedby="category-capacity-help"
//         required
//       />
//     </div>
//     <p id="category-capacity-help" className="mt-2 text-xs text-gray-500">
//       The maximum number of guests this room category can accommodate.
//     </p>
//   </div>
// ));
// CapacityInput.displayName = 'CapacityInput';

// const DefaultPriceInput = memo(({ value, onChange }) => (
//   <div>
//     <label htmlFor="defaultPrice" className="block text-sm font-semibold text-gray-700 mb-1.5">
//       Default Price (₹) <span className="text-red-500">*</span>
//     </label>
//     <div className="relative">
//       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//         <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
//       </div>
//       <input
//         type="number"
//         id="defaultPrice"
//         name="defaultPrice"
//         value={value}
//         onChange={onChange}
//         min="0"
//         step="0.01"
//         className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
//                    focus:outline-none focus:ring-0 focus:border-blue-500
//                    active:outline-none active:ring-0 active:border-blue-500
//                    focus-visible:outline-none focus-visible:ring-0 focus-visible:border-blue-500
//                    text-gray-900"
//         placeholder="e.g., 2500.00"
//         aria-describedby="category-price-help"
//         required
//       />
//     </div>
//     <p id="category-price-help" className="mt-2 text-xs text-gray-500">
//       The default price per night for this room category.
//     </p>
//   </div>
// ));
// DefaultPriceInput.displayName = 'DefaultPriceInput';

// const NumberOfBedsInput = memo(({ value, onChange }) => (
//   <div>
//     <label htmlFor="beds" className="block text-sm font-semibold text-gray-700 mb-1.5">
//       Number of Beds <span className="text-red-500">*</span>
//     </label>
//     <div className="relative">
//       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//         <BedSingle className="h-5 w-5 text-gray-400" aria-hidden="true" />
//       </div>
//       <input
//         type="number"
//         id="beds"
//         name="beds"
//         value={value}
//         onChange={onChange}
//         min="1"
//         step="1"
//         className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
//                    focus:outline-none focus:ring-0 focus:border-blue-500
//                    active:outline-none active:ring-0 active:border-blue-500
//                    focus-visible:outline-none focus-visible:ring-0 focus-visible:border-blue-500
//                    text-gray-900"
//         placeholder="e.g., 1 King, 2 Twin"
//         aria-describedby="category-beds-help"
//         required
//       />
//     </div>
//     <p id="category-beds-help" className="mt-2 text-xs text-gray-500">
//       The total number of beds available in this room category.
//     </p>
//   </div>
// ));
// NumberOfBedsInput.displayName = 'NumberOfBedsInput';

// const ImageUrlInput = memo(({ value, onChange }) => (
//   <div>
//     <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-1.5">
//       Main Image URL
//     </label>
//     <div className="relative">
//       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//         <Image className="h-5 w-5 text-gray-400" aria-hidden="true" />
//       </div>
//       <input
//         type="url"
//         id="imageUrl"
//         name="imageUrl"
//         value={value}
//         onChange={onChange}
//         className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
//                    focus:outline-none focus:ring-0 focus:border-blue-500
//                    active:outline-none active:ring-0 active:border-blue-500
//                    focus-visible:outline-none focus-visible:ring-0 focus-visible:border-blue-500
//                    text-gray-900"
//         placeholder="e.g., https://example.com/room-image.jpg"
//         aria-describedby="category-image-help"
//       />
//     </div>
//     <p id="category-image-help" className="mt-2 text-xs text-gray-500">
//       URL for the primary image of this room category.
//     </p>
//   </div>
// ));
// ImageUrlInput.displayName = 'ImageUrlInput';

// const IsActiveToggle = memo(({ checked, onChange }) => (
//   <div className="flex items-center mt-6 pt-3 border-t border-gray-200">
//     <input
//       id="isActive"
//       name="isActive"
//       type="checkbox"
//       checked={checked}
//       onChange={onChange}
//       className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md transition-colors duration-200"
//     />
//     <label htmlFor="isActive" className="ml-3 block text-base font-medium text-gray-700 cursor-pointer">
//       Category is Active
//     </label>
//   </div>
// ));
// IsActiveToggle.displayName = 'IsActiveToggle';

// // --- Main RoomCategoryPage Component ---
// const RoomCategoryPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [guestSearchCount, setGuestSearchCount] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [displayedCategories, setDisplayedCategories] = useState([]);
//   const [newCategoryData, setNewCategoryData] = useState({
//     name: '',
//     description: '',
//     capacity: '',
//     defaultPrice: '',
//     beds: '',
//     isActive: true,
//     imageUrl: '',
//     pictures: [],
//   });
//   const [editingCategory, setEditingCategory] = useState(null);

//   const [isLoading, setIsLoading] = useState(true);
//   const [isFormSubmitting, setIsFormSubmitting] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
//   const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null);

//   const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
//   const [selectedCategoryForGallery, setSelectedCategoryForGallery] = useState(null);

//   const navigate = useNavigate();

//   const ITEMS_PER_PAGE = 8;
//   const API_BASE_URL = 'https://havana-backend.vercel.app/api/room-categories';

//   const fetchCategoriesData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(API_BASE_URL);
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: response.statusText }));
//         throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`);
//       }
//       const data = await response.json();

//       let processedCategories = [];
//       if (data && Array.isArray(data.categories)) {
//         processedCategories = data.categories.map(cat => ({
//           _id: cat._id,
//           name: cat.category,
//           isActive: cat.status === 'Active',
//           description: cat.description || '',
//           defaultPrice: typeof cat.defaultPrice === 'number' ? cat.defaultPrice : '',
//           capacity: cat.capacity || '',
//           beds: cat.beds || '',
//           imageUrl: cat.imageUrl || `https://placehold.co/400x250/F0F0F0/666666?text=${cat.category.replace(/\s/g, '+')}`,
//           pictures: Array.isArray(cat.pictures) ? cat.pictures : [],
//         }));
//       } else {
//         console.warn("API response for room categories did not contain a 'categories' array. Received:", data);
//         processedCategories = [];
//       }

//       setCategories(processedCategories);
//       toast.success('Room categories loaded successfully!');
//     } catch (error) {
//       console.error('Failed to fetch room categories:', error);
//       toast.error(`Failed to load room categories: ${error.message}. Please check console.`);
//       setCategories([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategoriesData();
//   }, [fetchCategoriesData]);

//   useEffect(() => {
//     const filtered = Array.isArray(categories)
//       ? categories.filter((cat) => {
//           const matchesSearchTerm =
//             (cat.name || '').toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
//             (cat.description || '').toLowerCase().includes(searchTerm.toLowerCase().trim());

//           const guestCountNum = parseInt(guestSearchCount, 10);
//           const matchesGuestCount =
//             isNaN(guestCountNum) || guestCountNum <= 0 || (cat.capacity && cat.capacity >= guestCountNum);

//           return matchesSearchTerm && matchesGuestCount;
//         })
//       : [];

//     setDisplayedCategories(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, guestSearchCount, categories]);

//   const totalPages = Math.ceil(displayedCategories.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentCategories = displayedCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   const handleInputChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setNewCategoryData(prevData => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   }, []);

//   const resetFormData = useCallback(() => {
//     setNewCategoryData({
//       name: '',
//       description: '',
//       capacity: '',
//       defaultPrice: '',
//       beds: '',
//       isActive: true,
//       imageUrl: '',
//       pictures: [],
//     });
//   }, []);

//   const handleSaveCategory = useCallback(async (e) => {
//     e.preventDefault();
//     toast.dismiss();

//     if (!newCategoryData.name.trim()) {
//       toast.error('Category name cannot be empty.');
//       return;
//     }
//     const isDuplicate = categories.some(
//       (cat) =>
//         cat.name.toLowerCase() === newCategoryData.name.trim().toLowerCase() &&
//         (editingCategory ? cat._id !== editingCategory._id : true)
//     );
//     if (isDuplicate) {
//       toast.error('A category with this name already exists.');
//       return;
//     }

//     if (newCategoryData.capacity && (!Number.isInteger(Number(newCategoryData.capacity)) || Number(newCategoryData.capacity) <= 0)) {
//       toast.error('Capacity must be a positive whole number.');
//       return;
//     }
//     if (newCategoryData.defaultPrice === '' || Number(newCategoryData.defaultPrice) < 0) {
//       toast.error('Default Price cannot be empty and must be a non-negative number.');
//       return;
//     }
//     if (newCategoryData.beds === '' || !Number.isInteger(Number(newCategoryData.beds)) || Number(newCategoryData.beds) <= 0) {
//       toast.error('Number of Beds cannot be empty and must be a positive whole number.');
//       return;
//     }

//     setIsFormSubmitting(true);
//     try {
//       const categoryPayload = {
//         category: newCategoryData.name.trim(),
//         status: newCategoryData.isActive ? 'Active' : 'Inactive',
//         description: newCategoryData.description.trim(),
//         capacity: newCategoryData.capacity ? parseInt(newCategoryData.capacity, 10) : 1,
//         defaultPrice: newCategoryData.defaultPrice ? parseFloat(newCategoryData.defaultPrice) : 0,
//         beds: newCategoryData.beds ? parseInt(newCategoryData.beds, 10) : 1,
//         imageUrl: newCategoryData.imageUrl,
//         pictures: newCategoryData.pictures
//       };

//       let response;
//       if (editingCategory) {
//         response = await fetch(`${API_BASE_URL}/${editingCategory._id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(categoryPayload),
//         });
//         if (!response.ok) {
//           throw new Error(`Failed to update category: ${response.statusText}`);
//         }
//         toast.success('Room category updated successfully!');
//       } else {
//         response = await fetch(API_BASE_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(categoryPayload),
//         });
//         if (!response.ok) {
//           throw new Error(`Failed to add category: ${response.statusText}`);
//         }
//         toast.success('Room category added successfully!');
//       }

//       await fetchCategoriesData();
//       closeAddEditModal();
//     } catch (error) {
//       console.error('Error saving room category:', error);
//       toast.error(`Error saving category: ${error.message}`);
//     } finally {
//       setIsFormSubmitting(false);
//     }
//   }, [newCategoryData, categories, editingCategory, fetchCategoriesData]);

//   const handleEditClick = useCallback((category) => {
//     setNewCategoryData({
//       name: category.name || '',
//       description: category.description || '',
//       capacity: category.capacity || '',
//       defaultPrice: category.defaultPrice !== undefined ? category.defaultPrice : '',
//       beds: category.beds !== undefined ? category.beds : '',
//       isActive: category.isActive,
//       imageUrl: category.imageUrl || '',
//       pictures: category.pictures || [],
//     });
//     setEditingCategory(category);
//     setIsAddEditModalOpen(true);
//     toast.dismiss();
//   }, []);

//   const handleDeleteClick = useCallback((category) => {
//     setCategoryToDelete(category);
//     setIsDeleteConfirmModalOpen(true);
//     toast.dismiss();
//   }, []);

//   const confirmDeleteCategory = useCallback(async () => {
//     if (!categoryToDelete) return;

//     setIsDeleting(true);
//     toast.dismiss();

//     try {
//       const response = await fetch(`${API_BASE_URL}/${categoryToDelete._id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete category: ${response.statusText}`);
//       }

//       toast.success(`Category "${categoryToDelete.name}" deleted successfully!`);
//       await fetchCategoriesData();
//       closeDeleteConfirmModal();
//     } catch (error) {
//       console.error('Error deleting room category:', error);
//       toast.error(`Error deleting category: ${error.message}`);
//     } finally {
//       setIsDeleting(false);
//     }
//   }, [categoryToDelete, fetchCategoriesData]);

//   const handleBookNowClick = useCallback((categoryName) => {
//     toast.success(`Navigating to booking page for ${categoryName}!`);
//     navigate('/booking/add');
//   }, [navigate]);

//   const handlePicturesClick = useCallback((category) => {
//     setSelectedCategoryForGallery(category);
//     setIsGalleryModalOpen(true);
//   }, []);

//   const closeAddEditModal = useCallback(() => {
//     setIsAddEditModalOpen(false);
//     resetFormData();
//     setEditingCategory(null);
//     setIsFormSubmitting(false);
//     toast.dismiss();
//   }, [resetFormData]);

//   const closeDeleteConfirmModal = useCallback(() => {
//     setIsDeleteConfirmModalOpen(false);
//     setCategoryToDelete(null);
//     setIsDeleting(false);
//     toast.dismiss();
//   }, []);

//   const closeGalleryModal = useCallback(() => {
//     setIsGalleryModalOpen(false);
//     setSelectedCategoryForGallery(null);
//   }, []);

//   const MemoizedModal = memo(({ isOpen, onClose, title, children, icon: IconComponent, modalWidthClass = 'max-w-md' }) => {
//     if (!isOpen) return null;

//     return createPortal(
//       <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4">
//         <div className={`bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full ${modalWidthClass} border-t-4 border-blue-500`}>
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
//       document.body
//     );
//   });
//   MemoizedModal.displayName = 'MemoizedModal';

//   const ImageGalleryModal = memo(({ isOpen, onClose, category }) => {
//     if (!isOpen || !category) return null;

//     return createPortal(
//       <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 **p-0 sm:p-3 md:p-4**"> {/* Changed padding */}
//         <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl **w-full sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl** border-t-4 border-purple-500 **h-full sm:h-auto overflow-auto sm:overflow-hidden**"> {/* Changed max-w and added h-full */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//             aria-label="Close gallery modal"
//           >
//             <X size={24} />
//           </button>
//           <div className="flex flex-col items-center mb-4 sm:mb-6">
//             <Image className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600 mb-2 sm:mb-3" />
//             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1.5 mt-1.5 sm:mb-2 sm:mt-2 text-center">
//               Pictures for {category.name}
//             </h3>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
//             {category.pictures && category.pictures.length > 0 ? (
//               category.pictures.map((pic, index) => (
//                 <div key={index} className="relative w-full pb-[75%] rounded-lg overflow-hidden shadow-md group">
//                   <img
//                     src={pic}
//                     alt={`${category.name} - ${index + 1}`}
//                     className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
//                     onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/E0E0E0/616161?text=Image+Not+Found"; }}
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
//                     <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       View
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center text-gray-500 py-6">
//                 <Info className="inline-block h-5 w-5 mr-1 text-gray-400" /> No pictures available for this category.
//               </div>
//             )}
//           </div>
//           <div className="flex justify-end mt-6">
//             <button
//               onClick={onClose}
//               className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>,
//       document.body
//     );
//   });
//   ImageGalleryModal.displayName = 'ImageGalleryModal';

//   const AddEditCategoryFormContent = useMemo(() => {
//     return (
//       <form onSubmit={handleSaveCategory} className="space-y-5">
//         <NameInput
//           value={newCategoryData.name}
//           onChange={handleInputChange}
//         />

//         <DescriptionInput
//           value={newCategoryData.description}
//           onChange={handleInputChange}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <CapacityInput
//             value={newCategoryData.capacity}
//             onChange={handleInputChange}
//           />
//           <DefaultPriceInput
//             value={newCategoryData.defaultPrice}
//             onChange={handleInputChange}
//           />
//         </div>

//         <NumberOfBedsInput
//           value={newCategoryData.beds}
//           onChange={handleInputChange}
//         />

//         <ImageUrlInput
//           value={newCategoryData.imageUrl}
//           onChange={handleInputChange}
//         />

//         <IsActiveToggle
//           checked={newCategoryData.isActive}
//           onChange={handleInputChange}
//         />

//         <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
//           <button
//             type="button"
//             onClick={closeAddEditModal}
//             className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold
//                          hover:bg-gray-100 transition-colors duration-200 shadow-sm
//                          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
//             disabled={isFormSubmitting}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2.5 bg-blue-800 text-white rounded-lg font-semibold
//                          hover:bg-blue-900 transition-all duration-200 flex items-center justify-center gap-2
//                          disabled:opacity-50 disabled:cursor-not-allowed shadow-md
//                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transform hover:scale-[1.02]"
//             disabled={isFormSubmitting}
//           >
//             {isFormSubmitting && <Loader2 size={20} className="animate-spin" />}
//             {editingCategory ? 'Update Category' : 'Add Category'}
//           </button>
//         </div>
//       </form>
//     );
//   }, [newCategoryData, handleInputChange, handleSaveCategory, closeAddEditModal, editingCategory, isFormSubmitting]);


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-2 sm:p-3 md:p-6 font-sans text-gray-800">
//       <Toaster position="top-right" reverseOrder={false} />

//       {/* Delete Confirmation Modal */}
//       <MemoizedModal
//         isOpen={isDeleteConfirmModalOpen}
//         onClose={closeDeleteConfirmModal}
//         title="Confirm Deletion"
//         icon={AlertTriangle}
//         modalWidthClass="max-w-md"
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
//             className="flex items-center px-4 py-2 bg-gray-300 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
//             disabled={isDeleting}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={confirmDeleteCategory}
//             className="flex items-center px-4 py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
//             disabled={isDeleting}
//           >
//             {isDeleting && <Loader2 size={20} className="animate-spin mr-2" />} Delete
//           </button>
//         </div>
//       </MemoizedModal>

//       {/* Image Gallery Modal */}
//       <ImageGalleryModal
//         isOpen={isGalleryModalOpen}
//         onClose={closeGalleryModal}
//         category={selectedCategoryForGallery}
//       />

//       <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-3 sm:pb-4 border-b border-gray-300">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 md:mb-0 flex items-center text-center md:text-left w-full justify-center md:justify-start">
//             <Tag className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-700" />
//             Room Categories
//           </h1>
//           <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
//             <button
//               onClick={() => {
//                 setEditingCategory(null);
//                 resetFormData();
//                 setIsAddEditModalOpen(true);
//                 toast.dismiss();
//               }}
//               className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-sm sm:text-base"
//               title="Add a new room category"
//             >
//               <Plus size={20} className="mr-1.5 sm:mr-2" /> <span className="hidden sm:inline">Add New Category</span> <span className="sm:hidden">Add Category</span>
//             </button>
//           </div>
//         </div>

//         {/* Search Bars */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 sm:mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search by category name or description..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-white placeholder-gray-400
//                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
//               title="Search for room categories by name or description"
//             />
//             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//               <Tag size={16} className="text-gray-500" />
//             </div>
//           </div>

//           <div className="relative">
//             <input
//               type="number"
//               placeholder="Search by guests capacity..."
//               value={guestSearchCount}
//               onChange={(e) => setGuestSearchCount(e.target.value)}
//               min="0"
//               className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-white placeholder-gray-400
//                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
//               title="Search for room categories by maximum guest capacity"
//             />
//             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//               <Users size={16} className="text-gray-500" />
//             </div>
//           </div>
//         </div>

//         {/* Loading Spinner / Categories Display */}
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center py-10 sm:py-16">
//             <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div>
//             <p className="text-base sm:text-xl text-blue-800 font-medium">Fetching room categories...</p>
//           </div>
//         ) : displayedCategories.length === 0 && (searchTerm === '' && guestSearchCount === '') ? (
//           <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
//             <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found. Click "Add New Category" to get started.
//           </div>
//         ) : displayedCategories.length === 0 && (searchTerm !== '' || guestSearchCount !== '') ? (
//           <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
//             <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found for your search criteria.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {currentCategories.map((cat) => (
//               <div
//                 key={cat._id}
//                 className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-200 hover:scale-103 hover:shadow-xl flex flex-col"
//               >
//                 <div className="relative w-full h-48 sm:h-56 overflow-hidden">
//                   <img
//                     src={cat.imageUrl}
//                     alt={cat.name}
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                     onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/E0E0E0/616161?text=Room+Image"; }}
//                   />
//                   <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
//                     ${cat.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'} shadow-md`}>
//                     {cat.isActive ? 'Active' : 'Inactive'}
//                   </span>
//                 </div>

//                 <div className="p-4 flex flex-col flex-grow">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
//                     <BedSingle size={20} className="mr-2 text-blue-600" /> {cat.name}
//                   </h3>
//                   <p className="text-gray-700 text-sm mb-3 flex-grow">
//                     {cat.description || <span className="text-gray-400 italic">No description provided.</span>}
//                   </p>

//                   <div className="flex items-center justify-between text-gray-800 mb-4">
//                     <span className="flex items-center text-lg font-semibold text-green-700">
//                       <DollarSign size={18} className="mr-1" />
//                       ₹{typeof cat.defaultPrice === 'number' ? cat.defaultPrice.toFixed(2) : 'N/A'}
//                     </span>
//                     <span className="flex items-center text-lg font-semibold text-blue-800">
//                       <Users size={18} className="mr-1" />
//                       {cat.capacity !== null ? `${cat.capacity} Guests` : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex items-center text-gray-800 mb-4">
//                     <span className="flex items-center text-base font-medium text-gray-600">
//                       <BedSingle size={18} className="mr-1" />
//                       {cat.beds !== null ? `${cat.beds} Beds` : 'N/A'}
//                     </span>
//                   </div>

//                   <div className="flex flex-col gap-2 mt-auto">
//                     <div className="grid grid-cols-2 gap-2">
//                       <button
//                         onClick={() => handleBookNowClick(cat.name)}
//                         className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
//                         title={`Book ${cat.name}`}
//                       >
//                         <CalendarPlus size={16} className="mr-1" /> Book
//                       </button>
//                       <button
//                         onClick={() => handlePicturesClick(cat)}
//                         className="flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
//                         title={`View pictures for ${cat.name}`}
//                       >
//                         <Image size={16} className="mr-1" /> Pictures
//                       </button>
//                     </div>
//                     <div className="grid grid-cols-2 gap-2">
//                       <button
//                         onClick={() => handleEditClick(cat)}
//                         className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
//                         title={`Edit ${cat.name}`}
//                       >
//                         <Edit size={16} className="mr-1" /> Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(cat)}
//                         className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
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

//       <MemoizedModal
//         isOpen={isAddEditModalOpen}
//         onClose={closeAddEditModal}
//         title={editingCategory ? 'Edit Room Category' : 'Add New Room Category'}
//         icon={editingCategory ? Edit : Plus}
//         modalWidthClass="max-w-xl md:max-w-2xl"
//       >
//         {AddEditCategoryFormContent}
//       </MemoizedModal>
//     </div>
//   );
// };

// export default RoomCategoryPage;

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Lucide React Icons
import {
  Plus,
  Edit,
  Trash2,
  Tag,
  X,
  Loader2,
  Info,
  BadgeInfo,
  DollarSign,
  Users,
  AlertTriangle,
  BedSingle,
  CalendarPlus,
  Image,
} from 'lucide-react';

// --- Memoized Individual Form Field Components ---
const NameInput = memo(({ value, onChange }) => (
  <div>
    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
      Category Name <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        id="name"
        name="name"
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-0 focus:border-blue-500
                   active:outline-none active:ring-0 active:border-blue-500
                   focus-visible:outline-none focus-visible:ring-0 focus-visible:border-blue-500
                   text-gray-900 **!important transition-none !important animation-none**" // <-- FIX APPLIED HERE
        required
        aria-describedby="category-name-help"
        placeholder="e.g., Deluxe Suite, Executive Room"
      />
    </div>
    <p id="category-name-help" className="mt-2 text-xs text-gray-500">
      A unique and descriptive name for this room type.
    </p>
  </div>
));
NameInput.displayName = 'NameInput';

const DescriptionInput = memo(({ value, onChange }) => (
  <div>
    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">
      Description
    </label>
    <div className="relative">
      <div className="absolute top-3 left-3 flex items-center pointer-events-none">
        <BadgeInfo className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <textarea
        id="description"
        name="description"
        value={value}
        onChange={onChange}
        rows="4"
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-0 focus:border-blue-500
                   active:outline-none active:ring-0 active:border-blue-500
                   focus-visible:outline-none focus-visible:ring-0 focus-visible:border-blue-500
                   text-gray-900 resize-y **!important transition-none !important animation-none**" // <-- FIX APPLIED HERE
        aria-describedby="category-description-help"
        placeholder="e.g., A spacious room featuring a king-sized bed, city views, and a private balcony."
      ></textarea>
    </div>
    <p id="category-description-help" className="mt-2 text-xs text-gray-500">
      Detail the amenities and unique selling points of this category.
    </p>
  </div>
));
DescriptionInput.displayName = 'DescriptionInput';

const CapacityInput = memo(({ value, onChange }) => (
  <div>
    <label htmlFor="capacity" className="block text-sm font-semibold text-gray-700 mb-1.5">
      Max Capacity (Guests) <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Users className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="number"
        id="capacity"
        name="capacity"
        value={value}
        onChange={onChange}
        min="1"
        step="1"
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-0 focus:border-blue-500
                   active:outline-none active:ring-0 active:border-blue-500
                   focus-visible:outline-none focus-visible:ring-0 focus-visible:border-blue-500
                   text-gray-900 **!important transition-none !important animation-none**" // <-- FIX APPLIED HERE
        placeholder="e.g., 2"
        aria-describedby="category-capacity-help"
        required
      />
    </div>
    <p id="category-capacity-help" className="mt-2 text-xs text-gray-500">
      The maximum number of guests this room category can accommodate.
    </p>
  </div>
));
CapacityInput.displayName = 'CapacityInput';

const NumberOfBedsInput = memo(({ value, onChange }) => (
  <div>
    <label htmlFor="beds" className="block text-sm font-semibold text-gray-700 mb-1.5">
      Number of Beds <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <BedSingle className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="number"
        id="beds"
        name="beds"
        value={value}
        onChange={onChange}
        min="1"
        step="1"
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-0 focus:border-blue-500
                   active:outline-none active:ring-0 active:border-blue-500
                   focus-visible:outline-none focus-visible:ring-0 focus-visible:border-blue-500
                   text-gray-900 **!important transition-none !important animation-none**" // <-- FIX APPLIED HERE
        placeholder="e.g., 1 King, 2 Twin"
        aria-describedby="category-beds-help"
        required
      />
    </div>
    <p id="category-beds-help" className="mt-2 text-xs text-gray-500">
      The total number of beds available in this room category.
    </p>
  </div>
));
NumberOfBedsInput.displayName = 'NumberOfBedsInput';

const ImageUrlInput = memo(({ value, onChange }) => (
  <div>
    <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-1.5">
      Main Image URL
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Image className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="url"
        id="imageUrl"
        name="imageUrl"
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-0 focus:border-blue-500
                   active:outline-none active:ring-0 active:border-blue-500
                   focus-visible:outline-none focus-visible:ring-0 focus-visible:border-blue-500
                   text-gray-900 **!important transition-none !important animation-none**" // <-- FIX APPLIED HERE
        placeholder="e.g., https://example.com/room-image.jpg"
        aria-describedby="category-image-help"
      />
    </div>
    <p id="category-image-help" className="mt-2 text-xs text-gray-500">
      URL for the primary image of this room category.
    </p>
  </div>
));
ImageUrlInput.displayName = 'ImageUrlInput';

const IsActiveToggle = memo(({ checked, onChange }) => (
  <div className="flex items-center mt-6 pt-3 border-t border-gray-200">
    <input
      id="isActive"
      name="isActive"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md transition-colors duration-200"
    />
    <label htmlFor="isActive" className="ml-3 block text-base font-medium text-gray-700 cursor-pointer">
      Category is Active
    </label>
  </div>
));
IsActiveToggle.displayName = 'IsActiveToggle';

// --- Main RoomCategoryPage Component ---
const RoomCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [guestSearchCount, setGuestSearchCount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [newCategoryData, setNewCategoryData] = useState({
    name: '',
    description: '',
    capacity: '',
    beds: '',
    isActive: true,
    imageUrl: '',
    pictures: [],
  });
  const [editingCategory, setEditingCategory] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedCategoryForGallery, setSelectedCategoryForGallery] = useState(null);

  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 8;
  const API_BASE_URL = 'https://havana-backend.vercel.app/api/room-categories';

  const fetchCategoriesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }
      const data = await response.json();

      let processedCategories = [];
      if (data && Array.isArray(data.categories)) {
        processedCategories = data.categories.map(cat => ({
          _id: cat._id,
          name: cat.category,
          isActive: cat.status === 'Active',
          description: cat.description || '',
          defaultPrice: typeof cat.defaultPrice === 'number' ? cat.defaultPrice : undefined,
          capacity: cat.capacity || '',
          beds: cat.beds || '',
          imageUrl: cat.imageUrl || `https://placehold.co/400x250/F0F0F0/666666?text=${cat.category.replace(/\s/g, '+')}`,
          pictures: Array.isArray(cat.pictures) ? cat.pictures : [],
        }));
      } else {
        console.warn("API response for room categories did not contain a 'categories' array. Received:", data);
        processedCategories = [];
      }

      setCategories(processedCategories);
      toast.success('Room categories loaded successfully!');
    } catch (error) {
      console.error('Failed to fetch room categories:', error);
      toast.error(`Failed to load room categories: ${error.message}. Please check console.`);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategoriesData();
  }, [fetchCategoriesData]);

  useEffect(() => {
    const filtered = Array.isArray(categories)
      ? categories.filter((cat) => {
          const matchesSearchTerm =
            (cat.name || '').toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
            (cat.description || '').toLowerCase().includes(searchTerm.toLowerCase().trim());

          const guestCountNum = parseInt(guestSearchCount, 10);
          const matchesGuestCount =
            isNaN(guestCountNum) || guestCountNum <= 0 || (cat.capacity && cat.capacity >= guestCountNum);

          return matchesSearchTerm && matchesGuestCount;
        })
      : [];

    setDisplayedCategories(filtered);
    setCurrentPage(1);
  }, [searchTerm, guestSearchCount, categories]);

  const totalPages = Math.ceil(displayedCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCategories = displayedCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setNewCategoryData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const resetFormData = useCallback(() => {
    setNewCategoryData({
      name: '',
      description: '',
      capacity: '',
      beds: '',
      isActive: true,
      imageUrl: '',
      pictures: [],
    });
  }, []);

  const handleSaveCategory = useCallback(async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!newCategoryData.name.trim()) {
      toast.error('Category name cannot be empty.');
      return;
    }
    const isDuplicate = categories.some(
      (cat) =>
        cat.name.toLowerCase() === newCategoryData.name.trim().toLowerCase() &&
        (editingCategory ? cat._id !== editingCategory._id : true)
    );
    if (isDuplicate) {
      toast.error('A category with this name already exists.');
      return;
    }

    if (newCategoryData.capacity && (!Number.isInteger(Number(newCategoryData.capacity)) || Number(newCategoryData.capacity) <= 0)) {
      toast.error('Capacity must be a positive whole number.');
      return;
    }
    if (newCategoryData.beds === '' || !Number.isInteger(Number(newCategoryData.beds)) || Number(newCategoryData.beds) <= 0) {
      toast.error('Number of Beds cannot be empty and must be a positive whole number.');
      return;
    }

    setIsFormSubmitting(true);
    try {
      const categoryPayload = {
        category: newCategoryData.name.trim(),
        status: newCategoryData.isActive ? 'Active' : 'Inactive',
        description: newCategoryData.description.trim(),
        capacity: newCategoryData.capacity ? parseInt(newCategoryData.capacity, 10) : 1,
        beds: newCategoryData.beds ? parseInt(newCategoryData.beds, 10) : 1,
        imageUrl: newCategoryData.imageUrl,
        pictures: newCategoryData.pictures
      };

      let response;
      if (editingCategory) {
        response = await fetch(`${API_BASE_URL}/${editingCategory._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryPayload),
        });
        if (!response.ok) {
          throw new Error(`Failed to update category: ${response.statusText}`);
        }
        toast.success('Room category updated successfully!');
      } else {
        response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryPayload),
        });
        if (!response.ok) {
          throw new Error(`Failed to add category: ${response.statusText}`);
        }
        toast.success('Room category added successfully!');
      }

      await fetchCategoriesData();
      closeAddEditModal();
    } catch (error) {
      console.error('Error saving room category:', error);
      toast.error(`Error saving category: ${error.message}`);
    } finally {
      setIsFormSubmitting(false);
    }
  }, [newCategoryData, categories, editingCategory, fetchCategoriesData]);

  const handleEditClick = useCallback((category) => {
    setNewCategoryData({
      name: category.name || '',
      description: category.description || '',
      capacity: category.capacity || '',
      beds: category.beds !== undefined ? category.beds : '',
      isActive: category.isActive,
      imageUrl: category.imageUrl || '',
      pictures: category.pictures || [],
    });
    setEditingCategory(category);
    setIsAddEditModalOpen(true);
    toast.dismiss();
  }, []);

  const handleDeleteClick = useCallback((category) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmModalOpen(true);
    toast.dismiss();
  }, []);

  const confirmDeleteCategory = useCallback(async () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    toast.dismiss();

    try {
      const response = await fetch(`${API_BASE_URL}/${categoryToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete category: ${response.statusText}`);
      }

      toast.success(`Category "${categoryToDelete.name}" deleted successfully!`);
      await fetchCategoriesData();
      closeDeleteConfirmModal();
    } catch (error) {
      console.error('Error deleting room category:', error);
      toast.error(`Error deleting category: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  }, [categoryToDelete, fetchCategoriesData]);

  const handleBookNowClick = useCallback((categoryName) => {
    toast.success(`Navigating to booking page for ${categoryName}!`);
    navigate('/booking/add');
  }, [navigate]);

  const handlePicturesClick = useCallback((category) => {
    setSelectedCategoryForGallery(category);
    setIsGalleryModalOpen(true);
  }, []);

  const closeAddEditModal = useCallback(() => {
    setIsAddEditModalOpen(false);
    resetFormData();
    setEditingCategory(null);
    setIsFormSubmitting(false);
    toast.dismiss();
  }, [resetFormData]);

  const closeDeleteConfirmModal = useCallback(() => {
    setIsDeleteConfirmModalOpen(false);
    setCategoryToDelete(null);
    setIsDeleting(false);
    toast.dismiss();
  }, []);

  const closeGalleryModal = useCallback(() => {
    setIsGalleryModalOpen(false);
    setSelectedCategoryForGallery(null);
  }, []);

  const MemoizedModal = memo(({ isOpen, onClose, title, children, icon: IconComponent, modalWidthClass = 'max-w-md' }) => {
    if (!isOpen) return null;

    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4">
        <div className={`bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full ${modalWidthClass} border-t-4 border-blue-500`}>
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
      document.body
    );
  });
  MemoizedModal.displayName = 'MemoizedModal';

  const ImageGalleryModal = memo(({ isOpen, onClose, category }) => {
    if (!isOpen || !category) return null;

    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-0 sm:p-3 md:p-4">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl w-full sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl border-t-4 border-purple-500 h-full sm:h-auto overflow-auto sm:overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close gallery modal"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <Image className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600 mb-2 sm:mb-3" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1.5 mt-1.5 sm:mb-2 sm:mt-2 text-center">
              Pictures for {category.name}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {category.pictures && category.pictures.length > 0 ? (
              category.pictures.map((pic, index) => (
                <div key={index} className="relative w-full pb-[75%] rounded-lg overflow-hidden shadow-md group">
                  <img
                    src={pic}
                    alt={`${category.name} - ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/E0E0E0/616161?text=Image+Not+Found"; }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-6">
                <Info className="inline-block h-5 w-5 mr-1 text-gray-400" /> No pictures available for this category.
              </div>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  });
  ImageGalleryModal.displayName = 'ImageGalleryModal';

  const AddEditCategoryFormContent = useMemo(() => {
    return (
      <form onSubmit={handleSaveCategory} className="space-y-5">
        <NameInput
          value={newCategoryData.name}
          onChange={handleInputChange}
        />

        <DescriptionInput
          value={newCategoryData.description}
          onChange={handleInputChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CapacityInput
            value={newCategoryData.capacity}
            onChange={handleInputChange}
          />
        </div>

        <NumberOfBedsInput
          value={newCategoryData.beds}
          onChange={handleInputChange}
        />

        <ImageUrlInput
          value={newCategoryData.imageUrl}
          onChange={handleInputChange}
        />

        <IsActiveToggle
          checked={newCategoryData.isActive}
          onChange={handleInputChange}
        />

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={closeAddEditModal}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold
                         hover:bg-gray-100 transition-colors duration-200 shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            disabled={isFormSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-800 text-white rounded-lg font-semibold
                         hover:bg-blue-900 transition-all duration-200 flex items-center justify-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed shadow-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transform hover:scale-[1.02]"
            disabled={isFormSubmitting}
          >
            {isFormSubmitting && <Loader2 size={20} className="animate-spin" />}
            {editingCategory ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </form>
    );
  }, [newCategoryData, handleInputChange, handleSaveCategory, closeAddEditModal, editingCategory, isFormSubmitting]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-2 sm:p-3 md:p-6 font-sans text-gray-800">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Delete Confirmation Modal */}
      <MemoizedModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={closeDeleteConfirmModal}
        title="Confirm Deletion"
        icon={AlertTriangle}
        modalWidthClass="max-w-md"
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
            className="flex items-center px-4 py-2 bg-gray-300 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
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
      </MemoizedModal>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={isGalleryModalOpen}
        onClose={closeGalleryModal}
        category={selectedCategoryForGallery}
      />

      <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-3 sm:pb-4 border-b border-gray-300">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 md:mb-0 flex items-center text-center md:text-left w-full justify-center md:justify-start">
            <Tag className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-blue-700" />
            Room Categories
          </h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
            <button
              onClick={() => {
                setEditingCategory(null);
                resetFormData();
                setIsAddEditModalOpen(true);
                toast.dismiss();
              }}
              className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-sm sm:text-base"
              title="Add a new room category"
            >
              <Plus size={20} className="mr-1.5 sm:mr-2" /> <span className="hidden sm:inline">Add New Category</span> <span className="sm:hidden">Add Category</span>
            </button>
          </div>
        </div>

        {/* Search Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 sm:mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by category name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
              title="Search for room categories by name or description"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Tag size={16} className="text-gray-500" />
            </div>
          </div>

          <div className="relative">
            <input
              type="number"
              placeholder="Search by guests capacity..."
              value={guestSearchCount}
              onChange={(e) => setGuestSearchCount(e.target.value)}
              min="0"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base"
              title="Search for room categories by maximum guest capacity"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Users size={16} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Loading Spinner / Categories Display */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-16">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div>
            <p className="text-base sm:text-xl text-blue-800 font-medium">Fetching room categories...</p>
          </div>
        ) : displayedCategories.length === 0 && (searchTerm === '' && guestSearchCount === '') ? (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
            <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found. Click "Add New Category" to get started.
          </div>
        ) : displayedCategories.length === 0 && (searchTerm !== '' || guestSearchCount !== '') ? (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg shadow-inner">
            <Info className="inline-block h-6 w-6 mr-2 text-gray-400" /> No room categories found for your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCategories.map((cat) => (
              <div
                key={cat._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-200 hover:scale-103 hover:shadow-xl flex flex-col"
              >
                <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/E0E0E0/616161?text=Room+Image"; }}
                  />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                    ${cat.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'} shadow-md`}>
                    {cat.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <BedSingle size={20} className="mr-2 text-blue-600" /> {cat.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3 flex-grow">
                    {cat.description || <span className="text-gray-400 italic">No description provided.</span>}
                  </p>

                  <div className="flex items-center justify-between text-gray-800 mb-4">
                    <span className="flex items-center text-lg font-semibold text-green-700">
                      <DollarSign size={18} className="mr-1" />
                      ₹{typeof cat.defaultPrice === 'number' ? cat.defaultPrice.toFixed(2) : 'N/A'}
                    </span>
                    <span className="flex items-center text-lg font-semibold text-blue-800">
                      <Users size={18} className="mr-1" />
                      {cat.capacity !== null ? `${cat.capacity} Guests` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-800 mb-4">
                    <span className="flex items-center text-base font-medium text-gray-600">
                      <BedSingle size={18} className="mr-1" />
                      {cat.beds !== null ? `${cat.beds} Beds` : 'N/A'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleBookNowClick(cat.name)}
                        className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
                        title={`Book ${cat.name}`}
                      >
                        <CalendarPlus size={16} className="mr-1" /> Book
                      </button>
                      <button
                        onClick={() => handlePicturesClick(cat)}
                        className="flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
                        title={`View pictures for ${cat.name}`}
                      >
                        <Image size={16} className="mr-1" /> Pictures
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleEditClick(cat)}
                        className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
                        title={`Edit ${cat.name}`}
                      >
                        <Edit size={16} className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(cat)}
                        className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-semibold shadow-sm"
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

      <MemoizedModal
        isOpen={isAddEditModalOpen}
        onClose={closeAddEditModal}
        title={editingCategory ? 'Edit Room Category' : 'Add New Room Category'}
        icon={editingCategory ? Edit : Plus}
        modalWidthClass="max-w-xl md:max-w-2xl"
      >
        {AddEditCategoryFormContent}
      </MemoizedModal>
    </div>
  );
};

export default RoomCategoryPage;