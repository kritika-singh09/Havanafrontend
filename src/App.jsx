
// // // import { Route, Routes, useLocation, useNavigate, Link } from "react-router-dom";
// // // import { useEffect, useState } from "react";
// // // import { LayoutDashboard, CalendarCheck, XCircle, Menu, LogOut, Hotel, Home, Tag, CircleDot, ChevronDown, ChevronUp } from 'lucide-react'; // Added Hotel, Home, Tag, CircleDot, ChevronDown, ChevronUp icons

// // // import Calendar from "./pages/Calendar/calendar";
// // // import Booking from "./pages/booking/Booking";
// // // import AddBooking from "./pages/booking/AddBooking";
// // // import logo from "./assets/pcs.png";
// // // import PhotoIdUpload from "./pages/booking/PhotoIdUpload";
// // // import EditBookingForm from "./pages/booking/EditBooking";
// // // import ViewBookingPage from "./pages/booking/viewBookingpage";

// // // // Placeholder components for new pages
// // // // These components are defined within App.jsx, so they don't need separate import statements.
// // // const RoomManagementPage = () => (
// // //   <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 text-gray-900 dark:text-white">
// // //     <h2 className="text-3xl font-bold mb-4">Room Management Overview</h2>
// // //     <p>This page will provide an overview of all rooms.</p>
// // //   </div>
// // // );

// // // const RoomCategoryPage = () => (
// // //   <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 text-gray-900 dark:text-white">
// // //     <h2 className="text-3xl font-bold mb-4">Room Categories</h2>
// // //     <p>Manage room categories here (e.g., Standard, Deluxe, Suite).</p>
// // //   </div>
// // // );

// // // const RoomStatusPage = () => (
// // //   <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 text-gray-900 dark:text-white">
// // //     <h2 className="text-3xl font-bold mb-4">Room Status</h2>
// // //     <p>Manage room statuses here (e.g., Available, Occupied, Under Maintenance, Dirty).</p>
// // //   </div>
// // // );

// // // const App = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const [activeLink, setActiveLink] = useState("dashboard");
// // //   const currentUser = localStorage.getItem("currentUser");
// // //   const role = localStorage.getItem("role");
// // //   const name = localStorage.getItem("name");
// // //   const [ml, setML] = useState(false); // Changed to 'isSidebarOpen' for clarity
// // //   const [showRoomManagementSubMenu, setShowRoomManagementSubMenu] = useState(false); // State for Room Management submenu

// // //   // Handles user logout by clearing local storage and navigating to the login page.
// // //   const handleLogout = () => {
// // //     localStorage.clear();
// // //     navigate("/login");
// // //   };

  
// // //   useEffect(() => {
// // //     if (location.pathname === "/") {
// // //       setActiveLink("dashboard");
// // //     } else if (location.pathname.startsWith("/booking")) {
// // //       setActiveLink("booking");
// // //     } else if (location.pathname.startsWith("/room-management")) {
// // //       // If any room management path is active, keep the submenu open.
// // //       setShowRoomManagementSubMenu(true);
// // //       if (location.pathname.includes("/category")) {
// // //         setActiveLink("category");
// // //       } else if (location.pathname.includes("/status")) {
// // //         setActiveLink("status");
// // //       } else {
// // //         // If it's just "/room-management" without a sub-path
// // //         setActiveLink("room-management");
// // //       }
// // //     } else {
// // //       setActiveLink(""); // Default or unknown path
// // //     }
// // //   }, [location.pathname]); // Re-run effect when the path changes

// // //   // Toggles the sidebar visibility, primarily for smaller screens.
// // //   const toggleSidebar = () => {
// // //     if (window.innerWidth < 1023) setML(!ml);
// // //   };

// // //   // Toggles the visibility of the Room Management submenu.
// // //   const toggleRoomManagementSubMenu = () => {
// // //     setShowRoomManagementSubMenu(!showRoomManagementSubMenu);
// // //   };

// // //   return (
// // //     <>
// // //       <section className="bg-gray-100 dark:bg-gray-900 min-h-screen flex font-inter">
// // //         {/* Sidebar Navigation */}
// // //         <aside
// // //           className={
// // //             ml
// // //               ? "fixed top-0 z-50 ml-[0] flex h-screen w-full flex-col justify-between bg-gray-900 px-6 pb-4 text-white transition-all duration-300 ease-in-out shadow-2xl md:w-80 lg:ml-0 lg:w-72 xl:w-80 2xl:w-96 rounded-r-3xl border-r border-gray-700"
// // //               : "fixed top-0 z-50 ml-[-100%] flex h-screen w-full flex-col justify-between bg-gray-900 px-6 pb-4 text-white transition-all duration-300 ease-in-out shadow-2xl md:w-80 lg:ml-0 lg:w-72 xl:w-80 2xl:w-96 rounded-r-3xl border-r border-gray-700"
// // //           }
// // //         >
// // //           <div className="flex flex-col h-full">
// // //             {/* Header with close button for mobile */}
// // //             <div className="pt-6 pb-6 border-b border-gray-700 -mx-6 px-6">
// // //               {window.innerWidth < 1023 && (
// // //                 <div className="flex items-center justify-between mb-6">
// // //                   <button onClick={toggleSidebar} className="text-4xl text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg p-1">
// // //                     <XCircle size={36} />
// // //                   </button>
// // //                   {/* Logout button for smaller screens when sidebar is open */}
// // //                   <button onClick={handleLogout} className="group flex items-center space-x-3 text-gray-400 hover:text-red-400 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-700">
// // //                     <LogOut className="h-7 w-7 group-hover:scale-105 transition-transform duration-200" />
// // //                     <span className="font-bold text-lg hidden md:block">Logout</span>
// // //                   </button>
// // //                 </div>
// // //               )}
// // //               {/* Hotel Logo and Name */}
// // //               <h2 className="font-extrabold text-4xl text-white flex items-center gap-3 drop-shadow-md">
// // //                 <Hotel className="h-10 w-10 text-yellow-400" />
// // //                 Hotel Havana <span className="text-base font-normal align-super opacity-80">©</span>
// // //               </h2>
// // //             </div>

