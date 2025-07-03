import Webcam from 'react-webcam'; // Make sure to install this package: npm install react-webcam



function PhotoIdUpload() {

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

      console.error("No file selected."); // Using console.error instead of toast.error

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

    <div className="min-h-screen bg-gradient-to-br from-black to-indigo-800 flex items-center justify-center p-4 font-inter">

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

          <button className="px-6 py-3 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75">

            Photo / ID Update

          </button>

        </div>

      </div>

    </div>

  );

}



export default PhotoIdUpload;


