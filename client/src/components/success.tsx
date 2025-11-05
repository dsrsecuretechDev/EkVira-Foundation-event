import img from "../assets/folkSuccess.png";
export default function Success() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-purple-100">
      {/* Success Message */}
      <div className="px-4 py-6">
        <span className="text-center text-base sm:text-lg md:text-xl font-extrabold text-[#2E005C] leading-relaxed max-w-3xl mx-auto">
          धन्यवाद!
        </span>
        <h6 className="text-center text-base sm:text-lg md:text-xl font-medium text-gray-800 leading-relaxed max-w-3xl mx-auto">
          आपली माहिती यशस्वीरीत्या नोंदवली गेली आहे. आमचे प्रतिनिधी लवकरच
          आपल्याशी संपर्क साधतील. <br />
          <span className="block mt-2 font-semibold text-[#2E005C]">
            आपल्या सहभागाबद्दल मनःपूर्वक आभार!
          </span>
          <span className="block mt-2 font-semibold text-[#2E005C]">
            अधिक माहितीसाठी कॉल करा:
            {/* 📞 02425-227303 / 227304 */}
            📞 <a href="tel:02425227303">02425-227303</a> /{" "}
            <a href="tel:02425227304">02425-227304</a>
          </span>
          <span className="block mt-2 font-semibold text-[#2E005C]">
            कार्यक्रमस्थळी पोहोचण्यासाठी खालील लिंकवर क्लिक करा:{" "}
            <a
              href="https://maps.app.goo.gl/KYEYdvp9uCjFBr54A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 transition-colors ml-1"
            >
              📍 Map
            </a>
          </span>
        </h6>
      </div>

      {/* Responsive Image Section */}
      <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden">
        <img
          src={img}
          // src="https://res.cloudinary.com/glide/image/fetch/f_auto,w_1200,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2FbEFajtu5MZfETQOdbsoq%2Fpub%2F6RppE3bulISTwrf8zFuM.jpeg"
          alt="The Folk Abhiyan"
          className="w-full h-auto max-h-[90vh] object-contain sm:object-cover md:object-contain"
        />
      </div>

      {/* Button Section */}
      <div className="flex justify-center py-6">
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-[#2E005C] text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium hover:bg-[#40007F] transition"
        >
          मुख्य पृष्ठावर जा
        </button>
      </div>
    </div>
  );
}
