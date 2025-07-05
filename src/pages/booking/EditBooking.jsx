
// import React, { useState, useEffect } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import {
//   DocumentTextIcon,
//   UserIcon,
//   BuildingOfficeIcon,
//   IdentificationIcon,
//   HomeIcon,
//   GlobeAltIcon,
//   TagIcon,
//   BanknotesIcon,
//   BriefcaseIcon,
//   ChevronDownIcon,
// } from '@heroicons/react/24/outline';

// // Placeholder for your PhotoIdUpload modal component
// const PhotoIdUpload = ({ onClose, onCapture, currentFiles, handleRemoveFile }) => {
//   return (
//     <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50 p-4"> {/* Darker, more opaque overlay */}
//       <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100"> {/* Larger padding, rounded-xl, deeper shadow, subtle transition */}
//         <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3 border-gray-200">Upload Photos & IDs</h2> {/* Larger, bolder title, subtle border */}
//         <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"> {/* Added max-height and scroll for many files */}
//           {Object.entries(currentFiles).map(([key, file]) => (
//             file && (
//               <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 text-base shadow-sm"> {/* Enhanced file display */}
//                 <span>{key.replace(/([A-Z])/g, ' $1').trim()}: <span className="font-medium">{file.name || "Already Uploaded"}</span></span> {/* Prettier key name */}
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveFile(key)}
//                   className="text-red-600 hover:text-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 p-1 rounded-full"
//                   title={`Remove ${key}`}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             )
//           ))}
//           {/* Your file input/webcam capture logic would go here */}
//           <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-center text-sm italic">
//             [Implement your file upload/camera capture components here. This modal will provide the functionality to select or capture images.]
//           </div>
//         </div>
//         <div className="mt-8 flex justify-end gap-4"> {/* More space, better button alignment */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddBookingForm = () => {
//     const [formData, setFormData] = useState({
//         grcNo: '', checkInDate: '', checkOutDate: '', days: '', timeIn: '', timeOut: '',
//         salutation: '', name: '', age: '', gender: 'Male', address: '', city: '', nationality: 'Indian',
//         mobileNo: '', email: '', phoneNo: '', birthDate: '', anniversary: '',
//         companyName: '', companyGSTIN: '',
//         idProofType: 'Aadhaar Card', idProofNumber: '',
//         roomNo: '', planPackage: '', noOfAdults: '', noOfChildren: '', rate: '',
//         taxIncluded: false, serviceCharge: false, isLeader: false,
//         arrivedFrom: '', destination: '', remark: '',
//         businessSource: '', marketSegment: '', purposeOfVisit: 'Personal',
//         discountPercent: '', discountRoomSource: '',
//         paymentMode: 'Cash', paymentStatus: 'Pending', bookingRefNo: '',
//         mgmtBlock: 'No', vip: false, status: 'Booked',
//     });

//     const [uploadedFiles, setUploadedFiles] = useState({
//         studentAvatar: null, idProofFront: null, idProofBack: null, otherDocument: null,
//     });

//     const [showPhotoIdModal, setShowPhotoIdModal] = useState(false);
//     const [showMarketSegmentInput, setShowMarketSegmentInput] = useState(false);

//     const marketSegmentOptions = [
//       "Leisure", "Corporate", "Group Tour", "MICE", "Direct Booking", "Online Travel Agency (OTA)",
//       "Travel Agent/Wholesaler", "Government", "Education", "Healthcare", "Other"
//     ];

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: type === 'checkbox' ? checked : value,
//         }));

//         if (name === "businessSource" && value === "Other") {
//             setShowMarketSegmentInput(true);
//         } else if (name === "businessSource" && value !== "Other") {
//             setShowMarketSegmentInput(false);
//             setFormData((prevData) => ({ ...prevData, marketSegment: '' }));
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form Data Submitted:', formData);
//         console.log('Uploaded Files:', uploadedFiles);
//         toast.success('Booking data submitted successfully!', {
//             style: {
//                 border: '1px solid #28a745',
//                 padding: '16px',
//                 color: '#28a745',
//             },
//             iconTheme: {
//                 primary: '#28a745',
//                 secondary: '#FFFAEE',
//             },
//         });
//     };

//     const handleOpenPhotoIdModal = () => setShowPhotoIdModal(true);
//     const handleClosePhotoIdModal = () => setShowPhotoIdModal(false);

//     const handleCaptureFile = (fileType, file) => {
//         setUploadedFiles((prevFiles) => ({ ...prevFiles, [fileType]: file }));
//         toast.success(`${fileType.replace(/([A-Z])/g, ' $1').trim()} uploaded!`);
//     };

//     const handleRemoveFile = (fileType) => {
//         setUploadedFiles((prevFiles) => ({ ...prevFiles, [fileType]: null }));
//         toast.error(`${fileType.replace(/([A-Z])/g, ' $1').trim()} removed.`);
//     };

//     const renderExternalImagePreview = (file, label, fileKey) => {
//         if (!file) return null;

//         const fileSrc = typeof file === 'string' ? file : URL.createObjectURL(file);

//         return (
//             <div className="relative w-36 h-36 border border-gray-200 rounded-lg overflow-hidden shadow-md group transform transition-transform hover:scale-105"> {/* Larger preview, better shadow/hover */}
//                 <img src={fileSrc} alt={label} className="w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent bg-opacity-70 flex items-end justify-center text-white text-xs font-semibold p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     {label}
//                 </div>
//                 <button
//                     type="button"
//                     onClick={() => handleRemoveFile(fileKey)}
//                     className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
//                     title={`Remove ${label}`}
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                 </button>
//             </div>
//         );
//     };

//     const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-blue-200 flex items-center gap-3"; // Bolder, slightly larger, blue border
//     const inputGroupClass = "mb-4"; // Increased bottom margin for more space
//     const labelClass = "block text-gray-700 text-sm font-semibold mb-2"; // Bolder label, increased margin
//     const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 text-base focus:outline-none focus:ring-3 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 ease-in-out shadow-sm"; // More padding, rounded, lighter bg, better focus, shadow
//     const checkboxLabelClass = "flex items-center gap-2 text-gray-700 font-medium text-sm cursor-pointer"; // Added cursor pointer
//     const iconClass = "h-6 w-6 text-blue-500"; // Larger icons, blue color

//     const hasAnyUploadedFile = uploadedFiles.studentAvatar || uploadedFiles.idProofFront || uploadedFiles.idProofBack || uploadedFiles.otherDocument;

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6 sm:p-8 font-sans"> {/* Gradient background, better padding, font-sans */}
//             <Toaster position="top-center" reverseOrder={false} /> {/* Centered toaster */}

//             <div className="max-w-7xl mx-auto px-8 py-10 bg-white shadow-xl rounded-2xl w-full border border-gray-100"> {/* More padding, deeper shadow, more rounded, subtle border */}
//                 <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-tight drop-shadow-sm">Edit Booking</h2> {/* Larger, bolder, deeper shadow */}
//                 <form onSubmit={handleSubmit} className="space-y-10"> {/* Increased space between sections */}

//                     <div>
//                         <h3 className={sectionTitleClass}><DocumentTextIcon className={iconClass} />Booking Details</h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Increased gap */}
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="grcNo" className={labelClass}>GRC No.</label>
//                                 <input type="text" name="grcNo" id="grcNo" placeholder="Enter GRC No." value={formData.grcNo} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="checkInDate" className={labelClass}>Check-in Date <span className="text-red-500">*</span></label>
//                                 <input type="date" name="checkInDate" id="checkInDate" value={formData.checkInDate} onChange={handleChange} className={inputClass} required />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="checkOutDate" className={labelClass}>Check-out Date <span className="text-red-500">*</span></label>
//                                 <input type="date" name="checkOutDate" id="checkOutDate" value={formData.checkOutDate} onChange={handleChange} className={inputClass} required />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="days" className={labelClass}>Days</label>
//                                 <input type="number" name="days" id="days" placeholder="Number of days" value={formData.days} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="timeIn" className={labelClass}>Time In</label>
//                                 <input type="time" name="timeIn" id="timeIn" placeholder="e.g., 14:00" value={formData.timeIn} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="timeOut" className={labelClass}>Time Out</label>
//                                 <input type="time" name="timeOut" id="timeOut" placeholder="e.g., 12:00" value={formData.timeOut} onChange={handleChange} className={inputClass} />
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className={sectionTitleClass}><UserIcon className={iconClass} />Guest Information</h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="salutation" className={labelClass}>Salutation</label>
//                                 <input type="text" name="salutation" id="salutation" placeholder="Mr./Ms./Dr." value={formData.salutation} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
//                                 <input type="text" name="name" id="name" placeholder="Guest's Full Name" value={formData.name} onChange={handleChange} className={inputClass} required />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="age" className={labelClass}>Age</label>
//                                 <input type="number" name="age" id="age" placeholder="Age" value={formData.age} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="gender" className={labelClass}>Gender</label>
//                                 <div className="relative">
//                                     <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                                         <option value="Male">Male</option>
//                                         <option value="Female">Female</option>
//                                         <option value="Other">Other</option>
//                                     </select>
//                                     <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>
//                             <div className={inputGroupClass + " sm:col-span-2 lg:col-span-1"}>
//                                 <label htmlFor="address" className={labelClass}>Address</label>
//                                 <input type="text" name="address" id="address" placeholder="Guest's Address" value={formData.address} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="city" className={labelClass}>City</label>
//                                 <input type="text" name="city" id="city" placeholder="City" value={formData.city} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="nationality" className={labelClass}>Nationality</label>
//                                 <div className="relative">
//                                     <input type="text" name="nationality" id="nationality" value={formData.nationality} readOnly className={inputClass + " bg-gray-100 cursor-not-allowed"} />
//                                 </div>
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="mobileNo" className={labelClass}>Mobile No.</label>
//                                 <input type="tel" name="mobileNo" id="mobileNo" placeholder="Mobile Number" value={formData.mobileNo} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="email" className={labelClass}>Email</label>
//                                 <input type="email" name="email" id="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="phoneNo" className={labelClass}>Phone No.</label>
//                                 <input type="tel" name="phoneNo" id="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="birthDate" className={labelClass}>Birth Date</label>
//                                 <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="anniversary" className={labelClass}>Anniversary</label>
//                                 <input type="date" name="anniversary" id="anniversary" value={formData.anniversary} onChange={handleChange} className={inputClass} />
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className={sectionTitleClass}><BuildingOfficeIcon className={iconClass} />Company Details</h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="companyName" className={labelClass}>Company Name</label>
//                                 <input type="text" name="companyName" id="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="companyGSTIN" className={labelClass}>Company GSTIN</label>
//                                 <input type="text" name="companyGSTIN" id="companyGSTIN" placeholder="Company GSTIN" value={formData.companyGSTIN} onChange={handleChange} className={inputClass} />
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className={sectionTitleClass}><IdentificationIcon className={iconClass} />ID Proof & Documents</h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="idProofType" className={labelClass}>ID Proof Type</label>
//                                 <div className="relative">
//                                     <select name="idProofType" id="idProofType" value={formData.idProofType} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                                         <option value="Aadhaar Card">Aadhaar Card</option>
//                                         <option value="Passport">Passport</option>
//                                         <option value="Driving License">Driving License</option>
//                                         <option value="Voter ID">Voter ID</option>
//                                         <option value="Other">Other</option>
//                                     </select>
//                                     <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="idProofNumber" className={labelClass}>ID Proof Number</label>
//                                 <input type="text" name="idProofNumber" id="idProofNumber" placeholder="ID Proof Number" value={formData.idProofNumber} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass + " flex items-end"}>
//                                 <button
//                                     type="button"
//                                     onClick={handleOpenPhotoIdModal}
//                                     className="w-full bg-indigo-600 text-white py-3 px-5 rounded-lg hover:bg-indigo-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-indigo-400 focus:ring-offset-2 flex items-center justify-center gap-2 font-semibold shadow-md"
//                                 >
//                                     <IdentificationIcon className="h-5 w-5" /> Upload Photos/IDs
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="mt-8">
//                             {hasAnyUploadedFile ? (
//                                 <div className="flex flex-wrap gap-5 justify-start"> {/* Increased gap for previews */}
//                                     {renderExternalImagePreview(uploadedFiles.studentAvatar, "Student Photo", "studentAvatar")}
//                                     {renderExternalImagePreview(uploadedFiles.idProofFront, "ID Front", "idProofFront")}
//                                     {renderExternalImagePreview(uploadedFiles.idProofBack, "ID Back", "idProofBack")}
//                                     {renderExternalImagePreview(uploadedFiles.otherDocument, "Other Document", "otherDocument")}
//                                 </div>
//                             ) : (
//                                 <div className="mt-4 p-5 text-center text-gray-600 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-lg"> {/* Better padding, text, border */}
//                                     No photos or ID documents selected yet. Click "Upload Photos/IDs" to add them.
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className={sectionTitleClass}><HomeIcon className={iconClass} />Room & Rate Details</h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="roomNo" className={labelClass}>Room No.</label>
//                                 <input type="text" name="roomNo" id="roomNo" placeholder="Room Number" value={formData.roomNo} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="planPackage" className={labelClass}>Plan/Package</label>
//                                 <input type="text" name="planPackage" id="planPackage" placeholder="Plan or Package" value={formData.planPackage} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="noOfAdults" className={labelClass}>No. of Adults</label>
//                                 <input type="number" name="noOfAdults" id="noOfAdults" placeholder="Number of Adults" value={formData.noOfAdults} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="noOfChildren" className={labelClass}>No. of Children</label>
//                                 <input type="number" name="noOfChildren" id="noOfChildren" placeholder="Number of Children" value={formData.noOfChildren} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="rate" className={labelClass}>Rate</label>
//                                 <input type="number" name="rate" id="rate" placeholder="Rate per night" value={formData.rate} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass + " flex flex-col sm:flex-row items-start sm:items-end gap-4"}> {/* Flex-col for better stacking on small screens */}
//                                 <label htmlFor="taxIncluded" className={checkboxLabelClass}>
//                                     <input type="checkbox" name="taxIncluded" id="taxIncluded" checked={formData.taxIncluded} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
//                                     Tax Included
//                                 </label>
//                                 <label htmlFor="serviceCharge" className={checkboxLabelClass}>
//                                     <input type="checkbox" name="serviceCharge" id="serviceCharge" checked={formData.serviceCharge} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
//                                     Service Charge
//                                 </label>
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="isLeader" className={checkboxLabelClass}>
//                                     <input type="checkbox" name="isLeader" id="isLeader" checked={formData.isLeader} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
//                                     Is Leader (for group bookings)
//                                 </label>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className={sectionTitleClass}><GlobeAltIcon className={iconClass} />Travel Details</h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="arrivedFrom" className={labelClass}>Arrived From</label>
//                                 <input type="text" name="arrivedFrom" id="arrivedFrom" placeholder="City/Country of origin" value={formData.arrivedFrom} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="destination" className={labelClass}>Destination</label>
//                                 <input type="text" name="destination" id="destination" placeholder="Next destination" value={formData.destination} onChange={handleChange} className={inputClass} />
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className={sectionTitleClass}><TagIcon className={iconClass} />Additional Information</h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="remark" className={labelClass}>Remark</label>
//                                 <textarea name="remark" id="remark" placeholder="Any special requests, notes, or comments" value={formData.remark} onChange={handleChange} className={inputClass + " h-24 resize-y"}></textarea> {/* Taller textarea */}
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="businessSource" className={labelClass}>Business Source</label>
//                                 <div className="relative">
//                                     <select name="businessSource" id="businessSource" value={formData.businessSource} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                                         <option value="">Select Source</option>
//                                         <option value="Online OTA">Online OTA</option>
//                                         <option value="Travel Agent">Travel Agent</option>
//                                         <option value="Self Agent">Self Agent</option>
//                                         <option value="Corporate">Corporate</option>
//                                         <option value="Walk-in">Walk-in</option>
//                                         <option value="Direct Call">Direct Call</option>
//                                         <option value="Referral">Referral</option>
//                                         <option value="Other">Other (Specify)</option>
//                                     </select>
//                                     <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="marketSegment" className={labelClass}>Market Segment</label>
//                                 <div className="relative">
//                                     {showMarketSegmentInput ? (
//                                         <input
//                                             type="text"
//                                             name="marketSegment"
//                                             id="marketSegment"
//                                             placeholder="Specify Market Segment"
//                                             value={formData.marketSegment}
//                                             onChange={handleChange}
//                                             className={inputClass}
//                                         />
//                                     ) : (
//                                         <select
//                                             name="marketSegment"
//                                             id="marketSegment"
//                                             value={formData.marketSegment}
//                                             onChange={handleChange}
//                                             className={inputClass + " appearance-none pr-8 cursor-pointer"}
//                                             disabled={marketSegmentOptions.length === 0}
//                                         >
//                                             <option value="">Select Segment</option>
//                                             {marketSegmentOptions.map(option => (
//                                                 <option key={option} value={option}>{option}</option>
//                                             ))}
//                                         </select>
//                                     )}
//                                     {!showMarketSegmentInput && <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />}
//                                 </div>
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="purposeOfVisit" className={labelClass}>Purpose of Visit</label>
//                                 <div className="relative">
//                                     <select name="purposeOfVisit" id="purposeOfVisit" value={formData.purposeOfVisit} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                                         <option value="Personal">Personal</option>
//                                         <option value="Business">Business</option>
//                                         <option value="Leisure">Leisure</option>
//                                         <option value="Conference">Conference</option>
//                                         <option value="Other">Other</option>
//                                     </select>
//                                     <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="discountPercent" className={labelClass}>Discount %</label>
//                                 <input type="number" name="discountPercent" id="discountPercent" placeholder="e.g., 10" value={formData.discountPercent} onChange={handleChange} className={inputClass} />
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="discountRoomSource" className={labelClass}>Discount Room Source</label>
//                                 <input type="text" name="discountRoomSource" id="discountRoomSource" placeholder="e.g., Corporate Deal" value={formData.discountRoomSource} onChange={handleChange} className={inputClass} />
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className={sectionTitleClass}><BanknotesIcon className={iconClass} />Payment Details</h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="paymentMode" className={labelClass}>Payment Mode</label>
//                                 <div className="relative">
//                                     <select name="paymentMode" id="paymentMode" value={formData.paymentMode} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                                         <option value="Cash">Cash</option>
//                                         <option value="Card">Card</option>
//                                         <option value="Online">Online</option>
//                                         <option value="Bank Transfer">Bank Transfer</option>
//                                     </select>
//                                     <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="paymentStatus" className={labelClass}>Payment Status</label>
//                                 <div className="relative">
//                                     <select name="paymentStatus" id="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                                         <option value="Pending">Pending</option>
//                                         <option value="Paid">Paid</option>
//                                         <option value="Partial">Partially Paid</option>
//                                         <option value="Refunded">Refunded</option>
//                                     </select>
//                                     <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="bookingRefNo" className={labelClass}>Booking Ref. No.</label>
//                                 <input type="text" name="bookingRefNo" id="bookingRefNo" placeholder="Booking Reference Number" value={formData.bookingRefNo} onChange={handleChange} className={inputClass} />
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className={sectionTitleClass}><BriefcaseIcon className={iconClass} />Management & Special Settings</h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="mgmtBlock" className={labelClass}>Management Block</label>
//                                 <div className="relative">
//                                     <select name="mgmtBlock" id="mgmtBlock" value={formData.mgmtBlock} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                                         <option value="No">No</option>
//                                         <option value="Yes">Yes</option>
//                                     </select>
//                                     <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>

