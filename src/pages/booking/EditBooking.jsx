// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast, { Toaster } from 'react-hot-toast';
// import Webcam from 'react-webcam';
// import { useLocation } from "react-router-dom";
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
//                 <div className="relative mt-4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg overflow-hidden border-4 border-purple-400 shadow-md flex items-center justify-center bg-gray-200"> {/* Responsive size */}
//                     {isPdf ? (
//                         // If the file is a PDF, show a PDF icon and its name
//                         <div className="text-gray-600 text-center text-xs sm:text-sm p-1 sm:p-2"> {/* Responsive text size and padding */}
//                             <DocumentTextIcon className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-1 sm:mb-2 text-gray-500" /> {/* Responsive icon size */}
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
//                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-600 transition-colors" // Responsive size and text
//                         aria-label="Remove image"
//                     >
//                         X
//                     </button>
//                 </div>
//             );
//         }
//         // If no imageFile exists (no file selected/captured yet), show "No image uploaded" text
//         return (
//             <div className="mt-4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-center p-2 text-xs sm:text-sm"> {/* Responsive size and text */}
//                 No image uploaded
//             </div>
//         );
//     };

//     return (
//         <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl font-inter relative mx-auto my-4"> {/* Responsive max-width and padding */}
//             <button
//                 // On close, pass back all three image files (even if null)
//                 onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
//                 className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 transition-colors"
//                 aria-label="Close photo upload"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Responsive icon size */}
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//             </button>

//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Photo & ID Upload</h2> {/* Responsive heading size and margin */}

//             {/* Grid for upload sections */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"> {/* Responsive grid columns and gap */}
//                 {/* Section 1: Student Avatar Upload */}
//                 <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50"> {/* Responsive padding */}
//                     <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Student Photo</label> {/* Responsive text size and margin */}
//                     <input
//                         type="file"
//                         accept="image/*" // Only allows image files here
//                         onChange={(e) => setStudentAvatar(e.target.files[0])} // Corrected to use setter directly
//                         className="block w-full text-xs sm:text-sm text-gray-500
//                             file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
//                             file:rounded-md file:border-0
//                             file:text-xs sm:file:text-sm file:font-semibold
//                             file:bg-purple-50 file:text-purple-700
//                             hover:file:bg-purple-100 cursor-pointer" // Responsive file input styles
//                     />
//                     {renderImagePreview(studentAvatar, setStudentAvatar)}
//                     <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center"> {/* Responsive margin and space */}
//                         <button
//                             type="button"
//                             onClick={() => setActiveWebcam(activeWebcam === 'student' ? null : 'student')}
//                             className="flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white text-sm sm:text-base font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md" // Responsive button styles
//                         >
//                             {activeWebcam === 'student' ? 'Hide Camera' : 'Show Camera'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => captureImage(setStudentAvatar, 'Student Photo')}
//                             disabled={activeWebcam !== 'student'} // Enable capture only if 'student' webcam is active
//                             className={`flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-sm sm:text-base font-semibold shadow-md transition-transform transform rounded-md ${
//                                 activeWebcam === 'student' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
//                             } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`} // Responsive button styles
//                         >
//                             Capture
//                         </button>
//                     </div>
//                 </div>

//                 {/* Section 2: ID Proof Front Upload */}
//                 <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50"> {/* Responsive padding */}
//                     <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">ID Proof (Front)</label> {/* Responsive text size and margin */}
//                     <input
//                         type="file"
//                         accept="image/*,application/pdf" // Allows both images and PDFs
//                         onChange={(e) => setIdProofFront(e.target.files[0])} // Corrected to use setter directly
//                         className="block w-full text-xs sm:text-sm text-gray-500
//                             file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
//                             file:rounded-md file:border-0
//                             file:text-xs sm:file:text-sm file:font-semibold
//                             file:bg-blue-50 file:text-blue-700
//                             hover:file:bg-blue-100 cursor-pointer" // Responsive file input styles
//                     />
//                     {renderImagePreview(idProofFront, setIdProofFront)}
//                     <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center"> {/* Responsive margin and space */}
//                         <button
//                             type="button"
//                             onClick={() => setActiveWebcam(activeWebcam === 'front' ? null : 'front')}
//                             className="flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white text-sm sm:text-base font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md" // Responsive button styles
//                         >
//                             {activeWebcam === 'front' ? 'Hide Camera' : 'Show Camera'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => captureImage(setIdProofFront, 'ID Proof Front')}
//                             disabled={activeWebcam !== 'front'} // Enable capture only if 'front' webcam is active
//                             className={`flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-sm sm:text-base font-semibold shadow-md transition-transform transform rounded-md ${
//                                 activeWebcam === 'front' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
//                             } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`} // Responsive button styles
//                         >
//                             Capture
//                         </button>
//                     </div>
//                 </div>

//                 {/* Section 3: ID Proof Back Upload */}
//                 <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50"> {/* Responsive padding */}
//                     <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">ID Proof (Back)</label> {/* Responsive text size and margin */}
//                     <input
//                         type="file"
//                         accept="image/*,application/pdf" // Allows both images and PDFs
//                         onChange={(e) => setIdProofBack(e.target.files[0])} // Corrected to use setter directly
//                         className="block w-full text-xs sm:text-sm text-gray-500
//                             file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
//                             file:rounded-md file:border-0
//                             file:text-xs sm:file:text-sm file:font-semibold
//                             file:bg-green-50 file:text-green-700
//                             hover:file:bg-green-100 cursor-pointer" // Responsive file input styles
//                     />
//                     {renderImagePreview(idProofBack, setIdProofBack)}
//                     <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center"> {/* Responsive margin and space */}
//                         <button
//                             type="button"
//                             onClick={() => setActiveWebcam(activeWebcam === 'back' ? null : 'back')}
//                             className="flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white text-sm sm:text-base font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md" // Responsive button styles
//                         >
//                             {activeWebcam === 'back' ? 'Hide Camera' : 'Show Camera'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => captureImage(setIdProofBack, 'ID Proof Back')}
//                             disabled={activeWebcam !== 'back'} // Enable capture only if 'back' webcam is active
//                             className={`flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-sm sm:text-base font-semibold shadow-md transition-transform transform rounded-md ${
//                                 activeWebcam === 'back' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
//                             } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`} // Responsive button styles
//                         >
//                             Capture
//                         </button>
//                     </div>
//                 </div>

//                 {/* Dedicated Webcam Display (conditionally rendered below the sections for better visibility) */}
//                 {activeWebcam && (
//                     <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-4">
//                         <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto rounded-lg overflow-hidden shadow-md border-2 border-indigo-400"> {/* Responsive max-width */}
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

