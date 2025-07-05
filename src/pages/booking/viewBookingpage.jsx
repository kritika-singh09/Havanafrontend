import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; // useParams को इम्पोर्ट करें
import axios from 'axios'; // axios को इम्पोर्ट करें
import toast, { Toaster } from 'react-hot-toast'; // Toaster और toast को इम्पोर्ट करें

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
} from '@heroicons/react/24/outline';

const backendURL = "https://havana-backend.vercel.app"; // आपका बैकएंड URL

const ViewBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // URL से बुकिंग ID प्राप्त करें

  const [bookingData, setBookingData] = useState(null); // अब नल से शुरू करें
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        let dataToLoad = null;

        // यदि स्टेट के माध्यम से डेटा पास किया गया है तो उसका उपयोग करें
        if (location.state && location.state.viewingData) {
          dataToLoad = location.state.viewingData;
          console.log("Loading data from location state for view page:", dataToLoad);
        } else if (id) {
          // यदि स्टेट के माध्यम से डेटा पास नहीं किया गया है, तो API से ID द्वारा प्राप्त करें
          console.log(`Fetching booking details for ID: ${id}`);
          const response = await axios.get(`${backendURL}/api/bookings/${id}`);
          dataToLoad = response.data;
          console.log("Fetched data from API:", dataToLoad);
        } else {
          // यदि कोई ID या स्टेट डेटा नहीं है
          setError("No booking ID provided or data found.");
          toast.error("No booking ID provided or data found.");
        }

        if (dataToLoad) {
          // सुनिश्चित करें कि दिनांक फ़ील्ड सही प्रारूप में हैं
          dataToLoad.checkInDate = dataToLoad.checkInDate ? new Date(dataToLoad.checkInDate).toISOString().split('T')[0] : '';
          dataToLoad.checkOutDate = dataToLoad.checkOutDate ? new Date(dataToLoad.checkOutDate).toISOString().split('T')[0] : '';
          dataToLoad.birthDate = dataToLoad.birthDate ? new Date(dataToLoad.birthDate).toISOString().split('T')[0] : '';
          dataToLoad.anniversary = dataToLoad.anniversary ? new Date(dataToLoad.anniversary).toISOString().split('T')[0] : '';

          setBookingData(dataToLoad);
        }
      } catch (err) {
        console.error("Error fetching booking details:", err);
        setError("Failed to load booking details. Please try again.");
        toast.error("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id, location.state]); // ID और location.state पर निर्भर करता है

  const handleBack = () => {
    console.log("Navigating back to /booking from ViewBookingPage."); // Added for debugging
    navigate('/booking'); // बुकिंग सूची पृष्ठ पर वापस नेविगेट करें
  };

  const renderFieldValue = (label, value) => (
    <div className="mb-3 sm:mb-4">
      <p className="block text-gray-700 text-sm sm:text-base font-semibold mb-1.5 sm:mb-2">{label}</p>
      <p className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-100 text-gray-800 rounded-lg text-sm sm:text-base shadow-sm break-words">
        {value || 'N/A'}
      </p>
    </div>
  );

  const renderImagePreview = (url, label) => {
    if (!url) return null;
    return (
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <img
          src={url}
          alt={label}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/CCCCCC/000000?text=Error"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent bg-opacity-70 flex items-end justify-center text-white text-xs font-semibold p-1.5 sm:p-2">
          {label}
        </div>
      </div>
    );
  };

  const sectionTitleClass = "text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b border-blue-200 flex items-center gap-2 sm:gap-3";
  const iconClass = "h-5 w-5 sm:h-6 sm:w-6 text-blue-500";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
        <div className="flex flex-col items-center justify-center py-10 sm:py-16 bg-white rounded-xl shadow-xl p-8">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-blue-700 mb-3 sm:mb-4"></div>
          <p className="text-base sm:text-xl text-blue-800 font-medium">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <p className="text-red-600 text-lg sm:text-xl font-semibold mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <p className="text-gray-600 text-lg sm:text-xl font-semibold mb-4">No booking data available.</p>
          <button
            onClick={handleBack}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-full mx-auto px-4 py-6 sm:px-8 sm:py-10 bg-white shadow-xl rounded-2xl w-full border border-gray-100">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-8 sm:mb-10 md:mb-12 tracking-tight drop-shadow-sm">Booking Details</h2>

        {/* Booking Details */}
        <div className="mb-6 sm:mb-8">
          <h3 className={sectionTitleClass}><DocumentTextIcon className={iconClass} />Booking Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {renderFieldValue("GRC No.", bookingData.grcNo)}
            {renderFieldValue("Check-in Date", bookingData.checkInDate ? new Date(bookingData.checkInDate).toLocaleDateString('en-GB') : 'N/A')}
            {renderFieldValue("Check-out Date", bookingData.checkOutDate ? new Date(bookingData.checkOutDate).toLocaleDateString('en-GB') : 'N/A')}
            {renderFieldValue("Days", bookingData.days)}
            {renderFieldValue("Time In", bookingData.timeIn)}
            {renderFieldValue("Time Out", bookingData.timeOut)}
          </div>
        </div>

        {/* Guest Information */}
        <div className="mb-6 sm:mb-8">
          <h3 className={sectionTitleClass}><UserIcon className={iconClass} />Guest Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {renderFieldValue("Salutation", bookingData.salutation)}
            {renderFieldValue("Full Name", bookingData.name)}
            {renderFieldValue("Age", bookingData.age)}
            {renderFieldValue("Gender", bookingData.gender)}
            {renderFieldValue("Address", bookingData.address)}
            {renderFieldValue("City", bookingData.city)}
            {renderFieldValue("Nationality", bookingData.nationality)}
            {renderFieldValue("Mobile No.", bookingData.mobileNo)}
            {renderFieldValue("Email", bookingData.email)}
            {renderFieldValue("Phone No.", bookingData.phoneNo)}
            {renderFieldValue("Birth Date", bookingData.birthDate ? new Date(bookingData.birthDate).toLocaleDateString('en-GB') : 'N/A')}
            {renderFieldValue("Anniversary", bookingData.anniversary ? new Date(bookingData.anniversary).toLocaleDateString('en-GB') : 'N/A')}
          </div>
        </div>

        {/* Company Details */}
        <div className="mb-6 sm:mb-8">
          <h3 className={sectionTitleClass}><BuildingOfficeIcon className={iconClass} />Company Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {renderFieldValue("Company Name", bookingData.companyName)}
            {renderFieldValue("Company GSTIN", bookingData.companyGSTIN)}
          </div>
        </div>

        {/* ID Proof & Documents */}
        <div className="mb-6 sm:mb-8">
          <h3 className={sectionTitleClass}><IdentificationIcon className={iconClass} />ID Proof & Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {renderFieldValue("ID Proof Type", bookingData.idProofType)}
            {renderFieldValue("ID Proof Number", bookingData.idProofNumber)}
          </div>
          <div className="mt-6 sm:mt-8">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Uploaded Documents:</h4>
            <div className="flex flex-wrap gap-3 sm:gap-5 justify-start">
              {renderImagePreview(bookingData.photoUrl, "Guest Photo")}
              {renderImagePreview(bookingData.idProofFrontUrl, "ID Front")}
              {renderImagePreview(bookingData.idProofBackUrl, "ID Back")}
              {renderImagePreview(bookingData.otherDocumentUrl, "Other Document")}
              {!bookingData.photoUrl && !bookingData.idProofFrontUrl && !bookingData.idProofBackUrl && !bookingData.otherDocumentUrl && (
                <p className="text-gray-500 italic text-sm sm:text-base">No documents uploaded.</p>
              )}
            </div>
          </div>
        </div>

        {/* Room & Rate Details */}
        <div className="mb-6 sm:mb-8">
          <h3 className={sectionTitleClass}><HomeIcon className={iconClass} />Room & Rate Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {renderFieldValue("Room No.", bookingData.roomNo)}
            {renderFieldValue("Plan/Package", bookingData.planPackage)}
            {renderFieldValue("No. of Adults", bookingData.noOfAdults)}
            {renderFieldValue("No. of Children", bookingData.noOfChildren)}
            {renderFieldValue("Rate", bookingData.rate ? `₹${bookingData.rate}` : 'N/A')}
            {renderFieldValue("Tax Included", bookingData.taxIncluded ? 'Yes' : 'No')}
            {renderFieldValue("Service Charge", bookingData.serviceCharge ? 'Yes' : 'No')}
            {renderFieldValue("Is Leader", bookingData.isLeader ? 'Yes' : 'No')}
          </div>
        </div>

        {/* Travel Details */}
        <div className="mb-6 sm:mb-8">
          <h3 className={sectionTitleClass}><GlobeAltIcon className={iconClass} />Travel Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {renderFieldValue("Arrived From", bookingData.arrivedFrom)}
            {renderFieldValue("Destination", bookingData.destination)}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-6 sm:mb-8">
          <h3 className={sectionTitleClass}><TagIcon className={iconClass} />Additional Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {renderFieldValue("Remark", bookingData.remark)}
            {renderFieldValue("Business Source", bookingData.businessSource)}
            {renderFieldValue("Market Segment", bookingData.marketSegment)}
            {renderFieldValue("Purpose of Visit", bookingData.purposeOfVisit)}
            {renderFieldValue("Discount Percent", bookingData.discountPercent ? `${bookingData.discountPercent}%` : 'N/A')}
            {renderFieldValue("Discount Room Source", bookingData.discountRoomSource)}
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-6 sm:mb-8">
          <h3 className={sectionTitleClass}><BanknotesIcon className={iconClass} />Payment Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {renderFieldValue("Payment Mode", bookingData.paymentMode)}
            {renderFieldValue("Payment Status", bookingData.paymentStatus)}
            {renderFieldValue("Booking Ref. No.", bookingData.bookingRefNo)}
          </div>
        </div>

        {/* Management & Special Settings */}
        <div className="mb-6 sm:mb-8">
          <h3 className={sectionTitleClass}><BriefcaseIcon className={iconClass} />Management & Special Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {renderFieldValue("Management Block", bookingData.mgmtBlock)}
            {renderFieldValue("VIP Guest", bookingData.vip ? 'Yes' : 'No')}
            {renderFieldValue("Booking Status", bookingData.status)}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-98 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-75 text-lg sm:text-xl tracking-wide"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBookingPage;