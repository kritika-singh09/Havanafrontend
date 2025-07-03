
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Import Heroicons for better UI
import {
    CalendarIcon,
    ClockIcon,
    UserIcon,
    BuildingOfficeIcon,
    IdentificationIcon,
    WalletIcon,
    HomeIcon,
    ChevronDownIcon, // For selects
    GlobeAltIcon, // For nationality
    PhoneIcon,
    EnvelopeIcon,
    CakeIcon, // For birthday
    SparklesIcon, // For anniversary
    CurrencyRupeeIcon, // For rate
    CheckBadgeIcon, // For status
    DocumentTextIcon, // For GRC No, Booking Ref No
    MapPinIcon, // For City, Arrived From, Destination
    ChartBarIcon, // For Market Segment
    BriefcaseIcon, // For Business Source
    QuestionMarkCircleIcon, // For Purpose of Visit
    TagIcon, // For Discount
    BanknotesIcon, // For Payment Mode/Status
    BuildingStorefrontIcon, // For Company GSTIN
    MegaphoneIcon, // For Billing Instruction
    SunIcon, // For Temperature
    ComputerDesktopIcon, // For EPABX
    StarIcon // For VIP
} from '@heroicons/react/24/outline';


const EditBookingForm = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const editingData = location.state?.editingData;

    const [formData, setFormData] = useState(editingData || null);

    useEffect(() => {
        if (!editingData) {
            // Using a custom modal/message box instead of alert()
            // For this example, we'll just log and navigate.
            // In a real app, you'd render a modal component.
            console.error("No booking data provided for editing. Navigating back.");
            navigate("/booking");
        }
    }, [editingData, navigate]);

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
            await axios.put(
                `https://havana-backend.vercel.app/api/bookings/${formData._id}`,
                formData
            );
            // Using a custom modal/message box instead of alert()
            console.log("Booking updated successfully!"); // Log success
            navigate("/booking");
        } catch (error) {
            console.error("Update failed", error);
            // Using a custom modal/message box instead of alert()
            console.error("Failed to update booking."); // Log error
        }
    };

    // Styling classes for consistent look and responsiveness
    const sectionTitleClass = "text-xl font-semibold text-gray-700 mb-3 border-b pb-2 border-gray-300 flex items-center gap-2";
    const inputContainerClass = ""; // Will use gap on inner grid instead of mb
    const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500";
    const checkboxLabelClass = "flex items-center gap-2 text-gray-700 font-medium";
    const iconClass = "h-5 w-5 text-gray-500";
    const labelClass = "block text-gray-700 text-sm font-bold mb-1"; // Reduced mb-2 to mb-1

    if (!formData) return <div className="p-4 text-center text-lg font-medium text-gray-600">Loading booking details...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 bg-white shadow-lg rounded-xl font-sans">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-8 tracking-wide">Edit Booking</h2>
            <form onSubmit={handleSubmit} className="space-y-6"> {/* Main vertical spacing */}

                {/* Booking Details and Guest Information (Paired in two columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {/* Booking Details */}
                    <div>
                        <h3 className={sectionTitleClass}><DocumentTextIcon className={iconClass} />Booking Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className={inputContainerClass}>
                                <label htmlFor="grcNo" className={labelClass}>GRC No.</label>
                                <input type="text" name="grcNo" id="grcNo" value={formData.grcNo} placeholder="GRC No" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="checkInDate" className={labelClass}>Check-in Date</label>
                                <input type="date" name="checkInDate" id="checkInDate" value={formData.checkInDate} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="checkOutDate" className={labelClass}>Check-out Date</label>
                                <input type="date" name="checkOutDate" id="checkOutDate" value={formData.checkOutDate} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="days" className={labelClass}>Days</label>
                                <input type="number" name="days" id="days" value={formData.days} placeholder="Days" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="timeIn" className={labelClass}>Time In</label>
                                <input type="text" name="timeIn" id="timeIn" value={formData.timeIn} placeholder="Time In" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="timeOut" className={labelClass}>Time Out</label>
                                <input type="text" name="timeOut" id="timeOut" value={formData.timeOut} placeholder="Time Out" onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div>
                        <h3 className={sectionTitleClass}><UserIcon className={iconClass} />Guest Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className={inputContainerClass}>
                                <label htmlFor="salutation" className={labelClass}>Salutation</label>
                                <input type="text" name="salutation" id="salutation" value={formData.salutation} placeholder="Salutation" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="name" className={labelClass}>Full Name</label>
                                <input type="text" name="name" id="name" value={formData.name} placeholder="Full Name" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="age" className={labelClass}>Age</label>
                                <input type="number" name="age" id="age" value={formData.age} placeholder="Age" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className="relative">
                                <label htmlFor="gender" className={labelClass}>Gender</label>
                                <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className={inputContainerClass + " sm:col-span-2 lg:col-span-1"}>
                                <label htmlFor="address" className={labelClass}>Address</label>
                                <input type="text" name="address" id="address" value={formData.address} placeholder="Address" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="city" className={labelClass}>City</label>
                                <input type="text" name="city" id="city" value={formData.city} placeholder="City" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className="relative">
                                <label htmlFor="nationality" className={labelClass}>Nationality</label>
                                <input type="text" name="nationality" id="nationality" value={formData.nationality} readOnly className={inputClass + " bg-gray-100 cursor-not-allowed"} />
                                <GlobeAltIcon className="absolute right-3 top-1/2 translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="mobileNo" className={labelClass}>Mobile No.</label>
                                <input type="text" name="mobileNo" id="mobileNo" value={formData.mobileNo} placeholder="Mobile No." onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="email" className={labelClass}>Email</label>
                                <input type="email" name="email" id="email" value={formData.email} placeholder="Email" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="phoneNo" className={labelClass}>Phone No.</label>
                                <input type="text" name="phoneNo" id="phoneNo" value={formData.phoneNo} placeholder="Phone No." onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="birthDate" className={labelClass}>Birth Date</label>
                                <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="anniversary" className={labelClass}>Anniversary</label>
                                <input type="date" name="anniversary" id="anniversary" value={formData.anniversary} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company & ID Info (Paired in two columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {/* Company Details */}
                    <div>
                        <h3 className={sectionTitleClass}><BuildingOfficeIcon className={iconClass} />Company Details</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className={inputContainerClass}>
                                <label htmlFor="companyName" className={labelClass}>Company Name</label>
                                <input type="text" name="companyName" id="companyName" value={formData.companyName} placeholder="Company Name" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="companyGSTIN" className={labelClass}>Company GSTIN</label>
                                <input type="text" name="companyGSTIN" id="companyGSTIN" value={formData.companyGSTIN} placeholder="Company GSTIN" onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </div>

                    {/* ID Proof */}
                    <div>
                        <h3 className={sectionTitleClass}><IdentificationIcon className={iconClass} />ID Proof</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                                <label htmlFor="idProofType" className={labelClass}>ID Proof Type</label>
                                <select name="idProofType" id="idProofType" value={formData.idProofType} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                                    <option>Aadhaar Card</option>
                                    <option>PAN Card</option>
                                    <option>Driving License</option>
                                    <option>Passport</option>
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="idProofNumber" className={labelClass}>ID Number</label>
                                <input type="text" name="idProofNumber" id="idProofNumber" value={formData.idProofNumber} placeholder="ID Number" onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Room & Rate Details and Travel & Purpose (Paired in two columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {/* Room & Rate Details */}
                    <div>
                        <h3 className={sectionTitleClass}><HomeIcon className={iconClass} />Room & Rate Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className={inputContainerClass}>
                                <label htmlFor="roomNo" className={labelClass}>Room No.</label>
                                <input type="text" name="roomNo" id="roomNo" value={formData.roomNo} placeholder="Room No." onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="planPackage" className={labelClass}>Plan Package</label>
                                <input type="text" name="planPackage" id="planPackage" value={formData.planPackage} placeholder="Plan Package" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="noOfAdults" className={labelClass}>No. of Adults</label>
                                <input type="number" name="noOfAdults" id="noOfAdults" value={formData.noOfAdults} placeholder="No. of Adults" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="noOfChildren" className={labelClass}>No. of Children</label>
                                <input type="number" name="noOfChildren" id="noOfChildren" value={formData.noOfChildren} placeholder="No. of Children" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="rate" className={labelClass}>Rate</label>
                                <input type="number" name="rate" id="rate" value={formData.rate} placeholder="Rate" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass + " sm:col-span-2 flex flex-wrap gap-x-6 gap-y-2 mt-2"}>
                                <label htmlFor="taxIncluded" className={checkboxLabelClass}>
                                    <input type="checkbox" name="taxIncluded" id="taxIncluded" checked={formData.taxIncluded} onChange={handleChange} className="mr-1" />
                                    Tax Included
                                </label>
                                <label htmlFor="serviceCharge" className={checkboxLabelClass}>
                                    <input type="checkbox" name="serviceCharge" id="serviceCharge" checked={formData.serviceCharge} onChange={handleChange} className="mr-1" />
                                    Service Charge
                                </label>
                                <label htmlFor="isLeader" className={checkboxLabelClass}>
                                    <input type="checkbox" name="isLeader" id="isLeader" checked={formData.isLeader} onChange={handleChange} className="mr-1" />
                                    Is Leader
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Travel & Purpose */}
                    <div>
                        <h3 className={sectionTitleClass}><WalletIcon className={iconClass} />Travel & Purpose</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className={inputContainerClass}>
                                <label htmlFor="arrivedFrom" className={labelClass}>Arrived From</label>
                                <input type="text" name="arrivedFrom" id="arrivedFrom" value={formData.arrivedFrom} placeholder="Arrived From" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="destination" className={labelClass}>Destination</label>
                                <input type="text" name="destination" id="destination" value={formData.destination} placeholder="Destination" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="remark" className={labelClass}>Remark</label>
                                <input type="text" name="remark" id="remark" value={formData.remark} placeholder="Remark" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="businessSource" className={labelClass}>Business Source</label>
                                <input type="text" name="businessSource" id="businessSource" value={formData.businessSource} placeholder="Business Source" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="marketSegment" className={labelClass}>Market Segment</label>
                                <input type="text" name="marketSegment" id="marketSegment" value={formData.marketSegment} placeholder="Market Segment" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="purposeOfVisit" className={labelClass}>Purpose of Visit</label>
                                <input type="text" name="purposeOfVisit" id="purposeOfVisit" value={formData.purposeOfVisit} placeholder="Purpose of Visit" onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment & Discount (Full width section for better layout of many fields) */}
                <div className="grid grid-cols-1 gap-y-4">
                    <div>
                        <h3 className={sectionTitleClass}><BanknotesIcon className={iconClass} />Payment & Miscellaneous</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className={inputContainerClass}>
                                <label htmlFor="discountPercent" className={labelClass}>Discount (%)</label>
                                <input type="number" name="discountPercent" id="discountPercent" value={formData.discountPercent} placeholder="Discount (%)" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="discountRoomSource" className={labelClass}>Discount Room Source</label>
                                <input type="number" name="discountRoomSource" id="discountRoomSource" value={formData.discountRoomSource} placeholder="Discount Room Source" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className="relative">
                                <label htmlFor="paymentMode" className={labelClass}>Payment Mode</label>
                                <select name="paymentMode" id="paymentMode" value={formData.paymentMode} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                                    <option>Cash</option>
                                    <option>Card</option>
                                    <option>UPI</option>
                                    <option>Bank Transfer</option>
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <label htmlFor="paymentStatus" className={labelClass}>Payment Status</label>
                                <select name="paymentStatus" id="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                                    <option>Pending</option>
                                    <option>Paid</option>
                                    <option>Partial</option>
                                    <option>Failed</option>
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="bookingRefNo" className={labelClass}>Booking Ref No.</label>
                                <input type="text" name="bookingRefNo" id="bookingRefNo" value={formData.bookingRefNo} placeholder="Booking Ref No." onChange={handleChange} className={inputClass} />
                            </div>
                            <div className="relative">
                                <label htmlFor="mgmtBlock" className={labelClass}>Management Block</label>
                                <select name="mgmtBlock" id="mgmtBlock" value={formData.mgmtBlock} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                                    <option>No</option>
                                    <option>Yes</option>
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className={inputContainerClass + " sm:col-span-2 lg:col-span-2"}>
                                <label htmlFor="billingInstruction" className={labelClass}>Billing Instruction</label>
                                <input type="text" name="billingInstruction" id="billingInstruction" value={formData.billingInstruction} placeholder="Billing Instruction" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass}>
                                <label htmlFor="temperature" className={labelClass}>Temperature (°C)</label>
                                <input type="number" name="temperature" id="temperature" value={formData.temperature} placeholder="Temperature" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className={inputContainerClass + " sm:col-span-2 lg:col-span-2 flex flex-wrap gap-x-6 gap-y-2"}>
                            
                                <label htmlFor="vip" className={checkboxLabelClass}>
                                    <input type="checkbox" name="vip" id="vip" checked={formData.vip} onChange={handleChange} className="mr-1" />
                                    VIP
                                </label>
                            </div>
                            <div className="relative">
                                <label htmlFor="status" className={labelClass}>Status</label>
                                <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass + " appearance-none pr-8"}>
                                    <option>Booked</option>
                                    <option>Checked In</option>
                                    <option>Checked Out</option>
                                    <option>Cancelled</option>
                                </select>
                                <CheckBadgeIcon className="absolute right-3 top-1/2 translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="col-span-full flex justify-center mt-6 gap-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md tracking-wider text-lg"
                    >
                        Update Booking
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/booking")}
                        className="bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-md tracking-wider text-lg"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBookingForm;