//                             <div className={inputGroupClass + " flex items-end gap-4"}>
//                                 <label htmlFor="vip" className={checkboxLabelClass}>
//                                     <input type="checkbox" name="vip" id="vip" checked={formData.vip} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
//                                     VIP Guest
//                                 </label>
//                             </div>
//                             <div className={inputGroupClass}>
//                                 <label htmlFor="status" className={labelClass}>Booking Status</label>
//                                 <div className="relative">
//                                     <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                                         <option value="Booked">Booked</option>
//                                         <option value="Checked in">Checked-in</option>
//                                         <option value="Checked out">Checked-out</option>
//                                         <option value="Cancelled">Cancelled</option>
//                                         <option value="No Show">No Show</option>
//                                     </select>
//                                     <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex flex-col sm:flex-row justify-center mt-12 gap-4"> {/* Better button spacing and responsiveness */}
//                         <button
//                             type="submit"
//                             className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-98 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75 text-xl tracking-wide"
//                         >
//                             Create Booking
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => window.history.back()}
//                             className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-98 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-75 text-xl tracking-wide"
//                         >
//                             Back
//                         </button>
//                     </div>
//                 </form>
//             </div>

//             {showPhotoIdModal && (
//                 <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50 p-4">
//                     <PhotoIdUpload
//                         onClose={handleClosePhotoIdModal}
//                         onCapture={handleCaptureFile}
//                         currentFiles={uploadedFiles}
//                         handleRemoveFile={handleRemoveFile}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddBookingForm;
// import React, { useState, useEffect } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate and useLocation
// import {
//   DocumentTextIcon,
//   UserIcon,
//   BuildingOfficeIcon,
//   IdentificationIcon,
//   HomeIcon,
//   GlobeAltIcon,
//   TagIcon,
//   BanknotesIcon,
//   BriefcaseIcon,
//   ChevronDownIcon,
// } from '@heroicons/react/24/outline';

// // PhotoIdUpload Modal Component (no changes, it remains as is)
// const PhotoIdUpload = ({ onClose, onCapture, currentFiles, handleRemoveFile }) => {
//   return (
//     <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50 p-4"> {/* Darker, more opaque overlay */}
//       <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100"> {/* Larger padding, rounded-xl, deeper shadow, subtle transition */}
//         <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3 border-gray-200">Upload Photos & IDs</h2> {/* Larger, bolder title, subtle border */}
//         <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"> {/* Added max-height and scroll for many files */}
//           {Object.entries(currentFiles).map(([key, file]) => (
//             file && (
//               <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 text-base shadow-sm"> {/* Enhanced file display */}
//                 <span>{key.replace(/([A-Z])/g, ' $1').trim()}: <span className="font-medium">{file.name || "Already Uploaded"}</span></span> {/* Prettier key name */}
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveFile(key)}
//                   className="text-red-600 hover:text-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 p-1 rounded-full"
//                   title={`Remove ${key}`}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             )
//           ))}
//           {/* Your file input/webcam capture logic would go here */}
//           <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-center text-sm italic">
//             [Implement your file upload/camera capture components here. This modal will provide the functionality to select or capture images.]
//           </div>
//         </div>
//         <div className="mt-8 flex justify-end gap-4"> {/* More space, better button alignment */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EditBookingForm = () => {
//   const location = useLocation(); // Use useLocation hook to get state from URL
//   const navigate = useNavigate(); // Use useNavigate hook for navigation

//   // State for form data, populate if editing data is available
//   const [formData, setFormData] = useState({
//     grcNo: '', checkInDate: '', checkOutDate: '', days: '', timeIn: '', timeOut: '',
//     salutation: '', name: '', age: '', gender: 'Male', address: '', city: '', nationality: 'Indian',
//     mobileNo: '', email: '', phoneNo: '', birthDate: '', anniversary: '',
//     companyName: '', companyGSTIN: '',
//     idProofType: 'Aadhaar Card', idProofNumber: '',
//     roomNo: '', planPackage: '', noOfAdults: '', noOfChildren: '', rate: '',
//     taxIncluded: false, serviceCharge: false, isLeader: false,
//     arrivedFrom: '', destination: '', remark: '',
//     businessSource: '', marketSegment: '', purposeOfVisit: 'Personal',
//     discountPercent: '', discountRoomSource: '',
//     paymentMode: 'Cash', paymentStatus: 'Pending', bookingRefNo: '',
//     mgmtBlock: 'No', vip: false, status: 'Booked',
//   });

//   // State for uploaded files
//   const [uploadedFiles, setUploadedFiles] = useState({
//     studentAvatar: null, idProofFront: null, idProofBack: null, otherDocument: null,
//   });

//   const [showPhotoIdModal, setShowPhotoIdModal] = useState(false);
//   const [showMarketSegmentInput, setShowMarketSegmentInput] = useState(false);

//   // useEffect to populate the form if editing data exists
//   useEffect(() => {
//     if (location.state && location.state.editingData) {
//       const { editingData } = location.state;
//       setFormData({
//         ...formData, // Retain default values
//         ...editingData, // Overwrite with existing data
//         // Ensure date fields are in the correct format (YYYY-MM-DD)
//         checkInDate: editingData.checkInDate ? new Date(editingData.checkInDate).toISOString().split('T')[0] : '',
//         checkOutDate: editingData.checkOutDate ? new Date(editingData.checkOutDate).toISOString().split('T')[0] : '',
//         birthDate: editingData.birthDate ? new Date(editingData.birthDate).toISOString().split('T')[0] : '',
//         anniversary: editingData.anniversary ? new Date(editingData.anniversary).toISOString().split('T')[0] : '',
//       });

//       // Populate uploaded files if photo URLs exist
//       setUploadedFiles({
//         studentAvatar: editingData.photoUrl || null, // Use 'photoUrl' as 'studentAvatar'
//         idProofFront: editingData.idProofFrontUrl || null, // If you have these URLs
//         idProofBack: editingData.idProofBackUrl || null,
//         otherDocument: editingData.otherDocumentUrl || null,
//       });

//       // Show marketSegment input if businessSource is 'Other'
//       if (editingData.businessSource === 'Other') {
//         setShowMarketSegmentInput(true);
//       }
//     }
//   }, [location.state]); // Run this effect when location.state changes