// // //             {/* User Profile Section */}
// // //             <div className="mt-10 text-center py-4 border-b border-gray-700">
// // //               <img
// // //                 src={logo}
// // //                 alt="admin"
// // //                 className="m-auto h-28 w-28 rounded-full object-cover p-2 border-4 border-indigo-500 shadow-xl ring-2 ring-indigo-300 ring-offset-2 ring-offset-gray-900 transition-transform transform hover:scale-105"
// // //               />
// // //               <h5 className="mt-5 text-2xl font-bold text-white tracking-wide lg:block">{name}</h5>
// // //               <span className="text-gray-400 lg:block text-base font-medium">{role}</span>
// // //             </div>

// // //             {/* Main Navigation Links */}
// // //             <div className="flex-1 overflow-y-auto mt-10 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
// // //               <ul className="space-y-4 tracking-wide">
// // //                 {/* Dashboard Link */}
// // //                 <li onClick={() => { setActiveLink("dashboard"); navigate("/"); toggleSidebar(); }}>
// // //                   <Link
// // //                     to="/"
// // //                     className={
// // //                       activeLink === "dashboard"
// // //                         ? "relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-4 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
// // //                         : "relative flex items-center space-x-4 rounded-xl px-5 py-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-[1.02] group"
// // //                     }
// // //                   >
// // //                     <LayoutDashboard className="h-7 w-7 text-white group-hover:text-blue-200 transition-colors duration-200" />
// // //                     <span className="font-bold text-xl">Dashboard</span>
// // //                   </Link>
// // //                 </li>

// // //                 {/* Booking Link */}
// // //                 <li onClick={() => { setActiveLink("booking"); navigate("/booking"); toggleSidebar(); }}>
// // //                   <Link
// // //                     to="/booking"
// // //                     className={
// // //                       activeLink === "booking"
// // //                         ? "relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-4 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
// // //                         : "relative flex items-center space-x-4 rounded-xl px-5 py-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-[1.02] group"
// // //                     }
// // //                   >
// // //                     <CalendarCheck className="h-7 w-7 text-white group-hover:text-blue-200 transition-colors duration-200" />
// // //                     <span className="font-bold text-xl">Booking</span>
// // //                   </Link>
// // //                 </li>

// // //                 {/* Room Management Section with Submenu */}
// // //                 <li>
// // //                   <div
// // //                     onClick={toggleRoomManagementSubMenu}
// // //                     className={`relative flex items-center justify-between cursor-pointer space-x-4 rounded-xl px-5 py-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-[1.02] group ${
// // //                       activeLink.startsWith("room-") ? "bg-gray-800 text-white" : "" // Highlight parent if any sub-item is active
// // //                     }`}
// // //                   >
// // //                     <div className="flex items-center space-x-4">
// // //                       <Home className="h-7 w-7 text-white group-hover:text-blue-200 transition-colors duration-200" />
// // //                       <span className="font-bold text-xl">Room Management</span>
// // //                     </div>
// // //                     {showRoomManagementSubMenu ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
// // //                   </div>
// // //                   {showRoomManagementSubMenu && (
// // //                     <ul className="pl-8 mt-2 space-y-2"> {/* Indent for sub-menu */}
// // //                       {/* Room Category Link */}
// // //                       <li onClick={() => { setActiveLink("category"); navigate("/roommanagement/category"); toggleSidebar(); }}>
// // //                         <Link
// // //                           to="/roommanagement/category"
// // //                           className={
// // //                             activeLink === "category"
// // //                               ? "relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-3 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
// // //                               : "relative flex items-center space-x-4 rounded-xl px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-[1.02] group"
// // //                           }
// // //                         >
// // //                           <Tag className="h-6 w-6 text-white group-hover:text-blue-200 transition-colors duration-200" />
// // //                           <span className="font-medium text-lg"><Link to="/RoomCategoryPage">Category</Link></span>
// // //                         </Link>
// // //                       </li>
// // //                       {/* Room Status Link */}
// // //                       <li onClick={() => { setActiveLink("status"); navigate("/roommanagement/status"); toggleSidebar(); }}>
// // //                         <Link
// // //                           to="/roommanagement/status"
// // //                           className={
// // //                             activeLink === "status"
// // //                               ? "relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-3 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
// // //                               : "relative flex items-center space-x-4 rounded-xl px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-[1.02] group"
// // //                           }
// // //                         >
// // //                           <CircleDot className="h-6 w-6 text-white group-hover:text-blue-200 transition-colors duration-200" />
// // //                           <span className="font-medium text-lg"><Link to="/RoomStatusPage">Status</Link></span>
// // //                         </Link>
// // //                       </li>
// // //                     </ul>
// // //                   )}
// // //                 </li>
// // //               </ul>
// // //             </div>

