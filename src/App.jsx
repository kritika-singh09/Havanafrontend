
import { Route, Routes, useLocation, useNavigate, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { LayoutDashboard, CalendarCheck, XCircle, Menu, LogOut, Hotel } from 'lucide-react'; // Added Hotel icon for the title

import Calendar from "./pages/Calendar/calendar";
import Booking from "./pages/booking/Booking";
import AddBooking from "./pages/booking/AddBooking";
import logo from "./assets/pcs.png";
import PhotoIdUpload from "./pages/booking/PhotoIdUpload";
import EditBookingForm from "./pages/booking/EditBooking";
import ViewBookingPage from "./pages/booking/viewBookingpage";


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("dashboard");
  const currentUser = localStorage.getItem("currentUser");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const [ml, setML] = useState(false); // Changed to 'isSidebarOpen' for clarity

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (location.pathname === "/") setActiveLink("dashboard");
    else if (location.pathname.startsWith("/booking")) setActiveLink("booking");
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (window.innerWidth < 1023) setML(!ml);
  };

  return (
    <>
      <section className="bg-gray-100 dark:bg-gray-900 min-h-screen flex font-inter"> {/* Softer background, added font-inter */}
        <aside
          className={
            ml
              ? "fixed top-0 z-50 ml-[0] flex h-screen w-full flex-col justify-between bg-gray-900 px-6 pb-4 text-white transition-all duration-300 ease-in-out shadow-2xl md:w-80 lg:ml-0 lg:w-72 xl:w-80 2xl:w-96 rounded-r-3xl border-r border-gray-700" // Enhanced shadows, larger mobile width, smoother corners, subtle border
              : "fixed top-0 z-50 ml-[-100%] flex h-screen w-full flex-col justify-between bg-gray-900 px-6 pb-4 text-white transition-all duration-300 ease-in-out shadow-2xl md:w-80 lg:ml-0 lg:w-72 xl:w-80 2xl:w-96 rounded-r-3xl border-r border-gray-700"
          }
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="pt-6 pb-6 border-b border-gray-700 -mx-6 px-6"> {/* More padding, thicker border, horizontal line integrated here */}
              {window.innerWidth < 1023 && (
                <div className="flex items-center justify-between mb-6"> {/* Increased margin-bottom */}
                  <button onClick={toggleSidebar} className="text-4xl text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg p-1"> {/* Larger close icon, better hover, focus ring */}
                    <XCircle size={36} />
                  </button>
                  <button onClick={handleLogout} className="group flex items-center space-x-3 text-gray-400 hover:text-red-400 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-700"> {/* More prominent logout, red hover */}
                    <LogOut className="h-7 w-7 group-hover:scale-105 transition-transform duration-200" />
                    <span className="font-bold text-lg hidden md:block">Logout</span> {/* Bolder, hidden on small screens */}
                  </button>
                </div>
              )}
              <h2 className="font-extrabold text-4xl text-white flex items-center gap-3 drop-shadow-md"> {/* Larger, bolder title, subtle shadow, integrated Hotel icon */}
                <Hotel className="h-10 w-10 text-yellow-400" /> {/* Added Hotel icon with accent color */}
                Hotel Havana <span className="text-base font-normal align-super opacity-80">©</span> {/* Subtle copyright */}
              </h2>
            </div>

            {/* Profile with logo */}
            <div className="mt-10 text-center py-4 border-b border-gray-700"> {/* Increased margin-top, added bottom border for separation */}
              <img
                src={logo}
                alt="admin"
                className="m-auto h-28 w-28 rounded-full object-cover p-2 border-4 border-indigo-500 shadow-xl ring-2 ring-indigo-300 ring-offset-2 ring-offset-gray-900 transition-transform transform hover:scale-105" // Larger, bolder border, ring effect, hover scale
              />
              <h5 className="mt-5 text-2xl font-bold text-white tracking-wide lg:block">{name}</h5> {/* Larger, bolder name */}
              <span className="text-gray-400 lg:block text-base font-medium">{role}</span> {/* Larger role text */}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto mt-10 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"> {/* Increased margin-top, added custom scrollbar for aesthetics */}
              <ul className="space-y-4 tracking-wide"> {/* Increased space-y for menu items */}
                <li onClick={() => { setActiveLink("dashboard"); navigate("/"); toggleSidebar(); }}>
                  <Link
                    to="/"
                    className={
                      activeLink === "dashboard"
                        ? "relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-4 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group" // Vibrant active state, deeper shadow, subtle scale on hover/active
                        : "relative flex items-center space-x-4 rounded-xl px-5 py-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-[1.02] group" // Better hover state, subtle scale
                    }
                  >
                    <LayoutDashboard className="h-7 w-7 text-white group-hover:text-blue-200 transition-colors duration-200" /> {/* Larger icon, hover color */}
                    <span className="font-bold text-xl">Dashboard</span> {/* Larger, bolder font */}
                  </Link>
                </li>

                <li onClick={() => { setActiveLink("booking"); navigate("/booking"); toggleSidebar(); }}>
                  <Link
                    to="/booking"
                    className={
                      activeLink === "booking"
                        ? "relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-4 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
                        : "relative flex items-center space-x-4 rounded-xl px-5 py-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-[1.02] group"
                    }
                  >
                    <CalendarCheck className="h-7 w-7 text-white group-hover:text-blue-200 transition-colors duration-200" />
                    <span className="font-bold text-xl">Booking</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Logout button at bottom (for larger screens) */}
            <div className="mt-auto pt-6 pb-2 -mx-6 px-6 border-t border-gray-700 hidden md:flex items-center justify-center"> {/* mt-auto pushes it to bottom, increased padding */}
              <button onClick={handleLogout} className="group flex items-center space-x-3 px-5 py-3 text-gray-300 hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-700 w-full justify-center font-semibold text-lg shadow-md"> {/* Enhanced button, added shadow */}
                <LogOut className="h-7 w-7 group-hover:scale-105 transition-transform duration-200" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>


        {/* Main Content */}
        <div className="ml-auto mb-6 lg:w-[calc(100%-18rem)] xl:w-[calc(100%-20rem)] 2xl:w-[calc(100%-24rem)] w-full transition-all duration-300 ease-in-out"> {/* Adjusted width calculations for consistency with sidebar width, added transition */}
          <div className="sticky top-0 h-20 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 py-3 px-6 shadow-md z-30 flex items-center justify-between"> {/* Taller, more prominent header bar, better shadow, higher z-index */}
            <h5 className="text-3xl font-extrabold text-gray-800 dark:text-white capitalize tracking-tight">
              {activeLink}
            </h5> {/* Larger, bolder title, capitalized */}
            <button onClick={toggleSidebar} className="text-4xl lg:hidden font-medium text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg p-1"> {/* Larger menu icon, better hover/focus */}
              <Menu size={36} />
            </button>
          </div>

          <div className="px-6 pt-8 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-5rem)] rounded-tl-lg"> {/* More padding, matched background, rounded top-left to meet sidebar */}
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/add" element={<AddBooking />} />
              <Route path="/booking/photo-id-upload" element={<PhotoIdUpload />} />
              <Route path="/booking/edit/:id" element={<EditBookingForm />} />
              <Route path="/booking/view/:id"element={<ViewBookingPage/>}/>
            </Routes>
          </div>
        </div>
      </section>

      {/* 🔴 Login disabled temporarily */}
      {/*
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )
      */}
    </>
  );
};

export default App;
