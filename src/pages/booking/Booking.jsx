// import React, { useState } from "react";
// import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
// import { CSVLink } from "react-csv";

// const Booking = () => {
//   const [bookings, setBookings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({ name: "", date: "", room: "" });

//   const handleAddBooking = (e) => {
//     e.preventDefault();
//     setBookings([...bookings, form]);
//     setForm({ name: "", date: "", room: "" });
//     setShowModal(false);
//   };

//   const filteredBookings = bookings.filter((b) =>
//     b.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-white p-6 rounded-md shadow-md">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Bookings</h2>
//         <div className="flex space-x-2">
//           <CSVLink
//             data={bookings}
//             filename="bookings.csv"
//             className="bg-green-500 text-white px-4 py-2 rounded-md"
//           >
//             Download CSV
//           </CSVLink>
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
//           >
//             <AiOutlinePlus className="mr-1" /> Add Booking
//           </button>
//         </div>
//       </div>

//       <div className="mb-4">
//         <div className="relative">
//           <AiOutlineSearch className="absolute top-3 left-3 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 border border-gray-300 rounded-md w-full py-2"
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Date</th>
//               <th className="border px-4 py-2">Room</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBookings.length > 0 ? (
//               filteredBookings.map((b, index) => (
//                 <tr key={index} className="text-center">
//                   <td className="border px-4 py-2">{b.name}</td>
//                   <td className="border px-4 py-2">{b.date}</td>
//                   <td className="border px-4 py-2">{b.room}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="text-gray-400 py-4">
//                   No bookings found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-md w-[300px] shadow-xl">
//             <h3 className="text-lg font-semibold mb-4">Add Booking
              
//             </h3>
//             <form onSubmit={handleAddBooking} className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 required
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <input
//                 type="date"
//                 value={form.date}
//                 onChange={(e) => setForm({ ...form, date: e.target.value })}
//                 required
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Room"
//                 value={form.room}
//                 onChange={(e) => setForm({ ...form, room: e.target.value })}
//                 required
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="bg-gray-300 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;


import React, { useState } from "react";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom"; // ✅ added

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // ✅ useNavigate hook

  const filteredBookings = bookings.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Bookings</h2>
        <div className="flex space-x-2">
          <CSVLink
            data={bookings}
            filename="bookings.csv"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Download CSV
          </CSVLink>
          <button
            onClick={() => navigate("/booking/add")} // ✅ redirect to form
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            <AiOutlinePlus className="mr-1" /> Add Booking
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <AiOutlineSearch className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border border-gray-300 rounded-md w-full py-2"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Room</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{b.name}</td>
                  <td className="border px-4 py-2">{b.date}</td>
                  <td className="border px-4 py-2">{b.room}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-gray-400 py-4">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