// // //             {/* Logout button at bottom (for larger screens) */}
// // //             <div className="mt-auto pt-6 pb-2 -mx-6 px-6 border-t border-gray-700 hidden md:flex items-center justify-center">
// // //               <button onClick={handleLogout} className="group flex items-center space-x-3 px-5 py-3 text-gray-300 hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-700 w-full justify-center font-semibold text-lg shadow-md">
// // //                 <LogOut className="h-7 w-7 group-hover:scale-105 transition-transform duration-200" />
// // //                 <span>Logout</span>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </aside>

// // //         {/* Main Content Area */}
// // //         <div className="ml-auto mb-6 lg:w-[calc(100%-18rem)] xl:w-[calc(100%-20rem)] 2xl:w-[calc(100%-24rem)] w-full transition-all duration-300 ease-in-out">
// // //           {/* Top Bar with Page Title and Mobile Menu Button */}
// // //           <div className="sticky top-0 h-20 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 py-3 px-6 shadow-md z-30 flex items-center justify-between">
// // //             <h5 className="text-3xl font-extrabold text-gray-800 dark:text-white capitalize tracking-tight">
// // //               {activeLink.replace("room-", "").replace("-", " ")} {/* Adjust activeLink display for title */}
// // //             </h5>
// // //             <button onClick={toggleSidebar} className="text-4xl lg:hidden font-medium text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg p-1">
// // //               <Menu size={36} />
// // //             </button>
// // //           </div>

// // //           {/* Content Area for Routes */}
// // //           <div className="px-6 pt-8 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-5rem)] rounded-tl-lg">
// // //             <Routes>
// // //               <Route path="/" element={<Calendar />} />
// // //               <Route path="/booking" element={<Booking />} />
// // //               <Route path="/booking/add" element={<AddBooking />} />
// // //               <Route path="/booking/photo-id-upload" element={<PhotoIdUpload />} />
// // //               <Route path="/booking/edit/:id" element={<EditBookingForm />} />
// // //               <Route path="/booking/view/:id" element={<ViewBookingPage />} />
// // //               {/* New Room Management Routes */}
// // //               <Route path="/room-management" element={<RoomManagementPage />} />
// // //               <Route path="/room-management/category" element={<RoomCategoryPage />} />
// // //               <Route path="/room-management/status" element={<RoomStatusPage />} />
// // //               <Route path="/RoomCategoryPage" element={<RoomCategoryPage />} />
// // //               <Route path="/RoomStatusPage" element={<RoomStatusPage/>}/>
// // //             </Routes>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* 🔴 Login disabled temporarily */}
// // //       {/*
// // //       ) : (
// // //         <Routes>
// // //           <Route path="/login" element={<Login />} />
// // //         </Routes>
// // //       )
// // //       */}
// // //     </>
// // //   );
// // // };

// // // export default App;
// // import { Route, Routes, useLocation, useNavigate, Link } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import {
// //   LayoutDashboard,
// //   CalendarCheck,
// //   XCircle,
// //   Menu,
// //   LogOut,
// //   Hotel,
// //   Home,
// //   Tag,
// //   CircleDot,
// //   ChevronDown,
// //   ChevronUp
// // } from 'lucide-react';

// // import Calendar from "./pages/Calendar/calendar";
// // import Booking from "./pages/booking/Booking";
// // import AddBooking from "./pages/booking/AddBooking";
// // import logo from "./assets/pcs.png";
// // import PhotoIdUpload from "./pages/booking/PhotoIdUpload";
// // import EditBookingForm from "./pages/booking/EditBooking";
// // import ViewBookingPage from "./pages/booking/viewBookingpage";
// // import RoomCategoryPage from "./pages/roommanagement/RoomCategoryPage";
// // import RoomStatusPage from "./pages/roommanagement/RoomStatusPage";

// // // Optional Overview page
// // const RoomManagementPage = () => (
// //   <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 text-gray-900 dark:text-white">
// //     <h2 className="text-3xl font-bold mb-4">Room Management Overview</h2>
// //     <p>This page will provide an overview of all rooms.</p>
// //   </div>
// // );

