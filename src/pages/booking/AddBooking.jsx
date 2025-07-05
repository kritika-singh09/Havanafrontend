// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast, { Toaster } from 'react-hot-toast';
// import Webcam from 'react-webcam';

// // Import Heroicons
// import {
//     UserIcon,
//     BuildingOfficeIcon,
//     IdentificationIcon,
//     HomeIcon,
//     ChevronDownIcon,
//     GlobeAltIcon,
//     DocumentTextIcon, // Used for PDF icon
//     TagIcon,
//     BriefcaseIcon,
//     BanknotesIcon,
// } from '@heroicons/react/24/outline';


// // --- PhotoIdUpload Component (Modal) ---
// const PhotoIdUpload = ({ onClose, currentFiles }) => {
//     // Initialize states with currentFiles passed from parent, or null if not provided
//     const [studentAvatar, setStudentAvatar] = useState(currentFiles?.studentAvatar || null);
//     const [idProofFront, setIdProofFront] = useState(currentFiles?.idProofFront || null);
//     const [idProofBack, setIdProofBack] = useState(currentFiles?.idProofBack || null);

//     // State to track which webcam is active for capture
//     const [activeWebcam, setActiveWebcam] = useState(null); // Can be 'student', 'front', 'back'

//     const webcamRef = useRef(null);

//     // Helper function to convert data URL to File object
//     const dataURLtoFile = (dataurl, filename) => {
//         const arr = dataurl.split(',');
//         const mime = arr[0].match(/:(.*?);/)[1];
//         const bstr = atob(arr[1]);
//         let n = bstr.length;
//         const u8arr = new Uint8Array(n);
//         while (n--) {
//             u8arr[n] = bstr.charCodeAt(n);
//         }
//         return new File([u8arr], filename, { type: mime });
//     };

//     // Handler for file input changes
//     const handleImageUpload = (e, setImageState) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImageState(file); // Set the file object to the state
//             // If a file is manually uploaded, turn off any active webcam
//             setActiveWebcam(null);
//             toast.success("File selected successfully!");
//         } else {
//             console.error("No file selected.");
//             toast.error("No file selected.");
//         }
//     };

//     // Handler for capturing image from webcam
//     // It now takes a function to set the specific image state and a descriptive name
//     const captureImage = useCallback((setImageState, docType) => {
//         if (webcamRef.current) {
//             const imageSrc = webcamRef.current.getScreenshot();
//             if (imageSrc) {
//                 // Convert the base64 image from webcam to a File object
//                 const capturedFile = dataURLtoFile(imageSrc, `${docType.toLowerCase().replace(/\s/g, '_')}.png`);
//                 setImageState(capturedFile); // Set the captured image (File object) to the specific state
//                 setActiveWebcam(null); // Hide webcam after successful capture
//                 toast.success(`${docType} captured successfully!`);
//             } else {
//                 toast.error(`Failed to capture image for ${docType}.`);
//             }
//         }
//     }, []); // Dependencies are stable, so empty array

//     // Helper function to render image previews for each section
//     const renderImagePreview = (imageFile, setImageState) => {
//         // If an imageFile exists (i.e., a file has been selected or captured)
//         if (imageFile) {
//             const isPdf = imageFile.type === "application/pdf"; // Check if the file is a PDF

//             return (
//                 <div className="relative mt-4 w-48 h-48 rounded-lg overflow-hidden border-4 border-purple-400 shadow-md flex items-center justify-center bg-gray-200">
//                     {isPdf ? (
//                         // If the file is a PDF, show a PDF icon and its name
//                         <div className="text-gray-600 text-center text-sm p-2">
//                             <DocumentTextIcon className="h-10 w-10 mx-auto mb-2 text-gray-500" />
//                             PDF File: <br /> {imageFile.name}
//                         </div>
//                     ) : (
//                         // **If the file is an image (not a PDF), display the image preview**
//                         <img
//                             src={URL.createObjectURL(imageFile)} // This creates a temporary URL for the image file to display it
//                             alt="Preview"
//                             className="object-cover w-full h-full"
//                         />
//                     )}
//                     {/* Button to remove/clear the currently displayed image/document */}
//                     <button
//                         onClick={() => setImageState(null)} // Allows removing the uploaded/captured image
//                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-600 transition-colors"
//                         aria-label="Remove image"
//                     >
//                         X
//                     </button>
//                 </div>
//             );
//         }
//         // If no imageFile exists (no file selected/captured yet), show "No image uploaded" text
//         return (
//             <div className="mt-4 w-48 h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-center p-4">
//                 No image uploaded
//             </div>
//         );
//     };

//     return (
//         <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl font-inter relative mx-auto">
//             <button
//                 // On close, pass back all three image files (even if null)
//                 onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
//                 className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 transition-colors"
//                 aria-label="Close photo upload"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//             </button>

//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Photo & ID Upload</h2>

//             {/* Grid for upload sections */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {/* Section 1: Student Avatar Upload */}
//                 <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
//                     <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Student Photo</label>
//                     <input
//                         type="file"
//                         accept="image/*" // Only allows image files here
//                         onChange={(e) => setStudentAvatar(e.target.files[0])} // Corrected to use setter directly
//                         className="block w-full text-sm text-gray-500
//                             file:mr-2 file:sm:mr-4 file:py-1 file:sm:py-2 file:px-2 file:sm:px-4
//                             file:rounded-md file:border-0
//                             file:text-xs file:sm:text-sm file:font-semibold
//                             file:bg-purple-50 file:text-purple-700
//                             hover:file:bg-purple-100 cursor-pointer"
//                     />
//                     {renderImagePreview(studentAvatar, setStudentAvatar)}
//                     <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center">
//                         <button
//                             type="button"
//                             onClick={() => setActiveWebcam(activeWebcam === 'student' ? null : 'student')}
//                             className="flex-1 px-3 py-2 text-sm sm:px-4 sm:py-2 bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
//                         >
//                             {activeWebcam === 'student' ? 'Hide Camera' : 'Show Camera'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => captureImage(setStudentAvatar, 'Student Photo')}
//                             disabled={activeWebcam !== 'student'} // Enable capture only if 'student' webcam is active
//                             className={`flex-1 px-3 py-2 text-sm sm:px-4 sm:py-2 bg-green-500 text-white font-semibold shadow-md transition-transform transform rounded-md ${
//                                 activeWebcam === 'student' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
//                             } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
//                         >
//                             Capture
//                         </button>
//                     </div>
//                 </div>

//                 {/* Section 2: ID Proof Front Upload */}
//                 <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
//                     <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">ID Proof (Front)</label>
//                     <input
//                         type="file"
//                         accept="image/*,application/pdf" // Allows both images and PDFs
//                         onChange={(e) => setIdProofFront(e.target.files[0])} // Corrected to use setter directly
//                         className="block w-full text-sm text-gray-500
//                             file:mr-2 file:sm:mr-4 file:py-1 file:sm:py-2 file:px-2 file:sm:px-4
//                             file:rounded-md file:border-0
//                             file:text-xs file:sm:text-sm file:font-semibold
//                             file:bg-blue-50 file:text-blue-700
//                             hover:file:bg-blue-100 cursor-pointer"
//                     />
//                     {renderImagePreview(idProofFront, setIdProofFront)}
//                     <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center">
//                         <button
//                             type="button"
//                             onClick={() => setActiveWebcam(activeWebcam === 'front' ? null : 'front')}
//                             className="flex-1 px-3 py-2 text-sm sm:px-4 sm:py-2 bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
//                         >
//                             {activeWebcam === 'front' ? 'Hide Camera' : 'Show Camera'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => captureImage(setIdProofFront, 'ID Proof Front')}
//                             disabled={activeWebcam !== 'front'} // Enable capture only if 'front' webcam is active
//                             className={`flex-1 px-3 py-2 text-sm sm:px-4 sm:py-2 bg-green-500 text-white font-semibold shadow-md transition-transform transform rounded-md ${
//                                 activeWebcam === 'front' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
//                             } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
//                         >
//                             Capture
//                         </button>
//                     </div>
//                 </div>