//             <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex justify-center space-x-3 sm:space-x-4"> {/* Responsive margin, padding, and space */}
//                 <button
//                     type="button"
//                     // On "Done", pass back the latest state of all three files
//                     onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
//                     className="px-5 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white text-base sm:text-lg font-bold shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md" // Responsive button styles
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
import { useLocation } from "react-router-dom";
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
    // Initialize states with currentFiles passed from parent, or null if not provided.
    // We'll store both File objects (for new uploads/captures) AND original URLs (for existing).
    // Let's assume currentFiles holds URLs or null for existing images.
    // If you are receiving actual File objects from currentFiles, then the current setup is fine.
    // But typically, `currentFiles` would contain URLs if they are from a database.
    const [studentAvatar, setStudentAvatar] = useState(currentFiles?.studentAvatar || null);
    const [idProofFront, setIdProofFront] = useState(currentFiles?.idProofFront || null);
    // FIX IS HERE: Removed extra parentheses around useState's initial value
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
    const captureImage = useCallback((setImageState, docType) => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                const capturedFile = dataURLtoFile(imageSrc, `${docType.toLowerCase().replace(/\s/g, '_')}.png`);
                setImageState(capturedFile);
                setActiveWebcam(null);
                toast.success(`${docType} captured successfully!`);
            } else {
                toast.error(`Failed to capture image for ${docType}.`);
            }
        }
    }, []);

    // Helper function to render image previews for each section
    const renderImagePreview = (imageSource, setImageState) => {
        // `imageSource` can be a File object, a string URL, or null
        if (!imageSource) {
            return (
                <div className="mt-4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-center p-2 text-xs sm:text-sm">
                    No image uploaded
                </div>
            );
        }

        let imageUrl = null;
        let isPdf = false;
        let fileName = "";

        if (imageSource instanceof File) {
            // If it's a File object (newly uploaded or captured)
            imageUrl = URL.createObjectURL(imageSource);
            isPdf = imageSource.type === "application/pdf";
            fileName = imageSource.name;
        } else if (typeof imageSource === 'string') {
            // If it's a string (likely a URL from currentFiles)
            imageUrl = imageSource;
            // You might need to infer if it's a PDF from the URL or a separate flag if currentFiles provides it
            isPdf = imageSource.toLowerCase().endsWith('.pdf');
            fileName = imageSource.substring(imageSource.lastIndexOf('/') + 1); // Extract file name from URL
        }

        return (
            <div className="relative mt-4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg overflow-hidden border-4 border-purple-400 shadow-md flex items-center justify-center bg-gray-200">
                {isPdf ? (
                    <div className="text-gray-600 text-center text-xs sm:text-sm p-1 sm:p-2">
                        <DocumentTextIcon className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-1 sm:mb-2 text-gray-500" />
                        PDF File: <br /> {fileName}
                    </div>
                ) : (
                    <img
                        src={imageUrl} // Use the determined imageUrl here
                        alt="Preview"
                        className="object-cover w-full h-full"
                    />
                )}
                <button
                    onClick={() => {
                        // When removing, reset the state to null
                        if (imageSource instanceof File) {
                             URL.revokeObjectURL(imageUrl); // Revoke the object URL if it was created
                        }
                        setImageState(null);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                >
                    X
                </button>
            </div>
        );
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl font-inter relative mx-auto my-4">
            <button
                onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Close photo upload"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Photo & ID Upload</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Section 1: Student Avatar Upload */}
                <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
                    <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Student Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setStudentAvatar)} // Use the new handler
                        className="block w-full text-xs sm:text-sm text-gray-500
                            file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                            file:rounded-md file:border-0
                            file:text-xs sm:file:text-sm file:font-semibold
                            file:bg-purple-50 file:text-purple-700
                            hover:file:bg-purple-100 cursor-pointer"
                    />
                    {renderImagePreview(studentAvatar, setStudentAvatar)}
                    <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center">
                        <button
                            type="button"
                            onClick={() => setActiveWebcam(activeWebcam === 'student' ? null : 'student')}
                            className="flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white text-sm sm:text-base font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
                        >
                            {activeWebcam === 'student' ? 'Hide Camera' : 'Show Camera'}
                        </button>
                        <button
                            type="button"
                            onClick={() => captureImage(setStudentAvatar, 'Student Photo')}
                            disabled={activeWebcam !== 'student'}
                            className={`flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-sm sm:text-base font-semibold shadow-md transition-transform transform rounded-md ${
                                activeWebcam === 'student' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
                        >
                            Capture
                        </button>
                    </div>
                </div>

                {/* Section 2: ID Proof Front Upload */}
                <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
                    <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">ID Proof (Front)</label>
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => handleImageUpload(e, setIdProofFront)} // Use the new handler
                        className="block w-full text-xs sm:text-sm text-gray-500
                            file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                            file:rounded-md file:border-0
                            file:text-xs sm:file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100 cursor-pointer"
                    />
                    {renderImagePreview(idProofFront, setIdProofFront)}
                    <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center">
                        <button
                            type="button"
                            onClick={() => setActiveWebcam(activeWebcam === 'front' ? null : 'front')}
                            className="flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white text-sm sm:text-base font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
                        >
                            {activeWebcam === 'front' ? 'Hide Camera' : 'Show Camera'}
                        </button>
                        <button
                            type="button"
                            onClick={() => captureImage(setIdProofFront, 'ID Proof Front')}
                            disabled={activeWebcam !== 'front'}
                            className={`flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-sm sm:text-base font-semibold shadow-md transition-transform transform rounded-md ${
                                activeWebcam === 'front' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
                        >
                            Capture
                        </button>
                    </div>
                </div>

                {/* Section 3: ID Proof Back Upload */}
                <div className="flex flex-col items-center p-3 sm:p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
                    <label className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">ID Proof (Back)</label>
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => handleImageUpload(e, setIdProofBack)} // Use the new handler
                        className="block w-full text-xs sm:text-sm text-gray-500
                            file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                            file:rounded-md file:border-0
                            file:text-xs sm:file:text-sm file:font-semibold
                            file:bg-green-50 file:text-green-700
                            hover:file:bg-green-100 cursor-pointer"
                    />
                    {renderImagePreview(idProofBack, setIdProofBack)}
                    <div className="mt-3 sm:mt-4 flex space-x-2 sm:space-x-3 w-full justify-center">
                        <button
                            type="button"
                            onClick={() => setActiveWebcam(activeWebcam === 'back' ? null : 'back')}
                            className="flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white text-sm sm:text-base font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
                        >
                            {activeWebcam === 'back' ? 'Hide Camera' : 'Show Camera'}
                        </button>
                        <button
                            type="button"
                            onClick={() => captureImage(setIdProofBack, 'ID Proof Back')}
                            disabled={activeWebcam !== 'back'}
                            className={`flex-1 px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-sm sm:text-base font-semibold shadow-md transition-transform transform rounded-md ${
                                activeWebcam === 'back' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
                        >
                            Capture
                        </button>
                    </div>
                </div>

                {/* Dedicated Webcam Display */}
                {activeWebcam && (
                    <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-4">
                        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto rounded-lg overflow-hidden shadow-md border-2 border-indigo-400">
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/png"
                                className="w-full h-auto"
                                videoConstraints={{ facingMode: "user" }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex justify-center space-x-3 sm:space-x-4">
                <button
                    type="button"
                    onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
                    className="px-5 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white text-base sm:text-lg font-bold shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md"
                >
                    Done
                </button>
            </div>
        </div>
    );
};
// import React, { useState, useEffect } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import { useLocation, useNavigate } from 'react-router-dom';
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
//     <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-6"> {/* छोटे और बड़े स्क्रीन के लिए पैडिंग समायोजित करें */}
//       <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg transform transition-all duration-300 scale-100 opacity-100"> {/* विभिन्न स्क्रीन आकारों के लिए अधिकतम चौड़ाई समायोजित करें */}
//         <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">Upload Photos & IDs</h2> {/* शीर्षक का आकार और मार्जिन समायोजित करें */}
//         <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto pr-2"> {/* स्पेसिंग समायोजित करें */}
//           {Object.entries(currentFiles).map(([key, file]) => (
//             file && (
//               <div key={key} className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 text-sm sm:text-base shadow-sm"> {/* टेक्स्ट आकार और पैडिंग समायोजित करें */}
//                 <span>{key.replace(/([A-Z])/g, ' $1').trim()}: <span className="font-medium">{file.name || "Already Uploaded"}</span></span>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveFile(key)}
//                   className="text-red-600 hover:text-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 p-1 rounded-full"
//                   title={`Remove ${key}`}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5"> {/* आइकन का आकार समायोजित करें */}
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             )
//           ))}
//           {/* Your file input/webcam capture logic would go here */}
//           <div className="p-4 sm:p-6 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-center text-xs sm:text-sm italic"> {/* टेक्स्ट आकार और पैडिंग समायोजित करें */}
//             [Implement your file upload/camera capture components here. This modal will provide the functionality to select or capture images.]
//           </div>
//         </div>
//         <div className="mt-6 sm:mt-8 flex justify-end gap-3 sm:gap-4"> {/* मार्जिन और गैप समायोजित करें */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-sm sm:text-base" 
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

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