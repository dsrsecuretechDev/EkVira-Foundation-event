import { useEffect, useState } from "react";
import axios from "axios";

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalEvent, setTotalEvent] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async (pageNo = 1, query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://event.ekvirafoundation.com/api/v1/event/?page=${pageNo}&limit=${limit}&search=${encodeURIComponent(
          query
        )}`
      );
      console.log(res?.data);

      if (res.data.success) {
        setEvents(res?.data?.events);
        setTotalPages(res?.data?.totalPages);
        setTotalEvent(res?.data?.totalEvent);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page, search);
  }, [page, search]);

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDownload = async () => {
    // Reset status flags before starting download
    setIsLoading(true);

    try {
      // Exponential backoff logic for retries (omitted for brevity, but recommended in production)
      const response = await fetch(
        "https://event.ekvirafoundation.com/api/v1/event/excel",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;

        try {
          const errorText = await response.text();
          if (errorText.startsWith("{")) {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorMessage;
          }
        } catch (e) {
          // Error handling for body reading/parsing failure
        }

        throw new Error(errorMessage);
      }

      // 1. Get the file data as a Blob
      const blob = await response.blob();

      // 2. Determine the filename. Default to 'event_data.xlsx'.
      let filename = "event_data.xlsx";
      const contentDisposition = response.headers.get("Content-Disposition");

      if (contentDisposition) {
        const matches =
          /filename\*?=(?:['"]?)(?:UTF-8'')?([^"']*)(?:['"]?)/i.exec(
            contentDisposition
          );
        if (matches && matches[1]) {
          filename = decodeURIComponent(matches[1].replace(/\+/g, " "));
        }
      }

      // 3. Create a temporary URL and <a> tag to trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // 4. Clean up
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };

  const formatDateTime = (isoString: any) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-white text-black p-4 md:p-8 max-w-7xl mx-auto ">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        🎉 इव्हेंट यादी (Event List)
      </h2>

      <div className="w-full px-4 sm:px-6 md:px-8">
        {/* 🔐 Logout + Search Container */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mb-6">
          {/* 🔍 Search Input */}
          <div className="w-full md:w-2/3 lg:w-1/2">
            <input
              type="text"
              placeholder="शोधा नाव, मोबाईल, गाव, समन्वयक..."
              value={search}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between rounded-xl shadow-md p-4 sm:p-6 gap-3 sm:gap-3 ">
            {/* Total Records */}
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base text-gray-600 font-medium">
                Total Records:
              </span>
              <span className="text-lg sm:text-xl text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-md">
                {totalEvent || 0}
              </span>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm
      ${
        isLoading
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg"
      }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
              5.291A7.962 7.962 0 014 12H0c0 
              3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                    />
                  </svg>
                  <span>Download Excel</span>
                </>
              )}
            </button>
          </div>

          {/* 🔐 Logout Button */}
          <div className="w-full md:w-auto flex justify-end">
            <button
              onClick={handleLogout}
              className="w-full md:w-auto bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition text-base font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* 🧾 Fixed Size Table Container with Scroll */}
      <div
        className="
          relative
          border border-gray-300
          rounded-xl
          shadow-md
          bg-white
          w-full
          max-w-full
          overflow-x-auto
          overflow-y-auto
          scrollbar-thin
          scrollbar-thumb-gray-400
          scrollbar-track-gray-100
          "
        style={{
          height: "80vh",
          minWidth: "400px",
        }}
      >
        <table className="min-w-[800px] border-collapse text-sm md:text-base">
          <thead className="bg-blue-100 text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="border px-3 py-2">Sr.No</th>
              <th className="border px-3 py-2">Full Name</th>
              <th className="border px-3 py-2">Mobile</th>
              <th className="border px-3 py-2">Village</th>
              <th className="border px-3 py-2">Coordinator</th>
              <th className="border px-3 py-2">Section</th>
              <th className="border px-3 py-2">Birth Date</th>
              <th className="border px-3 py-2">Instagram ID</th>
              <th className="border px-3 py-2">Address</th>
              <th className="border px-3 py-2">Register Time and Date</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              events.map((event: any, index) => (
                <tr
                  key={event._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border px-3 py-2 text-center">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="border px-3 py-2 break-words">
                    {event.fullName}
                  </td>
                  <td className="border px-3 py-2">{event.mobileNumber}</td>
                  <td className="border px-3 py-2">{event.village}</td>
                  <td className="border px-3 py-2">{event.coordinatorName}</td>
                  <td className="border px-3 py-2 text-center">
                    {event.sectionName || "-"}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {event.birthDate
                      ? new Date(event.birthDate).toLocaleDateString("en-IN")
                      : "-"}
                  </td>
                  <td className="border px-3 py-2 break-words">
                    {event.instagramId}
                  </td>
                  <td className="border px-3 py-2 break-words">
                    {event.address}
                  </td>
                  <td className="border px-3 py-2 break-words">
                    {formatDateTime(event.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-6 gap-3 flex-wrap">
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            ⬅ Prev
          </button>

          <span className="px-4 py-2 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventTable;