// // const App = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [activeLink, setActiveLink] = useState("dashboard");
// //   const [ml, setML] = useState(false);
// //   const [showRoomManagementSubMenu, setShowRoomManagementSubMenu] = useState(false);
// //   const currentUser = localStorage.getItem("currentUser");
// //   const role = localStorage.getItem("role");
// //   const name = localStorage.getItem("name");

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     navigate("/login");
// //   };

// //   useEffect(() => {
// //     if (location.pathname === "/") {
// //       setActiveLink("dashboard");
// //     } else if (location.pathname.startsWith("/booking")) {
// //       setActiveLink("booking");
// //     } else if (location.pathname.startsWith("/room-management")) {
// //       setShowRoomManagementSubMenu(true);
// //       if (location.pathname.includes("category")) {
// //         setActiveLink("category");
// //       } else if (location.pathname.includes("status")) {
// //         setActiveLink("status");
// //       } else {
// //         setActiveLink("room-management");
// //       }
// //     } else {
// //       setActiveLink("");
// //     }
// //   }, [location.pathname]);

// //   const toggleSidebar = () => {
// //     if (window.innerWidth < 1023) setML(!ml);
// //   };

// //   const toggleRoomManagementSubMenu = () => {
// //     setShowRoomManagementSubMenu(!showRoomManagementSubMenu);
// //   };

// //   return (
// //     <>
// //       <section className="bg-gray-100 dark:bg-gray-900 min-h-screen flex font-inter">
// //         {/* Sidebar */}
// //         <aside
// //           className={
// //             ml
// //               ? "fixed top-0 z-50 ml-[0] flex h-screen w-full flex-col justify-between bg-gray-900 px-6 pb-4 text-white transition-all duration-300 ease-in-out shadow-2xl md:w-80 lg:ml-0 lg:w-72 xl:w-80 2xl:w-96 rounded-r-3xl border-r border-gray-700"
// //               : "fixed top-0 z-50 ml-[-100%] flex h-screen w-full flex-col justify-between bg-gray-900 px-6 pb-4 text-white transition-all duration-300 ease-in-out shadow-2xl md:w-80 lg:ml-0 lg:w-72 xl:w-80 2xl:w-96 rounded-r-3xl border-r border-gray-700"
// //           }
// //         >
// //           <div className="flex flex-col h-full">
// //             {/* Header */}
// //             <div className="pt-6 pb-6 border-b border-gray-700 -mx-6 px-6">
// //               {window.innerWidth < 1023 && (
// //                 <div className="flex items-center justify-between mb-6">
// //                   <button onClick={toggleSidebar}>
// //                     <XCircle size={36} />
// //                   </button>
// //                   <button onClick={handleLogout}>
// //                     <LogOut className="h-7 w-7" />
// //                   </button>
// //                 </div>
// //               )}
// //               <h2 className="font-extrabold text-4xl text-white flex items-center gap-3">
// //                 <Hotel className="h-10 w-10 text-yellow-400" />
// //                 Hotel Havana <span className="text-base font-normal">©</span>
// //               </h2>
// //             </div>

// //             {/* User */}
// //             <div className="mt-10 text-center py-4 border-b border-gray-700">
// //               <img src={logo} alt="admin" className="m-auto h-28 w-28 rounded-full object-cover p-2 border-4 border-indigo-500" />
// //               <h5 className="mt-5 text-2xl font-bold">{name}</h5>
// //               <span className="text-gray-400 text-base font-medium">{role}</span>
// //             </div>

// //             {/* Navigation */}
// //             <div className="flex-1 overflow-y-auto mt-10">
// //               <ul className="space-y-4">
// //                 {/* Dashboard */}
// //                 <li onClick={() => { setActiveLink("dashboard"); navigate("/"); toggleSidebar(); }}>
// //                   <Link to="/" className={activeLink === "dashboard" ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
// //                     <div className="flex items-center space-x-4 px-5 py-4 rounded-xl">
// //                       <LayoutDashboard className="h-7 w-7" />
// //                       <span className="font-bold text-xl">Dashboard</span>
// //                     </div>
// //                   </Link>
// //                 </li>

// //                 {/* Booking */}
// //                 <li onClick={() => { setActiveLink("booking"); navigate("/booking"); toggleSidebar(); }}>
// //                   <Link to="/booking" className={activeLink === "booking" ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
// //                     <div className="flex items-center space-x-4 px-5 py-4 rounded-xl">
// //                       <CalendarCheck className="h-7 w-7" />
// //                       <span className="font-bold text-xl">Booking</span>
// //                     </div>
// //                   </Link>
// //                 </li>

// //                 {/* Room Management */}
// //                 <li>
// //                   <div
// //                     onClick={toggleRoomManagementSubMenu}
// //                     className={`flex items-center justify-between cursor-pointer px-5 py-4 rounded-xl ${
// //                       activeLink === "category" || activeLink === "status" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
// //                     }`}
// //                   >
// //                     <div className="flex items-center space-x-4">
// //                       <Home className="h-7 w-7" />
// //                       <span className="font-bold text-xl">Room Management</span>
// //                     </div>
// //                     {showRoomManagementSubMenu ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
// //                   </div>

