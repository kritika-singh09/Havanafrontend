
import { Route, Routes, useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";

import Calendar from "./pages/Calendar/calendar";
import Booking from "./pages/booking/Booking";
import AddBooking from "./pages/booking/AddBooking";
import logo from "./assets/pcs.png";
import PhotoIdUpload from "./pages/booking/PhotoIdUpload";
import EditBookingForm from "./pages/booking/EditBooking";



const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("dashboard");
  const currentUser = localStorage.getItem("currentUser");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const [ml, setML] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  
  useEffect(() => {
    if (location.pathname === "/") setActiveLink("dashboard");
    else if (location.pathname.startsWith("/booking")) setActiveLink("booking");
  }, [location.pathname]);

  const setMl = () => {
    if (window.innerWidth < 1023) setML(!ml);
  };

  return (
    <>
      {/* Always rendering the dashboard while login is disabled */}
      <section className="bg-[#E0FBFC] dark:bg-gray-900">
       <aside
  className={
    ml
      ? "fixed top-0 z-10 ml-[0] flex h-screen w-full flex-col justify-between border-r bg-gray-900 px-6 pb-3 text-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]"
      : "fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between border-r bg-gray-900 px-6 pb-3 text-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]"
  }
>
  <div className="flex flex-col h-full">
    {/* Header */}
    <div className="-mx-6 px-6 py-4">
      {window.innerWidth < 1023 && (
        <div className="flex items-center justify-between">
          <h5 onClick={setMl} className="text-2xl text-white">
            <AiFillCloseCircle />
          </h5>
          <button onClick={handleLogout} className="group flex items-center space-x-4 text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="group-hover:text-gray-300">Logout</span>
          </button>
        </div>
      )}
      <h2 className="font-semibold text-xl mt-3 text-white">Hotel Havana <span>©</span></h2>
    </div>

    {/* Profile with logo */}
    <div className="mt-6 text-center">
      <img
        src={logo}
        alt="admin"
        className="m-auto h-10 w-10 rounded-md object-cover lg:h-28 lg:w-28 bg-white p-1"
      />
      <h5 className="mt-4 hidden text-xl font-semibold text-white lg:block">{name}</h5>
      <span className="hidden text-gray-400 lg:block">{role}</span>
    </div>

    {/* Navigation */}
    <div className="flex-1 overflow-y-auto mt-6">
      <ul className="space-y-2 tracking-wide">
        <li onClick={() => { setActiveLink("dashboard"); navigate("/"); setMl(); }}>
          <Link
            to="/"
            className={
              activeLink === "dashboard"
                ? "relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 px-1 py-2 text-white"
                : "relative flex items-center space-x-4 rounded-xl px-1 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            }
          >
            <span className="font-medium">Dashboard</span>
          </Link>
        </li>

        <li onClick={() => { setActiveLink("booking"); navigate("/booking"); setMl(); }}>
          <Link
            to="/booking"
            className={
              activeLink === "booking"
                ? "relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 px-1 py-2 text-white"
                : "relative flex items-center space-x-4 rounded-xl px-1 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            }
          >
            <span className="font-medium">Booking</span>
          </Link>
        </li>
      </ul>

    </div>

    {/* Logout button at bottom */}
    <div className="-mx-6 md:flex hidden items-center justify-between border-t border-gray-700 px-6 pt-4">
      <button onClick={handleLogout} className="group flex items-center space-x-4 px-4 py-3 text-gray-300">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span className="group-hover:text-white">Logout</span>
      </button>
    </div>
  </div>
</aside>


        {/* Main Content */}
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div className="sticky top-0 h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 lg:py-2.5">
            <div className="flex items-center justify-between space-x-4 px-4 2xl:container h-full">
              <h5 className="text-2xl font-medium text-gray-600 dark:text-white">{activeLink.toUpperCase()}</h5>
              <h5 onClick={setMl} className="text-2xl lg:hidden font-medium text-gray-600 dark:text-white">
                <AiOutlineMenu />
              </h5>
            </div>
          </div>

          <div className="px-6 pt-6 bg-white">
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/add" element={<AddBooking />} />
              {/* <Route path="/photoupload" element={<PhotoIdUpload />} /> */}
              <Route path="/booking/photo-id-upload" element={<PhotoIdUpload />} />
            <Route path="/booking/edit/:id" element={<EditBookingForm />} />

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
