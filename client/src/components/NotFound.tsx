import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-4">
      <div className="text-center">
        {/* Large 404 text with a distinct color */}
        <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest">
          404
        </h1>

        {/* Small box for the "Page Not Found" message */}
        <div className="bg-white text-sm text-gray-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded rotate-12 shadow-md">
          Page Not Found
        </div>

        <p className="mt-5 text-xl font-medium">
          Sorry, we couldn't find the page you're looking for.
        </p>

        {/* Button to navigate back to the homepage */}
        <Link
          to="/" // Change this to your desired homepage path
          className="mt-8 inline-block px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>

      {/* Optional: Add a simple illustration or icon for visual appeal */}
      <div className="mt-10"></div>
    </div>
  );
};

export default NotFound;
