// // import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import React, { useRef, useState } from "react";

// const PhotoIDUpload = () => {
//   const webcamRef = useRef(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState(null);

//   // Open webcam
//   const handleStartCamera = () => {
//     setShowCamera(true);
//     setCapturedImage(null);
//     setUploadedImage(null);
//   };

//   // Take photo from webcam
//   const handleTakePhoto = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       setCapturedImage(imageSrc);
//       setShowCamera(false); // Hide webcam
//     }
//   };

//   // Upload from device
//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setUploadedImage(imageUrl);
//       setCapturedImage(null);
//       setShowCamera(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-orange-100 p-4 rounded-md shadow-md">
//       <h2 className="text-center text-xl font-bold mb-4">Photo / ID Upload</h2>

//       {/* Webcam Live View */}
//       {showCamera && (
//         <div className="mb-4">
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             className="w-full rounded-md"
//             videoConstraints={{ facingMode: "user" }}
//           />
//           <button
//             onClick={handleTakePhoto}
//             className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//           >
//             Take Photo
//           </button>
//         </div>
//       )}

//       {/* Captured or Uploaded Image Preview */}
//       {!showCamera && capturedImage && (
//         <img
//           src={capturedImage}
//           alt="Captured"
//           className="w-full rounded-md mb-4"
//         />
//       )}

//       {!showCamera && uploadedImage && (
//         <img
//           src={uploadedImage}
//           alt="Uploaded"
//           className="w-full rounded-md mb-4"
//         />
//       )}

//       {/* Buttons */}
//       {!showCamera && (
//         <div className="flex justify-between">
//           <button
//             onClick={handleStartCamera}
//             className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//           >
//             Capture
//           </button>

//           <label className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 cursor-pointer">
//             Upload
//             <input type="file" accept="image/*" onChange={handleUpload} hidden />
//           </label>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PhotoIDUpload;
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const PhotoIDUpload = () => {
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleStartCamera = () => {
    setShowCamera(true);
    setCapturedImage(null);
    setUploadedImage(null);
  };

  const handleTakePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setShowCamera(false); // close camera after capture
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setCapturedImage(null);
      setShowCamera(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-orange-100 p-4 rounded-md shadow-md mt-8">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-800">Photo / ID Upload</h2>

      {showCamera && (
        <div className="mb-4">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full rounded-md"
            videoConstraints={{ facingMode: "user" }}
          />
          <button
            onClick={handleTakePhoto}
            className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Take Photo
          </button>
        </div>
      )}

      {!showCamera && capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          className="w-full rounded-md mb-4"
        />
      )}

      {!showCamera && uploadedImage && (
        <img
          src={uploadedImage}
          alt="Uploaded"
          className="w-full rounded-md mb-4"
        />
      )}

      {!showCamera && (
        <div className="flex justify-between">
          <button
            onClick={handleStartCamera}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Capture
          </button>

          <label className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 cursor-pointer">
            Upload
            <input type="file" accept="image/*" onChange={handleUpload} hidden />
          </label>
        </div>
      )}
    </div>
  );
};

export default PhotoIDUpload;
