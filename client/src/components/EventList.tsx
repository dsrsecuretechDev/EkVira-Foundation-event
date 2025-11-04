import { useEffect, useState } from "react";
import axios from "axios";

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // https://event.ekvirafoundation.com/api/v1/event

  const fetchEvents = async (pageNo = 1, query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://event.ekvirafoundation.com/api/v1/event/?page=${pageNo}&limit=${limit}&search=${encodeURIComponent(
          query
        )}`
      );

      if (res.data.success) {
        setEvents(res.data.events);
        setTotalPages(res.data.totalPages);
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
    <div className="bg-white text-black p-4 md:p-8 max-w-7xl ">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        🎉 इव्हेंट यादी (Event List)
      </h2>
      <button onClick={handleLogout}>Logout</button>
      {/* 🔍 Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="शोधा नाव, मोबाईल, गाव, समन्वयक..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-2/3 md:w-1/2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 🧾 Responsive Table Container */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-100 text-gray-700 text-sm md:text-base">
            <tr>
              <th className="border px-2 py-2 md:px-3">#</th>
              <th className="border px-2 py-2 md:px-3">Full Name</th>
              <th className="border px-2 py-2 md:px-3">Mobile</th>
              <th className="border px-2 py-2 md:px-3">Village</th>
              <th className="border px-2 py-2 md:px-3">Coordinator</th>
              <th className="border px-2 py-2 md:px-3">Section</th>
              <th className="border px-2 py-2 md:px-3">Birth Date</th>
              <th className="border px-2 py-2 md:px-3">Instagram ID</th>
              <th className="border px-2 py-2 md:px-3">Address</th>
            </tr>
          </thead>

          <tbody className="text-gray-800 text-sm md:text-base">
            {loading ? (
              <tr>
                <td className="text-center py-6 text-gray-500">Loading...</td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td className="text-center py-6 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              events.map((event: any, index) => (
                <tr
                  key={event._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border px-2 py-2 text-center">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="border px-2 py-2 break-words">
                    {event.fullName}
                  </td>
                  <td className="border px-2 py-2">{event.mobileNumber}</td>
                  <td className="border px-2 py-2">{event.village}</td>
                  <td className="border px-2 py-2">{event.coordinatorName}</td>
                  <td className="border px-2 py-2 text-center">
                    {event.sectionName || "-"}
                  </td>
                  <td className="border px-2 py-2 text-center">
                    {event.birthDate
                      ? new Date(event.birthDate).toLocaleDateString("en-IN")
                      : "-"}
                  </td>
                  <td className="border px-2 py-2">{event.instagramId}</td>
                  <td className="border px-2 py-2 break-words">
                    {event.address}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* <div className="md:hidden mt-6 space-y-4">
        {events.map((event: any, index) => (
          <div
            key={event._id}
            className="border rounded-lg shadow-sm p-3   text-sm"
          >
            <div className="flex justify-between font-semibold">
              <span>
                {(page - 1) * limit + index + 1}. {event.fullName}
              </span>
              <span>{event.mobileNumber}</span>
            </div>
            <p className="text-gray-600 mt-1">🏡 {event.village}</p>
            <p className="text-gray-600">👤 {event.coordinatorName}</p>
            <p className="text-gray-600">
              📆{" "}
              {event.birthDate
                ? new Date(event.birthDate).toLocaleDateString("en-IN")
                : "-"}
            </p>
            <p className="text-gray-600">📸 {event.instagramId}</p>
            <p className="text-gray-600">📍 {event.address}</p>
          </div>
        ))}
      </div> */}

      {/* 🔄 Pagination */}
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
  );
};

export default EventTable;