//                 {/* Section 3: ID Proof Back Upload */}
//                 <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
//                     <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">ID Proof (Back)</label>
//                     <input
//                         type="file"
//                         accept="image/*,application/pdf" // Allows both images and PDFs
//                         onChange={(e) => setIdProofBack(e.target.files[0])} // Corrected to use setter directly
//                         className="block w-full text-sm text-gray-500
//                             file:mr-2 file:sm:mr-4 file:py-1 file:sm:py-2 file:px-2 file:sm:px-4
//                             file:rounded-md file:border-0
//                             file:text-xs file:sm:text-sm file:font-semibold
//                             file:bg-green-50 file:text-green-700
//                             hover:file:bg-green-100 cursor-pointer"
//                     />
//                     {renderImagePreview(idProofBack, setIdProofBack)}
//                     <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center">
//                         <button
//                             type="button"
//                             onClick={() => setActiveWebcam(activeWebcam === 'back' ? null : 'back')}
//                             className="flex-1 px-3 py-2 text-sm sm:px-4 sm:py-2 bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
//                         >
//                             {activeWebcam === 'back' ? 'Hide Camera' : 'Show Camera'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => captureImage(setIdProofBack, 'ID Proof Back')}
//                             disabled={activeWebcam !== 'back'} // Enable capture only if 'back' webcam is active
//                             className={`flex-1 px-3 py-2 text-sm sm:px-4 sm:py-2 bg-green-500 text-white font-semibold shadow-md transition-transform transform rounded-md ${
//                                 activeWebcam === 'back' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
//                             } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
//                         >
//                             Capture
//                         </button>
//                     </div>
//                 </div>

//                 {/* Dedicated Webcam Display (conditionally rendered below the sections for better visibility) */}
//                 {activeWebcam && (
//                     <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-4">
//                         <div className="relative w-full max-w-xs sm:max-w-sm mx-auto rounded-lg overflow-hidden shadow-md border-2 border-indigo-400">
//                             <Webcam
//                                 audio={false}
//                                 ref={webcamRef}
//                                 screenshotFormat="image/png"
//                                 className="w-full h-auto"
//                                 videoConstraints={{ facingMode: "user" }} // Use front camera
//                             />
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex justify-center space-x-3 sm:space-x-4">
//                 <button
//                     type="button"
//                     // On "Done", pass back the latest state of all three files
//                     onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
//                     className="px-5 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white font-bold text-sm sm:text-base shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
//                 >
//                     Done
//                 </button>
//             </div>
//         </div>
//     );
// };



// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast, { Toaster } from 'react-hot-toast';
// import Webcam from 'react-webcam';

// // Import Heroicons
// import {
//     UserIcon,
//     BuildingOfficeIcon,
//     IdentificationIcon,
//     HomeIcon,
//     ChevronDownIcon,
//     GlobeAltIcon,
//     DocumentTextIcon, // Used for PDF icon
//     TagIcon,
//     BriefcaseIcon,
//     BanknotesIcon,
// } from '@heroicons/react/24/outline';


// // --- PhotoIdUpload Component (Modal) ---
// const PhotoIdUpload = ({ onClose, currentFiles }) => {
//     // Initialize states with currentFiles passed from parent, or null if not provided
//     const [studentAvatar, setStudentAvatar] = useState(currentFiles?.studentAvatar || null);
//     const [idProofFront, setIdProofFront] = useState(currentFiles?.idProofFront || null);
//     const [idProofBack, setIdProofBack] = useState(currentFiles?.idProofBack || null);

//     // State to track which webcam is active for capture
//     const [activeWebcam, setActiveWebcam] = useState(null); // Can be 'student', 'front', 'back'

//     const webcamRef = useRef(null);

//     // Helper function to convert data URL to File object
//     const dataURLtoFile = (dataurl, filename) => {
//         const arr = dataurl.split(',');
//         const mime = arr[0].match(/:(.*?);/)[1];
//         const bstr = atob(arr[1]);
//         let n = bstr.length;
//         const u8arr = new Uint8Array(n);
//         while (n--) {
//             u8arr[n] = bstr.charCodeAt(n);
//         }
//         return new File([u8arr], filename, { type: mime });
//     };

//     // Handler for file input changes
//     const handleImageUpload = (e, setImageState) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImageState(file); // Set the file object to the state
//             // If a file is manually uploaded, turn off any active webcam
//             setActiveWebcam(null);
//             toast.success("File selected successfully!");
//         } else {
//             console.error("No file selected.");
//             toast.error("No file selected.");
//         }
//     };

//     // Handler for capturing image from webcam
//     // It now takes a function to set the specific image state and a descriptive name
//     const captureImage = useCallback((setImageState, docType) => {
//         if (webcamRef.current) {
//             const imageSrc = webcamRef.current.getScreenshot();
//             if (imageSrc) {
//                 // Convert the base64 image from webcam to a File object
//                 const capturedFile = dataURLtoFile(imageSrc, `${docType.toLowerCase().replace(/\s/g, '_')}.png`);
//                 setImageState(capturedFile); // Set the captured image (File object) to the specific state
//                 setActiveWebcam(null); // Hide webcam after successful capture
//                 toast.success(`${docType} captured successfully!`);
//             } else {
//                 toast.error(`Failed to capture image for ${docType}.`);
//             }
//         }
//     }, []); // Dependencies are stable, so empty array

//     // Helper function to render image previews for each section
//     const renderImagePreview = (imageFile, setImageState) => {
//         // If an imageFile exists (i.e., a file has been selected or captured)
//         if (imageFile) {
//             const isPdf = imageFile.type === "application/pdf"; // Check if the file is a PDF

//             return (
//                 <div className="relative mt-4 w-48 h-48 rounded-lg overflow-hidden border-4 border-purple-400 shadow-md flex items-center justify-center bg-gray-200">
//                     {isPdf ? (
//                         // If the file is a PDF, show a PDF icon and its name
//                         <div className="text-gray-600 text-center text-sm p-2">
//                             <DocumentTextIcon className="h-10 w-10 mx-auto mb-2 text-gray-500" />
//                             PDF File: <br /> {imageFile.name}
//                         </div>
//                     ) : (
//                         // **If the file is an image (not a PDF), display the image preview**
//                         <img
//                             src={URL.createObjectURL(imageFile)} // This creates a temporary URL for the image file to display it
//                             alt="Preview"
//                             className="object-cover w-full h-full"
//                         />
//                     )}
//                     {/* Button to remove/clear the currently displayed image/document */}
//                     <button
//                         onClick={() => setImageState(null)} // Allows removing the uploaded/captured image
//                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-600 transition-colors"
//                         aria-label="Remove image"
//                     >
//                         X
//                     </button>
//                 </div>
//             );
//         }
//         // If no imageFile exists (no file selected/captured yet), show "No image uploaded" text
//         return (
//             <div className="mt-4 w-48 h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-center p-4">
//                 No image uploaded
//             </div>
//         );
//     };

