import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <Toaster position="top-right" />

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this booking?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={cancelDelete} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 md:mb-0">Bookings Overview</h1>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
            <button
              onClick={handleDownloadXLSXClick}
              className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Download XLSX
            </button>
            <button
              onClick={() => navigate("/booking/add")}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Add Booking
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search bookings by guest name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-4 text-sm sm:text-base"
        />

        {loading ? (
          <p className="text-center py-8">Loading bookings...</p>
        ) : (
          <div className="overflow-x-auto border rounded">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Photo</th>
                  <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Name</th>
                  <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">ID Number</th>
                  <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Phone</th>
                  <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Room</th>
                  <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Check-In</th>
                  <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Check-Out</th>
                  <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Guests</th>
                  <th className="px-2 py-2 text-left text-xs sm:px-4 sm:py-2 sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentBookings.length > 0 ? (
                  currentBookings.map((b) => (
                    <tr key={b._id}>
                      <td className="px-2 py-2 sm:px-4 sm:py-2">
                        <img src={b.photoUrl} alt="Photo" className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                      </td>
                      <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.name}</td>
                      <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.idProofNumber}</td>
                      <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.mobileNo || b.phoneNo}</td>
                      <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.roomNo}</td>
                      <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.checkInDate?.toString().slice(0, 10)}</td>
                      <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">{b.checkOutDate?.toString().slice(0, 10)}</td>
                      <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">
                        {(parseInt(b.noOfAdults) || 0) + (parseInt(b.noOfChildren) || 0)}
                      </td>
                      <td className="px-2 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={() => handleEdit(b)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-gray-500 italic text-sm">
                      No bookings found for your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 my-1 px-3 py-1 sm:px-4 sm:py-2 rounded border text-sm sm:text-base ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                }`}
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