// //                   {showRoomManagementSubMenu && (
// //                     <ul className="pl-8 mt-2 space-y-2">
// //                       {/* Room Category */}
// //                       <li onClick={() => { setActiveLink("category"); navigate("/room-management/category"); toggleSidebar(); }}>
// //                         <Link to="/room-management/category" className={activeLink === "category" ? "text-white bg-gradient-to-r from-blue-600 to-indigo-700" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
// //                           <div className="flex items-center space-x-4 px-5 py-3 rounded-xl">
// //                             <Tag className="h-6 w-6" />
// //                             <span className="text-lg">Category</span>
// //                           </div>
// //                         </Link>
// //                       </li>

// //                       {/* Room Status */}
// //                       <li onClick={() => { setActiveLink("status"); navigate("/room-management/status"); toggleSidebar(); }}>
// //                         <Link to="/room-management/status" className={activeLink === "status" ? "text-white bg-gradient-to-r from-blue-600 to-indigo-700" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
// //                           <div className="flex items-center space-x-4 px-5 py-3 rounded-xl">
// //                             <CircleDot className="h-6 w-6" />
// //                             <span className="text-lg">Status</span>
// //                           </div>
// //                         </Link>
// //                       </li>
// //                     </ul>
// //                   )}
// //                 </li>
// //               </ul>
// //             </div>

// //             {/* Logout button for desktop */}
// //             <div className="mt-auto pt-6 pb-2 -mx-6 px-6 border-t border-gray-700 hidden md:flex items-center justify-center">
// //               <button onClick={handleLogout} className="flex items-center space-x-3 px-5 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-700 w-full justify-center font-semibold text-lg rounded-lg">
// //                 <LogOut className="h-7 w-7" />
// //                 <span>Logout</span>
// //               </button>
// //             </div>
// //           </div>
// //         </aside>

// //         {/* Main Content Area */}
// //         <div className="ml-auto lg:w-[calc(100%-18rem)] xl:w-[calc(100%-20rem)] 2xl:w-[calc(100%-24rem)] w-full transition-all duration-300">
// //           {/* Top bar */}
// //           <div className="sticky top-0 h-20 border-b bg-white dark:bg-gray-800 dark:border-gray-700 py-3 px-6 shadow-md z-30 flex items-center justify-between">
// //             <h5 className="text-3xl font-extrabold text-gray-800 dark:text-white capitalize tracking-tight">
// //               {activeLink.replace("room-", "").replace("-", " ")}
// //             </h5>
// //             <button onClick={toggleSidebar} className="text-4xl lg:hidden">
// //               <Menu size={36} />
// //             </button>
// //           </div>

// //           {/* Page Content */}
// //           <div className="px-6 pt-8 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-5rem)] rounded-tl-lg">
// //             <Routes>
// //               <Route path="/" element={<Calendar />} />
// //               <Route path="/booking" element={<Booking />} />
// //               <Route path="/booking/add" element={<AddBooking />} />
// //               <Route path="/booking/photo-id-upload" element={<PhotoIdUpload />} />
// //               <Route path="/booking/edit/:id" element={<EditBookingForm />} />
// //               <Route path="/booking/view/:id" element={<ViewBookingPage />} />
// //               <Route path="/room-management" element={<RoomManagementPage />} />
// //               <Route path="/room-management/category" element={<RoomCategoryPage />} />
// //               <Route path="/room-management/status" element={<RoomStatusPage />} />
// //             </Routes>
// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   );
// // };

// // export default App;
// import { Route, Routes, useLocation, useNavigate, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   LayoutDashboard,
//   CalendarCheck,
//   XCircle,
//   Menu,
//   LogOut,
//   Hotel,
//   Home,
//   Tag,
//   CircleDot,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// import Calendar from "./pages/Calendar/calendar";
// import Booking from "./pages/booking/Booking";
// import AddBooking from "./pages/booking/AddBooking";
// import logo from "./assets/pcs.png";
// import PhotoIdUpload from "./pages/booking/PhotoIdUpload";
// import EditBookingForm from "./pages/booking/EditBooking";
// import ViewBookingPage from "./pages/booking/viewBookingpage";
// import RoomCategoryPage from "./pages/roommanagement/RoomCategoryPage";
// import RoomStatusPage from "./pages/roommanagement/RoomStatusPage";
// import RoomManagementPage from "./pages/roommanagement/Roommanagement";
// // ✅ Renamed this to avoid duplicate name conflict
// const RoomManagementOverviewPage = () => (
//   <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 text-gray-900 dark:text-white">
//     <h2 className="text-3xl font-bold mb-4">Room Management Overview</h2>
//     <p>This page will provide an overview of all rooms.</p>
//   </div>
// );

