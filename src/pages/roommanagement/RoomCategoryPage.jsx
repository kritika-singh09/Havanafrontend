

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



const Modal = ({ isOpen, onClose, title, children, icon: IconComponent, modalWidthClass = 'max-w-md' }) => {
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
};

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
    defaultPrice: '',
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
        processedCategories = data.categories.map(cat => {
          // --- Key change here: Ensure capacity and beds are always numbers ---
          const parsedCapacity = !isNaN(parseInt(cat.capacity, 10)) ? parseInt(cat.capacity, 10) : 0;
          const parsedBeds = !isNaN(parseInt(cat.beds, 10)) ? parseInt(cat.beds, 10) : 0;

          return {
            _id: cat._id,
            name: cat.category,
            isActive: cat.status === 'Active',
            description: cat.description || '',
            defaultPrice: typeof cat.defaultPrice === 'number' ? cat.defaultPrice : undefined,
            capacity: parsedCapacity, // Use the parsed, guaranteed number
            beds: parsedBeds,         // Use the parsed, guaranteed number
            imageUrl: cat.imageUrl || `https://placehold.co/400x250/F0F0F0/666666?text=${cat.category.replace(/\s/g, '+')}`,
            pictures: Array.isArray(cat.pictures) ? cat.pictures : [],
          };
        });
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
          // Only filter by guest count if a valid number > 0 is entered in search
          const matchesGuestCount =
            isNaN(guestCountNum) || guestCountNum <= 0 || (cat.capacity >= guestCountNum);

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
    setNewCategoryData(prevData => {
      // For number fields, always store as string (let user type freely)
      if (type === 'number') {
        return {
          ...prevData,
          [name]: value,
        };
      }
      return {
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }, []);

  const resetFormData = useCallback(() => {
    setNewCategoryData({
      name: '',
      description: '',
      capacity: '',
      beds: '',
      defaultPrice: '',
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

    // Capacity validation: Ensure it's a positive whole number
    const capacityNum = parseInt(newCategoryData.capacity, 10);
    if (isNaN(capacityNum) || capacityNum <= 0) {
      toast.error('Capacity must be a positive whole number.');
      return;
    }
    // Beds validation: Ensure it's a positive whole number
    const bedsNum = parseInt(newCategoryData.beds, 10);
    if (isNaN(bedsNum) || bedsNum <= 0) {
      toast.error('Number of Beds must be a positive whole number.');
      return;
    }
    // Price validation: Ensure it's a positive number (allow decimals)
    let priceNum = 0;
    if (newCategoryData.defaultPrice !== undefined && newCategoryData.defaultPrice !== null && newCategoryData.defaultPrice !== '') {
      priceNum = parseFloat(newCategoryData.defaultPrice);
      if (isNaN(priceNum) || priceNum < 0) priceNum = 0;
    }

    setIsFormSubmitting(true);
    try {
      // Always send JSON, with imageUrl as base64 string (if present)
      const categoryPayload = {
        category: newCategoryData.name.trim(),
        status: newCategoryData.isActive ? 'Active' : 'Inactive',
        description: newCategoryData.description.trim(),
        capacity: capacityNum,
        beds: bedsNum,
        defaultPrice: priceNum,
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
          const errorData = await response.json().catch(() => ({ message: response.statusText }));
          throw new Error(`Failed to update category: ${response.status} - ${errorData.message || 'Unknown error'}`);
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
          const errorData = await response.json().catch(() => ({ message: response.statusText }));
          throw new Error(`Failed to add category: ${response.status} - ${errorData.message || 'Unknown error'}`);
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
      capacity: (category.capacity !== undefined && category.capacity !== null && category.capacity !== '') ? String(category.capacity) : '1',
      beds: (category.beds !== undefined && category.beds !== null && category.beds !== '') ? String(category.beds) : '1',
      defaultPrice: (category.defaultPrice !== undefined && category.defaultPrice !== null && category.defaultPrice !== '') ? String(category.defaultPrice) : '',
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
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`Failed to delete category: ${response.status} - ${errorData.message || 'Unknown error'}`);
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




  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-2 sm:p-3 md:p-6 font-sans text-gray-800">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Delete Confirmation Modal */}
      <Modal
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
      </Modal>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={isGalleryModalOpen}
        onClose={closeGalleryModal}
        category={selectedCategoryForGallery}
      />

      <div className="bg-white rounded-xl p-2 sm:p-4 md:p-6 lg:p-8 shadow-xl border border-gray-200 w-full max-w-full overflow-x-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 sm:mb-6 pb-2 sm:pb-4 border-b border-gray-300 gap-2 md:gap-0">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by category name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-base text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base placeholder:text-gray-400"
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
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm text-sm sm:text-base placeholder:text-gray-400"
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
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {currentCategories.map((cat) => (
              <div
                key={cat._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-200 flex flex-col min-w-[210px] max-w-xs mx-auto h-full"
                style={{ minHeight: '270px', maxHeight: '370px' }}
              >
                <div className="relative w-full h-36 sm:h-44 md:h-40 lg:h-44 xl:h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x250/E0E0E0/616161?text=Room+Image'; }}
                  />
                  <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold
                    ${cat.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'} shadow-md`}>
                    {cat.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 flex items-center truncate">
                    <BedSingle size={18} className="mr-1 text-blue-600" /> {cat.name}
                  </h3>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2 min-h-[32px]">
                    {cat.description || <span className="text-gray-400 italic">No description provided.</span>}
                  </p>
                  {/* Removed guest, price, and beds from card display as requested */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleEditClick(cat)}
                      className="flex-1 flex items-center justify-center px-2 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-xs font-semibold shadow-sm"
                      title={`Edit ${cat.name}`}
                    >
                      <Edit size={14} className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(cat)}
                      className="flex-1 flex items-center justify-center px-2 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-xs font-semibold shadow-sm"
                      title={`Delete ${cat.name}`}
                    >
                      <Trash2 size={14} className="mr-1" /> Delete
                    </button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleBookNowClick(cat.name)}
                      className="flex-1 flex items-center justify-center px-2 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-xs font-semibold shadow-sm"
                      title={`Book ${cat.name}`}
                    >
                      <CalendarPlus size={14} className="mr-1" /> Book
                    </button>
                    <button
                      onClick={() => handlePicturesClick(cat)}
                      className="flex-1 flex items-center justify-center px-2 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-xs font-semibold shadow-sm"
                      title={`View pictures for ${cat.name}`}
                    >
                      <Image size={14} className="mr-1" /> Pictures
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-4 sm:mt-6 flex-wrap gap-1.5 sm:gap-2">
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

      <Modal
        isOpen={isAddEditModalOpen}
        onClose={closeAddEditModal}
        title={editingCategory ? 'Edit Room Category' : 'Add New Room Category'}
        icon={editingCategory ? Edit : Plus}
        modalWidthClass="max-w-xl md:max-w-2xl"
      >
        <form onSubmit={handleSaveCategory} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3 col-span-1 md:col-span-2">
            <label htmlFor="name" className="font-semibold text-gray-700">Category Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCategoryData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
              placeholder="e.g., Deluxe Suite, Executive Room"
              required
            />
          </div>
          <div className="flex flex-col gap-3 col-span-1 md:col-span-2">
            <label htmlFor="description" className="font-semibold text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={newCategoryData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-700 text-white focus:border-blue-500 focus:outline-none resize-y"
              placeholder="e.g., Spacious room with king-sized bed, city view, balcony."
            ></textarea>
          </div>
          {/* Removed guest, price, and beds fields as requested */}
          <div className="flex flex-col gap-3 col-span-1 md:col-span-2">
            <label htmlFor="imageFile" className="font-semibold text-gray-700">Main Image</label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const MAX_WIDTH = 1024;
                const MAX_HEIGHT = 1024;
                const QUALITY = 0.7;
                const img = new window.Image();
                const reader = new FileReader();
                reader.onload = (ev) => {
                  img.onload = () => {
                    let width = img.width;
                    let height = img.height;
                    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                      if (width > height) {
                        height = Math.round((height * MAX_WIDTH) / width);
                        width = MAX_WIDTH;
                      } else {
                        width = Math.round((width * MAX_HEIGHT) / height);
                        height = MAX_HEIGHT;
                      }
                    }
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    // Convert to base64 string (data URL)
                    const dataUrl = canvas.toDataURL('image/jpeg', QUALITY);
                    setNewCategoryData((prev) => ({ ...prev, imageUrl: dataUrl }));
                  };
                  img.onerror = () => {
                    toast.error('Invalid image file.');
                  };
                  img.src = ev.target.result;
                };
                reader.onerror = () => {
                  toast.error('Failed to read image file.');
                };
                reader.readAsDataURL(file);
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
            />
            {newCategoryData.imageUrl && (
              <img src={newCategoryData.imageUrl} alt="Preview" className="mt-2 rounded-lg max-h-40 object-contain border" />
            )}
          </div>
          <div className="flex items-center gap-2 col-span-1 md:col-span-2 mt-2">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={newCategoryData.isActive}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
            />
            <label htmlFor="isActive" className="text-base font-medium text-gray-700 cursor-pointer">Category is Active</label>
          </div>
          <div className="flex justify-end gap-3 col-span-1 md:col-span-2 mt-4">
            <button
              type="button"
              onClick={closeAddEditModal}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              disabled={isFormSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-900 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transform hover:scale-[1.02]"
              disabled={isFormSubmitting}
            >
              {isFormSubmitting && <Loader2 size={20} className="animate-spin" />}
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RoomCategoryPage;
