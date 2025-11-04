import { useState, useEffect, useMemo } from "react";

// ✅ Normalize Marathi + English text for better search
const normalizeText = (text = "") => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

const VillageSelect = ({ formik }:any) => {
  const villages = [
    "संगमनेर शहर",
    "अकलापूर",
    "अंभोरे",
    "आनंदवाडी",
    "आंबी खालसा",
    "आंबी दुमाला",
    "आभाळवाडी",
    "आश्वी खु ",
    "आश्वी बु ",
    "उंबरी बाळापूर",
    "ओझर खु",
    "ओझर बु",
    "औरंगपुर",
    "कणसेवाडी",
    "कनकापुर",
    "कनोली",
    "करुले",
    "कर्जुले पठार",
    "कऱ्हे",
    "काकडवाडी",
    "कासारा दुमाला",
    "कासारे",
    "कुंभारवाडी",
    "कुरकुटवाडी",
    "कुरकुंडी",
    "कुरण",
    "केळेवाडी",
    "कोकणगाव",
    "कोकणेवाडी",
    "कोंची",
    "कोल्हेवाडी",
    "कोळवाडे",
    "कौठे कमळेश्वर",
    "कौठे खु.",
    "कौठे धांदरफळ",
    "कौठे बु.",
    "कौठे मलकापूर",
    "कौठेवाडी",
    "खंदरमाळवाडी",
    "खरशिंदे",
    "खराडी",
    "खळी",
    "खांजापूर",
    "खांडगाव",
    "खांडगेदरा",
    "खांबे",
    "खैरदरा",
    "गुंजाळवाडी",
    "गुंजाळवाडी (राहाणे आखाडा)",
    "गुंजाळवाडी पठार",
    "गोडसेवाडी",
    "घारगाव",
    "घुलेवाडी",
    "चंदनापुरी",
    "चनेगांव",
    "चिकणी",
    "चिखली",
    "चिंचपुर खु",
    "चिंचपुर बु",
    "चिंचोली गुरव",
    "चौधरवाडी",
    "जवळे कडलग",
    "जवळे बाळेश्वर",
    "जाखुरी",
    "जांबुत खु.",
    "जांबूत बु.",
    "जांभूळवाडी",
    "जोर्वे",
    "झरेकाठी",
    "झोळे",
    "डिग्रस",
    "डोळासणे",
    "ढोलेवाडी",
    "तळेगाव दिघे",
    "तिगाव",
    "दरेवाडी",
    "दाढ खु.",
    "देवकौठे",
    "देवगाव",
    "धांदरफळ खु",
    "धांदरफळ बु",
    "धुपे",
    "नांदुरी दुमाला",
    "नांदूर खांदरमाळ",
    "नान्नज दुमाला",
    "निंभाळे",
    "निमगाव खु.",
    "निमगांव जाळी",
    "निमगाव टेंभी",
    "निमगाव बु.",
    "निमगाव भोजापुर",
    "निमज",
    "निमोण",
    "निळवंडे",
    "पळसखेडे",
    "पानोडी",
    "पारेगाव खु.",
    "पारेगाव बु",
    "पिंपरणे",
    "पिंपळगाव कोंझिरा",
    "sangamner city",
    "Akalapur"
"Ajamapur",
"Ambhore",
"Abhalawadi",
"Aramapur",
"Ashvi Khurd",
"Ashvi Budruk",
"Ambikhalasa",
"Ambi Dumala",
"Umbari",
"Ojhar Khurd",
"Ojhar Budruk",
"Aurangapur",
"Kanasewadi",
"Kanakapur",
"Kanoli",
"Karule",
"Karjule Pathar",
"Karhe",
"Kakadawadi",
"Kasara Dumala",
"Kasare",
"Kurakutawadi",
"Kurakundi",
"Kuran",
"Kumbharawadi",
"Kelewadi",
"Kokanagaon",
"Kokanewadi",
"Kolhewadi",
"Kolavade",
"Konchi",
"Kauthe Kamaleshvar",
"Kauthe Khurd",
"Kauthe Dhandaraphal",
"Kauthe Budruk",
"Kauthe Malakapur",
"Kauthewadi",
"Kharashinde",
"Kharadi",
"Khali",
"Khanjapur",
"Khandagaon",
"Khandagedara",
"Khambe",
"Khandaramalawadi",
"Gabhanawadi",
"Gunjalawadi",
"Gunjalawadi Pathar",
"Godasewadi",
"Gharagaon",
"Ghulewadi",
"Chanegaon",
"Chikani",
"Chikhali",
"Chinchapur Khurd",
"Chinchapur Budruk",
"Chincholi Gurav",
"Chandanapuri",
"Javalekadalag",
"Javale Baleshvar",
"Jakhuri",
"Jambut Khurd",
"Jambut Budruk",
"Junegaon",
"Jorve",
"Jharekathi",
"Jhole",
"Digras",
"Dolasane",
"Dholewadi",
"Talegaon",
"Tigaon",
"Darewadi",
"Dadh Khurd",
"Devakauthe",
"Devagaon",
"Dhandaraphal Khurd",
"Dhandaraphal Budruk",
"Dhupe",
"Nannaj Dumala",
"Nandur Khandaramal",
"Nanduri Dumala",
"Nimagaon Khurd",
"Nimagaonajali",
"Nimagaon Tembhi",
"Nimagaon Budruk",
"Nimagaon Bhojapur",
"Nimaj",
"Nimon",
"Nilavande",
"Nimbale",
"Palasakhede",
"Panodi",
"Paregaon Khurd",
"Paregaon Budruk",
"Pimparane",
"Pimpalagaon Konjhira",
"Pimpalagaon Depa",
"Pimpalagaon Matha",
"Pimpale",
"Pimpri Lauki Ajamapur",
"Pemagiri",
"Pemarewadi",
"Pokhari Baleshvar",
"Pokhari Haveli",
"Pratapapur",
"Balapur",
"Bambalewadi",
"Birewadi",
"Bota",
"Borabanawadi",
"Bhojadari",
"Manoli",
"Mahalawadi",
"Maladad",
"Malunje",
"Malawadi",
"Malegaon Pathar",
"Malegaon Haveli",
"Manchi",
"Mandave Budruk",
"Mirjhapur",
"Mirapur",
"Megalawadi",
"Mendhavan",
"Mangalapur",
"Mhasavandi",
"Yelakhopawadi",
"Ranakhambawadi",
"Rahimapur",
"Rajapur",
"Rayate",
"Rayatewadi",
"Lohare",
"Vadagaonapan",
"Vadagaon Landaga",
"Vadajhari Khurd",
"Vadajhari Budruk",
"Vanakute",
"Varavandi",
"Varudi Pathar",
"Vaghapur",
"Velhale",
"Vaiduwadi",
"Shibalapur",
"Shirasagaon",
"Shirapur",
"Shivapur",
"Shindodi",
"Shedagaon",
"Shelakewadi",
"Shendewadi",
"Samanapur",
"Sakur",
"Sadatapur",
"Sayakhindi",
"Sarole Pathar",
"Savaragaon Ghule",
"Savaragaon Tal",
"Savarachol",
"Sangaoni",
"Sukewadi",
"Sonewadi",
"Sonoshi",
"Sangamaner Khurd",
"Sangamaner Budruk",
"Hasanabad",
"Hivaragaon Pathar",
"Hivaragaon Pavasa",
"Hangewadi"
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ✅ Debounce to avoid lag
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 250);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // ✅ Filter logic
  const filteredVillages = useMemo(() => {
    if (!debouncedSearch) return villages.slice(0, 30);
    const search = normalizeText(debouncedSearch);
    return villages
      .filter((v) => normalizeText(v).includes(search))
      .slice(0, 30);
  }, [debouncedSearch]);

  const handleSelect = (village:any) => {
    formik.setFieldValue("village", village);
    setSearchTerm(village);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1">गाव</label>

      {/* ✅ Search box */}
      <input
        type="text"
        name="village"
        placeholder="गाव शोधा..."
        autoComplete="off"
        value={formik.values.village || searchTerm}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          formik.setFieldValue("village", value);
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
         className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2"
      />

      {/* ✅ Dropdown list */}
      {showDropdown && filteredVillages.length > 0 && (
        <ul className="absolute z-10 w-full bg-white text-black border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {filteredVillages.map((village, index) => (
            <li
              key={index}
              onMouseDown={() => handleSelect(village)}
              className="px-3 py-2 hover:bg-[#F3E8FF] cursor-pointer text-sm"
            >
              {village}
            </li>
          ))}
        </ul>
      )}

      {/* ✅ No result */}
      {showDropdown && filteredVillages.length === 0 && (
        <div className="absolute z-10 w-full bg-white text-gray-600 border rounded-md mt-1 p-2 text-sm text-center shadow-lg">
          काहीही सापडले नाही
        </div>
      )}

      {/* ✅ Validation message */}
      {formik.touched.village && formik.errors.village && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.village}</p>
      )}
    </div>
  );
};

export default VillageSelect;