//   const marketSegmentOptions = [
//     "Leisure", "Corporate", "Group Tour", "MICE", "Direct Booking", "Online Travel Agency (OTA)",
//     "Travel Agent/Wholesaler", "Government", "Education", "Healthcare", "Other"
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));

//     if (name === "businessSource" && value === "Other") {
//       setShowMarketSegmentInput(true);
//     } else if (name === "businessSource" && value !== "Other") {
//       setShowMarketSegmentInput(false);
//       setFormData((prevData) => ({ ...prevData, marketSegment: '' }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form data updated:', formData);
//     console.log('Uploaded Files:', uploadedFiles);
//     // Here you would make an API call to update the data (e.g., axios.put)
//     toast.success('Booking data updated successfully!', {
//       style: {
//         border: '1px solid #28a745',
//         padding: '16px',
//         color: '#28a745',
//       },
//       iconTheme: {
//         primary: '#28a745',
//         secondary: '#FFFAEE',
//       },
//     });
//     // Navigate back to the bookings list after update
//     navigate('/bookings'); // Actual path to your bookings list page
//   };

//   const handleOpenPhotoIdModal = () => setShowPhotoIdModal(true);
//   const handleClosePhotoIdModal = () => setShowPhotoIdModal(false);

//   const handleCaptureFile = (fileType, file) => {
//     setUploadedFiles((prevFiles) => ({ ...prevFiles, [fileType]: file }));
//     toast.success(`${fileType.replace(/([A-Z])/g, ' $1').trim()} uploaded!`);
//   };

//   const handleRemoveFile = (fileType) => {
//     setUploadedFiles((prevFiles) => ({ ...prevFiles, [fileType]: null }));
//     toast.error(`${fileType.replace(/([A-Z])/g, ' $1').trim()} removed.`);
//   };

//   const renderExternalImagePreview = (file, label, fileKey) => {
//     if (!file) return null;

//     // If the file is a string (URL), use it directly. Otherwise, create an object URL.
//     const fileSrc = typeof file === 'string' ? file : URL.createObjectURL(file);

//     return (
//       <div className="relative w-36 h-36 border border-gray-200 rounded-lg overflow-hidden shadow-md group transform transition-transform hover:scale-105"> {/* Larger preview, better shadow/hover */}
//         <img src={fileSrc} alt={label} className="w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent bg-opacity-70 flex items-end justify-center text-white text-xs font-semibold p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           {label}
//         </div>
//         <button
//           type="button"
//           onClick={() => handleRemoveFile(fileKey)}
//           className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
//           title={`Remove ${label}`}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>
//     );
//   };

//   const sectionTitleClass = "text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-blue-200 flex items-center gap-3"; // Bolder, slightly larger, blue border
//   const inputGroupClass = "mb-4"; // Increased bottom margin for more space
//   const labelClass = "block text-gray-700 text-sm font-semibold mb-2"; // Bolder label, increased margin
//   const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 text-base focus:outline-none focus:ring-3 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 ease-in-out shadow-sm"; // More padding, rounded, lighter bg, better focus, shadow
//   const checkboxLabelClass = "flex items-center gap-2 text-gray-700 font-medium text-sm cursor-pointer"; // Added cursor pointer
//   const iconClass = "h-6 w-6 text-blue-500"; // Larger icons, blue color

//   const hasAnyUploadedFile = uploadedFiles.studentAvatar || uploadedFiles.idProofFront || uploadedFiles.idProofBack || uploadedFiles.otherDocument;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6 sm:p-8 font-sans"> {/* Gradient background, better padding, font-sans */}
//       <Toaster position="top-center" reverseOrder={false} /> {/* Centered toaster */}

//       <div className="max-w-7xl mx-auto px-8 py-10 bg-white shadow-xl rounded-2xl w-full border border-gray-100"> {/* More padding, deeper shadow, more rounded, subtle border */}
//         <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-tight drop-shadow-sm">Edit Booking</h2> {/* Larger, bolder, deeper shadow */}
//         <form onSubmit={handleSubmit} className="space-y-10"> {/* Increased space between sections */}

//           {/* Booking Details */}
//           <div>
//             <h3 className={sectionTitleClass}><DocumentTextIcon className={iconClass} />Booking Details</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Increased gap */}
//               <div className={inputGroupClass}>
//                 <label htmlFor="grcNo" className={labelClass}>GRC No.</label>
//                 <input type="text" name="grcNo" id="grcNo" placeholder="Enter GRC No." value={formData.grcNo} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="checkInDate" className={labelClass}>Check-in Date <span className="text-red-500">*</span></label>
//                 <input type="date" name="checkInDate" id="checkInDate" value={formData.checkInDate} onChange={handleChange} className={inputClass} required />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="checkOutDate" className={labelClass}>Check-out Date <span className="text-red-500">*</span></label>
//                 <input type="date" name="checkOutDate" id="checkOutDate" value={formData.checkOutDate} onChange={handleChange} className={inputClass} required />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="days" className={labelClass}>Days</label>
//                 <input type="number" name="days" id="days" placeholder="Number of days" value={formData.days} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="timeIn" className={labelClass}>Time In</label>
//                 <input type="time" name="timeIn" id="timeIn" placeholder="e.g., 14:00" value={formData.timeIn} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="timeOut" className={labelClass}>Time Out</label>
//                 <input type="time" name="timeOut" id="timeOut" placeholder="e.g., 12:00" value={formData.timeOut} onChange={handleChange} className={inputClass} />
//               </div>
//             </div>
//           </div>

//           {/* Guest Information */}
//           <div>
//             <h3 className={sectionTitleClass}><UserIcon className={iconClass} />Guest Information</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className={inputGroupClass}>
//                 <label htmlFor="salutation" className={labelClass}>Salutation</label>
//                 <input type="text" name="salutation" id="salutation" placeholder="Mr./Ms./Dr." value={formData.salutation} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
//                 <input type="text" name="name" id="name" placeholder="Guest's Full Name" value={formData.name} onChange={handleChange} className={inputClass} required />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="age" className={labelClass}>Age</label>
//                 <input type="number" name="age" id="age" placeholder="Age" value={formData.age} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="gender" className={labelClass}>Gender</label>
//                 <div className="relative">
//                   <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div className={inputGroupClass + " sm:col-span-2 lg:col-span-1"}>
//                 <label htmlFor="address" className={labelClass}>Address</label>
//                 <input type="text" name="address" id="address" placeholder="Guest's Address" value={formData.address} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="city" className={labelClass}>City</label>
//                 <input type="text" name="city" id="city" placeholder="City" value={formData.city} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="nationality" className={labelClass}>Nationality</label>
//                 <div className="relative">
//                   <input type="text" name="nationality" id="nationality" value={formData.nationality} readOnly className={inputClass + " bg-gray-100 cursor-not-allowed"} />
//                 </div>
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="mobileNo" className={labelClass}>Mobile No.</label>
//                 <input type="tel" name="mobileNo" id="mobileNo" placeholder="Mobile Number" value={formData.mobileNo} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="email" className={labelClass}>Email</label>
//                 <input type="email" name="email" id="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="phoneNo" className={labelClass}>Phone No.</label>
//                 <input type="tel" name="phoneNo" id="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="birthDate" className={labelClass}>Birth Date</label>
//                 <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="anniversary" className={labelClass}>Anniversary</label>
//                 <input type="date" name="anniversary" id="anniversary" value={formData.anniversary} onChange={handleChange} className={inputClass} />
//               </div>
//             </div>
//           </div>

//           {/* Company Details */}
//           <div>
//             <h3 className={sectionTitleClass}><BuildingOfficeIcon className={iconClass} />Company Details</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className={inputGroupClass}>
//                 <label htmlFor="companyName" className={labelClass}>Company Name</label>
//                 <input type="text" name="companyName" id="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="companyGSTIN" className={labelClass}>Company GSTIN</label>
//                 <input type="text" name="companyGSTIN" id="companyGSTIN" placeholder="Company GSTIN" value={formData.companyGSTIN} onChange={handleChange} className={inputClass} />
//               </div>
//             </div>
//           </div>