// const App = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeLink, setActiveLink] = useState("dashboard");
//   const [ml, setML] = useState(false);
//   const [showRoomManagementSubMenu, setShowRoomManagementSubMenu] = useState(false);
//   const currentUser = localStorage.getItem("currentUser");
//   const role = localStorage.getItem("role");
//   const name = localStorage.getItem("name");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   useEffect(() => {
//     if (location.pathname === "/") {
//       setActiveLink("dashboard");
//     } else if (location.pathname.startsWith("/booking")) {
//       setActiveLink("booking");
//     } else if (location.pathname.startsWith("/room-management")) {
//       setShowRoomManagementSubMenu(true);
//       if (location.pathname.includes("category")) {
//         setActiveLink("category");
//       } else if (location.pathname.includes("status")) {
//         setActiveLink("status");
//       } else {
//         setActiveLink("room-management");
//       }
//     } else {
//       setActiveLink("");
//     }
//   }, [location.pathname]);

//   const toggleSidebar = () => {
//     if (window.innerWidth < 1023) setML(!ml);
//   };

//   const toggleRoomManagementSubMenu = () => {
//     setShowRoomManagementSubMenu(!showRoomManagementSubMenu);
//   };

//   return (
//     <>
//       <section className="bg-gray-100 dark:bg-gray-900 min-h-screen flex font-inter">
//         {/* Sidebar */}
//         <aside
//           className={
//             ml
//               ? "fixed top-0 z-50 ml-[0] flex h-screen w-full flex-col justify-between bg-gray-900 px-6 pb-4 text-white transition-all duration-300 ease-in-out shadow-2xl md:w-80 lg:ml-0 lg:w-72 xl:w-80 2xl:w-96 rounded-r-3xl border-r border-gray-700"
//               : "fixed top-0 z-50 ml-[-100%] flex h-screen w-full flex-col justify-between bg-gray-900 px-6 pb-4 text-white transition-all duration-300 ease-in-out shadow-2xl md:w-80 lg:ml-0 lg:w-72 xl:w-80 2xl:w-96 rounded-r-3xl border-r border-gray-700"
//           }
//         >
//           <div className="flex flex-col h-full">
//             {/* Header */}
//             <div className="pt-6 pb-6 border-b border-gray-700 -mx-6 px-6">
//               {window.innerWidth < 1023 && (
//                 <div className="flex items-center justify-between mb-6">
//                   <button onClick={toggleSidebar}>
//                     <XCircle size={36} />
//                   </button>
//                   <button onClick={handleLogout}>
//                     <LogOut className="h-7 w-7" />
//                   </button>
//                 </div>
//               )}
//               <h2 className="font-extrabold text-4xl text-white flex items-center gap-3">
//                 <Hotel className="h-10 w-10 text-yellow-400" />
//                 Hotel Havana <span className="text-base font-normal">©</span>
//               </h2>
//             </div>

//             {/* User */}
//             <div className="mt-10 text-center py-4 border-b border-gray-700">
//               <img src={logo} alt="admin" className="m-auto h-28 w-28 rounded-full object-cover p-2 border-4 border-indigo-500" />
//               <h5 className="mt-5 text-2xl font-bold">{name}</h5>
//               <span className="text-gray-400 text-base font-medium">{role}</span>
//             </div>

//             {/* Navigation */}
//             <div className="flex-1 overflow-y-auto mt-10">
//               <ul className="space-y-4">
//                 <li onClick={() => { setActiveLink("dashboard"); navigate("/"); toggleSidebar(); }}>
//                   <Link to="/" className={activeLink === "dashboard" ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
//                     <div className="flex items-center space-x-4 px-5 py-4 rounded-xl">
//                       <LayoutDashboard className="h-7 w-7" />
//                       <span className="font-bold text-xl">Dashboard</span>
//                     </div>
//                   </Link>
//                 </li>

//                 <li onClick={() => { setActiveLink("booking"); navigate("/booking"); toggleSidebar(); }}>
//                   <Link to="/booking" className={activeLink === "booking" ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
//                     <div className="flex items-center space-x-4 px-5 py-4 rounded-xl">
//                       <CalendarCheck className="h-7 w-7" />
//                       <span className="font-bold text-xl">Booking</span>
//                     </div>
//                   </Link>
//                 </li>

//                 <li>
//                   <div
//                     onClick={toggleRoomManagementSubMenu}
//                     className={`flex items-center justify-between cursor-pointer px-5 py-4 rounded-xl ${
//                       activeLink === "category" || activeLink === "status"
//                         ? "bg-gray-800 text-white"
//                         : "text-gray-300 hover:bg-gray-800 hover:text-white"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-4">
//                       <Home className="h-7 w-7" />
//                       <span className="font-bold text-xl"><Link to="/room-management">Room Management</Link></span>
//                     </div>
//                     {showRoomManagementSubMenu ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//                   </div>

//                   {showRoomManagementSubMenu && (
//                     <ul className="pl-8 mt-2 space-y-2">
//                       <li onClick={() => { setActiveLink("category"); navigate("/room-management/category"); toggleSidebar(); }}>
//                         <Link to="/room-management/category" className={activeLink === "category" ? "text-white bg-gradient-to-r from-blue-600 to-indigo-700" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
//                           <div className="flex items-center space-x-4 px-5 py-3 rounded-xl">
//                             <Tag className="h-6 w-6" />
//                             <span className="text-lg">Category</span>
//                           </div>
//                         </Link>
//                       </li>

