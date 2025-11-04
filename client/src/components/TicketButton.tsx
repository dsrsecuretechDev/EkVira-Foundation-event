import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import VillageSelect from "./VillageSelect";

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
  "पिंपळगाव देपा",
  "पिंपळगाव माथा",
  "पिंपळे",
  "पिंप्री लौकी अजमपुर",
  "पेमागिरी",
  "पेमरेवाडी",
  "पोखरी बाळेश्वर",
  "पोखरी हवेली",
  "प्रतापपूर",
  "बाळापूर",
  "बांबळेवाडी",
  "बिरेवाडी",
  "बोटा",
  "बोरबनवाडी",
  "भोजदरीा",
  "मनोली",
  "महालवाडी",
  "मालदाड",
  "मालुंजे",
  "माळवाडी",
  "मालेगाव पठार",
  "माळेगांव हवेली",
  "मांची",
  "मिर्झापूर",
  "मिरपुर",
  "मेंगाळवाडी",
  "मेंढवण",
  "मंगळापूर",
  "म्हसावंडी",
  "येळखोपावाडी",
  "रणखांबवाडी",
  "रहिमपुरा",
  "राजापूर",
  "रायते",
  "रायतेवाडी",
  "लोहारे",
  "वडगांवपान",
  "वडगांवलांडगा",
  "वडझरी खुर्द",
  "वडझरी बुद्रुक",
  "वनकुटे",
  "वरवंडी",
  "वरुडी पठार",
  "वाघापूर",
  "वेल्हाळे",
  "यशवंतनगर",
  "शिबलापुर",
  "शिरसगांव",
  "शिरापूर",
  "शिवापूर",
  "शिंदोडी",
  "शेडगाव",
  "शेळकेवाडी",
  "शेंडेवाडी",
  "समनापुर",
  "साकुर",
  "सादतपुर",
  "सायखिंडी",
  "सारोळे पठार",
  "सावरगांवघुले",
  "सावरगांवतळ",
  "सावरचोळ",
  "सांगवी",
  "सुकेवाडी",
  "सोनेवाडी",
  "सोनोशी",
  "संगमनेर खुर्द",
  "संगमनेर बुद्रुक",
  "हसनाबाद",
  "हिवरगाव पठार",
  "हिवरगाव पावसा",
  "हंगेवाडी",
];