//           {/* ID Proof & Documents */}
//           <div>
//             <h3 className={sectionTitleClass}><IdentificationIcon className={iconClass} />ID Proof & Documents</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className={inputGroupClass}>
//                 <label htmlFor="idProofType" className={labelClass}>ID Proof Type</label>
//                 <div className="relative">
//                   <select name="idProofType" id="idProofType" value={formData.idProofType} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                     <option value="Aadhaar Card">Aadhaar Card</option>
//                     <option value="Passport">Passport</option>
//                     <option value="Driving License">Driving License</option>
//                     <option value="Voter ID">Voter ID</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="idProofNumber" className={labelClass}>ID Proof Number</label>
//                 <input type="text" name="idProofNumber" id="idProofNumber" placeholder="ID Proof Number" value={formData.idProofNumber} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass + " flex items-end"}>
//                 <button
//                   type="button"
//                   onClick={handleOpenPhotoIdModal}
//                   className="w-full bg-indigo-600 text-white py-3 px-5 rounded-lg hover:bg-indigo-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-indigo-400 focus:ring-offset-2 flex items-center justify-center gap-2 font-semibold shadow-md"
//                 >
//                   <IdentificationIcon className="h-5 w-5" /> Upload Photos/IDs
//                 </button>
//               </div>
//             </div>
//             <div className="mt-8">
//               {hasAnyUploadedFile ? (
//                 <div className="flex flex-wrap gap-5 justify-start"> {/* Increased gap for previews */}
//                   {renderExternalImagePreview(uploadedFiles.studentAvatar, "Student Photo", "studentAvatar")}
//                   {renderExternalImagePreview(uploadedFiles.idProofFront, "ID Front", "idProofFront")}
//                   {renderExternalImagePreview(uploadedFiles.idProofBack, "ID Back", "idProofBack")}
//                   {renderExternalImagePreview(uploadedFiles.otherDocument, "Other Document", "otherDocument")}
//                 </div>
//               ) : (
//                 <div className="mt-4 p-5 text-center text-gray-600 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-lg"> {/* Better padding, text, border */}
//                   No photos or ID documents selected yet. Click "Upload Photos/IDs" to add them.
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Room & Rate Details */}
//           <div>
//             <h3 className={sectionTitleClass}><HomeIcon className={iconClass} />Room & Rate Details</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className={inputGroupClass}>
//                 <label htmlFor="roomNo" className={labelClass}>Room No.</label>
//                 <input type="text" name="roomNo" id="roomNo" placeholder="Room Number" value={formData.roomNo} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="planPackage" className={labelClass}>Plan/Package</label>
//                 <input type="text" name="planPackage" id="planPackage" placeholder="Plan or Package" value={formData.planPackage} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="noOfAdults" className={labelClass}>No. of Adults</label>
//                 <input type="number" name="noOfAdults" id="noOfAdults" placeholder="Number of Adults" value={formData.noOfAdults} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="noOfChildren" className={labelClass}>No. of Children</label>
//                 <input type="number" name="noOfChildren" id="noOfChildren" placeholder="Number of Children" value={formData.noOfChildren} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="rate" className={labelClass}>Rate</label>
//                 <input type="number" name="rate" id="rate" placeholder="Rate per night" value={formData.rate} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass + " flex flex-col sm:flex-row items-start sm:items-end gap-4"}> {/* Flex-col for better stacking on small screens */}
//                 <label htmlFor="taxIncluded" className={checkboxLabelClass}>
//                   <input type="checkbox" name="taxIncluded" id="taxIncluded" checked={formData.taxIncluded} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
//                   Tax Included
//                 </label>
//                 <label htmlFor="serviceCharge" className={checkboxLabelClass}>
//                   <input type="checkbox" name="serviceCharge" id="serviceCharge" checked={formData.serviceCharge} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
//                   Service Charge
//                 </label>
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="isLeader" className={checkboxLabelClass}>
//                   <input type="checkbox" name="isLeader" id="isLeader" checked={formData.isLeader} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
//                   Is Leader (for group bookings)
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Travel Details */}
//           <div>
//             <h3 className={sectionTitleClass}><GlobeAltIcon className={iconClass} />Travel Details</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className={inputGroupClass}>
//                 <label htmlFor="arrivedFrom" className={labelClass}>Arrived From</label>
//                 <input type="text" name="arrivedFrom" id="arrivedFrom" placeholder="City/Country of origin" value={formData.arrivedFrom} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="destination" className={labelClass}>Destination</label>
//                 <input type="text" name="destination" id="destination" placeholder="Next destination" value={formData.destination} onChange={handleChange} className={inputClass} />
//               </div>
//             </div>
//           </div>

//           {/* Additional Information */}
//           <div>
//             <h3 className={sectionTitleClass}><TagIcon className={iconClass} />Additional Information</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className={inputGroupClass}>
//                 <label htmlFor="remark" className={labelClass}>Remark</label>
//                 <textarea name="remark" id="remark" placeholder="Any special requests, notes, or comments" value={formData.remark} onChange={handleChange} className={inputClass + " h-24 resize-y"}></textarea> {/* Taller textarea */}
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="businessSource" className={labelClass}>Business Source</label>
//                 <div className="relative">
//                   <select name="businessSource" id="businessSource" value={formData.businessSource} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                     <option value="">Select Source</option>
//                     <option value="Online OTA">Online OTA</option>
//                     <option value="Travel Agent">Travel Agent</option>
//                     <option value="Self Agent">Self Agent</option>
//                     <option value="Corporate">Corporate</option>
//                     <option value="Walk-in">Walk-in</option>
//                     <option value="Direct Call">Direct Call</option>
//                     <option value="Referral">Referral</option>
//                     <option value="Other">Other (Specify)</option>
//                   </select>
//                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="marketSegment" className={labelClass}>Market Segment</label>
//                 <div className="relative">
//                   {showMarketSegmentInput ? (
//                     <input
//                       type="text"
//                       name="marketSegment"
//                       id="marketSegment"
//                       placeholder="Specify Market Segment"
//                       value={formData.marketSegment}
//                       onChange={handleChange}
//                       className={inputClass}
//                     />
//                   ) : (
//                     <select
//                       name="marketSegment"
//                       id="marketSegment"
//                       value={formData.marketSegment}
//                       onChange={handleChange}
//                       className={inputClass + " appearance-none pr-8 cursor-pointer"}
//                       disabled={marketSegmentOptions.length === 0}
//                     >
//                       <option value="">Select Segment</option>
//                       {marketSegmentOptions.map(option => (
//                         <option key={option} value={option}>{option}</option>
//                       ))}
//                     </select>
//                   )}
//                   {!showMarketSegmentInput && <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />}
//                 </div>
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="purposeOfVisit" className={labelClass}>Purpose of Visit</label>
//                 <div className="relative">
//                   <select name="purposeOfVisit" id="purposeOfVisit" value={formData.purposeOfVisit} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                     <option value="Personal">Personal</option>
//                     <option value="Business">Business</option>
//                     <option value="Leisure">Leisure</option>
//                     <option value="Family">Family</option>
//                     <option value="Other">Other</option>
//                   </select>
//                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="discountPercent" className={labelClass}>Discount Percent</label>
//                 <input type="number" name="discountPercent" id="discountPercent" placeholder="Discount Percentage" value={formData.discountPercent} onChange={handleChange} className={inputClass} />
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="discountRoomSource" className={labelClass}>Discount Room Source</label>
//                 <input type="text" name="discountRoomSource" id="discountRoomSource" placeholder="Discount Room Source" value={formData.discountRoomSource} onChange={handleChange} className={inputClass} />
//               </div>
//             </div>
//           </div>

//           {/* Payment Details */}
//           <div>
//             <h3 className={sectionTitleClass}><BanknotesIcon className={iconClass} />Payment Details</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className={inputGroupClass}>
//                 <label htmlFor="paymentMode" className={labelClass}>Payment Mode</label>
//                 <div className="relative">
//                   <select name="paymentMode" id="paymentMode" value={formData.paymentMode} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                     <option value="Cash">Cash</option>
//                     <option value="Card">Card</option>
//                     <option value="Online">Online</option>
//                     <option value="Bank Transfer">Bank Transfer</option>
//                   </select>
//                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="paymentStatus" className={labelClass}>Payment Status</label>
//                 <div className="relative">
//                   <select name="paymentStatus" id="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                     <option value="Pending">Pending</option>
//                     <option value="Paid">Paid</option>
//                     <option value="Partial">Partially Paid</option>
//                     <option value="Refunded">Refunded</option>
//                   </select>
//                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="bookingRefNo" className={labelClass}>Booking Ref. No.</label>
//                 <input type="text" name="bookingRefNo" id="bookingRefNo" placeholder="Booking Reference Number" value={formData.bookingRefNo} onChange={handleChange} className={inputClass} />
//               </div>
//             </div>
//           </div>

//           {/* Management & Special Settings */}
//           <div>
//             <h3 className={sectionTitleClass}><BriefcaseIcon className={iconClass} />Management & Special Settings</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className={inputGroupClass}>
//                 <label htmlFor="mgmtBlock" className={labelClass}>Management Block</label>
//                 <div className="relative">
//                   <select name="mgmtBlock" id="mgmtBlock" value={formData.mgmtBlock} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                     <option value="No">No</option>
//                     <option value="Yes">Yes</option>
//                   </select>
//                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>

