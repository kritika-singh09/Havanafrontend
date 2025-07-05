import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Edit, Trash2, Tag, X, Check, Loader2, Info } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';

const RoomCategoryPage = () => {
  // State for Firebase instances and authentication status
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // State for managing room categories
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null); // { id: '...', name: '...' }
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modal visibility and data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Initialize Firebase and authenticate
  useEffect(() => {
    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

      if (!Object.keys(firebaseConfig).length) {
        console.error("Firebase config is not defined. Please ensure __firebase_config is set.");
        setError("Firebase configuration is missing. Cannot connect to database.");
        setIsLoading(false);
        return;
      }

      const app = initializeApp(firebaseConfig);
      const firestoreDb = getFirestore(app);
      const firebaseAuth = getAuth(app);

      setDb(firestoreDb);
      setAuth(firebaseAuth);

      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          try {
            // Sign in anonymously if no user is authenticated
            if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                await signInWithCustomToken(firebaseAuth, __initial_auth_token);
            } else {
                await signInAnonymously(firebaseAuth);
            }
          } catch (authError) {
            console.error("Firebase anonymous authentication failed:", authError);
            setError("Authentication failed. Please try again.");
          }
        }
        setIsAuthReady(true); // Auth state is ready, whether logged in or anonymous
      });

      return () => unsubscribe(); // Cleanup auth listener on unmount
    } catch (err) {
      console.error("Failed to initialize Firebase:", err);
      setError("Failed to initialize the application. Please check console for details.");
      setIsLoading(false);
    }
  }, []);

  // Fetch categories when Firebase is ready
  useEffect(() => {
    if (!db || !isAuthReady || !userId) {
      return;
    }

    const categoriesCollectionRef = collection(db, `artifacts/${__app_id}/public/data/roomCategories`);
    // Note: orderBy is commented out as per instructions to avoid potential index issues.
    // If sorting is critical, fetch all and sort in memory.
    const q = query(categoriesCollectionRef); // , orderBy("name", "asc")

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedCategories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(fetchedCategories);
      setIsLoading(false);
    }, (err) => {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories. Please try again.");
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup snapshot listener
  }, [db, isAuthReady, userId]); // Depend on db and auth readiness

  // Handles adding or updating a category
  const handleSaveCategory = async () => {
    if (!newCategoryName.trim()) {
      setError("Category name cannot be empty.");
      return;
    }
    if (!db) {
      setError("Database not initialized.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const categoriesCollectionRef = collection(db, `artifacts/${__app_id}/public/data/roomCategories`);

      if (editingCategory) {
        // Update existing category
        const categoryDocRef = doc(db, `artifacts/${__app_id}/public/data/roomCategories`, editingCategory.id);
        await updateDoc(categoryDocRef, { name: newCategoryName.trim() });
        setEditingCategory(null); // Clear editing state
      } else {
        // Add new category
        await addDoc(categoriesCollectionRef, {
          name: newCategoryName.trim(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      setNewCategoryName(''); // Clear input field
      setIsModalOpen(false); // Close modal
    } catch (err) {
      console.error("Error saving category:", err);
      setError(`Failed to save category: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Prepares the modal for editing a category
  const handleEditClick = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setIsModalOpen(true);
  };

  // Opens the delete confirmation modal
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmModalOpen(true);
  };

  // Confirms and performs category deletion
  const confirmDeleteCategory = async () => {
    if (!categoryToDelete || !db) {
      setError("No category selected for deletion or database not initialized.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const categoryDocRef = doc(db, `artifacts/${__app_id}/public/data/roomCategories`, categoryToDelete.id);
      await deleteDoc(categoryDocRef);
      setIsDeleteConfirmModalOpen(false); // Close modal
      setCategoryToDelete(null); // Clear category to delete
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(`Failed to delete category: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Closes the add/edit modal and resets state
  const closeModal = () => {
    setIsModalOpen(false);
    setNewCategoryName('');
    setEditingCategory(null);
    setError(null); // Clear any modal-specific errors
  };

  // Closes the delete confirmation modal
  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setCategoryToDelete(null);
    setError(null); // Clear any modal-specific errors
  };

  if (error && !isLoading) {
    return (
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-xl shadow-md dark:bg-red-900 dark:border-red-700 dark:text-red-300 flex items-center justify-center space-x-3">
        <Info size={24} />
        <p className="font-semibold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 text-gray-900 dark:text-white min-h-[calc(100vh-10rem)] flex flex-col">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Tag className="h-8 w-8 text-indigo-500" /> Room Categories
      </h2>

      {/* Add New Category Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => {
            setEditingCategory(null); // Ensure we're adding, not editing
            setNewCategoryName(''); // Clear previous input
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        >
          <Plus size={24} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin h-10 w-10 text-indigo-500" />
          <span className="ml-3 text-lg font-medium">Loading categories...</span>
        </div>
      )}

      {/* Categories List */}
      {!isLoading && categories.length === 0 && (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <p className="text-xl font-medium">No room categories found. Add one to get started!</p>
        </div>
      )}

      {!isLoading && categories.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex-1">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  Category Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleEditClick(category)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Edit Category"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Delete Category"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md transform transition-all scale-100 opacity-100 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <X size={28} />
              </button>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 dark:bg-red-900 dark:border-red-700 dark:text-red-300">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline ml-2">{error}</span>
              </div>
            )}
            <div className="mb-6">
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                placeholder="e.g., Deluxe, Standard, Suite"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                disabled={isLoading}
                className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-colors duration-200 font-medium shadow-md flex items-center justify-center space-x-2"
              >
                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Check size={20} />}
                <span>{editingCategory ? 'Update Category' : 'Add Category'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-sm transform transition-all scale-100 opacity-100 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Confirm Deletion</h3>
              <button
                onClick={closeDeleteConfirmModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <X size={28} />
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete the category "
              <span className="font-semibold">{categoryToDelete?.name}</span>"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteConfirmModal}
                className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCategory}
                disabled={isLoading}
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-colors duration-200 font-medium shadow-md flex items-center justify-center space-x-2"
              >
                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Trash2 size={20} />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCategoryPage;