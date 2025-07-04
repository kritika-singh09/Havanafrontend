



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
const PhotoIdUpload = ({ onClose, currentFiles }) => {
    // Initialize states with currentFiles passed from parent, or null if not provided
    const [studentAvatar, photoUrl] = useState(currentFiles?.studentAvatar || null);
    const [idProofFront, idProofImageUrl2] = useState(currentFiles?.idProofFront || null);
    const [idProofBack, idProofImageUrl] = useState(currentFiles?.idProofBack || null);

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
            setImageState(file);
            // If a file is manually uploaded, turn off any active webcam
            setActiveWebcam(null);
        } else {
            console.error("No file selected.");
        }
    };

    // Handler for capturing image from webcam
    // It now takes a function to set the specific image state and a descriptive name
    const captureImage = useCallback((setImageState, docType) => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                const capturedFile = dataURLtoFile(imageSrc, `${docType.toLowerCase().replace(/\s/g, '_')}.png`); // Corrected line
                setImageState(capturedFile); // Set the captured image to the specific state (studentAvatar, idProofFront, or idProofBack)
                setActiveWebcam(null); // Hide webcam after successful capture
                toast.success(`${docType} captured successfully!`); // Corrected line
            } else {
                toast.error(`Failed to capture image for ${docType}.`); // Corrected line
            }
        }
    }, []); // Dependencies are stable, so empty array

    
    const handleFileUploadToBackend = async (file, fileType) => {
        if (!file) {
            toast.error(`No ${fileType} file to upload.`);
            return null;
        }

        const formData = new FormData();
        formData.append('image', file); // 'image' is the key expected by the backend

        try {
            const response = await axios.post(
                "https://havana-backend.vercel.app/api/bookings/upload-image",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            toast.success(`${fileType} uploaded successfully!`);
            console.log(`${fileType} upload response:`, response.data);
            return response.data.imageUrl; // Assuming the backend returns an imageUrl
        } catch (error) {
            console.error(`Error uploading ${fileType}:`, error);
            toast.error(`Failed to upload ${fileType}. Error: ` + (error.response?.data?.message || error.message));
            return null;
        }
    };

  
    const handleUploadAllDocuments = async () => {
        const uploadedUrls = {};
        if (studentAvatar) {
            const url = await handleFileUploadToBackend(studentAvatar, "Student Avatar");
            if (url) uploadedUrls.studentAvatarUrl = url;
        }
        if (idProofFront) {
            const url = await handleFileUploadToBackend(idProofFront, "ID Proof Front");
            if (url) uploadedUrls.idProofFrontUrl = url;
        }
        if (idProofBack) {
            const url = await handleFileUploadToBackend(idProofBack, "ID Proof Back");
            if (url) uploadedUrls.idProofBackUrl = url;
        }

        
        console.log("All uploaded URLs:", uploadedUrls);
        if (Object.keys(uploadedUrls).length > 0) {
            toast.success("All available documents uploaded!");
        } else {
            toast("No documents to upload.", { icon: 'ℹ️' });
        }
    };
    
    // Helper function to render image previews for each section
    const renderImagePreview = (imageFile, setImageState) => {
        if (imageFile) {
            const isPdf = imageFile.type === "application/pdf"; // Check if the file is a PDF
            return (
                <div className="relative mt-4 w-48 h-48 rounded-lg overflow-hidden border-4 border-purple-400 shadow-md flex items-center justify-center bg-gray-200">
                    {isPdf ? (
                        // Display PDF icon or text for PDF files
                        <div className="text-gray-600 text-center text-sm p-2">
                            <DocumentTextIcon className="h-10 w-10 mx-auto mb-2 text-gray-500" />
                            PDF File: <br /> {imageFile.name}
                        </div>
                    ) : (
                        // Display image for image files
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Preview"
                            className="object-cover w-full h-full"
                        />
                    )}
                    <button
                        onClick={() => setImageState(null)} // Allows removing the uploaded/captured image
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-600 transition-colors"
                        aria-label="Remove image"
                    >
                        X
                    </button>
                </div>
            );
        }
        return (
            <div className="mt-4 w-48 h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-center p-4">
                No image uploaded
            </div>
        );
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl font-inter relative">
            <button
                // On close, pass back all three image files (even if null)
                onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Close photo upload"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Photo & ID Upload</h2>

            {/* Grid for upload sections */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Section 1: Student Avatar Upload */}
                <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
                    <label className="text-lg font-semibold text-gray-700 mb-3">Student Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, photoUrl)}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-purple-50 file:text-purple-700
                            hover:file:bg-purple-100 cursor-pointer"
                    />
                    {renderImagePreview(studentAvatar, photoUrl)}
                    <div className="mt-4 flex space-x-3 w-full justify-center">
                        <button
                            type="button"
                            onClick={() => setActiveWebcam(activeWebcam === 'student' ? null : 'student')}
                            className="flex-1 px-4 py-2 bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
                        >
                            {activeWebcam === 'student' ? 'Hide Camera' : 'Show Camera'}
                        </button>
                        <button
                            type="button"
                            onClick={() => captureImage(photoUrl, 'Student Photo')}
                            disabled={activeWebcam !== 'student'} // Enable capture only if 'student' webcam is active
                            className={`flex-1 px-4 py-2 bg-green-500 text-white font-semibold shadow-md transition-transform transform rounded-md ${
                                activeWebcam === 'student' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
                        >
                            Capture
                        </button>
                    </div>
                </div>

                {/* Section 2: ID Proof Front Upload */}
                <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
                    <label className="text-lg font-semibold text-gray-700 mb-3">ID Proof (Front)</label>
                    <input
                        type="file"
                        accept="image/*,application/pdf" // Allow images and PDFs
                        onChange={(e) => handleImageUpload(e, idProofImageUrl2)}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100 cursor-pointer"
                    />
                    {renderImagePreview(idProofFront, idProofImageUrl2)}
                    <div className="mt-4 flex space-x-3 w-full justify-center">
                        <button
                            type="button"
                            onClick={() => setActiveWebcam(activeWebcam === 'front' ? null : 'front')}
                            className="flex-1 px-4 py-2 bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
                        >
                            {activeWebcam === 'front' ? 'Hide Camera' : 'Show Camera'}
                        </button>
                        <button
                            type="button"
                            onClick={() => captureImage(idProofImageUrl2, 'ID Proof Front')}
                            disabled={activeWebcam !== 'front'} // Enable capture only if 'front' webcam is active
                            className={`flex-1 px-4 py-2 bg-green-500 text-white font-semibold shadow-md transition-transform transform rounded-md ${
                                activeWebcam === 'front' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
                        >
                            Capture
                        </button>
                    </div>
                </div>

                {/* Section 3: ID Proof Back Upload */}
                <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
                    <label className="text-lg font-semibold text-gray-700 mb-3">ID Proof (Back)</label>
                    <input
                        type="file"
                        accept="image/*,application/pdf" // Allow images and PDFs
                        onChange={(e) => handleImageUpload(e, idProofImageUrl)}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-green-50 file:text-green-700
                            hover:file:bg-green-100 cursor-pointer"
                    />
                    {renderImagePreview(idProofBack, idProofImageUrl)}
                    <div className="mt-4 flex space-x-3 w-full justify-center">
                        <button
                            type="button"
                            onClick={() => setActiveWebcam(activeWebcam === 'back' ? null : 'back')}
                            className="flex-1 px-4 py-2 bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 rounded-md"
                        >
                            {activeWebcam === 'back' ? 'Hide Camera' : 'Show Camera'}
                        </button>
                        <button
                            type="button"
                            onClick={() => captureImage(idProofImageUrl, 'ID Proof Back')}
                            disabled={activeWebcam !== 'back'} // Enable capture only if 'back' webcam is active
                            className={`flex-1 px-4 py-2 bg-green-500 text-white font-semibold shadow-md transition-transform transform rounded-md ${
                                activeWebcam === 'back' ? 'hover:bg-green-600 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75`}
                        >
                            Capture
                        </button>
                    </div>
                </div>

                {/* Dedicated Webcam Display (conditionally rendered below the sections for better visibility) */}
                {activeWebcam && (
                    <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-4">
                        <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-md border-2 border-indigo-400">
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

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center space-x-4">
                <button
                    type="button"
                    onClick={handleUploadAllDocuments} // New button to trigger upload to backend
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                    Upload All Documents
                </button>
                <button
                    type="button"
                    // On "Done", pass back the latest state of all three files
                    onClick={() => onClose({ studentAvatar, idProofFront, idProofBack })}
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

    // State for multiple files
    const [uploadedFiles, setUploadedFiles] = useState({
        studentAvatar: null,
        idProofFront: null,
        idProofBack: null,
        otherDocument: null, // Assuming you might have an "otherDocument" input somewhere too
    });

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
            // Append all uploaded files with the correct backend schema keys
            if (uploadedFiles.studentAvatar) {
                dataToSubmit.append("photoUrl", uploadedFiles.studentAvatar); // Changed from studentAvatar to photoUrl
            }
            if (uploadedFiles.idProofFront) {
                dataToSubmit.append("idProofImageUrl2", uploadedFiles.idProofFront); // Changed from idProofFront to idProofImageUrl2
            }
            if (uploadedFiles.idProofBack) {
                dataToSubmit.append("idProofImageUrl", uploadedFiles.idProofBack); // Changed from idProofBack to idProofImageUrl
            }
            if (uploadedFiles.otherDocument) {
                dataToSubmit.append("otherDocument", uploadedFiles.otherDocument);
            }

            console.log("Submitting form data:", formData);
            console.log("Submitting uploaded files (renamed for backend):", uploadedFiles);


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

    // Update to receive an object of files
    const handleClosePhotoIdModal = (files) => {
        setUploadedFiles(files);
        const anyFileSelected = Object.values(files).some(file => file !== null);
        if (anyFileSelected) {
            toast.success("Selected photos/documents updated in form data."); // Changed toast message
        } else {
            toast('No new photo or document selected/captured.', { icon: 'ℹ️' });
        }
        setShowPhotoIdModal(false);
    };

    
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
                                    {/* You might want to remove 'readOnly' and make it a select or searchable input for real use */}
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
                                <label htmlFor="phoneNo" className={labelClass}>Phone No. (Alternative)</label>
                                <input type="tel" name="phoneNo" id="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputGroupClass}>
                                <label htmlFor="birthDate" className={labelClass}>Date of Birth</label>
                                <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputGroupClass}>
                                <label htmlFor="anniversary" className={labelClass}>Anniversary Date</label>
                                <input type="date" name="anniversary" id="anniversary" value={formData.anniversary} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </div>

                    {/* Company Details (if applicable) */}
                    <div>
                        <h3 className={sectionTitleClass}><BuildingOfficeIcon className={iconClass} />Company Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    {/* ID & Documents */}
                    <div>
                        <h3 className={sectionTitleClass}><IdentificationIcon className={iconClass} />ID & Documents</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className={inputGroupClass}>
                                <label htmlFor="idProofType" className={labelClass}>ID Proof Type</label>
                                <div className="relative">
                                    <select name="idProofType" id="idProofType" value={formData.idProofType} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
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
                                <label htmlFor="idProofNumber" className={labelClass}>ID Proof Number</label>
                                <input type="text" name="idProofNumber" id="idProofNumber" placeholder="ID Proof Number" value={formData.idProofNumber} onChange={handleChange} className={inputClass} />
                            </div>
                            {/* Photo and ID Upload Button */}
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Upload Photos & ID</label>
                                <button
                                    type="button"
                                    onClick={handleOpenPhotoIdModal}
                                    className="w-full bg-indigo-500 text-white py-3 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:scale-105"
                                >
                                    Upload Student Photo & ID Proofs
                                </button>
                                {uploadedFiles.studentAvatar && <p className="text-sm text-green-600 mt-2">Student Photo: Uploaded</p>}
                                {uploadedFiles.idProofFront && <p className="text-sm text-green-600">ID Front: Uploaded</p>}
                                {uploadedFiles.idProofBack && <p className="text-sm text-green-600">ID Back: Uploaded</p>}
                            </div>
                        </div>
                    </div>

                    {/* Room & Rate Details */}
                    <div>
                        <h3 className={sectionTitleClass}><HomeIcon className={iconClass} />Room & Rate Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className={inputGroupClass}>
                                <label htmlFor="roomNo" className={labelClass}>Room No.</label>
                                <input type="text" name="roomNo" id="roomNo" placeholder="Room Number" value={formData.roomNo} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputGroupClass}>
                                <label htmlFor="planPackage" className={labelClass}>Plan/Package</label>
                                <input type="text" name="planPackage" id="planPackage" placeholder="e.g., EP, CP, MAP" value={formData.planPackage} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputGroupClass}>
                                <label htmlFor="noOfAdults" className={labelClass}>No. of Adults</label>
                                <input type="number" name="noOfAdults" id="noOfAdults" placeholder="Adults" value={formData.noOfAdults} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputGroupClass}>
                                <label htmlFor="noOfChildren" className={labelClass}>No. of Children</label>
                                <input type="number" name="noOfChildren" id="noOfChildren" placeholder="Children" value={formData.noOfChildren} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputGroupClass}>
                                <label htmlFor="rate" className={labelClass}>Rate</label>
                                <input type="number" name="rate" id="rate" placeholder="Rate" value={formData.rate} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputGroupClass}>
                                <label className={checkboxLabelClass}>
                                    <input type="checkbox" name="taxIncluded" checked={formData.taxIncluded} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded" />
                                    Tax Included
                                </label>
                            </div>
                            <div className={inputGroupClass}>
                                <label className={checkboxLabelClass}>
                                    <input type="checkbox" name="serviceCharge" checked={formData.serviceCharge} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded" />
                                    Service Charge
                                </label>
                            </div>
                          
                        </div>
                    </div>

                    {/* Travel Details */}
                    <div>
                        <h3 className={sectionTitleClass}><GlobeAltIcon className={iconClass} />Travel Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className={inputGroupClass}>
                                <label htmlFor="arrivedFrom" className={labelClass}>Arrived From</label>
                                <input type="text" name="arrivedFrom" id="arrivedFrom" placeholder="City/Country" value={formData.arrivedFrom} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputGroupClass}>
                                <label htmlFor="destination" className={labelClass}>Destination</label>
                                <input type="text" name="destination" id="destination" placeholder="City/Country" value={formData.destination} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputGroupClass + " sm:col-span-2"}>
                                <label htmlFor="remark" className={labelClass}>Remark</label>
                                <textarea name="remark" id="remark" placeholder="Any special requests or notes" value={formData.remark} onChange={handleChange} className={inputClass + " h-20 resize-y"}></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Business & Marketing */}
                    <div>
                        <h3 className={sectionTitleClass}><MegaphoneIcon className={iconClass} />Business & Marketing</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className={inputGroupClass}>
                                <label htmlFor="businessSource" className={labelClass}>Business Source</label>
                                <div className="relative">
                                    <select name="businessSource" id="businessSource" value={formData.businessSource} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                                        <option value="">Select Source</option>
                                        <option value="Online OTA">Online OTA</option>
                                        <option value="Travel Agent">Travel Agent</option>
                                        <option value="Self Agent">Self Agent</option>
                                        <option value="Corporate">Corporate</option>
                                        <option value="Walk-in">Walk-in</option>
                                        <option value="Direct Call">Direct Call</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className={inputGroupClass}>
                                <label htmlFor="marketSegment" className={labelClass}>Market Segment</label>
                                <div className="relative">
                                    {marketSegmentOptions.length > 0 && !showMarketSegmentInput ? (
                                        <select
                                            name="marketSegment"
                                            id="marketSegment"
                                            value={formData.marketSegment}
                                            onChange={handleChange}
                                            className={inputClass + " appearance-none pr-8"}
                                        >
                                            <option value="">Select Segment</option>
                                            {marketSegmentOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            name="marketSegment"
                                            id="marketSegment"
                                            placeholder="Market Segment"
                                            value={formData.marketSegment}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    )}
                                    {!showMarketSegmentInput && <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />}
                                </div>
                            </div>
                            <div className={inputGroupClass}>
                                <label htmlFor="purposeOfVisit" className={labelClass}>Purpose of Visit</label>
                                <div className="relative">
                                    <select name="purposeOfVisit" id="purposeOfVisit" value={formData.purposeOfVisit} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                                        <option value="Personal">Personal</option>
                                        <option value="Business">Business</option>
                                        <option value="Leisure">Leisure</option>
                                        <option value="Family">Family</option>
                                        <option value="Medical">Medical</option>
                                        <option value="Education">Education</option>
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
                        </div>
                    </div>

                    {/* Payment & Billing */}
                    <div>
                        <h3 className={sectionTitleClass}><BanknotesIcon className={iconClass} />Payment & Billing</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className={inputGroupClass}>
                                <label htmlFor="paymentMode" className={labelClass}>Payment Mode</label>
                                <div className="relative">
                                    <select name="paymentMode" id="paymentMode" value={formData.paymentMode} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                                        <option value="Cash">Cash</option>
                                        <option value="Card">Card</option>
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
                                <input type="text" name="bookingRefNo" id="bookingRefNo" placeholder="Booking Reference Number" value={formData.bookingRefNo} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputGroupClass}>
                                <label htmlFor="mgmtBlock" className={labelClass}>Mgmt. Block</label>
                                <div className="relative">
                                    <select name="mgmtBlock" id="mgmtBlock" value={formData.mgmtBlock} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className={inputGroupClass + " sm:col-span-2"}>
                                <label htmlFor="billingInstruction" className={labelClass}>Billing Instruction</label>
                                <textarea name="billingInstruction" id="billingInstruction" placeholder="Any specific billing instructions" value={formData.billingInstruction} onChange={handleChange} className={inputClass + " h-20 resize-y"}></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                        <h3 className={sectionTitleClass}><TagIcon className={iconClass} />Additional Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className={inputGroupClass}>
                                <label htmlFor="temperature" className={labelClass}>Temperature</label>
                                <input type="text" name="temperature" id="temperature" placeholder="e.g., 98.6°F" value={formData.temperature} onChange={handleChange} className={inputClass} />
                            </div>
                          
                            <div className={inputGroupClass}>
                                <label className={checkboxLabelClass}>
                                    <input type="checkbox" name="vip" checked={formData.vip} onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600 rounded" />
                                    VIP
                                </label>
                            </div>
                            <div className={inputGroupClass}>
                                <label htmlFor="status" className={labelClass}>Booking Status</label>
                                <div className="relative">
                                    <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                                        <option value="Booked">Booked</option>
                                        <option value="Checked In">Checked In</option>
                                        <option value="Checked Out">Checked Out</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t-2 border-gray-100 flex justify-center">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75"
                        >
                            Create Booking
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal for Photo and ID Upload */}
            {showPhotoIdModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <PhotoIdUpload onClose={handleClosePhotoIdModal} currentFiles={uploadedFiles} />
                </div>
            )}
        </div>
    );
};

export default AddBookingForm;