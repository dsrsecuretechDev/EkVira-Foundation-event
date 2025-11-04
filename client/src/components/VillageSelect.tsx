import { useState } from "react";

const VillageSelect = ({ formik, villages }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter villages based on search
  const filteredVillages = villages.filter((v: any) =>
    v.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium">गाव</label>

      {/* Searchable input field */}
      <input
        type="text"
        name="village"
        placeholder="गाव शोधा..."
        value={formik.values.village || searchTerm}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          formik.setFieldValue("village", e.target.value);
        }}
        onBlur={() => {
          setTimeout(() => setShowDropdown(false), 100); // delay to allow selection
          // formik.handleBlur(e);
        }}
        className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2E005C]"
      />

      {/* Dropdown list */}
      {showDropdown && filteredVillages.length > 0 && (
        <ul className="absolute z-10 w-full bg-white text-black border rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
          {filteredVillages.map((v: any) => (
            <li
              key={v}
              onMouseDown={() => {
                formik.setFieldValue("village", v);
                setSearchTerm(v);
                setShowDropdown(false);
              }}
              className="px-3 py-2 hover:bg-[#F3E8FF] cursor-pointer"
            >
              {v}
            </li>
          ))}
        </ul>
      )}

      {/* Validation error */}
      {formik.touched.village && formik.errors.village && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.village}</p>
      )}
    </div>
  );
};

export default VillageSelect;
