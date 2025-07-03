

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
// Corrected import path for AppContext
import { useAppContext } from "../context/AppContext.jsx";
import toast, { Toaster } from 'react-hot-toast';


const ITEMS_PER_PAGE = 10;
const backendURL = "https://havana-backend.vercel.app"; // Define backendURL once

const Booking = () => {
  const { bookings, fetchBookings, deleteBooking } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // State for bookings currently displayed (after search/filter and pagination)
  const [displayedBookings, setDisplayedBookings] = useState([]);
  const [loading, setLoading] = useState(false); // Loading indicator for data fetching
  const navigate = useNavigate();

  // Memoize the data fetching function to prevent unnecessary re-renders
  const fetchBookingsData = useCallback(async () => {
    setLoading(true);
    try {
      if (searchTerm) {
        // If there's a search term, call the search API
        const response = await axios.get(`${backendURL}/api/bookings/search`, {
          params: { name: searchTerm } // Pass searchTerm as 'name' query parameter
        });
        // Ensure response.data is an array or default to empty
        setDisplayedBookings(Array.isArray(response.data) ? response.data : []);
      } else {
        // If no search term, fetch all bookings using context's fetchBookings
        await fetchBookings(); // This updates the 'bookings' state in context
        // The useEffect below will then pick up the updated 'bookings' from context
      }
      setCurrentPage(1); // Reset to first page on new search/fetch
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings. Please try again.");
      setDisplayedBookings([]); // Clear displayed bookings on error
    } finally {
      setLoading(false);
    }
  }, [searchTerm, fetchBookings]); // Depend on searchTerm and fetchBookings

  // Effect to trigger data fetching when searchTerm or fetchBookings changes
  useEffect(() => {
    fetchBookingsData();
  }, [fetchBookingsData]);

  // Effect to update displayedBookings when context's 'bookings' change
  // This ensures that when fetchBookings completes (e.g., on initial load or after a delete),
  // the table updates correctly, but only if not actively searching.
  useEffect(() => {
    if (!searchTerm) {
      // Assuming 'bookings' from context is either an array or an object with a 'bookings' array
      setDisplayedBookings(Array.isArray(bookings) ? bookings : bookings?.bookings || []);
    }
  }, [bookings, searchTerm]); // Depend on bookings from context and searchTerm

  // Calculate pagination variables
  const totalPages = Math.ceil(displayedBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBookings = displayedBookings.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // --- CSV Download logic ---
  const handleDownloadCSVClick = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/bookings/exportBookingsCSV`, {
        responseType: 'blob', // Important: tells axios to expect a binary response
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'text/csv' });
      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);
      // Create a temporary anchor tag
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bookings.csv'; // Name of the downloaded file
      document.body.appendChild(a); // Append to body to make it clickable
      a.click(); // Programmatically click the link to trigger download
      a.remove(); // Clean up the link element
      window.URL.revokeObjectURL(url); // Release the object URL to free up memory

      toast.success("CSV file downloaded successfully!");
    } catch (error) {
      console.error("Error downloading CSV:", error);
      let errorMessage = "Failed to download CSV.";
      if (error.response) {
        // Server responded with a status other than 2xx
        // Attempt to read error message from blob if it's text
        if (error.response.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = function() {
            try {
              const errorText = reader.result;
              // Try to parse as JSON if it's a JSON error response
              const errorJson = JSON.parse(errorText);
              errorMessage = `Server Error (${error.response.status}): ${errorJson.message || errorText}`;
            } catch (e) {
              // If not JSON, just use the text
              errorMessage = `Server Error (${error.response.status}): ${reader.result}`;
            }
            toast.error(errorMessage);
          };
          reader.readAsText(error.response.data);
        } else {
          errorMessage = `Server Error (${error.response.status}): ${error.response.data?.message || error.response.statusText || 'Unknown error'}`;
          toast.error(errorMessage);
        }
      } else if (error.request) {
        // Request was made but no response was received
        errorMessage = "Network Error: No response from server. Check your internet connection or backend server status.";
        toast.error(errorMessage);
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = `Request Setup Error: ${error.message}`;
        toast.error(errorMessage);
      }
    }
  };

  // --- handleDelete uses context's deleteBooking ---
  const handleDelete = async (bookingId) => {
    // IMPORTANT: For production, replace window.confirm with a custom modal for better UX.
    if (!window.confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
      return;
    }

    try {
      const result = await deleteBooking(bookingId); // Call the context function
      toast.success(result.message);

      // Re-adjust pagination if the last item on a page was deleted
      // This checks if after deletion, the current page would become empty
      if ((displayedBookings.length - 1) % ITEMS_PER_PAGE === 0 && currentPage > 1 && currentBookings.length === 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking: " + (error.message || "An unexpected error occurred."));
    }
  };

  const handleEdit = (booking) => {
    navigate(`/booking/edit/${booking._id}`, {
      state: { editingData: booking },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-inter">
      <Toaster position="top-right" reverseOrder={false} /> {/* Toast container */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border border-gray-100 max-w-full mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">Bookings Overview</h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button
              onClick={handleDownloadCSVClick}
              className="flex items-center justify-center bg-green-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-700 transition duration-200 ease-in-out text-sm font-semibold gap-2"
            >
              {/* Replaced ArrowDownTrayIcon with inline SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download CSV
            </button>
            <button
              onClick={() => navigate("/booking/add")}
              className="flex items-center justify-center bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200 ease-in-out text-sm font-semibold"
            >
              {/* Replaced AiOutlinePlus with inline SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Booking
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            {/* Replaced AiOutlineSearch with inline SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 text-xl w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              placeholder="Search bookings by guest name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                // currentPage is already reset in the useEffect when searchTerm changes
              }}
              className="pl-12 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-600 text-lg">Loading bookings...</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">ID Number</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Check-In</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Check-Out</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentBookings.length > 0 ? (
                  currentBookings.map((b, index) => (
                    <tr key={b._id || index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{b.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 hidden sm:table-cell">{b.idProofNumber}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{b.mobileNo || b.phoneNo}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{b.roomNo}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">{b.checkInDate}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">{b.checkOutDate}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {(parseInt(b.noOfAdults) || 0) + (parseInt(b.noOfChildren) || 0)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-left text-sm font-medium space-x-3">
                        <button
                          onClick={() => handleEdit(b)}
                          className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out transform hover:scale-110"
                          title="Edit Booking"
                        >
                          {/* Replaced AiOutlineEdit with inline SVG */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out transform hover:scale-110"
                          title="Delete Booking"
                        >
                          {/* Replaced AiOutlineDelete with inline SVG */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.925a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-1.022.165 1.104 13.013m11.916 0L13.18 5.79m0 0a2.25 2.25 0 0 0-2.244-2.077H8.925m7.5 0-4.5-4.5L9 9.75M5.25 5.25h13.5" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500 italic text-lg">
                      No bookings found for your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition duration-150 ease-in-out
                    ${currentPage === i + 1
                      ? "z-10 bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                    ${i === 0 ? "rounded-l-md" : ""}
                    ${i === totalPages - 1 ? "rounded-r-md" : ""}
                  `}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
