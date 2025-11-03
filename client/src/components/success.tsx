export default function Success() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-purple-100">
      {/* Success Message */}
      <div className="px-4 py-6">
        <h6 className="text-center text-base sm:text-lg md:text-xl font-medium text-gray-800 leading-relaxed max-w-3xl mx-auto">
          आपली माहिती यशस्वीरीत्या नोंदवली गेली आहे. आमचे प्रतिनिधी लवकरच
          आपल्याशी संपर्क साधतील. आपल्या सहभागाबद्दल मनःपूर्वक आभार! <br />
          <span className="block mt-2 font-semibold text-[#2E005C]">
            अधिक माहितीसाठी कॉल करा: ०२४२५-२२७३०३ / २२७३०४
          </span>
        </h6>
      </div>

      {/* Responsive Image Section */}
      <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden">
        <img
          src="https://res.cloudinary.com/glide/image/fetch/f_auto,w_1200,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2FbEFajtu5MZfETQOdbsoq%2Fpub%2F6RppE3bulISTwrf8zFuM.jpeg"
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