//                       <li onClick={() => { setActiveLink("status"); navigate("/room-management/status"); toggleSidebar(); }}>
//                         <Link to="/room-management/status" className={activeLink === "status" ? "text-white bg-gradient-to-r from-blue-600 to-indigo-700" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
//                           <div className="flex items-center space-x-4 px-5 py-3 rounded-xl">
//                             <CircleDot className="h-6 w-6" />
//                             <span className="text-lg">Status</span>
//                           </div>
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//               </ul>
//             </div>

//             <div className="mt-auto pt-6 pb-2 -mx-6 px-6 border-t border-gray-700 hidden md:flex items-center justify-center">
//               <button onClick={handleLogout} className="flex items-center space-x-3 px-5 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-700 w-full justify-center font-semibold text-lg rounded-lg">
//                 <LogOut className="h-7 w-7" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content Area */}
//         <div className="ml-auto lg:w-[calc(100%-18rem)] xl:w-[calc(100%-20rem)] 2xl:w-[calc(100%-24rem)] w-full transition-all duration-300">
//           <div className="sticky top-0 h-20 border-b bg-white dark:bg-gray-800 dark:border-gray-700 py-3 px-6 shadow-md z-30 flex items-center justify-between">
//             <h5 className="text-3xl font-extrabold text-gray-800 dark:text-white capitalize tracking-tight">
//               {activeLink.replace("room-", "").replace("-", " ")}
//             </h5>
//             <button onClick={toggleSidebar} className="text-4xl lg:hidden">
//               <Menu size={36} />
//             </button>
//           </div>

