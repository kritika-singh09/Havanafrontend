import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Webcam from 'react-webcam'; // Make sure to install this package: npm install react-webcam

// Import Heroicons
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  WalletIcon,
  HomeIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  CakeIcon,
  SparklesIcon,
  CurrencyRupeeIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
  MapPinIcon,
  BriefcaseIcon,
  QuestionMarkCircleIcon,
  TagIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  MegaphoneIcon,
  SunIcon,
  ComputerDesktopIcon,
  StarIcon
} from '@heroicons/react/24/outline';

// PhotoIdUpload Component (Moved inside AddBookingForm for simplicity of conditional rendering)
// In a larger application, you might keep this in its own file and import it.
const PhotoIdUpload = ({ onBackToForm }) => {
  const [studentAvatar, setStudentAvatar] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);

  // Function to convert base64 data URL to a File object
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

  // Handler for file input change
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentAvatar(file);
      setShowWebcam(false); // Hide webcam if file is uploaded
    } else {
      console.error("No file selected.");
    }
  };

  // Handler for capturing image from webcam
  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const file = dataURLtoFile(imageSrc, "student_avatar.png");
      setStudentAvatar(file);
      setShowWebcam(false); // Hide webcam after capture
    }
  }, [webcamRef]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Student Photo Upload</h2>

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
                />
              </div>
            )}
            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => setShowWebcam(!showWebcam)}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-full shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
              >
                {showWebcam ? 'Hide Cam' : 'Show Cam'}
              </button>
              <button
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
                Webcam off
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - inspired by the bottom buttons in your image */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75">
            Vehicle Details
          </button>
          <button className="px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75">
            Guest Details
          </button>
          <button onClick={onBackToForm} className="px-6 py-3 bg-gray-500 text-white font-bold rounded-full shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
            Back to Booking Form
          </button>
        </div>
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
    status: "Booked",
  });

  const [marketSegmentOptions, setMarketSegmentOptions] = useState([]);
  const [showMarketSegmentInput, setShowMarketSegmentInput] = useState(false);
  const [showPhotoIdUploadPage, setShowPhotoIdUploadPage] = useState(false); // New state for conditional rendering

  // Effect to dynamically set market segment options and visibility
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
      case "": // No business source selected
        options = [];
        showInput = false;
        break;
      default: // Handles "Other" or any unspecified business source
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

  }, [formData.businessSource]);

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

      console.log("Submitting form data:", formData);

      await axios.post("https://havana-backend.vercel.app/api/bookings", formData);
      toast.success("Booking Created Successfully!");
      navigate("/booking");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again. Error: " + (error.response?.data?.message || error.message));
    }
  };

  // Handler for Photo ID Upload button - now toggles the view
  const handlePhotoIdUpload = () => {
    setShowPhotoIdUploadPage(true);
  };

  // Handler to go back from PhotoIdUpload to AddBookingForm
  const handleBackToForm = () => {
    setShowPhotoIdUploadPage(false);
  };

  // Styling classes
  const sectionTitleClass = "text-xl font-semibold text-gray-700 mb-3 border-b pb-2 border-gray-300 flex items-center gap-2";
  const inputContainerClass = "";
  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500";
  const checkboxLabelClass = "flex items-center gap-2 text-gray-700 font-medium";
  const iconClass = "h-5 w-5 text-gray-500";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <Toaster position="top-right" reverseOrder={false} />
      {showPhotoIdUploadPage ? (
        <PhotoIdUpload onBackToForm={handleBackToForm} />
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-6 bg-white shadow-lg rounded-xl w-full">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8 tracking-wide">Add New Booking</h2>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Booking Details and Guest Information (Paired in two columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Booking Details */}
              <div>
                <h3 className={sectionTitleClass}><DocumentTextIcon className={iconClass} />Booking Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={inputContainerClass}>
                    <label htmlFor="grcNo" className="block text-gray-700 text-sm font-bold mb-1">GRC No.</label>
                    <input type="text" name="grcNo" id="grcNo" placeholder="GRC No" value={formData.grcNo} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="checkInDate" className="block text-gray-700 text-sm font-bold mb-1">Check-in Date</label>
                    <input type="date" name="checkInDate" id="checkInDate" value={formData.checkInDate} onChange={handleChange} className={inputClass} required />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="checkOutDate" className="block text-gray-700 text-sm font-bold mb-1">Check-out Date</label>
                    <input type="date" name="checkOutDate" id="checkOutDate" value={formData.checkOutDate} onChange={handleChange} className={inputClass} required />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="days" className="block text-gray-700 text-sm font-bold mb-1">Days</label>
                    <input type="number" name="days" id="days" placeholder="Days" value={formData.days} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="timeIn" className="block text-gray-700 text-sm font-bold mb-1">Time In</label>
                    <input type="time" name="timeIn" id="timeIn" placeholder="e.g., 14:00" value={formData.timeIn} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="timeOut" className="block text-gray-700 text-sm font-bold mb-1">Time Out</label>
                    <input type="time" name="timeOut" id="timeOut" placeholder="e.g., 12:00" value={formData.timeOut} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div>
                <h3 className={sectionTitleClass}><UserIcon className={iconClass} />Guest Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className={inputContainerClass}>
                    <label htmlFor="salutation" className="block text-gray-700 text-sm font-bold mb-1">Salutation</label>
                    <input type="text" name="salutation" id="salutation" placeholder="Mr./Ms./Dr." value={formData.salutation} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-1">Full Name</label>
                    <input type="text" name="name" id="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={inputClass} required />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-1">Age</label>
                    <input type="number" name="age" id="age" placeholder="Age" value={formData.age} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-1">Gender</label>
                    <div className="relative">
                      <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className={inputContainerClass + " sm:col-span-2 lg:col-span-1"}>
                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-1">Address</label>
                    <input type="text" name="address" id="address" placeholder="Address" value={formData.address} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-1">City</label>
                    <input type="text" name="city" id="city" placeholder="City" value={formData.city} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="nationality" className="block text-gray-700 text-sm font-bold mb-1">Nationality</label>
                    <div className="relative">
                      <input type="text" name="nationality" id="nationality" value={formData.nationality} readOnly className={inputClass + " bg-gray-100 cursor-not-allowed"} />
                      <GlobeAltIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="mobileNo" className="block text-gray-700 text-sm font-bold mb-1">Mobile No.</label>
                    <input type="text" name="mobileNo" id="mobileNo" placeholder="Mobile No." value={formData.mobileNo} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="phoneNo" className="block text-gray-700 text-sm font-bold mb-1">Phone No.</label>
                    <input type="text" name="phoneNo" id="phoneNo" placeholder="Phone No." value={formData.phoneNo} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="birthDate" className="block text-gray-700 text-sm font-bold mb-1">Birth Date</label>
                    <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="anniversary" className="block text-gray-700 text-sm font-bold mb-1">Anniversary</label>
                    <input type="date" name="anniversary" id="anniversary" value={formData.anniversary} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* Company Details and ID Proof (Paired in two columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Company Details */}
              <div>
                <h3 className={sectionTitleClass}><BuildingOfficeIcon className={iconClass} />Company Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className={inputContainerClass}>
                    <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-1">Company Name</label>
                    <input type="text" name="companyName" id="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="companyGSTIN" className="block text-gray-700 text-sm font-bold mb-1">Company GSTIN</label>
                    <input type="text" name="companyGSTIN" id="companyGSTIN" placeholder="Company GSTIN" value={formData.companyGSTIN} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* ID Proof */}
              <div>
                <h3 className={sectionTitleClass}><IdentificationIcon className={iconClass} />ID Proof</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className={inputContainerClass}>
                    <label htmlFor="idProofType" className="block text-gray-700 text-sm font-bold mb-1">ID Proof Type</label>
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
                  <div className={inputContainerClass}>
                    <label htmlFor="idProofNumber" className="block text-gray-700 text-sm font-bold mb-1">ID Number</label>
                    <input type="text" name="idProofNumber" id="idProofNumber" placeholder="ID Number" value={formData.idProofNumber} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* Room & Rate Details and Other Details (Paired in two columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Room & Rate Details */}
              <div>
                <h3 className={sectionTitleClass}><HomeIcon className={iconClass} />Room & Rate Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={inputContainerClass}>
                    <label htmlFor="roomNo" className="block text-gray-700 text-sm font-bold mb-1">Room No.</label>
                    <input type="text" name="roomNo" id="roomNo" placeholder="Room No." value={formData.roomNo} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="planPackage" className="block text-gray-700 text-sm font-bold mb-1">Plan Package</label>
                    <input type="text" name="planPackage" id="planPackage" placeholder="e.g., EP, CP, MAP" value={formData.planPackage} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="noOfAdults" className="block text-gray-700 text-sm font-bold mb-1">No. of Adults</label>
                    <input type="number" name="noOfAdults" id="noOfAdults" placeholder="No. of Adults" value={formData.noOfAdults} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="noOfChildren" className="block text-gray-700 text-sm font-bold mb-1">No. of Children</label>
                    <input type="number" name="noOfChildren" id="noOfChildren" placeholder="No. of Children" value={formData.noOfChildren} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="rate" className="block text-gray-700 text-sm font-bold mb-1">Rate (₹)</label>
                    <input type="number" name="rate" id="rate" placeholder="Rate" value={formData.rate} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass + " sm:col-span-2 flex flex-wrap gap-x-6 gap-y-2 mt-2"}>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={inputContainerClass}>
                    <label htmlFor="arrivedFrom" className="block text-gray-700 text-sm font-bold mb-1">Arrived From</label>
                    <input type="text" name="arrivedFrom" id="arrivedFrom" placeholder="Arrived From" value={formData.arrivedFrom} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="destination" className="block text-gray-700 text-sm font-bold mb-1">Destination</label>
                    <input type="text" name="destination" id="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="remark" className="block text-gray-700 text-sm font-bold mb-1">Remark</label>
                    <input type="text" name="remark" id="remark" placeholder="Remark" value={formData.remark} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="businessSource" className="block text-gray-700 text-sm font-bold mb-1">Business Source</label>
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
                    
                  {/* Conditional Market Segment Field */}
                  {(marketSegmentOptions.length > 0 && !showMarketSegmentInput) ? (
                    <div className={inputContainerClass}>
                      <label htmlFor="marketSegment" className="block text-gray-700 text-sm font-bold mb-1">Market Segment</label>
                      <div className="relative">
                        <select
                          name="marketSegment"
                          id="marketSegment"
                          onChange={handleChange}
                          className={inputClass + " appearance-none pr-8"}
                          value={formData.marketSegment}
                          required={marketSegmentOptions.length > 0 && !showMarketSegmentInput}
                        >
                          <option value="">Select Market Segment</option>
                          {marketSegmentOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  ) : (formData.businessSource && showMarketSegmentInput) && (
                    <div className={inputContainerClass}>
                      <label htmlFor="marketSegment" className="block text-gray-700 text-sm font-bold mb-1">Market Segment (Specify)</label>
                      <input
                        type="text"
                        name="marketSegment"
                        id="marketSegment"
                        placeholder="Enter Market Segment"
                        onChange={handleChange}
                        className={inputClass}
                        value={formData.marketSegment}
                        required={formData.businessSource && showMarketSegmentInput}
                      />
                    </div>
                  )}

                  <div className={inputContainerClass}>
                    <label htmlFor="purposeOfVisit" className="block text-gray-700 text-sm font-bold mb-1">Purpose of Visit</label>
                    <div className="relative">
                      <select name="purposeOfVisit" id="purposeOfVisit" value={formData.purposeOfVisit} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                        <option>Personal</option>
                        <option>Business</option>
                        <option>Leisure</option>
                        <option>Family Event</option>
                        <option>Medical</option>
                        <option>Other</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Misc. (Full width section, but with inner grid for its fields) */}
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                <h3 className={sectionTitleClass}><BanknotesIcon className={iconClass} />Payment & Miscellaneous</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className={inputContainerClass}>
                    <label htmlFor="discountPercent" className="block text-gray-700 text-sm font-bold mb-1">Discount (%)</label>
                    <input type="number" name="discountPercent" id="discountPercent" placeholder="Discount (%)" value={formData.discountPercent} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="discountRoomSource" className="block text-gray-700 text-sm font-bold mb-1">Discount Source</label>
                    <input type="text" name="discountRoomSource" id="discountRoomSource" placeholder="e.g., Corporate Offer" value={formData.discountRoomSource} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="paymentMode" className="block text-gray-700 text-sm font-bold mb-1">Payment Mode</label>
                    <div className="relative">
                      <select name="paymentMode" id="paymentMode" value={formData.paymentMode} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                        <option>Cash</option>
                        <option>Card</option>
                        <option>UPI</option>
                        <option>Bank Transfer</option>
                        <option>Cheque</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="paymentStatus" className="block text-gray-700 text-sm font-bold mb-1">Payment Status</label>
                    <div className="relative">
                      <select name="paymentStatus" id="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                        <option>Pending</option>
                        <option>Paid</option>
                        <option>Partially Paid</option>
                        <option>Refunded</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="bookingRefNo" className="block text-gray-700 text-sm font-bold mb-1">Booking Ref No.</label>
                    <input type="text" name="bookingRefNo" id="bookingRefNo" placeholder="Booking Reference No." value={formData.bookingRefNo} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="mgmtBlock" className="block text-gray-700 text-sm font-bold mb-1">Mgmt Block</label>
                    <div className="relative">
                      <select name="mgmtBlock" id="mgmtBlock" value={formData.mgmtBlock} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                        <option>No</option>
                        <option>Yes</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className={inputContainerClass + " sm:col-span-2 lg:col-span-3"}>
                    <label htmlFor="billingInstruction" className="block text-gray-700 text-sm font-bold mb-1">Billing Instruction</label>
                    <textarea name="billingInstruction" id="billingInstruction" placeholder="Any specific billing instructions" value={formData.billingInstruction} onChange={handleChange} className={inputClass + " h-24 resize-y"}></textarea>
                  </div>
                  <div className={inputContainerClass}>
                    <label htmlFor="temperature" className="block text-gray-700 text-sm font-bold mb-1">Temperature</label>
                    <input type="text" name="temperature" id="temperature" placeholder="e.g., 98.6°F" value={formData.temperature} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className={inputContainerClass + " flex flex-wrap gap-x-6 gap-y-2 mt-2"}>
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
                  <div className={inputContainerClass}>
                    <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-1">Status</label>
                    <div className="relative">
                      <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                        <option>Booked</option>
                        <option>Checked-In</option>
                        <option>Checked-Out</option>
                        <option>Cancelled</option>
                        <option>No Show</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={handlePhotoIdUpload}
                className="bg-black hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg
                           transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
                           focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                Photo ID Upload
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg
                           transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
                           focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Create Booking
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddBookingForm;