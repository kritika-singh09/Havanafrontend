import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported here
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState({
        name: localStorage.getItem("name") || null,
        role: localStorage.getItem("role") || null,
    });

    const backendURL = "https://havana-backend.vercel.app";

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${backendURL}/api/bookings`);
            setBookings(res.data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
        }
    };

    const createBooking = async (formData) => {
        try {
            const res = await axios.post(`${backendURL}/api/bookings`, formData);
            if (res.status === 201 || res.status === 200) {
                await fetchBookings(); // Refresh bookings after successful POST
            }
            return res;
        } catch (err) {
            console.error("❌ Error creating booking:", err.message);
            throw err;
        }
    };

    const updateBooking = async (id, formData) => {
        try {
            const res = await axios.put(`${backendURL}/api/bookings/${id}`, formData);
            if (res.status === 200) {
                await fetchBookings(); // Refresh bookings after successful PUT
            }
            return res;
        } catch (err) {
            console.error(`❌ Error updating booking with ID ${id}:`, err.message);
            throw err;
        }
    };

    // Function to handle deleting a booking via API (remains in context)
    const deleteBooking = async (id) => {
        try {
            const res = await axios.delete(`${backendURL}/api/bookings/${id}`);
            if (res.status === 200) {
                await fetchBookings(); // Refresh bookings after successful DELETE
            }
            return { success: true, message: "Booking deleted successfully!" };
        } catch (err) {
            console.error(`❌ Error deleting booking with ID ${id}:`, err.message);
            let errorMessage = "Failed to delete booking.";
            if (err.response) {
                errorMessage = `Server Error: ${err.response.status} - ${err.response.statusText || 'Unknown'}`;
                if (err.response.data && typeof err.response.data === 'object' && err.response.data.message) {
                    errorMessage += `: ${err.response.data.message}`;
                }
            } else if (err.request) {
                errorMessage = "Network Error: No response from server.";
            } else {
                errorMessage = `Request Setup Error: ${err.message}`;
            }
            throw { success: false, message: errorMessage };
        }
    };

    // exportBookingsCSV function has been removed from here.

    const handleLogout = () => {
        localStorage.clear();
        setUser({ name: null, role: null });
        navigate("/login");
    };

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    return (
        <AppContext.Provider
            value={{
                backendURL, // backendURL is still available for other components if needed
                bookings,
                setBookings,
                user,
                setUser,
                handleLogout,
                fetchBookings,
                createBooking,
                updateBooking,
                deleteBooking,     // deleteBooking remains exposed
                // exportBookingsCSV is no longer exposed here
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);




