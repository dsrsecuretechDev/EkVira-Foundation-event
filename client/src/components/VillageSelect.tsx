// export default VillageSelect;
import { useState, useEffect, useMemo } from "react";

const normalizeText = (text = "") =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const VillageSelect = ({ formik }: any) => {
  const [villages, setVillages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch villages from backend
  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const res = await fetch(
          "https://event.ekvirafoundation.com/api/v1/villages"
        );
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Failed to fetch");
        setVillages(data.data);
      } catch (err) {
        console.error("Error fetching villages:", err);
        setError("गावे लोड करण्यात अडचण आली (Error loading villages)");
      } finally {
        setLoading(false);
      }
    };
    fetchVillages();
  }, []);

  // ✅ Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 250);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // ✅ Filter villages dynamically
  const filteredVillages = useMemo(() => {
    if (!debouncedSearch) return villages.slice(0, 30);
    const search = normalizeText(debouncedSearch);
    return villages
      .filter(
        (v: any) =>
          normalizeText(v.village_name_en).includes(search) ||
          normalizeText(v.village_name_mr).includes(search)
      )
      .slice(0, 30);
  }, [debouncedSearch, villages]);

  // ✅ Select village
  const handleSelect = (village: any) => {
    formik.setFieldValue("village", village._id);
    formik.setFieldTouched("village", true, true);
    setShowDropdown(false);
    setSearchTerm("");
  };

  const selectedVillage: any =
    villages.find((v: any) => v._id === formik.values.village) || null;

  return (
    <div className="relative">
      <label htmlFor="village" className="block text-sm font-medium mb-1">
        गाव
      </label>

      {/* 👇 Main box (click to open dropdown) */}
      <div
        tabIndex={0}
        onClick={() => setShowDropdown((prev) => !prev)}
        className={`w-full border rounded-md px-3 py-2 mt-1  cursor-pointer flex justify-between items-center ${
          formik.touched.village && formik.errors.village
            ? "border-red-500"
            : "border-gray-300 hover:border-[#2E005C]"
        }`}
      >
        {selectedVillage ? (
          <span>
            {selectedVillage.village_name_mr} ({selectedVillage.village_name_en}
            )
          </span>
        ) : (
          <span className="text-gray-400">गाव निवडा...</span>
        )}
        <span className="text-gray-400 text-sm">▼</span>
      </div>

      {/* ⚠️ Validation */}
      {formik.touched.village && formik.errors.village && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.village}</p>
      )}

      {/* 🧭 Dropdown */}
      {showDropdown && (
        <div className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-lg overflow-hidden">
          {/* 🔍 Search bar inside dropdown */}
          <div className="p-2 border-b bg-gray-50">
            <input
              type="text"
              placeholder="गाव शोधा..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 text-black rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E005C]"
              autoFocus
            />
          </div>

          {/* 🌀 Loading */}
          {loading && (
            <div className="p-3 text-gray-500 text-sm text-center">
              गावे लोड होत आहेत...
            </div>
          )}

          {/* ⚠️ Error */}
          {error && !loading && (
            <div className="p-3 text-red-500 text-sm text-center  border-t border-red-300">
              {error}
            </div>
          )}

          {/* ✅ List */}
          {!loading && !error && filteredVillages.length > 0 && (
            <ul className="max-h-60 overflow-y-auto text-sm scrollbar-thin">
              {filteredVillages.map((village: any) => (
                <li
                  key={village._id}
                  onMouseDown={() => handleSelect(village)}
                  className="px-3 py-2 text-black hover:bg-[#F3E8FF] cursor-pointer flex justify-between"
                >
                  <span>{village.village_name_mr}</span>
                  <span className="text-black text-xs">
                    {village.village_name_en}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* 🚫 No results */}
          {!loading && !error && filteredVillages.length === 0 && (
            <div className="p-3 text-gray-600 text-sm text-center">
              काहीही सापडले नाही
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VillageSelect;