//               <div className={inputGroupClass + " flex items-end gap-4"}>
//                 <label htmlFor="vip" className={checkboxLabelClass}>
//                   <input type="checkbox" name="vip" id="vip" checked={formData.vip} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
//                   VIP Guest
//                 </label>
//               </div>
//               <div className={inputGroupClass}>
//                 <label htmlFor="status" className={labelClass}>Booking Status</label>
//                 <div className="relative">
//                   <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
//                     <option value="Booked">Booked</option>
//                     <option value="Checked in">Checked-in</option>
//                     <option value="Checked out">Checked-out</option>
//                     <option value="Cancelled">Cancelled</option>
//                     <option value="No Show">No Show</option>
//                   </select>
//                   <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Form Action Buttons */}
//           <div className="flex flex-col sm:flex-row justify-center mt-12 gap-4"> {/* Better button spacing and responsiveness */}
//             <button
//               type="submit"
//                  onClick={() => navigate('/booking')} 
//               className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-98 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75 text-xl tracking-wide"
//             >
//               Update Booking
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate('/booking')} 
//               className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-98 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-75 text-xl tracking-wide"
//             >
//               Back
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Photo/ID Upload Modal */}
//       {showPhotoIdModal && (
//         <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50 p-4">
//           <PhotoIdUpload
//             onClose={handleClosePhotoIdModal}
//             onCapture={handleCaptureFile}
//             currentFiles={uploadedFiles}
//             handleRemoveFile={handleRemoveFile}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditBookingForm;
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DocumentTextIcon,
  UserIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  HomeIcon,
  GlobeAltIcon,
  TagIcon,
  BanknotesIcon,
  BriefcaseIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