//     return (
//         <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl font-inter relative">
//             <button
//                 // On close, pass back all three image files (even if null)
//                 onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
//                 aria-label="Close photo upload"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//             </button>

//             <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Photo & ID Upload</h2>

//             {/* Grid for upload sections */}
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {/* Section 1: Student Avatar Upload */}
//                 <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
//                     <label className="text-lg font-semibold text-gray-700 mb-3">Student Photo</label>
//                     <input
//                         type="file"
//                         accept="image/*" // Only allows image files here
//                         onChange={(e) => setStudentAvatar(e.target.files[0])} // Corrected to use setter directly
//                         className="block w-full text-sm text-gray-500
//                             file:mr-4 file:py-2 file:px-4
//                             file:rounded-md file:border-0
//                             file:text-sm file:font-semibold
//                             file:bg-purple-50 file:text-purple-700
//                             hover:file:bg-purple-100 cursor-pointer"
//                     />
//                     {renderImagePreview(studentAvatar, setStudentAvatar)}
//                     <div className="mt-4 flex space-x-3 w-full justify-center">
//                         <button
//                             type="button"
//                             onClick={() => setActiveWebcam(activeWebcam === 'student' ? null : 'student')}
//                             className="flex-1 px-4 py-2 bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
//                         >
//                             {activeWebcam === 'student' ? 'Hide Camera' : 'Show Camera'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => captureImage(setStudentAvatar, 'Student Photo')}
//                             disabled={activeWebcam !== 'student'} // Enable capture only if 'student' webcam is active
//                             className={`flex-1 px-4 py-2 bg-green-500 text-white font-semibold shadow-md transition-transform transform rounded-md ${
//                                 activeWebcam === 'student' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
//                             } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
//                         >
//                             Capture
//                         </button>
//                     </div>
//                 </div>

//                 {/* Section 2: ID Proof Front Upload */}
//                 <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
//                     <label className="text-lg font-semibold text-gray-700 mb-3">ID Proof (Front)</label>
//                     <input
//                         type="file"
//                         accept="image/*,application/pdf" // Allows both images and PDFs
//                         onChange={(e) => setIdProofFront(e.target.files[0])} // Corrected to use setter directly
//                         className="block w-full text-sm text-gray-500
//                             file:mr-4 file:py-2 file:px-4
//                             file:rounded-md file:border-0
//                             file:text-sm file:font-semibold
//                             file:bg-blue-50 file:text-blue-700
//                             hover:file:bg-blue-100 cursor-pointer"
//                     />
//                     {renderImagePreview(idProofFront, setIdProofFront)}
//                     <div className="mt-4 flex space-x-3 w-full justify-center">
//                         <button
//                             type="button"
//                             onClick={() => setActiveWebcam(activeWebcam === 'front' ? null : 'front')}
//                             className="flex-1 px-4 py-2 bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
//                         >
//                             {activeWebcam === 'front' ? 'Hide Camera' : 'Show Camera'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => captureImage(setIdProofFront, 'ID Proof Front')}
//                             disabled={activeWebcam !== 'front'} // Enable capture only if 'front' webcam is active
//                             className={`flex-1 px-4 py-2 bg-green-500 text-white font-semibold shadow-md transition-transform transform rounded-md ${
//                                 activeWebcam === 'front' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
//                             } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
//                         >
//                             Capture
//                         </button>
//                     </div>
//                 </div>

//                 {/* Section 3: ID Proof Back Upload */}
//                 <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
//                     <label className="text-lg font-semibold text-gray-700 mb-3">ID Proof (Back)</label>
//                     <input
//                         type="file"
//                         accept="image/*,application/pdf" // Allows both images and PDFs
//                         onChange={(e) => setIdProofBack(e.target.files[0])} // Corrected to use setter directly
//                         className="block w-full text-sm text-gray-500
//                             file:mr-4 file:py-2 file:px-4
//                             file:rounded-md file:border-0
//                             file:text-sm file:font-semibold
//                             file:bg-green-50 file:text-green-700
//                             hover:file:bg-green-100 cursor-pointer"
//                     />
//                     {renderImagePreview(idProofBack, setIdProofBack)}
//                     <div className="mt-4 flex space-x-3 w-full justify-center">
//                         <button
//                             type="button"
//                             onClick={() => setActiveWebcam(activeWebcam === 'back' ? null : 'back')}
//                             className="flex-1 px-4 py-2 bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
//                         >
//                             {activeWebcam === 'back' ? 'Hide Camera' : 'Show Camera'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => captureImage(setIdProofBack, 'ID Proof Back')}
//                             disabled={activeWebcam !== 'back'} // Enable capture only if 'back' webcam is active
//                             className={`flex-1 px-4 py-2 bg-green-500 text-white font-semibold shadow-md transition-transform transform rounded-md ${
//                                 activeWebcam === 'back' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
//                             } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
//                         >
//                             Capture
//                         </button>
//                     </div>
//                 </div>

//                 {/* Dedicated Webcam Display (conditionally rendered below the sections for better visibility) */}
//                 {activeWebcam && (
//                     <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-4">
//                         <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-md border-2 border-indigo-400">
//                             <Webcam
//                                 audio={false}
//                                 ref={webcamRef}
//                                 screenshotFormat="image/png"
//                                 className="w-full h-auto"
//                                 videoConstraints={{ facingMode: "user" }} // Use front camera
//                             />
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center space-x-4">
//                 <button
//                     type="button"
//                     // On "Done", pass back the latest state of all three files
//                     onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
//                     className="px-6 py-3 bg-indigo-600 text-white font-bold  shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
//                 >
//                     Done
//                 </button>
//             </div>
//         </div>
//     );
// };
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
    HomeIcon,
    ChevronDownIcon,
    GlobeAltIcon,
    DocumentTextIcon, // Used for PDF icon
    TagIcon,
    BriefcaseIcon,
    BanknotesIcon,
} from '@heroicons/react/24/outline';


