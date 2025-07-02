import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    address: '',
    city: '',
    mobile: '',
    nationality: 'Indian',
    purpose: 'Personal',
    company: '',
    idType: 'Aadhaar Card',
    idNumber: '',
    checkIn: '',
    checkOut: '',
    bookingRef: '',
    roomNo: '',
    noOfAdults: '',
    noOfChildren: '',
    rate: '',
    paymentMode: '',
    discount: '',
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Selected Image:", image);
  };

  const handleCameraClick = () => {
    navigate("/booking/photo-id-upload");
  };

  const inputClass = "w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Booking</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className={inputClass} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} className={inputClass} />
        <select name="gender" onChange={handleChange} className={inputClass}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input type="text" name="mobile" placeholder="Mobile No." onChange={handleChange} className={inputClass} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className={`${inputClass} col-span-2`} />
        <input type="text" name="city" placeholder="City" onChange={handleChange} className={inputClass} />
        <input type="text" name="nationality" value="Indian" readOnly className={inputClass} />
        <select name="purpose" onChange={handleChange} className={inputClass}>
          <option>Personal</option>
          <option>Business</option>
        </select>
        <input type="text" name="company" placeholder="Company" onChange={handleChange} className={inputClass} />
        <select name="idType" onChange={handleChange} className={inputClass}>
          <option>Aadhaar Card</option>
          <option>PAN Card</option>
          <option>Driving License</option>
        </select>
        <input type="text" name="idNumber" placeholder="ID Number" onChange={handleChange} className={inputClass} />
        <input type="date" name="checkIn" onChange={handleChange} className={inputClass} required />
        <input type="date" name="checkOut" onChange={handleChange} className={inputClass} required />
        <input type="text" name="bookingRef" placeholder="Booking Ref. No." onChange={handleChange} className={inputClass} />
        <input type="text" name="roomNo" placeholder="Room No." onChange={handleChange} className={inputClass} />
        <input type="number" name="noOfAdults" placeholder="No. of Adults" onChange={handleChange} className={inputClass} />
        <input type="number" name="noOfChildren" placeholder="No. of Children" onChange={handleChange} className={inputClass} />
        <input type="number" name="rate" placeholder="Rate" onChange={handleChange} className={inputClass} />
        <select name="paymentMode" onChange={handleChange} className={inputClass}>
          <option>Cash</option>
          <option>Card</option>
          <option>UPI</option>
        </select>
        <input type="number" name="discount" placeholder="Discount (%)" onChange={handleChange} className={inputClass} />

        <div className="col-start-2 flex justify-end gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-200"
          >
            Add Guest
          </button>
          <button
            type="button"
            onClick={handleCameraClick}
            className="bg-gray-700 text-white py-2 px-6 rounded hover:bg-gray-800 transition duration-200"
          >
            Camera
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookingForm;
