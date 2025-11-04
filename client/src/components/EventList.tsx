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

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
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

          <span className="text-sm md:text-base text-gray-700 font-medium bg-gray-100 px-3 py-1 rounded-lg shadow-sm">
            Total Records:{" "}
            <span className="text-blue-600 font-semibold">
              {totalEvent || 0}
            </span>
          </span>

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