//           <div className="px-6 pt-8 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-5rem)] rounded-tl-lg">
//             <Routes>
//               <Route path="/" element={<Calendar />} />
//               <Route path="/booking" element={<Booking />} />
//               <Route path="/booking/add" element={<AddBooking />} />
//               <Route path="/booking/photo-id-upload" element={<PhotoIdUpload />} />
//               <Route path="/booking/edit/:id" element={<EditBookingForm />} />
//               <Route path="/booking/view/:id" element={<ViewBookingPage />} />
//               <Route path="/room-management" element={<RoomManagementOverviewPage />} />
//               <Route path="/room-management/category" element={<RoomCategoryPage />} />
//               <Route path="/room-management/status" element={<RoomStatusPage />} />
//               <Route path="/room-management" element={<RoomManagementPage />} />
//             </Routes>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default App;
import { Route, Routes, useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  XCircle,
  Menu,
  LogOut,
  Hotel,
  Home,
  Tag,
  CircleDot,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import Calendar from "./pages/Calendar/calendar";
import Booking from "./pages/booking/Booking";
import AddBooking from "./pages/booking/AddBooking";
import logo from "./assets/pcs.png";
import PhotoIdUpload from "./pages/booking/PhotoIdUpload";
import EditBookingForm from "./pages/booking/EditBooking";
import ViewBookingPage from "./pages/booking/viewBookingpage";
import RoomCategoryPage from "./pages/roommanagement/RoomCategoryPage";
import RoomStatusPage from "./pages/roommanagement/RoomStatusPage";
import RoomManagementPage from "./pages/roommanagement/Roommanagement"; // ✅ Already used

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("dashboard");
  const [ml, setML] = useState(false);
  const [showRoomManagementSubMenu, setShowRoomManagementSubMenu] = useState(false);
  const currentUser = localStorage.getItem("currentUser");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveLink("dashboard");
    } else if (location.pathname.startsWith("/booking")) {
      setActiveLink("booking");
    } else if (location.pathname.startsWith("/room-management")) {
      setShowRoomManagementSubMenu(true);
      if (location.pathname.includes("category")) {
        setActiveLink("category");
      } else if (location.pathname.includes("status")) {
        setActiveLink("status");
      } else {
        setActiveLink("room-management");
      }
    } else {
      setActiveLink("");
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (window.innerWidth < 1023) setML(!ml);
  };

  const toggleRoomManagementSubMenu = () => {
    setShowRoomManagementSubMenu(!showRoomManagementSubMenu);
  };

  return (
    <>
      <section className="bg-gray-100 dark:bg-gray-900 min-h-screen flex font-inter">
        {/* Sidebar */}
        <aside
          className={
            ml
              ? "fixed top-0 z-50 ml-[0] flex h-screen w-full flex-col justify-between bg-gray-900 px-6 pb-4 text-white transition-all duration-300 ease-in-out shadow-2xl md:w-80 lg:ml-0 lg:w-72 xl:w-80 2xl:w-96 rounded-r-3xl border-r border-gray-700"
              : "fixed top-0 z-50 ml-[-100%] flex h-screen w-full flex-col justify-between bg-gray-900 px-6 pb-4 text-white transition-all duration-300 ease-in-out shadow-2xl md:w-80 lg:ml-0 lg:w-72 xl:w-80 2xl:w-96 rounded-r-3xl border-r border-gray-700"
          }
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="pt-6 pb-6 border-b border-gray-700 -mx-6 px-6">
              {window.innerWidth < 1023 && (
                <div className="flex items-center justify-between mb-6">
                  <button onClick={toggleSidebar}>
                    <XCircle size={36} />
                  </button>
                  <button onClick={handleLogout}>
                    <LogOut className="h-7 w-7" />
                  </button>
                </div>
              )}
              <h2 className="font-extrabold text-4xl text-white flex items-center gap-3">
                <Hotel className="h-10 w-10 text-yellow-400" />
                Hotel Havana <span className="text-base font-normal">©</span>
              </h2>
            </div>

            {/* User */}
            <div className="mt-10 text-center py-4 border-b border-gray-700">
              <img src={logo} alt="admin" className="m-auto h-28 w-28 rounded-full object-cover p-2 border-4 border-indigo-500" />
              <h5 className="mt-5 text-2xl font-bold">{name}</h5>
              <span className="text-gray-400 text-base font-medium">{role}</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto mt-10">
              <ul className="space-y-4">
                <li onClick={() => { setActiveLink("dashboard"); navigate("/"); toggleSidebar(); }}>
                  <Link to="/" className={activeLink === "dashboard" ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
                    <div className="flex items-center space-x-4 px-5 py-4 rounded-xl">
                      <LayoutDashboard className="h-7 w-7" />
                      <span className="font-bold text-xl">Dashboard</span>
                    </div>
                  </Link>
                </li>

                <li onClick={() => { setActiveLink("booking"); navigate("/booking"); toggleSidebar(); }}>
                  <Link to="/booking" className={activeLink === "booking" ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
                    <div className="flex items-center space-x-4 px-5 py-4 rounded-xl">
                      <CalendarCheck className="h-7 w-7" />
                      <span className="font-bold text-xl">Booking</span>
                    </div>
                  </Link>
                </li>

                <li>
                  <div
                    onClick={toggleRoomManagementSubMenu}
                    className={`flex items-center justify-between cursor-pointer px-5 py-4 rounded-xl ${
                      activeLink === "category" || activeLink === "status"
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <Home className="h-7 w-7" />
                      <span className="font-bold text-xl"><Link to="/room-management">Room Management</Link></span>
                    </div>
                    {showRoomManagementSubMenu ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>

                  {showRoomManagementSubMenu && (
                    <ul className="pl-8 mt-2 space-y-2">
                      <li onClick={() => { setActiveLink("category"); navigate("/room-management/category"); toggleSidebar(); }}>
                        <Link to="/room-management/category" className={activeLink === "category" ? "text-white bg-gradient-to-r from-blue-600 to-indigo-700" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
                          <div className="flex items-center space-x-4 px-5 py-3 rounded-xl">
                            <Tag className="h-6 w-6" />
                            <span className="text-lg">Category</span>
                          </div>
                        </Link>
                      </li>

                      <li onClick={() => { setActiveLink("status"); navigate("/room-management/status"); toggleSidebar(); }}>
                        <Link to="/room-management/status" className={activeLink === "status" ? "text-white bg-gradient-to-r from-blue-600 to-indigo-700" : "text-gray-300 hover:bg-gray-800 hover:text-white"}>
                          <div className="flex items-center space-x-4 px-5 py-3 rounded-xl">
                            <CircleDot className="h-6 w-6" />
                            <span className="text-lg">Status</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>

            <div className="mt-auto pt-6 pb-2 -mx-6 px-6 border-t border-gray-700 hidden md:flex items-center justify-center">
              <button onClick={handleLogout} className="flex items-center space-x-3 px-5 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-700 w-full justify-center font-semibold text-lg rounded-lg">
                <LogOut className="h-7 w-7" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="ml-auto lg:w-[calc(100%-18rem)] xl:w-[calc(100%-20rem)] 2xl:w-[calc(100%-24rem)] w-full transition-all duration-300">
          <div className="sticky top-0 h-20 border-b bg-white dark:bg-gray-800 dark:border-gray-700 py-3 px-6 shadow-md z-30 flex items-center justify-between">
            <h5 className="text-3xl font-extrabold text-gray-800 dark:text-white capitalize tracking-tight">
              {activeLink.replace("room-", "").replace("-", " ")}
            </h5>
            <button onClick={toggleSidebar} className="text-4xl lg:hidden">
              <Menu size={36} />
            </button>
          </div>

          <div className="px-6 pt-8 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-5rem)] rounded-tl-lg">
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/add" element={<AddBooking />} />
              <Route path="/booking/photo-id-upload" element={<PhotoIdUpload />} />
              <Route path="/booking/edit/:id" element={<EditBookingForm />} />
              <Route path="/booking/view/:id" element={<ViewBookingPage />} />

              {/* ✅ FIXED ROUTE BELOW */}
              <Route path="/room-management" element={<RoomManagementPage />} />

              <Route path="/room-management/category" element={<RoomCategoryPage />} />
              <Route path="/room-management/status" element={<RoomStatusPage />} />
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
