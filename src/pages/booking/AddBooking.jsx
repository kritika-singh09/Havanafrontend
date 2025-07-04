



import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Webcam from 'react-webcam';

// Import Heroicons
import {
   UserIcon,
   BuildingOfficeIcon,
   IdentificationIcon,
   WalletIcon,
   HomeIcon,
   ChevronDownIcon,
   GlobeAltIcon,
   DocumentTextIcon,
   TagIcon,
   BriefcaseIcon,
   StarIcon,
   MegaphoneIcon,
   BanknotesIcon,
} from '@heroicons/react/24/outline';


// --- PhotoIdUpload Component (Modal) ---
const PhotoIdUpload = ({ onClose, currentAvatar }) => {
   const [studentAvatar, setStudentAvatar] = useState(currentAvatar);
   const [showWebcam, setShowWebcam] = useState(false);
   const webcamRef = useRef(null);

   const dataURLtoFile = (dataurl, filename) => {
     const arr = dataurl.split(',');
     const mime = arr[0].match(/:(.*?);/)[1];
     const bstr = atob(arr[1]);
     let n = bstr.length;
     const u8arr = new Uint8Array(n);
     while (n--) {
       u8arr[n] = bstr.charCodeAt(n);
     }
     return new File([u8arr], filename, { type: mime });
   };

   const handleImageUpload = (e) => {
     const file = e.target.files[0];
     if (file) {
       setStudentAvatar(file);
       setShowWebcam(false);
     } else {
       console.error("No file selected.");
     }
   };

   const captureImage = useCallback(() => {
     if (webcamRef.current) {
       const imageSrc = webcamRef.current.getScreenshot();
       if (imageSrc) {
         const file = dataURLtoFile(imageSrc, "student_avatar.png");
         setStudentAvatar(file);
         setShowWebcam(false);
       } else {
         toast.error("Failed to capture image from webcam.");
       }
     }
   }, [webcamRef]);

   return (
     <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl font-inter relative">
       <button
         onClick={() => onClose(studentAvatar)}
         className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
         aria-label="Close photo upload"
       >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
         </svg>
       </button>

       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center"> Photo Upload</h2>

       <div className="grid md:grid-cols-2 gap-6">
         {/* Upload Section */}
         <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
           <label className="text-lg font-semibold text-gray-700 mb-3">Upload Photo</label>
           <input
             type="file"
             accept="image/*"
             onChange={handleImageUpload}
             className="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-purple-50 file:text-purple-700
               hover:file:bg-purple-100 cursor-pointer"
           />
           {studentAvatar && !showWebcam && (
             <div className="relative mt-4 w-48 h-48 rounded-full overflow-hidden border-4 border-purple-400 shadow-md flex items-center justify-center bg-gray-200">
               <img
                 src={URL.createObjectURL(studentAvatar)}
                 alt="Student Avatar"
                 className="object-cover w-full h-full"
               />
               <button
                 onClick={() => setStudentAvatar(null)}
                 className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-600 transition-colors"
                 aria-label="Remove avatar"
               >
                 X
               </button>
             </div>
           )}
           {!studentAvatar && (
             <div className="mt-4 w-48 h-48 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-center p-4">
               No image uploaded
             </div>
           )}
         </div>

         {/* Camera Section */}
         <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
           <label className="text-lg font-semibold text-gray-700 mb-3">Capture Photo</label>
           {showWebcam && (
             <div className="relative w-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-md border-2 border-indigo-400">
               <Webcam
                 audio={false}
                 ref={webcamRef}
                 screenshotFormat="image/png"
                 className="w-full h-auto"
                 videoConstraints={{ facingMode: "user" }}
               />
             </div>
           )}
           <div className="mt-4 flex space-x-3">
             <button
               type="button"
               onClick={() => setShowWebcam(!showWebcam)}
               className="flex-1 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-full shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
             >
               {showWebcam ? 'Hide Cam' : 'Show Cam'}
             </button>
             <button
               type="button"
               onClick={captureImage}
               disabled={!showWebcam}
               className={`flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow-md transition-transform transform ${
                 showWebcam ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
               } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
             >
               Capture
             </button>
           </div>
           {!showWebcam && !studentAvatar && (
             <div className="mt-4 w-48 h-48 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-center p-4">
               Webcam off or No image selected
             </div>
           )}
         </div>
       </div>

       <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
         <button
           type="button"
           onClick={() => onClose(studentAvatar)}
           className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
         >
           Done
         </button>
       </div>
     </div>
   );
};


// --- AddBookingForm Component ---
const AddBookingForm = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
     grcNo: "",
     checkInDate: "",
     checkOutDate: "",
     days: "",
     timeIn: "",
     timeOut: "",
     salutation: "",
     name: "",
     age: "",
     gender: "Male",
     address: "",
     city: "",
     nationality: "Indian",
     mobileNo: "",
     email: "",
     phoneNo: "",
     birthDate: "",
     anniversary: "",
     companyName: "",
     companyGSTIN: "",
     idProofType: "Aadhaar Card",
     idProofNumber: "",
     roomNo: "",
     planPackage: "",
     noOfAdults: "",
     noOfChildren: "",
     rate: "",
     taxIncluded: false,
     serviceCharge: false,
     isLeader: false,
     arrivedFrom: "",
     destination: "",
     remark: "",
     businessSource: "",
     marketSegment: "",
     purposeOfVisit: "Personal",
     discountPercent: "",
     discountRoomSource: "",
     paymentMode: "Cash",
     paymentStatus: "Pending",
     bookingRefNo: "",
     mgmtBlock: "No",
     billingInstruction: "",
     temperature: "",
     fromCSV: false,
     epabx: false,
     vip: false,
     status: "Pending", // Default status for new bookings
   });

   const [marketSegmentOptions, setMarketSegmentOptions] = useState([]);
   const [showMarketSegmentInput, setShowMarketSegmentInput] = useState(false);
   const [showPhotoIdModal, setShowPhotoIdModal] = useState(false);
   const [studentPhotoFile, setStudentPhotoFile] = useState(null);

   useEffect(() => {
     let options = [];
     let showInput = false;

     switch (formData.businessSource) {
       case "Online OTA":
         options = ["MakeMyTrip", "Goibibo", "Booking.com", "Agoda", "Expedia", "Others (Specify)"];
         break;
       case "Travel Agent":
         options = ["Corporate Travel Agency", "Leisure Travel Agency", "Tour Operator", "Local Agent", "Others (Specify)"];
         break;
       case "Self Agent":
         options = ["Company Website", "Mobile App", "Walk-in Online Booking"];
         break;
       case "Corporate":
         options = ["Direct Corporate Booking", "Through Company Portal"];
         break;
       case "Walk-in":
       case "Direct Call":
       case "Referral":
       case "":
         options = [];
         showInput = false;
         break;
       default:
         options = [];
         showInput = true;
         break;
     }

     setMarketSegmentOptions(options);
     setShowMarketSegmentInput(showInput || (options.includes("Others (Specify)") && formData.marketSegment === "Others (Specify)"));

     if (!options.includes(formData.marketSegment) && !showInput && formData.marketSegment !== "") {
       setFormData(prev => ({ ...prev, marketSegment: "" }));
     } else if (showInput && options.includes(formData.marketSegment) && formData.marketSegment !== "Others (Specify)") {
       setFormData(prev => ({ ...prev, marketSegment: "" }));
     }

   }, [formData.businessSource, formData.marketSegment]);

   const handleChange = (e) => {
     const { name, value, type, checked } = e.target;
     setFormData((prev) => ({
       ...prev,
       [name]: type === "checkbox" ? checked : value,
     }));
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       if (!formData.checkInDate || !formData.checkOutDate || !formData.name) {
         toast.error("Please fill in all required fields (Check-in Date, Check-out Date, Full Name).");
         return;
       }

       const dataToSubmit = new FormData();
       for (const key in formData) {
         dataToSubmit.append(key, formData[key]);
       }
       if (studentPhotoFile) {
         dataToSubmit.append("studentAvatar", studentPhotoFile);
       }

       console.log("Submitting form data:", formData);
       console.log("Submitting photo file:", studentPhotoFile);

       const response = await axios.post("https://havana-backend.vercel.app/api/bookings", dataToSubmit, {
         headers: {
           'Content-Type': 'multipart/form-data'
         }
       });
       toast.success("Booking Created Successfully!");
       console.log("New booking created:", response.data);

       navigate("/booking");
     } catch (error) {
       console.error("Error creating booking:", error);
       toast.error("Failed to create booking. Please try again. Error: " + (error.response?.data?.message || error.message));
     }
   };

   const handleOpenPhotoIdModal = () => {
     setShowPhotoIdModal(true);
   };

   const handleClosePhotoIdModal = (file) => {
     if (file) {
       setStudentPhotoFile(file);
       toast.success("Student photo uploaded successfully!");
     } else {
         toast('No photo selected or captured.', { icon: 'ℹ️' });
     }
     setShowPhotoIdModal(false);
   };

   // This function is for updating the status of an *existing* booking.
   // It's not directly used in the "Add New Booking" form's submission,
   // but is provided as a utility for other parts of your application.
   const updateBookingStatus = async (bookingId, newStatus) => {
       try {
           const response = await axios.patch(
               `https://havana-backend.vercel.app/api/bookings/${bookingId}/status`,
               { status: newStatus } // Send the new status in the request body
           );
           toast.success(`Booking ${bookingId} status updated to ${newStatus}!`);
           console.log('Status updated successfully:', response.data);
           return response.data;
       } catch (error) {
           console.error('Error updating booking status:', error);
           toast.error(`Failed to update status for booking ${bookingId}. Error: ${error.response?.data?.message || error.message}`);
           throw error;
       }
   };


   // Styling classes
   const sectionTitleClass = "text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2";
   const inputGroupClass = "mb-3"; // Keep a small margin for individual inputs
   const labelClass = "block text-gray-700 text-sm font-semibold mb-1";
   const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 text-base";
   const checkboxLabelClass = "flex items-center gap-2 text-gray-700 font-medium text-sm";
   const iconClass = "h-5 w-5 text-gray-500";

   return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 font-inter">
       <Toaster position="top-right" reverseOrder={false} />

       {/* Main Add Booking Form */}
       <div className="max-w-7xl mx-auto px-6 py-8 bg-white shadow-lg rounded-xl w-full">
         <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">Add New Booking</h2>
         <form onSubmit={handleSubmit} className="space-y-8"> {/* space-y-8 separates the major sections */}

           {/* Booking Details */}
           <div>
             <h3 className={sectionTitleClass}><DocumentTextIcon className={iconClass} />Booking Details</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <div className={inputGroupClass}>
                 <label htmlFor="grcNo" className={labelClass}>GRC No.</label>
                 <input type="text" name="grcNo" id="grcNo" placeholder="GRC No" value={formData.grcNo} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="checkInDate" className={labelClass}>Check-in Date <span className="text-red-500">*</span></label>
                 <input type="date" name="checkInDate" id="checkInDate" value={formData.checkInDate} onChange={handleChange} className={inputClass} required />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="checkOutDate" className={labelClass}>Check-out Date <span className="text-red-500">*</span></label>
                 <input type="date" name="checkOutDate" id="checkOutDate" value={formData.checkOutDate} onChange={handleChange} className={inputClass} required />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="days" className={labelClass}>Days</label>
                 <input type="number" name="days" id="days" placeholder="Days" value={formData.days} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="timeIn" className={labelClass}>Time In</label>
                 <input type="time" name="timeIn" id="timeIn" placeholder="e.g., 14:00" value={formData.timeIn} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="timeOut" className={labelClass}>Time Out</label>
                 <input type="time" name="timeOut" id="timeOut" placeholder="e.g., 12:00" value={formData.timeOut} onChange={handleChange} className={inputClass} />
               </div>
             </div>
           </div>

           {/* Guest Information */}
           <div>
             <h3 className={sectionTitleClass}><UserIcon className={iconClass} />Guest Information</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <div className={inputGroupClass}>
                 <label htmlFor="salutation" className={labelClass}>Salutation</label>
                 <input type="text" name="salutation" id="salutation" placeholder="Mr./Ms./Dr." value={formData.salutation} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                 <input type="text" name="name" id="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={inputClass} required />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="age" className={labelClass}>Age</label>
                 <input type="number" name="age" id="age" placeholder="Age" value={formData.age} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="gender" className={labelClass}>Gender</label>
                 <div className="relative">
                   <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Other">Other</option>
                   </select>
                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                 </div>
               </div>
               <div className={inputGroupClass + " sm:col-span-2 lg:col-span-1"}> {/* Adjusted span */}
                 <label htmlFor="address" className={labelClass}>Address</label>
                 <input type="text" name="address" id="address" placeholder="Address" value={formData.address} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="city" className={labelClass}>City</label>
                 <input type="text" name="city" id="city" placeholder="City" value={formData.city} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="nationality" className={labelClass}>Nationality</label>
                 <div className="relative">
                   <input type="text" name="nationality" id="nationality" value={formData.nationality} readOnly className={inputClass + " bg-gray-100 cursor-not-allowed"} />
                   <GlobeAltIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                 </div>
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="mobileNo" className={labelClass}>Mobile No.</label>
                 <input type="text" name="mobileNo" id="mobileNo" placeholder="Mobile No." value={formData.mobileNo} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="email" className={labelClass}>Email</label>
                 <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="phoneNo" className={labelClass}>Phone No.</label>
                 <input type="text" name="phoneNo" id="phoneNo" placeholder="Phone No." value={formData.phoneNo} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="birthDate" className={labelClass}>Birth Date</label>
                 <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="anniversary" className={labelClass}>Anniversary</label>
                 <input type="date" name="anniversary" id="anniversary" value={formData.anniversary} onChange={handleChange} className={inputClass} />
               </div>
             </div>
           </div>

           {/* Company Details */}
           <div>
             <h3 className={sectionTitleClass}><BuildingOfficeIcon className={iconClass} />Company Details</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <div className={inputGroupClass}>
                 <label htmlFor="companyName" className={labelClass}>Company Name</label>
                 <input type="text" name="companyName" id="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="companyGSTIN" className={labelClass}>Company GSTIN</label>
                 <input type="text" name="companyGSTIN" id="companyGSTIN" placeholder="Company GSTIN" value={formData.companyGSTIN} onChange={handleChange} className={inputClass} />
               </div>
               {/* Empty div to fill the third column for alignment, if desired, or remove if 2-col is fine here */}
               <div className="hidden lg:block"></div>
             </div>
           </div>

           {/* ID Proof */}
           <div>
             <h3 className={sectionTitleClass}><IdentificationIcon className={iconClass} />ID Proof</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <div className={inputGroupClass}>
                 <label htmlFor="idProofType" className={labelClass}>ID Proof Type</label>
                 <div className="relative">
                   <select name="idProofType" id="idProofType" value={formData.idProofType} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                     <option>Aadhaar Card</option>
                     <option>PAN Card</option>
                     <option>Driving License</option>
                     <option>Passport</option>
                     <option>Voter ID</option>
                   </select>
                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                 </div>
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="idProofNumber" className={labelClass}>ID Number</label>
                 <input type="text" name="idProofNumber" id="idProofNumber" placeholder="ID Number" value={formData.idProofNumber} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass + " sm:col-span-2 lg:col-span-1 pt-2"}>
                   <button
                       type="button"
                       onClick={handleOpenPhotoIdModal}
                       className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-md shadow-sm hover:bg-purple-700 transition-colors duration-200"
                   >
                       Upload Photo ID
                   </button>
                   {studentPhotoFile && (
                       <div className="mt-3 text-center">
                           <p className="text-gray-700 text-sm font-medium">Photo uploaded:</p>
                           <img
                             src={URL.createObjectURL(studentPhotoFile)}
                             alt="Student Avatar Preview"
                             className="mx-auto mt-2 w-20 h-20 object-cover rounded-full border-2 border-purple-400 shadow-sm"
                           />
                       </div>
                   )}
               </div>
             </div>
           </div>

           {/* Room & Rate Details */}
           <div>
             <h3 className={sectionTitleClass}><HomeIcon className={iconClass} />Room & Rate Details</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <div className={inputGroupClass}>
                 <label htmlFor="roomNo" className={labelClass}>Room No.</label>
                 <input type="text" name="roomNo" id="roomNo" placeholder="Room No." value={formData.roomNo} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="planPackage" className={labelClass}>Plan Package</label>
                 <input type="text" name="planPackage" id="planPackage" placeholder="e.g., EP, CP, MAP" value={formData.planPackage} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="noOfAdults" className={labelClass}>No. of Adults</label>
                 <input type="number" name="noOfAdults" id="noOfAdults" placeholder="No. of Adults" value={formData.noOfAdults} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="noOfChildren" className={labelClass}>No. of Children</label>
                 <input type="number" name="noOfChildren" id="noOfChildren" placeholder="No. of Children" value={formData.noOfChildren} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="rate" className={labelClass}>Rate (₹)</label>
                 <input type="number" name="rate" id="rate" placeholder="Rate" value={formData.rate} onChange={handleChange} className={inputClass} />
               </div>
               <div className="col-span-full flex flex-wrap gap-x-6 gap-y-2 pt-2 items-center">
                 <label htmlFor="taxIncluded" className={checkboxLabelClass}>
                   <input type="checkbox" name="taxIncluded" id="taxIncluded" checked={formData.taxIncluded} onChange={handleChange} className="mr-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                   Tax Included
                 </label>
                 <label htmlFor="serviceCharge" className={checkboxLabelClass}>
                   <input type="checkbox" name="serviceCharge" id="serviceCharge" checked={formData.serviceCharge} onChange={handleChange} className="mr-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                   Service Charge
                 </label>
                 <label htmlFor="isLeader" className={checkboxLabelClass}>
                   <input type="checkbox" name="isLeader" id="isLeader" checked={formData.isLeader} onChange={handleChange} className="mr-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                   Is Leader
                 </label>
               </div>
             </div>
           </div>

           {/* Other Details */}
           <div>
             <h3 className={sectionTitleClass}><WalletIcon className={iconClass} />Other Details</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <div className={inputGroupClass}>
                 <label htmlFor="arrivedFrom" className={labelClass}>Arrived From</label>
                 <input type="text" name="arrivedFrom" id="arrivedFrom" placeholder="Arrived From" value={formData.arrivedFrom} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="destination" className={labelClass}>Destination</label>
                 <input type="text" name="destination" id="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="remark" className={labelClass}>Remark</label>
                 <input type="text" name="remark" id="remark" placeholder="Remark" value={formData.remark} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="businessSource" className={labelClass}><MegaphoneIcon className="inline-block h-4 w-4 mr-1 text-gray-500"/>Business Source</label>
                 <div className="relative">
                   <select
                     name="businessSource"
                     id="businessSource"
                     onChange={handleChange}
                     className={inputClass + " appearance-none pr-8"}
                     value={formData.businessSource}
                   >
                     <option value="">Select Business Source</option>
                     <option value="Self Agent">Self Agent</option>
                     <option value="Online OTA">Online OTA</option>
                     <option value="Travel Agent">Travel Agent</option>
                     <option value="Corporate">Corporate</option>
                     <option value="Direct Call">Direct Call</option>
                     <option value="Walk-in">Walk-in</option>
                     <option value="Referral">Referral</option>
                     <option value="Other">Other</option>
                   </select>
                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                 </div>
               </div>

               {(marketSegmentOptions.length > 0 || showMarketSegmentInput) && (
                 <div className={inputGroupClass}>
                   <label htmlFor="marketSegment" className={labelClass}>Market Segment</label>
                   {showMarketSegmentInput ? (
                     <input
                       type="text"
                       name="marketSegment"
                       id="marketSegment"
                       placeholder="Specify Market Segment"
                       value={formData.marketSegment}
                       onChange={handleChange}
                       className={inputClass}
                     />
                   ) : (
                     <div className="relative">
                       <select
                         name="marketSegment"
                         id="marketSegment"
                         value={formData.marketSegment}
                         onChange={handleChange}
                         className={inputClass + " appearance-none pr-8"}
                       >
                         <option value="">Select Market Segment</option>
                         {marketSegmentOptions.map((option) => (
                           <option key={option} value={option}>{option}</option>
                         ))}
                       </select>
                       <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                     </div>
                   )}
                 </div>
               )}

               <div className={inputGroupClass}>
                 <label htmlFor="purposeOfVisit" className={labelClass}><BriefcaseIcon className="inline-block h-4 w-4 mr-1 text-gray-500"/>Purpose of Visit</label>
                 <div className="relative">
                   <select name="purposeOfVisit" id="purposeOfVisit" value={formData.purposeOfVisit} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                     <option value="Personal">Personal</option>
                     <option value="Business">Business</option>
                     <option value="Leisure">Leisure</option>
                     <option value="Family Visit">Family Visit</option>
                     <option value="Medical">Medical</option>
                     <option value="Other">Other</option>
                   </select>
                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                 </div>
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="discountPercent" className={labelClass}>Discount (%)</label>
                 <input type="number" name="discountPercent" id="discountPercent" placeholder="e.g., 10" value={formData.discountPercent} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="discountRoomSource" className={labelClass}>Discount Room Source</label>
                 <input type="text" name="discountRoomSource" id="discountRoomSource" placeholder="Source of Discount" value={formData.discountRoomSource} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="paymentMode" className={labelClass}><BanknotesIcon className="inline-block h-4 w-4 mr-1 text-gray-500"/>Payment Mode</label>
                 <div className="relative">
                   <select name="paymentMode" id="paymentMode" value={formData.paymentMode} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                     <option value="Cash">Cash</option>
                     <option value="Credit Card">Credit Card</option>
                     <option value="Debit Card">Debit Card</option>
                     <option value="UPI">UPI</option>
                     <option value="Bank Transfer">Bank Transfer</option>
                     <option value="Other">Other</option>
                   </select>
                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                 </div>
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="paymentStatus" className={labelClass}>Payment Status</label>
                 <div className="relative">
                   <select name="paymentStatus" id="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                     <option value="Pending">Pending</option>
                     <option value="Paid">Paid</option>
                     <option value="Partially Paid">Partially Paid</option>
                     <option value="Refunded">Refunded</option>
                   </select>
                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                 </div>
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="bookingRefNo" className={labelClass}>Booking Ref No.</label>
                 <input type="text" name="bookingRefNo" id="bookingRefNo" placeholder="Booking Reference" value={formData.bookingRefNo} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="mgmtBlock" className={labelClass}>Mgmt Block</label>
                 <div className="relative">
                   <select name="mgmtBlock" id="mgmtBlock" value={formData.mgmtBlock} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                     <option value="No">No</option>
                     <option value="Yes">Yes</option>
                   </select>
                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                 </div>
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="billingInstruction" className={labelClass}>Billing Instruction</label>
                 <input type="text" name="billingInstruction" id="billingInstruction" placeholder="Billing Instruction" value={formData.billingInstruction} onChange={handleChange} className={inputClass} />
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="temperature" className={labelClass}>Temperature</label>
                 <input type="text" name="temperature" id="temperature" placeholder="e.g., 98.6°F" value={formData.temperature} onChange={handleChange} className={inputClass} />
               </div>
               <div className="col-span-full flex flex-wrap gap-x-6 gap-y-2 pt-2 items-center">
                 <label htmlFor="fromCSV" className={checkboxLabelClass}>
                   <input type="checkbox" name="fromCSV" id="fromCSV" checked={formData.fromCSV} onChange={handleChange} className="mr-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                   From CSV
                 </label>
                 <label htmlFor="epabx" className={checkboxLabelClass}>
                   <input type="checkbox" name="epabx" id="epabx" checked={formData.epabx} onChange={handleChange} className="mr-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                   EPABX
                 </label>
                 <label htmlFor="vip" className={checkboxLabelClass}>
                   <input type="checkbox" name="vip" id="vip" checked={formData.vip} onChange={handleChange} className="mr-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                   VIP
                 </label>
               </div>
               <div className={inputGroupClass}>
                 <label htmlFor="status" className={labelClass}>Status</label>
                 <div className="relative">
                   <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                     <option value="Pending">Pending</option>
                     <option value="Confirmed">Confirmed</option>
                     <option value="Checked-In">Checked-In</option>
                     <option value="Checked-Out">Checked-Out</option>
                     <option value="Cancelled">Cancelled</option>
                   </select>
                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                 </div>
               </div>
             </div>
           </div>

           {/* Submit Button */}
           <div className="flex justify-center mt-10">
             <button
               type="submit"
               className="px-8 py-3 bg-blue-600 text-white font-bold  shadow-xl hover:bg-blue-700 focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105 active:scale-95"
             >
               Add Booking
             </button>
           </div>
         </form>

         {/* Photo ID Upload Modal */}
         {showPhotoIdModal && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
             <PhotoIdUpload
               onClose={handleClosePhotoIdModal}
               currentAvatar={studentPhotoFile}
             />
           </div>
         )}
       </div>
     </div>
   );
 };

 export default AddBookingForm;