// PhotoIdUpload Modal Component (no changes, it remains as is)
const PhotoIdUpload = ({ onClose, onCapture, currentFiles, handleRemoveFile }) => {
  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-6"> {/* छोटे और बड़े स्क्रीन के लिए पैडिंग समायोजित करें */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg transform transition-all duration-300 scale-100 opacity-100"> {/* विभिन्न स्क्रीन आकारों के लिए अधिकतम चौड़ाई समायोजित करें */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">Upload Photos & IDs</h2> {/* शीर्षक का आकार और मार्जिन समायोजित करें */}
        <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto pr-2"> {/* स्पेसिंग समायोजित करें */}
          {Object.entries(currentFiles).map(([key, file]) => (
            file && (
              <div key={key} className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 text-sm sm:text-base shadow-sm"> {/* टेक्स्ट आकार और पैडिंग समायोजित करें */}
                <span>{key.replace(/([A-Z])/g, ' $1').trim()}: <span className="font-medium">{file.name || "Already Uploaded"}</span></span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(key)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 p-1 rounded-full"
                  title={`Remove ${key}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5"> {/* आइकन का आकार समायोजित करें */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )
          ))}
          {/* Your file input/webcam capture logic would go here */}
          <div className="p-4 sm:p-6 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-center text-xs sm:text-sm italic"> {/* टेक्स्ट आकार और पैडिंग समायोजित करें */}
            [Implement your file upload/camera capture components here. This modal will provide the functionality to select or capture images.]
          </div>
        </div>
        <div className="mt-6 sm:mt-8 flex justify-end gap-3 sm:gap-4"> {/* मार्जिन और गैप समायोजित करें */}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-sm sm:text-base" 
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const EditBookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initial form data with default values
  const initialFormData = {
    grcNo: '', checkInDate: '', checkOutDate: '', days: '', timeIn: '', timeOut: '',
    salutation: '', name: '', age: '', gender: 'Male', address: '', city: '', nationality: 'Indian',
    mobileNo: '', email: '', phoneNo: '', birthDate: '', anniversary: '',
    companyName: '', companyGSTIN: '',
    idProofType: 'Aadhaar Card', idProofNumber: '',
    roomNo: '', planPackage: '', noOfAdults: '', noOfChildren: '', rate: '',
    taxIncluded: false, serviceCharge: false, isLeader: false,
    arrivedFrom: '', destination: '', remark: '',
    businessSource: '', marketSegment: '', purposeOfVisit: 'Personal',
    discountPercent: '', discountRoomSource: '',
    paymentMode: 'Cash', paymentStatus: 'Pending', bookingRefNo: '',
    mgmtBlock: 'No', vip: false, status: 'Booked',
  };

  // Dummy data for testing when no editingData is passed via state
  const dummyEditingData = {
    _id: 'dummy-booking-id-123',
    grcNo: 'GRC12345',
    checkInDate: '2025-07-10',
    checkOutDate: '2025-07-15',
    days: 5,
    timeIn: '14:00',
    timeOut: '12:00',
    salutation: 'Mr.',
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    address: '123 Main St',
    city: 'Anytown',
    nationality: 'Indian',
    mobileNo: '9876543210',
    email: 'john.doe@example.com',
    phoneNo: '0123456789',
    birthDate: '1990-05-20',
    anniversary: '2010-08-15',
    companyName: 'Acme Corp',
    companyGSTIN: 'GSTIN12345',
    idProofType: 'Passport',
    idProofNumber: 'P1234567',
    roomNo: '101',
    planPackage: 'Deluxe',
    noOfAdults: 2,
    noOfChildren: 1,
    rate: 1500,
    taxIncluded: true,
    serviceCharge: false,
    isLeader: true,
    arrivedFrom: 'New York',
    destination: 'London',
    remark: 'Late check-in requested.',
    businessSource: 'Corporate',
    marketSegment: 'Corporate',
    purposeOfVisit: 'Business',
    discountPercent: 10,
    discountRoomSource: 'Corporate Deal',
    paymentMode: 'Card',
    paymentStatus: 'Paid',
    bookingRefNo: 'REF7890',
    mgmtBlock: 'No',
    vip: true,
    status: 'Checked in',
    photoUrl: 'https://placehold.co/100x100/A7C7E7/000000?text=GuestPhoto', // Dummy image URL
    idProofFrontUrl: 'https://placehold.co/100x100/FFDDC1/000000?text=IDFront',
    idProofBackUrl: 'https://placehold.co/100x100/C1FFDDC/000000?text=IDBack',
    otherDocumentUrl: null,
  };


  const [formData, setFormData] = useState(initialFormData);
  const [uploadedFiles, setUploadedFiles] = useState({
    studentAvatar: null, idProofFront: null, idProofBack: null, otherDocument: null,
  });

  const [showPhotoIdModal, setShowPhotoIdModal] = useState(false);
  const [showMarketSegmentInput, setShowMarketSegmentInput] = useState(false);

  // useEffect to populate the form if editing data exists, otherwise use dummy data
  useEffect(() => {
    let dataToLoad = null;
    if (location.state && location.state.editingData) {
      dataToLoad = location.state.editingData;
      console.log("Loading data from location state:", dataToLoad);
    } else {
      // Use dummy data if no editingData is passed (for direct testing)
      dataToLoad = dummyEditingData;
      console.log("No editingData in state, loading dummy data:", dataToLoad);
    }

    if (dataToLoad) {
      setFormData((prevData) => ({
        ...prevData, // Keep initial defaults for fields not in dataToLoad
        ...dataToLoad, // Overwrite with loaded data
        // Ensure date fields are in the correct format (YYYY-MM-DD)
        checkInDate: dataToLoad.checkInDate ? new Date(dataToLoad.checkInDate).toISOString().split('T')[0] : '',
        checkOutDate: dataToLoad.checkOutDate ? new Date(dataToLoad.checkOutDate).toISOString().split('T')[0] : '',
        birthDate: dataToLoad.birthDate ? new Date(dataToLoad.birthDate).toISOString().split('T')[0] : '',
        anniversary: dataToLoad.anniversary ? new Date(dataToLoad.anniversary).toISOString().split('T')[0] : '',
      }));

      // Populate uploaded files if photo URLs exist
      setUploadedFiles({
        studentAvatar: dataToLoad.photoUrl || null,
        idProofFront: dataToLoad.idProofFrontUrl || null,
        idProofBack: dataToLoad.idProofBackUrl || null,
        otherDocument: dataToLoad.otherDocumentUrl || null,
      });

      // Show marketSegment input if businessSource is 'Other'
      if (dataToLoad.businessSource === 'Other') {
        setShowMarketSegmentInput(true);
      }
    }
  }, [location.state]); // Dependency array includes location.state

  const marketSegmentOptions = [
    "Leisure", "Corporate", "Group Tour", "MICE", "Direct Booking", "Online Travel Agency (OTA)",
    "Travel Agent/Wholesaler", "Government", "Education", "Healthcare", "Other"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Input changed: ${name}, Value: ${type === 'checkbox' ? checked : value}`); // Log every change
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === "businessSource" && value === "Other") {
      setShowMarketSegmentInput(true);
    } else if (name === "businessSource" && value !== "Other") {
      setShowMarketSegmentInput(false);
      setFormData((prevData) => ({ ...prevData, marketSegment: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted for update:', formData);
    console.log('Uploaded Files on submit:', uploadedFiles);
    // Here you would make an API call to update the data (e.g., axios.put)
    // Example:
    // axios.put(`${backendURL}/api/bookings/${formData._id}`, formData)
    //   .then(response => {
    //     toast.success('Booking data updated successfully!');
    //     navigate('/booking'); // Navigate back to the booking list page
    //   })
    //   .catch(error => {
    //     console.error("Error updating booking:", error);
    //     toast.error("Failed to update booking.");
    //   });

    toast.success('Booking data successfully processed (simulated update)!', {
      style: {
        border: '1px solid #28a745',
        padding: '16px',
        color: '#28a745',
      },
      iconTheme: {
        primary: '#28a745',
        secondary: '#FFFAEE',
      },
    });
    // Navigate back to the bookings list after update
    console.log("Navigating back to /booking after simulated update.");
    navigate('/booking'); // Changed to /booking as per your route definition
  };

  const handleOpenPhotoIdModal = () => setShowPhotoIdModal(true);
  const handleClosePhotoIdModal = () => setShowPhotoIdModal(false);

  const handleCaptureFile = (fileType, file) => {
    setUploadedFiles((prevFiles) => ({ ...prevFiles, [fileType]: file }));
    toast.success(`${fileType.replace(/([A-Z])/g, ' $1').trim()} uploaded!`);
  };

  const handleRemoveFile = (fileType) => {
    setUploadedFiles((prevFiles) => ({ ...prevFiles, [fileType]: null }));
    toast.error(`${fileType.replace(/([A-Z])/g, ' $1').trim()} removed.`);
  };

  const renderExternalImagePreview = (file, label, fileKey) => {
    if (!file) return null;

    // If the file is a string (URL), use it directly. Otherwise, create an object URL.
    const fileSrc = typeof file === 'string' ? file : URL.createObjectURL(file);

    return (
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 border border-gray-200 rounded-lg overflow-hidden shadow-md group transform transition-transform hover:scale-105"> {/* विभिन्न स्क्रीन आकारों के लिए पूर्वावलोकन आकार समायोजित करें */}
        <img src={fileSrc} alt={label} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/CCCCCC/000000?text=Error"; }} /> {/* Added onError for broken image links */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent bg-opacity-70 flex items-end justify-center text-white text-xs font-semibold p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"> {/* टेक्स्ट आकार और पैडिंग समायोजित करें */}
          {label}
        </div>
        <button
          type="button"
          onClick={() => handleRemoveFile(fileKey)}
          className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-0.5 sm:p-1 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          title={`Remove ${label}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 h-4"> {/* आइकन का आकार समायोजित करें */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  };

  const sectionTitleClass = "text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b border-blue-200 flex items-center gap-2 sm:gap-3"; // विभिन्न स्क्रीन आकारों के लिए शीर्षक का आकार और मार्जिन समायोजित करें
  const inputGroupClass = "mb-3 sm:mb-4"; // मार्जिन समायोजित करें
  const labelClass = "block text-gray-700 text-sm sm:text-base font-semibold mb-1.5 sm:mb-2"; // लेबल का आकार और मार्जिन समायोजित करें
  const inputClass = "w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-3 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 ease-in-out shadow-sm"; // इनपुट का आकार, पैडिंग और टेक्स्ट आकार समायोजित करें
  const checkboxLabelClass = "flex items-center gap-1.5 sm:gap-2 text-gray-700 font-medium text-sm sm:text-base cursor-pointer"; // टेक्स्ट आकार और गैप समायोजित करें
  const iconClass = "h-5 w-5 sm:h-6 sm:w-6 text-blue-500"; // आइकन का आकार समायोजित करें

  const hasAnyUploadedFile = uploadedFiles.studentAvatar || uploadedFiles.idProofFront || uploadedFiles.idProofBack || uploadedFiles.otherDocument;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans"> {/* पैडिंग समायोजित करें */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-full mx-auto px-4 py-6 sm:px-8 sm:py-10 bg-white shadow-xl rounded-2xl w-full border border-gray-100"> {/* अधिकतम चौड़ाई, पैडिंग समायोजित करें */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-8 sm:mb-10 md:mb-12 tracking-tight drop-shadow-sm">Edit Booking</h2> {/* शीर्षक का आकार और मार्जिन समायोजित करें */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 md:space-y-10"> {/* अनुभागों के बीच स्थान समायोजित करें */}

          {/* Booking Details */}
          <div>
            <h3 className={sectionTitleClass}><DocumentTextIcon className={iconClass} />Booking Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"> {/* गैप समायोजित करें */}
              <div className={inputGroupClass}>
                <label htmlFor="grcNo" className={labelClass}>GRC No.</label>
                <input type="text" name="grcNo" id="grcNo" placeholder="Enter GRC No." value={formData.grcNo} onChange={handleChange} className={inputClass} />
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
                <input type="number" name="days" id="days" placeholder="Number of days" value={formData.days} onChange={handleChange} className={inputClass} />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className={inputGroupClass}>
                <label htmlFor="salutation" className={labelClass}>Salutation</label>
                <input type="text" name="salutation" id="salutation" placeholder="Mr./Ms./Dr." value={formData.salutation} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" id="name" placeholder="Guest's Full Name" value={formData.name} onChange={handleChange} className={inputClass} required />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="age" className={labelClass}>Age</label>
                <input type="number" name="age" id="age" placeholder="Age" value={formData.age} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="gender" className={labelClass}>Gender</label>
                <div className="relative">
                  <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" /> {/* आइकन का आकार समायोजित करें */}
                </div>
              </div>
              <div className={inputGroupClass + " sm:col-span-2 lg:col-span-1"}>
                <label htmlFor="address" className={labelClass}>Address</label>
                <input type="text" name="address" id="address" placeholder="Guest's Address" value={formData.address} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="city" className={labelClass}>City</label>
                <input type="text" name="city" id="city" placeholder="City" value={formData.city} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="nationality" className={labelClass}>Nationality</label>
                <div className="relative">
                  <input type="text" name="nationality" id="nationality" value={formData.nationality} readOnly className={inputClass + " bg-gray-100 cursor-not-allowed"} />
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="mobileNo" className={labelClass}>Mobile No.</label>
                <input type="tel" name="mobileNo" id="mobileNo" placeholder="Mobile Number" value={formData.mobileNo} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input type="email" name="email" id="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="phoneNo" className={labelClass}>Phone No.</label>
                <input type="tel" name="phoneNo" id="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} className={inputClass} />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className={inputGroupClass}>
                <label htmlFor="companyName" className={labelClass}>Company Name</label>
                <input type="text" name="companyName" id="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="companyGSTIN" className={labelClass}>Company GSTIN</label>
                <input type="text" name="companyGSTIN" id="companyGSTIN" placeholder="Company GSTIN" value={formData.companyGSTIN} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* ID Proof & Documents */}
          <div>
            <h3 className={sectionTitleClass}><IdentificationIcon className={iconClass} />ID Proof & Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className={inputGroupClass}>
                <label htmlFor="idProofType" className={labelClass}>ID Proof Type</label>
                <div className="relative">
                  <select name="idProofType" id="idProofType" value={formData.idProofType} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" /> {/* आइकन का आकार समायोजित करें */}
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="idProofNumber" className={labelClass}>ID Proof Number</label>
                <input type="text" name="idProofNumber" id="idProofNumber" placeholder="ID Proof Number" value={formData.idProofNumber} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass + " flex items-end"}>
                <button
                  type="button"
                  onClick={handleOpenPhotoIdModal}
                  className="w-full bg-indigo-600 text-white py-2.5 px-4 sm:py-3 sm:px-5 rounded-lg hover:bg-indigo-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-indigo-400 focus:ring-offset-2 flex items-center justify-center gap-1.5 sm:gap-2 font-semibold shadow-md text-sm sm:text-base" 
                >
                  <IdentificationIcon className="h-4 w-4 sm:h-5 sm:w-5" /> Upload Photos/IDs
                </button>
              </div>
            </div>
            <div className="mt-6 sm:mt-8"> {/* मार्जिन समायोजित करें */}
              {hasAnyUploadedFile ? (
                <div className="flex flex-wrap gap-3 sm:gap-5 justify-start"> {/* गैप समायोजित करें */}
                  {renderExternalImagePreview(uploadedFiles.studentAvatar, "Student Photo", "studentAvatar")}
                  {renderExternalImagePreview(uploadedFiles.idProofFront, "ID Front", "idProofFront")}
                  {renderExternalImagePreview(uploadedFiles.idProofBack, "ID Back", "idProofBack")}
                  {renderExternalImagePreview(uploadedFiles.otherDocument, "Other Document", "otherDocument")}
                </div>
              ) : (
                <div className="mt-3 sm:mt-4 p-4 sm:p-5 text-center text-gray-600 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-sm sm:text-lg"> {/* पैडिंग और टेक्स्ट आकार समायोजित करें */}
                  No photos or ID documents selected yet. Click "Upload Photos/IDs" to add them.
                </div>
              )}
            </div>
          </div>

          {/* Room & Rate Details */}
          <div>
            <h3 className={sectionTitleClass}><HomeIcon className={iconClass} />Room & Rate Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className={inputGroupClass}>
                <label htmlFor="roomNo" className={labelClass}>Room No.</label>
                <input type="text" name="roomNo" id="roomNo" placeholder="Room Number" value={formData.roomNo} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="planPackage" className={labelClass}>Plan/Package</label>
                <input type="text" name="planPackage" id="planPackage" placeholder="Plan or Package" value={formData.planPackage} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="noOfAdults" className={labelClass}>No. of Adults</label>
                <input type="number" name="noOfAdults" id="noOfAdults" placeholder="Number of Adults" value={formData.noOfAdults} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="noOfChildren" className={labelClass}>No. of Children</label>
                <input type="number" name="noOfChildren" id="noOfChildren" placeholder="Number of Children" value={formData.noOfChildren} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="rate" className={labelClass}>Rate</label>
                <input type="number" name="rate" id="rate" placeholder="Rate per night" value={formData.rate} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass + " flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-4"}> {/* छोटे स्क्रीन पर बेहतर स्टैकिंग के लिए फ्लेक्स-कॉल, गैप समायोजित करें */}
                <label htmlFor="taxIncluded" className={checkboxLabelClass}>
                  <input type="checkbox" name="taxIncluded" id="taxIncluded" checked={formData.taxIncluded} onChange={handleChange} className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded focus:ring-blue-500" /> {/* चेकबॉक्स का आकार समायोजित करें */}
                  Tax Included
                </label>
                <label htmlFor="serviceCharge" className={checkboxLabelClass}>
                  <input type="checkbox" name="serviceCharge" id="serviceCharge" checked={formData.serviceCharge} onChange={handleChange} className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded focus:ring-blue-500" /> {/* चेकबॉक्स का आकार समायोजित करें */}
                  Service Charge
                </label>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="isLeader" className={checkboxLabelClass}>
                  <input type="checkbox" name="isLeader" id="isLeader" checked={formData.isLeader} onChange={handleChange} className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded focus:ring-blue-500" /> {/* चेकबॉक्स का आकार समायोजित करें */}
                  Is Leader (for group bookings)
                </label>
              </div>
            </div>
          </div>

          {/* Travel Details */}
          <div>
            <h3 className={sectionTitleClass}><GlobeAltIcon className={iconClass} />Travel Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className={inputGroupClass}>
                <label htmlFor="arrivedFrom" className={labelClass}>Arrived From</label>
                <input type="text" name="arrivedFrom" id="arrivedFrom" placeholder="City/Country of origin" value={formData.arrivedFrom} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="destination" className={labelClass}>Destination</label>
                <input type="text" name="destination" id="destination" placeholder="Next destination" value={formData.destination} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className={sectionTitleClass}><TagIcon className={iconClass} />Additional Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className={inputGroupClass}>
                <label htmlFor="remark" className={labelClass}>Remark</label>
                <textarea name="remark" id="remark" placeholder="Any special requests, notes, or comments" value={formData.remark} onChange={handleChange} className={inputClass + " h-20 sm:h-24 resize-y"}></textarea> {/* टेक्स्टएरिया की ऊंचाई समायोजित करें */}
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="businessSource" className={labelClass}>Business Source</label>
                <div className="relative">
                  <select name="businessSource" id="businessSource" value={formData.businessSource} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
                    <option value="">Select Source</option>
                    <option value="Online OTA">Online OTA</option>
                    <option value="Travel Agent">Travel Agent</option>
                    <option value="Self Agent">Self Agent</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Walk-in">Walk-in</option>
                    <option value="Direct Call">Direct Call</option>
                    <option value="Referral">Referral</option>
                    <option value="Other">Other (Specify)</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" /> {/* आइकन का आकार समायोजित करें */}
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="marketSegment" className={labelClass}>Market Segment</label>
                <div className="relative">
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
                    <select
                      name="marketSegment"
                      id="marketSegment"
                      value={formData.marketSegment}
                      onChange={handleChange}
                      className={inputClass + " appearance-none pr-8 cursor-pointer"}
                      disabled={marketSegmentOptions.length === 0}
                    >
                      <option value="">Select Segment</option>
                      {marketSegmentOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                  {!showMarketSegmentInput && <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" />} {/* आइकन का आकार समायोजित करें */}
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="purposeOfVisit" className={labelClass}>Purpose of Visit</label>
                <div className="relative">
                  <select name="purposeOfVisit" id="purposeOfVisit" value={formData.purposeOfVisit} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
                    <option value="Personal">Personal</option>
                    <option value="Business">Business</option>
                    <option value="Leisure">Leisure</option>
                    <option value="Family">Family</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" /> {/* आइकन का आकार समायोजित करें */}
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="discountPercent" className={labelClass}>Discount Percent</label>
                <input type="number" name="discountPercent" id="discountPercent" placeholder="Discount Percentage" value={formData.discountPercent} onChange={handleChange} className={inputClass} />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="discountRoomSource" className={labelClass}>Discount Room Source</label>
                <input type="text" name="discountRoomSource" id="discountRoomSource" placeholder="Discount Room Source" value={formData.discountRoomSource} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h3 className={sectionTitleClass}><BanknotesIcon className={iconClass} />Payment Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className={inputGroupClass}>
                <label htmlFor="paymentMode" className={labelClass}>Payment Mode</label>
                <div className="relative">
                  <select name="paymentMode" id="paymentMode" value={formData.paymentMode} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Online">Online</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" /> {/* आइकन का आकार समायोजित करें */}
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="paymentStatus" className={labelClass}>Payment Status</label>
                <div className="relative">
                  <select name="paymentStatus" id="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partially Paid</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" /> {/* आइकन का आकार समायोजित करें */}
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="bookingRefNo" className={labelClass}>Booking Ref. No.</label>
                <input type="text" name="bookingRefNo" id="bookingRefNo" placeholder="Booking Reference Number" value={formData.bookingRefNo} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Management & Special Settings */}
          <div>
            <h3 className={sectionTitleClass}><BriefcaseIcon className={iconClass} />Management & Special Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className={inputGroupClass}>
                <label htmlFor="mgmtBlock" className={labelClass}>Management Block</label>
                <div className="relative">
                  <select name="mgmtBlock" id="mgmtBlock" value={formData.mgmtBlock} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" /> {/* आइकन का आकार समायोजित करें */}
                </div>
              </div>

              <div className={inputGroupClass + " flex items-end gap-2 sm:gap-4"}> {/* गैप समायोजित करें */}
                <label htmlFor="vip" className={checkboxLabelClass}>
                  <input type="checkbox" name="vip" id="vip" checked={formData.vip} onChange={handleChange} className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded focus:ring-blue-500" /> {/* चेकबॉक्स का आकार समायोजित करें */}
                  VIP Guest
                </label>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="status" className={labelClass}>Booking Status</label>
                <div className="relative">
                  <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass + " appearance-none pr-8 cursor-pointer"}>
                    <option value="Booked">Booked</option>
                    <option value="Checked in">Checked-in</option>
                    <option value="Checked out">Checked-out</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="No Show">No Show</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" /> {/* आइकन का आकार समायोजित करें */}
                </div>
              </div>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center mt-8 sm:mt-10 md:mt-12 gap-3 sm:gap-4"> {/* मार्जिन और गैप समायोजित करें */}
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-98 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75 text-lg sm:text-xl tracking-wide" 
            >
              Update Booking
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("Navigating back to /booking from EditBookingForm.");
                navigate('/booking'); // Changed to /booking as per your route definition
              }}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-98 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-75 text-lg sm:text-xl tracking-wide" 
            >
              Back
            </button>
          </div>
        </form>
      </div>

      {/* Photo/ID Upload Modal */}
      {showPhotoIdModal && (
        <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50 p-4">
          <PhotoIdUpload
            onClose={handleClosePhotoIdModal}
            onCapture={handleCaptureFile}
            currentFiles={uploadedFiles}
            handleRemoveFile={handleRemoveFile}
          />
        </div>
      )}
    </div>
  );
};

export default EditBookingForm;