// --- PhotoIdUpload Component (Modal) ---
const PhotoIdUpload = ({ onClose, currentFiles }) => {
    // Initialize states with currentFiles passed from parent, or null if not provided
    const [studentAvatar, setStudentAvatar] = useState(currentFiles?.studentAvatar || null);
    const [idProofFront, setIdProofFront] = useState(currentFiles?.idProofFront || null);
    const [idProofBack, setIdProofBack] = useState(currentFiles?.idProofBack || null);

    // State to track which webcam is active for capture
    const [activeWebcam, setActiveWebcam] = useState(null); // Can be 'student', 'front', 'back'

    const webcamRef = useRef(null);

    // Helper function to convert data URL to File object
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

    // Handler for file input changes
    const handleImageUpload = (e, setImageState) => {
        const file = e.target.files[0];
        if (file) {
            setImageState(file); // Set the file object to the state
            // If a file is manually uploaded, turn off any active webcam
            setActiveWebcam(null);
            toast.success("File selected successfully!");
        } else {
            console.error("No file selected.");
            toast.error("No file selected.");
        }
    };

    // Handler for capturing image from webcam
    // It now takes a function to set the specific image state and a descriptive name
    const captureImage = useCallback((setImageState, docType) => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                // Convert the base64 image from webcam to a File object
                const capturedFile = dataURLtoFile(imageSrc, `${docType.toLowerCase().replace(/\s/g, '_')}.png`);
                setImageState(capturedFile); // Set the captured image (File object) to the specific state
                setActiveWebcam(null); // Hide webcam after successful capture
                toast.success(`${docType} captured successfully!`);
            } else {
                toast.error(`Failed to capture image for ${docType}.`);
            }
        }
    }, []); // Dependencies are stable, so empty array

    // Helper function to render image previews for each section
    const renderImagePreview = (imageFile, setImageState) => {
        // If an imageFile exists (i.e., a file has been selected or captured)
        if (imageFile) {
            const isPdf = imageFile.type === "application/pdf"; // Check if the file is a PDF

            return (
                <div className="relative mt-4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg overflow-hidden border-4 border-purple-400 shadow-md flex items-center justify-center bg-gray-200"> {/* Responsive size */}
                    {isPdf ? (
                        // If the file is a PDF, show a PDF icon and its name
                        <div className="text-gray-600 text-center text-xs sm:text-sm p-1 sm:p-2"> {/* Responsive text size and padding */}
                            <DocumentTextIcon className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-1 sm:mb-2 text-gray-500" /> {/* Responsive icon size */}
                            PDF File: <br /> {imageFile.name}
                        </div>
                    ) : (
                        // **If the file is an image (not a PDF), display the image preview**
                        <img
                            src={URL.createObjectURL(imageFile)} // This creates a temporary URL for the image file to display it
                            alt="Preview"
                            className="object-cover w-full h-full"
                        />
                    )}
                    {/* Button to remove/clear the currently displayed image/document */}
                    <button
                        onClick={() => setImageState(null)} // Allows removing the uploaded/captured image
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-600 transition-colors" // Responsive size and text
                        aria-label="Remove image"
                    >
                        X
                    </button>
                </div>
            );
        }
        // If no imageFile exists (no file selected/captured yet), show "No image uploaded" text
        return (
            <div className="mt-4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-center p-2 text-xs sm:text-sm"> {/* Responsive size and text */}
                No image uploaded
            </div>
        );
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl font-inter relative mx-auto my-4"> {/* Responsive max-width and padding */}
            <button
                // On close, pass back all three image files (even if null)
                onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Close photo upload"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Responsive icon size */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Photo & ID Upload</h2> {/* Responsive heading size and margin */}

            {/* Grid for upload sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"> {/* Responsive grid columns and gap */}
                {/* Section 1: Student Avatar Upload */}
                <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50"> {/* Responsive padding */}
                    <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Student Photo</label> {/* Responsive text size and margin */}
                    <input
                        type="file"
                        accept="image/*" // Only allows image files here
                        onChange={(e) => setStudentAvatar(e.target.files[0])} // Corrected to use setter directly
                        className="block w-full text-xs sm:text-sm text-gray-500
                            file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                            file:rounded-md file:border-0
                            file:text-xs sm:file:text-sm file:font-semibold
                            file:bg-purple-50 file:text-purple-700
                            hover:file:bg-purple-100 cursor-pointer" // Responsive file input styles
                    />
                    {renderImagePreview(studentAvatar, setStudentAvatar)}
                    <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center"> {/* Responsive margin and space */}
                        <button
                            type="button"
                            onClick={() => setActiveWebcam(activeWebcam === 'student' ? null : 'student')}
                            className="flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white text-sm sm:text-base font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md" // Responsive button styles
                        >
                            {activeWebcam === 'student' ? 'Hide Camera' : 'Show Camera'}
                        </button>
                        <button
                            type="button"
                            onClick={() => captureImage(setStudentAvatar, 'Student Photo')}
                            disabled={activeWebcam !== 'student'} // Enable capture only if 'student' webcam is active
                            className={`flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-sm sm:text-base font-semibold shadow-md transition-transform transform rounded-md ${
                                activeWebcam === 'student' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`} // Responsive button styles
                        >
                            Capture
                        </button>
                    </div>
                </div>

                {/* Section 2: ID Proof Front Upload */}
                <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50"> {/* Responsive padding */}
                    <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">ID Proof (Front)</label> {/* Responsive text size and margin */}
                    <input
                        type="file"
                        accept="image/*,application/pdf" // Allows both images and PDFs
                        onChange={(e) => setIdProofFront(e.target.files[0])} // Corrected to use setter directly
                        className="block w-full text-xs sm:text-sm text-gray-500
                            file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                            file:rounded-md file:border-0
                            file:text-xs sm:file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100 cursor-pointer" // Responsive file input styles
                    />
                    {renderImagePreview(idProofFront, setIdProofFront)}
                    <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center"> {/* Responsive margin and space */}
                        <button
                            type="button"
                            onClick={() => setActiveWebcam(activeWebcam === 'front' ? null : 'front')}
                            className="flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white text-sm sm:text-base font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md" // Responsive button styles
                        >
                            {activeWebcam === 'front' ? 'Hide Camera' : 'Show Camera'}
                        </button>
                        <button
                            type="button"
                            onClick={() => captureImage(setIdProofFront, 'ID Proof Front')}
                            disabled={activeWebcam !== 'front'} // Enable capture only if 'front' webcam is active
                            className={`flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-sm sm:text-base font-semibold shadow-md transition-transform transform rounded-md ${
                                activeWebcam === 'front' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`} // Responsive button styles
                        >
                            Capture
                        </button>
                    </div>
                </div>

                {/* Section 3: ID Proof Back Upload */}
                <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50"> {/* Responsive padding */}
                    <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">ID Proof (Back)</label> {/* Responsive text size and margin */}
                    <input
                        type="file"
                        accept="image/*,application/pdf" // Allows both images and PDFs
                        onChange={(e) => setIdProofBack(e.target.files[0])} // Corrected to use setter directly
                        className="block w-full text-xs sm:text-sm text-gray-500
                            file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                            file:rounded-md file:border-0
                            file:text-xs sm:file:text-sm file:font-semibold
                            file:bg-green-50 file:text-green-700
                            hover:file:bg-green-100 cursor-pointer" // Responsive file input styles
                    />
                    {renderImagePreview(idProofBack, setIdProofBack)}
                    <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center"> {/* Responsive margin and space */}
                        <button
                            type="button"
                            onClick={() => setActiveWebcam(activeWebcam === 'back' ? null : 'back')}
                            className="flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white text-sm sm:text-base font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md" // Responsive button styles
                        >
                            {activeWebcam === 'back' ? 'Hide Camera' : 'Show Camera'}
                        </button>
                        <button
                            type="button"
                            onClick={() => captureImage(setIdProofBack, 'ID Proof Back')}
                            disabled={activeWebcam !== 'back'} // Enable capture only if 'back' webcam is active
                            className={`flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-sm sm:text-base font-semibold shadow-md transition-transform transform rounded-md ${
                                activeWebcam === 'back' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`} // Responsive button styles
                        >
                            Capture
                        </button>
                    </div>
                </div>

                {/* Dedicated Webcam Display (conditionally rendered below the sections for better visibility) */}
                {activeWebcam && (
                    <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-4">
                        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto rounded-lg overflow-hidden shadow-md border-2 border-indigo-400"> {/* Responsive max-width */}
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/png"
                                className="w-full h-auto"
                                videoConstraints={{ facingMode: "user" }} // Use front camera
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex justify-center space-x-3 sm:space-x-4"> {/* Responsive margin, padding, and space */}
                <button
                    type="button"
                    // On "Done", pass back the latest state of all three files
                    onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
                    className="px-5 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white text-base sm:text-lg font-bold shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md" // Responsive button styles
                >
                    Done
                </button>
            </div>
        </div>
    );
};
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
    // These fields are part of formData but their values (URLs or null for new uploads)
    // will be managed and derived from `uploadedFiles` and `existingImageUrls` states for rendering and submission
    photoUrl: "",
    idProofImageUrl: "",
    idProofImageUrl2: "",
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
    status: "Pending",
  });

  const [marketSegmentOptions, setMarketSegmentOptions] = useState([]);
  const [showMarketSegmentInput, setShowMarketSegmentInput] = useState(false);
  const [showPhotoIdModal, setShowPhotoIdModal] = useState(false);

  // State for newly uploaded files (File objects from the modal)
  const [uploadedFiles, setUploadedFiles] = useState({
    studentAvatar: null,
    idProofFront: null,
    idProofBack: null,
    otherDocument: null,
  });

  // State for existing image URLs loaded from backend when GRC is entered
  const [existingImageUrls, setExistingImageUrls] = useState({
    studentAvatar: "", // Corresponds to photoUrl from backend
    idProofFront: "",  // Corresponds to idProofImageUrl2 from backend (assuming front)
    idProofBack: "",   // Corresponds to idProofImageUrl from backend (assuming back)
    otherDocument: "", // For otherDocument from backend if exists
  });

  // Effect to handle Market Segment options based on Business Source
  useEffect(() => {
    let options = [];
    let showInput = false;

    switch (formData.businessSource) {
      case "Online OTA":
        options = [
          "MakeMyTrip",
          "Goibibo",
          "Booking.com",
          "Agoda",
          "Expedia",
          "Others (Specify)",
        ];
        break;
      case "Travel Agent":
        options = [
          "Corporate Travel Agency",
          "Leisure Travel Agency",
          "Tour Operator",
          "Local Agent",
          "Others (Specify)",
        ];
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
        showInput = true; // For "Other" business source, allow direct input
        break;
    }

    setMarketSegmentOptions(options);
    setShowMarketSegmentInput(
      showInput ||
        (options.includes("Others (Specify)") &&
          formData.marketSegment === "Others (Specify)")
    );

    // If selected market segment is no longer valid for the business source, clear it
    if (
      !options.includes(formData.marketSegment) &&
      !showInput && // if it's not a direct input case
      formData.marketSegment !== ""
    ) {
      setFormData((prev) => ({ ...prev, marketSegment: "" }));
    } else if (
      showInput && // if it IS a direct input case (e.g., "Other")
      options.includes(formData.marketSegment) && // and current segment is one of the dropdown options
      formData.marketSegment !== "Others (Specify)" // and not the "Others (Specify)"
    ) {
      // This ensures if user switches from e.g., "Online OTA" to "Other", market segment resets
      setFormData((prev) => ({ ...prev, marketSegment: "" }));
    }
  }, [formData.businessSource, formData.marketSegment]);

  // Effect to autofill data based on GRC No.
  useEffect(() => {
    const fetchGuestData = async () => {
      // If GRC No is empty or too short, clear relevant guest data and image URLs
      if (!formData.grcNo || formData.grcNo.length < 3) {
        console.log("GRC No. is empty or too short. Clearing guest-related fields and images.");
        setFormData(prev => ({
          ...prev,
          salutation: "", name: "", age: "", gender: "Male", address: "", city: "",
          nationality: "Indian", mobileNo: "", email: "", phoneNo: "",
          birthDate: "", anniversary: "", companyName: "", companyGSTIN: "",
          idProofType: "Aadhaar Card", idProofNumber: "",
          photoUrl: "", // Clear photoUrl in formData
          idProofImageUrl: "", // Clear idProofImageUrl in formData
          idProofImageUrl2: "", // Clear idProofImageUrl2 in formData
          arrivedFrom: "", destination: "", remark: "", businessSource: "", marketSegment: "",
          purposeOfVisit: "Personal", discountPercent: "", discountRoomSource: "",
          billingInstruction: "", temperature: "", fromCSV: false, epabx: false, vip: false,
        }));
        setUploadedFiles({ // Clear new upload files
          studentAvatar: null,
          idProofFront: null,
          idProofBack: null,
          otherDocument: null,
        });
        setExistingImageUrls({ // Clear existing image URLs
          studentAvatar: "",
          idProofFront: "",
          idProofBack: "",
          otherDocument: "",
        });
        return; // Exit if GRC No is empty or too short
      }

      console.log(`Attempting to fetch guest data for GRC No: ${formData.grcNo}`);
      try {
        const API_URL = `https://havana-backend.vercel.app/api/bookings/guest-by-grc/${formData.grcNo}`;
        console.log(`Fetching from URL: ${API_URL}`);
        const response = await axios.get(API_URL);
        const apiResponseObject = response.data; // This is the full object: { success: true, data: { ... } }
        
        console.log("--- API Raw Response Object ---", apiResponseObject); 

        // Access the actual guest/booking data which is nested under the 'data' key
        const bookingData = apiResponseObject.data; 

        if (bookingData && Object.keys(bookingData).length > 0) {
          toast.success(`Guest data found for GRC No. ${formData.grcNo}. Autofilling form.`);

          const updatedFormDataFromBooking = {
            salutation: bookingData.salutation || "",
            name: bookingData.name || "",
            age: bookingData.age || "",
            gender: bookingData.gender || "Male",
            address: bookingData.address || "",
            city: bookingData.city || "",
            nationality: bookingData.nationality || "Indian",
            mobileNo: bookingData.mobileNo || "",
            email: bookingData.email || "",
            phoneNo: bookingData.phoneNo || "",
            birthDate: bookingData.birthDate
              ? new Date(bookingData.birthDate).toISOString().split("T")[0]
              : "",
            anniversary: bookingData.anniversary
              ? new Date(bookingData.anniversary).toISOString().split("T")[0]
              : "",
            idProofType: bookingData.idProofType || "Aadhaar Card",
            idProofNumber: bookingData.idProofNumber || "",
            // We set these directly into formData as they are text fields
            companyName: bookingData.companyName || "",
            companyGSTIN: bookingData.companyGSTIN || "",
            arrivedFrom: bookingData.arrivedFrom || "",
            destination: bookingData.destination || "",
            remark: bookingData.remark || "",
            businessSource: bookingData.businessSource || "",
            marketSegment: bookingData.marketSegment || "",
            purposeOfVisit: bookingData.purposeOfVisit || "Personal",
            discountPercent: bookingData.discountPercent || "",
            discountRoomSource: bookingData.discountRoomSource || "",
            billingInstruction: bookingData.billingInstruction || "",
            temperature: bookingData.temperature || "",
            fromCSV: bookingData.fromCSV || false,
            epabx: bookingData.epabx || false,
            vip: bookingData.vip || false,
          };

          setFormData((prev) => ({
            ...prev,
            ...updatedFormDataFromBooking,
          }));

          // Set the existing image URLs state after successful fetch
          setExistingImageUrls({
              studentAvatar: bookingData.photoUrl || "",
              idProofFront: bookingData.idProofImageUrl2 || "", // Assuming idProofImageUrl2 is front
              idProofBack: bookingData.idProofImageUrl || "",   // Assuming idProofImageUrl is back
              otherDocument: bookingData.otherDocument || "", // Assuming you have this field in backend too
          });
          // Clear any previously selected new files, as we're loading existing ones
          setUploadedFiles({
            studentAvatar: null,
            idProofFront: null,
            idProofBack: null,
            otherDocument: null,
          });

        } else {
          toast("No existing guest/booking found with this GRC No.", { icon: "ℹ️" });
          // If no data found, clear guest-specific fields and image states
          setFormData(prev => ({
            ...prev,
            salutation: "", name: "", age: "", gender: "Male", address: "", city: "",
            nationality: "Indian", mobileNo: "", email: "", phoneNo: "",
            birthDate: "", anniversary: "", companyName: "", companyGSTIN: "",
            idProofType: "Aadhaar Card", idProofNumber: "",
            photoUrl: "", // Clear photoUrl in formData
            idProofImageUrl: "", // Clear idProofImageUrl in formData
            idProofImageUrl2: "", // Clear idProofImageUrl2 in formData
            arrivedFrom: "", destination: "", remark: "", businessSource: "", marketSegment: "",
            purposeOfVisit: "Personal", discountPercent: "", discountRoomSource: "",
            billingInstruction: "", temperature: "", fromCSV: false, epabx: false, vip: false,
          }));
          setUploadedFiles({ studentAvatar: null, idProofFront: null, idProofBack: null, otherDocument: null });
          setExistingImageUrls({ studentAvatar: "", idProofFront: "", idProofBack: "", otherDocument: "" });
        }
      } catch (error) {
        console.error("Error fetching guest data:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          toast.error(
            `Failed to fetch guest data. Status: ${error.response.status}, Message: ${error.response?.data?.message || error.message}`
          );
        } else {
          toast.error("Failed to fetch guest data. Network error or unknown problem.");
        }
        // On error, also ensure guest-specific fields and image states are cleared
        setFormData(prev => ({
          ...prev,
          salutation: "", name: "", age: "", gender: "Male", address: "", city: "",
          nationality: "Indian", mobileNo: "", email: "", phoneNo: "",
          birthDate: "", anniversary: "", companyName: "", companyGSTIN: "",
          idProofType: "Aadhaar Card", idProofNumber: "",
          photoUrl: "", // Clear photoUrl in formData
          idProofImageUrl: "", // Clear idProofImageUrl in formData
          idProofImageUrl2: "", // Clear idProofImageUrl2 in formData
          arrivedFrom: "", destination: "", remark: "", businessSource: "", marketSegment: "",
          purposeOfVisit: "Personal", discountPercent: "", discountRoomSource: "",
          billingInstruction: "", temperature: "", fromCSV: false, epabx: false, vip: false,
        }));
        setUploadedFiles({ studentAvatar: null, idProofFront: null, idProofBack: null, otherDocument: null });
        setExistingImageUrls({ studentAvatar: "", idProofFront: "", idProofBack: "", otherDocument: "" });
      }
    };

    // Use a debounce to prevent excessive API calls on every keystroke
    const timeoutId = setTimeout(fetchGuestData, 500); // Wait 500ms after last keypress
    return () => clearTimeout(timeoutId); // Cleanup previous timeout if GRC changes rapidly
  }, [formData.grcNo]); // Dependency array: re-run effect when GRC No changes

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log(`handleChange: Name=${name}, Value=${value}, Type=${type}`); // Keep this for debugging if needed
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.checkInDate || !formData.checkOutDate || !formData.name) {
        toast.error(
          "Please fill in all required fields (Check-in Date, Check-out Date, Full Name)."
        );
        return;
      }

      const dataToSubmit = new FormData();
      for (const key in formData) {
        // Exclude image URLs from formData as they are managed by `uploadedFiles` and `existingImageUrls`
        if (key === 'idProofImageUrl' || key === 'idProofImageUrl2' || key === 'photoUrl') {
            continue;
        }
        dataToSubmit.append(key, formData[key]);
      }
      
      // Append `photoUrl` (Student Avatar)
      if (uploadedFiles.studentAvatar) {
        dataToSubmit.append("photoUrl", uploadedFiles.studentAvatar); // Send new File
      } else if (existingImageUrls.studentAvatar) {
        dataToSubmit.append("photoUrl", existingImageUrls.studentAvatar); // Send existing URL
      } else {
        dataToSubmit.append("photoUrl", ""); // Ensure it's explicitly empty if neither exists
      }

      // Append `idProofImageUrl2` (ID Front)
      if (uploadedFiles.idProofFront) {
        dataToSubmit.append("idProofImageUrl2", uploadedFiles.idProofFront); // Send new File
      } else if (existingImageUrls.idProofFront) {
        dataToSubmit.append("idProofImageUrl2", existingImageUrls.idProofFront); // Send existing URL
      } else {
        dataToSubmit.append("idProofImageUrl2", "");
      }

      // Append `idProofImageUrl` (ID Back)
      if (uploadedFiles.idProofBack) {
        dataToSubmit.append("idProofImageUrl", uploadedFiles.idProofBack); // Send new File
      } else if (existingImageUrls.idProofBack) {
        dataToSubmit.append("idProofImageUrl", existingImageUrls.idProofBack); // Send existing URL
      } else {
        dataToSubmit.append("idProofImageUrl", "");
      }

      // Append `otherDocument`
      if (uploadedFiles.otherDocument) {
        dataToSubmit.append("otherDocument", uploadedFiles.otherDocument); // Send new File
      } else if (existingImageUrls.otherDocument) {
        dataToSubmit.append("otherDocument", existingImageUrls.otherDocument); // Send existing URL
      } else {
        dataToSubmit.append("otherDocument", "");
      }


      console.log("Submitting form data (FormData object, inspect in network tab):", dataToSubmit);
      console.log("Current uploadedFiles state:", uploadedFiles);
      console.log("Current existingImageUrls state:", existingImageUrls);

      const response = await axios.post(
        "https://havana-backend.vercel.app/api/bookings",
        dataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Booking Created Successfully!");
      console.log("New booking created response:", response.data);

      navigate("/booking");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error(
        "Failed to create booking. Please try again. Error: " +
          (error.response?.data?.message || error.message)
      );
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
    }
  };

  const handleOpenPhotoIdModal = () => {
    setShowPhotoIdModal(true);
  };

  const handleClosePhotoIdModal = (files) => {
    // When modal closes, update `uploadedFiles` with new selections.
    // This will override any existing images in the preview if new ones are selected.
    setUploadedFiles(files); 

    const anyFileSelected = Object.values(files).some((file) => file !== null);
    if (anyFileSelected) {
      toast.success("Selected photos/documents updated.");
    } else {
      toast("No new photo or document selected/captured.", { icon: "ℹ️" });
    }
    setShowPhotoIdModal(false);
  };

  // Determines the source for rendering: new upload takes precedence over existing URL
  const getDisplaySource = (newFile, existingUrl) => {
    return newFile || existingUrl;
  };

  // Renders image or PDF preview based on source (File object or URL string)
  const renderImageOrPdfPreview = (source, label) => {
    if (!source) return null; // No source, no preview

    let url = "";
    let isPdf = false;
    let fileName = "";

    if (source instanceof File) {
      url = URL.createObjectURL(source);
      isPdf = source.type === "application/pdf";
      fileName = source.name;
    } else if (typeof source === 'string' && source.startsWith('http')) {
      url = source;
      isPdf = source.toLowerCase().endsWith('.pdf');
      fileName = url.substring(url.lastIndexOf('/') + 1); // Extract filename from URL
    } else {
      console.warn(`Invalid source type for ${label}:`, source); // Log if source is unexpected
      return null;
    }

    return (
      <div className="flex flex-col items-center p-3 border border-gray-200 rounded-md bg-gray-50 shadow-sm w-full aspect-square overflow-hidden text-center justify-center">
        <span className="text-sm font-semibold text-gray-700 mb-1">
          {label}
        </span>
        {isPdf ? (
          <div className="text-gray-600 text-xs mt-1">
            <DocumentTextIcon className="h-8 w-8 mx-auto mb-1 text-gray-500" />
            {fileName.length > 15 ? fileName.substring(0, 12) + '...' : fileName}
          </div>
        ) : (
          <img
            src={url}
            alt={`${label} Preview`}
            className="object-contain w-full h-full rounded" // Changed from object-cover to object-contain for better fit
            // Add onError to handle broken image links
            onError={(e) => { 
                e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found'; // Placeholder
                e.target.alt = 'Image not found or failed to load';
                e.target.onerror = null; // Prevent infinite loop if placeholder also fails
                console.error(`Failed to load image for ${label}:`, url);
            }}
          />
        )}
      </div>
    );
  };

  const sectionTitleClass =
    "text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2";
  const inputGroupClass = "mb-3";
  const labelClass = "block text-gray-700 text-sm font-semibold mb-1";
  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 text-base";
  const checkboxLabelClass =
    "flex items-center gap-2 text-gray-700 font-medium text-sm";
  const iconClass = "h-5 w-5 text-gray-500";

  // Check if any file (new or existing) needs to be displayed
  const hasAnyImageToDisplay =
    getDisplaySource(uploadedFiles.studentAvatar, existingImageUrls.studentAvatar) ||
    getDisplaySource(uploadedFiles.idProofFront, existingImageUrls.idProofFront) ||
    getDisplaySource(uploadedFiles.idProofBack, existingImageUrls.idProofBack) ||
    getDisplaySource(uploadedFiles.otherDocument, existingImageUrls.otherDocument);


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 font-inter">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-6 py-8 bg-white shadow-lg rounded-xl w-full">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
          Add New Booking
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className={sectionTitleClass}>
              <DocumentTextIcon className={iconClass} />
              Booking Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className={inputGroupClass}>
                <label htmlFor="grcNo" className={labelClass}>
                  GRC No.
                </label>
                <input
                  type="text"
                  name="grcNo"
                  id="grcNo"
                  placeholder="GRC No"
                  value={formData.grcNo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="checkInDate" className={labelClass}>
                  Check-in Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="checkInDate"
                  id="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="checkOutDate" className={labelClass}>
                  Check-out Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="checkOutDate"
                  id="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="days" className={labelClass}>
                  Days
                </label>
                <input
                  type="number"
                  name="days"
                  id="days"
                  placeholder="Days"
                  value={formData.days}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="timeIn" className={labelClass}>
                  Time In
                </label>
                <input
                  type="time"
                  name="timeIn"
                  id="timeIn"
                  placeholder="e.g., 14:00"
                  value={formData.timeIn}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="timeOut" className={labelClass}>
                  Time Out
                </label>
                <input
                  type="time"
                  name="timeOut"
                  id="timeOut"
                  placeholder="e.g., 12:00"
                  value={formData.timeOut}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className={sectionTitleClass}>
              <UserIcon className={iconClass} />
              Guest Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className={inputGroupClass}>
                <label htmlFor="salutation" className={labelClass}>
                  Salutation
                </label>
                <input
                  type="text"
                  name="salutation"
                  id="salutation"
                  placeholder="Mr./Ms./Dr."
                  value={formData.salutation}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="name" className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="age" className={labelClass}>
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="gender" className={labelClass}>
                  Gender
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={inputClass + " appearance-none pr-8"}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className={inputGroupClass + " sm:col-span-2 lg:col-span-1"}>
                <label htmlFor="address" className={labelClass}>
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="city" className={labelClass}>
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="nationality" className={labelClass}>
                  Nationality
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="nationality"
                    id="nationality"
                    value={formData.nationality}
                    readOnly
                    className={inputClass + " bg-gray-100 cursor-not-allowed"}
                  />
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="mobileNo" className={labelClass}>
                  Mobile No.
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  id="mobileNo"
                  placeholder="Mobile No."
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="phoneNo" className={labelClass}>
                  Phone No.
                </label>
                <input
                  type="tel"
                  name="phoneNo"
                  id="phoneNo"
                  placeholder="Phone No."
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="birthDate" className={labelClass}>
                  Birth Date
                </label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="anniversary" className={labelClass}>
                  Anniversary
                </label>
                <input
                  type="date"
                  name="anniversary"
                  id="anniversary"
                  value={formData.anniversary}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className={sectionTitleClass}>
              <BuildingOfficeIcon className={iconClass} />
              Company Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={inputGroupClass}>
                <label htmlFor="companyName" className={labelClass}>
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="companyGSTIN" className={labelClass}>
                  Company GSTIN
                </label>
                <input
                  type="text"
                  name="companyGSTIN"
                  id="companyGSTIN"
                  placeholder="Company GSTIN"
                  value={formData.companyGSTIN}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className={sectionTitleClass}>
              <IdentificationIcon className={iconClass} />
              ID Proof & Documents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className={inputGroupClass}>
                <label htmlFor="idProofType" className={labelClass}>
                  ID Proof Type
                </label>
                <div className="relative">
                  <select
                    name="idProofType"
                    id="idProofType"
                    value={formData.idProofType}
                    onChange={handleChange}
                    className={inputClass + " appearance-none pr-8"}
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="idProofNumber" className={labelClass}>
                  ID Proof Number
                </label>
                <input
                  type="text"
                  name="idProofNumber"
                  id="idProofNumber"
                  placeholder="ID Proof Number"
                  value={formData.idProofNumber}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass + " flex items-end"}>
                <button
                  type="button"
                  onClick={handleOpenPhotoIdModal}
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                >
                  <IdentificationIcon className="h-5 w-5" /> Upload Photos/IDs
                </button>
              </div>
            </div>
            <div className="mt-6">
              {hasAnyImageToDisplay ? (
                // Responsive grid for image previews
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {renderImageOrPdfPreview(getDisplaySource(uploadedFiles.studentAvatar, existingImageUrls.studentAvatar), "Student Photo")}
                  {renderImageOrPdfPreview(getDisplaySource(uploadedFiles.idProofFront, existingImageUrls.idProofFront), "ID Front")}
                  {renderImageOrPdfPreview(getDisplaySource(uploadedFiles.idProofBack, existingImageUrls.idProofBack), "ID Back")}
                  {renderImageOrPdfPreview(getDisplaySource(uploadedFiles.otherDocument, existingImageUrls.otherDocument), "Other Doc")}
                </div>
              ) : (
                <div className="mt-4 p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded-md">
                  No photos or ID documents selected yet.
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className={sectionTitleClass}>
              <HomeIcon className={iconClass} />
              Room & Rate Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className={inputGroupClass}>
                <label htmlFor="roomNo" className={labelClass}>
                  Room No.
                </label>
                <input
                  type="text"
                  name="roomNo"
                  id="roomNo"
                  placeholder="Room No."
                  value={formData.roomNo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="planPackage" className={labelClass}>
                  Plan/Package
                </label>
                <input
                  type="text"
                  name="planPackage"
                  id="planPackage"
                  placeholder="Plan/Package"
                  value={formData.planPackage}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="noOfAdults" className={labelClass}>
                  No. of Adults
                </label>
                <input
                  type="number"
                  name="noOfAdults"
                  id="noOfAdults"
                  placeholder="Adults"
                  value={formData.noOfAdults}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="noOfChildren" className={labelClass}>
                  No. of Children
                </label>
                <input
                  type="number"
                  name="noOfChildren"
                  id="noOfChildren"
                  placeholder="Children"
                  value={formData.noOfChildren}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="rate" className={labelClass}>
                  Rate
                </label>
                <input
                  type="number"
                  name="rate"
                  id="rate"
                  placeholder="Rate"
                  value={formData.rate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass + " flex items-end gap-4"}>
                <label htmlFor="taxIncluded" className={checkboxLabelClass}>
                  <input
                    type="checkbox"
                    name="taxIncluded"
                    id="taxIncluded"
                    checked={formData.taxIncluded}
                    onChange={handleChange}
                    className="form-checkbox text-blue-600 rounded"
                  />
                  Tax Included
                </label>
                <label htmlFor="serviceCharge" className={checkboxLabelClass}>
                  <input
                    type="checkbox"
                    name="serviceCharge"
                    id="serviceCharge"
                    checked={formData.serviceCharge}
                    onChange={handleChange}
                    className="form-checkbox text-blue-600 rounded"
                  />
                  Service Charge
                </label>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="isLeader" className={checkboxLabelClass}>
                  <input
                    type="checkbox"
                    name="isLeader"
                    id="isLeader"
                    checked={formData.isLeader}
                    onChange={handleChange}
                    className="form-checkbox text-blue-600 rounded"
                  />
                  Is Leader (for group bookings)
                </label>
              </div>
            </div>
          </div>
          <div>
            <h3 className={sectionTitleClass}>
              <GlobeAltIcon className={iconClass} />
              Travel Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={inputGroupClass}>
                <label htmlFor="arrivedFrom" className={labelClass}>
                  Arrived From
                </label>
                <input
                  type="text"
                  name="arrivedFrom"
                  id="arrivedFrom"
                  placeholder="City/Country"
                  value={formData.arrivedFrom}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="destination" className={labelClass}>
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  placeholder="City/Country"
                  value={formData.destination}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className={sectionTitleClass}>
              <TagIcon className={iconClass} />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className={inputGroupClass}>
                <label htmlFor="remark" className={labelClass}>
                  Remark
                </label>
                <textarea
                  name="remark"
                  id="remark"
                  placeholder="Any special requests or notes"
                  value={formData.remark}
                  onChange={handleChange}
                  className={inputClass + " h-20 resize-y"}
                ></textarea>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="businessSource" className={labelClass}>
                  Business Source
                </label>
                <div className="relative">
                  <select
                    name="businessSource"
                    id="businessSource"
                    value={formData.businessSource}
                    onChange={handleChange}
                    className={inputClass + " appearance-none pr-8"}
                  >
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
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="marketSegment" className={labelClass}>
                  Market Segment
                </label>
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
                      className={inputClass + " appearance-none pr-8"}
                      disabled={marketSegmentOptions.length === 0}
                    >
                      <option value="">Select Segment</option>
                      {marketSegmentOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {!showMarketSegmentInput && (
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  )}
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="purposeOfVisit" className={labelClass}>
                  Purpose of Visit
                </label>
                <div className="relative">
                  <select
                    name="purposeOfVisit"
                    id="purposeOfVisit"
                    value={formData.purposeOfVisit}
                    onChange={handleChange}
                    className={inputClass + " appearance-none pr-8"}
                  >
                    <option value="Personal">Personal</option>
                    <option value="Business">Business</option>
                    <option value="Leisure">Leisure</option>
                    <option value="Family">Family</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="discountPercent" className={labelClass}>
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discountPercent"
                  id="discountPercent"
                  placeholder="e.g., 10"
                  value={formData.discountPercent}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="discountRoomSource" className={labelClass}>
                  Discount/Room Source
                </label>
                <input
                  type="text"
                  name="discountRoomSource"
                  id="discountRoomSource"
                  placeholder="Source of discount"
                  value={formData.discountRoomSource}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="paymentMode" className={labelClass}>
                  Payment Mode
                </label>
                <div className="relative">
                  <select
                    name="paymentMode"
                    id="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    className={inputClass + " appearance-none pr-8"}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="paymentStatus" className={labelClass}>
                  Payment Status
                </label>
                <div className="relative">
                  <select
                    name="paymentStatus"
                    id="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    className={inputClass + " appearance-none pr-8"}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partially Paid</option>
                    <option value="Failed">Failed</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="bookingRefNo" className={labelClass}>
                  Booking Ref. No.
                </label>
                <input
                  type="text"
                  name="bookingRefNo"
                  id="bookingRefNo"
                  placeholder="Booking Reference Number"
                  value={formData.bookingRefNo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className={sectionTitleClass}>
              <BriefcaseIcon className={iconClass} />
              Management & Special Settings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className={inputGroupClass}>
                <label htmlFor="mgmtBlock" className={labelClass}>
                  Management Block
                </label>
                <div className="relative">
                  <select
                    name="mgmtBlock"
                    id="mgmtBlock"
                    value={formData.mgmtBlock}
                    onChange={handleChange}
                    className={inputClass + " appearance-none pr-8"}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="billingInstruction" className={labelClass}>
                  Billing Instruction
                </label>
                <textarea
                  name="billingInstruction"
                  id="billingInstruction"
                  placeholder="Specific billing notes"
                  value={formData.billingInstruction}
                  onChange={handleChange}
                  className={inputClass + " h-20 resize-y"}
                ></textarea>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="temperature" className={labelClass}>
                  Temperature (Celcius)
                </label>
                <input
                  type="text"
                  name="temperature"
                  id="temperature"
                  placeholder="e.g., 98.6"
                  value={formData.temperature}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={inputGroupClass + " flex items-end gap-4"}>
                <label htmlFor="fromCSV" className={checkboxLabelClass}>
                  <input
                    type="checkbox"
                    name="fromCSV"
                    id="fromCSV"
                    checked={formData.fromCSV}
                    onChange={handleChange}
                    className="form-checkbox text-blue-600 rounded"
                  />
                  From CSV Import
                </label>
                <label htmlFor="epabx" className={checkboxLabelClass}>
                  <input
                    type="checkbox"
                    name="epabx"
                    id="epabx"
                    checked={formData.epabx}
                    onChange={handleChange}
                    className="form-checkbox text-blue-600 rounded"
                  />
                  EPABX Enabled
                </label>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="vip" className={checkboxLabelClass}>
                  <input
                    type="checkbox"
                    name="vip"
                    id="vip"
                    checked={formData.vip}
                    onChange={handleChange}
                    className="form-checkbox text-blue-600 rounded"
                  />
                  VIP Guest
                </label>
              </div>
              <div className={inputGroupClass}>
                <label htmlFor="status" className={labelClass}>
                  Booking Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={inputClass + " appearance-none pr-8"}
                  >
                    <option value="Booked">Booked</option>
                    <option value="Checked In">Checked-in</option>
                    <option value="Checked Out">Checked-out</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="No Show">No Show</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75 text-xl"
            >
              Create Booking
            </button>
          </div>
        </form>
      </div>
      {showPhotoIdModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <PhotoIdUpload
            onClose={handleClosePhotoIdModal}
            currentFiles={uploadedFiles} // Pass currently new uploaded files
            existingUrls={existingImageUrls} // Pass existing URLs to modal if it needs to display them
          />
        </div>
      )}
    </div>
  );
};

export default AddBookingForm;