export default function TicketButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required("पूर्ण नाव आवश्यक आहे"),
    mobileNumber: Yup.string()
      .required("मोबाइल नंबर आवश्यक आहे")
      .matches(
        /^[6-9]\d{9}$/,
        "कृपया वैध भारतीय मोबाइल नंबर टाका (10 अंकांचा असावा)"
      )
      .test(
        "no-spaces",
        "मोबाइल नंबरमध्ये स्पेस किंवा विशेष चिन्ह नसावे",
        (value) => !/[^\d]/.test(value || "")
      ),
    address: Yup.string().required("पत्ता आवश्यक आहे"),
    village: Yup.string().required("गाव आवश्यक आहे"),
    sectionName: Yup.string().optional(), // Optional
    birthDate: Yup.date()
      .required("जन्मतारीख आवश्यक आहे")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 5)),
        "वय किमान ५ वर्षे असावे"
      ),
    coordinatorName: Yup.string().optional(), // Optional
    instagramId: Yup.string().optional(),
  });

  // ✅ Base URL (replace for production)
  const baseURL = "https://event.ekvirafoundation.com/api/v1/event";

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobileNumber: "",
      address: "",
      village: "",
      sectionName: "",
      birthDate: "",
      coordinatorName: "",
      instagramId: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setApiError("");
      try {
        const response = await axios.post(baseURL, values);

        // ✅ Backend Success
        if (response.status === 200 || response.status === 201) {
          navigate("/success");
          toast.success("फॉर्म सबमिट झाला ✅");
          resetForm();
          setIsOpen(false);
        } else {
          throw new Error("अवैध प्रतिसाद, कृपया पुन्हा प्रयत्न करा.");
        }
      } catch (error: unknown) {
        console.error("❌ Error submitting form:", error);

        // ✅ Handle common error cases
        if (axios.isAxiosError(error)) {
          // 🟥 Server responded but error status (4xx / 5xx)
          const message =
            error?.response?.data?.message ||
            "सर्व्हरवरून त्रुटी आली. कृपया पुन्हा प्रयत्न करा.";
          setApiError(message);
          // } else if (error.request) {
          //   // 🟧 Request sent but no response (network)
          //   const message = "नेटवर्क समस्या आली. कृपया इंटरनेट तपासा.";
          //   setApiError(message);
          //   toast.error(`❌ ${message}`);
        } else {
          // 🟨 Other unknown error
          const message = "अज्ञात त्रुटी आली. कृपया पुन्हा प्रयत्न करा.";
          setApiError(message);
          toast.error(`❌ ${message}`);
        }
      }
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  // ✅ Optional: scroll to first error after submit
  useEffect(() => {
    if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
      const firstError = Object.keys(formik.errors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);

      if (
        element &&
        "focus" in element &&
        typeof (element as HTMLElement).focus === "function"
      ) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        (element as HTMLElement).focus();
      }
    }
  }, [formik.submitCount, formik.errors]);

  return (
    <div className="">
      {/* <div className="flex items-center justify-center transform -translate-y-10 sm:-translate-y-16 md:-translate-y-20">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white text-black  text-purple-800 font-[1000] rounded-2xl transition hover:bg-gray-400 flex items-center justify-center text-center w-[80%] sm:w-96 md:w-[28rem] lg:w-[28rem] h-20 sm:h-24 md:h-40 lg:h-60 text-xl sm:text-2xl md:text-4xl lg:text-7xl lg:font-extrabold px-4 py-2 font-NotoSans
    "
        >
          कार्यक्रम प्रवेशपत्रिका
        </button>
      </div> */}

      <div className="flex items-center justify-center transform -translate-y-10 sm:-translate-y-16 md:-translate-y-20">
        {/* Main Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="
      bg-white text-purple-900 font-extrabold 
      rounded-2xl transition hover:bg-gray-400
      flex items-center justify-center text-center
      w-[80%] sm:w-96 md:w-[28rem] lg:w-[28rem]
      h-20 sm:h-24 md:h-40 lg:h-60
      text-xl sm:text-2xl md:text-4xl lg:text-7xl
      px-4 py-2 
    "
        >
          कार्यक्रम प्रवेशपत्रिका
        </button>
      </div>

      {/* "Noto Sans", sans-serif; */}

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-[#20063b]  bg-opacity-100 text-white rounded-2xl shadow-lg p-6 w-96 relative animate-fadeIn">
            <h2 className="text-lg font-semibold mb-4 text-center">
              🎟️ कार्यक्रम प्रवेशपत्रिका
            </h2>

            <hr className="m-6" />

            {/* API Error Message */}
            {apiError && (
              <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-3 text-center">
                {apiError}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-3 text-left"
            >
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium">पूर्ण नाव</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="तुमचे पूर्ण नाव प्रविष्ट करा"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 hover:border-white-800 "
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">मोबाइल नंबर</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="१० अंकी संख्या प्रविष्ट करा"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 hover:border-white-800 "
                />
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium">पत्ता</label>
                <input
                  type="text"
                  name="address"
                  placeholder="तुमचा पत्ता प्रविष्ट करा"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2E005C]"
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.address}
                  </p>
                )}
              </div>

              <VillageSelect formik={formik} villages={villages} />

              {/* <div>
                <label className="block text-sm font-medium">गाव</label>
                <select
                  name="village"
                  value={formik.values.village}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2E005C]"
                >
                  <option className="" value="">
                    गाव निवडा
                  </option>
                  {villages.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                {formik.touched.village && formik.errors.village && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.village}
                  </p>
                )}
              </div> */}

              {formik.values.village === "संगमनेर शहर" && (
                <div>
                  <label className="block text-sm font-medium">
                    विभागाचे नाव
                  </label>
                  <select
                    name="sectionName"
                    value={formik.values.sectionName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full  border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2E005C]"
                  >
                    <option className="" value="">
                      प्रभाग निवडा (ऐच्छिक)
                    </option>
                    {[...Array(14)].map((_, i) => (
                      <option className="text-black" key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/* Birth Date */}
              <div>
                <label className="block text-sm font-medium">जन्मतारीख</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formik.values.birthDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2E005C]"
                />
                {formik.touched.birthDate && formik.errors.birthDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.birthDate}
                  </p>
                )}
              </div>

              {/* Coordinator Name */}
              <div>
                <label className="block text-sm font-medium">
                  समन्वयकाचे नाव
                </label>
                <input
                  type="text"
                  name="coordinatorName"
                  placeholder="समन्वयकाचे नाव प्रविष्ट करा"
                  value={formik.values.coordinatorName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2E005C]"
                />
                {formik.touched.coordinatorName &&
                  formik.errors.coordinatorName && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.coordinatorName}
                    </p>
                  )}
              </div>

              {/* Instagram ID */}
              <div>
                <label className="block text-sm font-medium">
                  Instagram ID
                </label>
                <input
                  type="text"
                  name="instagramId"
                  placeholder="तुमचा Instagram ID प्रविष्ट करा"
                  value={formik.values.instagramId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2E005C]"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-full text-sm bg-red-500 hover:bg-red-400"
                >
                  रद्द करा
                </button>

                <button
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty}
                  className={`px-4 py-2 rounded-full text-sm text-white ${
                    formik.isValid && formik.dirty
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  सबमिट करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
