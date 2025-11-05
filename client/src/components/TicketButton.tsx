import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import VillageSelect from "./VillageSelect";
export default function TicketButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const objectIdRegex = /^[0-9a-fA-F]{24}$/;

  // ✅ Validation schema
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
    village: Yup.string()
      .matches(objectIdRegex, "अवैध गाव आयडी (Invalid village ID)")
      .required("गाव आवश्यक आहे"),
    sectionName: Yup.string().when("village", {
      is: (village: any) => village === "6734c7f10000000000000001",
      then: (schema) => schema.required("विभागाचे नाव आवश्यक आहे"),
      otherwise: (schema) => schema.optional(),
    }),
    birthDate: Yup.date()
      .required("जन्मतारीख आवश्यक आहे")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 5)),
        "वय किमान ५ वर्षे असावे"
      ),
    coordinatorName: Yup.string().optional(),
    instagramId: Yup.string().optional(),
  });

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

        if (response.status === 200 || response.status === 201) {
          navigate("/success");
          toast.success("फॉर्म सबमिट झाला ✅");
          resetForm();
          setIsOpen(false);
        } else {
          throw new Error("अवैध प्रतिसाद, कृपया पुन्हा प्रयत्न करा.");
        }
      } catch (error) {
        console.error("❌ Error submitting form:", error);

        if (axios.isAxiosError(error)) {
          const message =
            error?.response?.data?.message ||
            "सर्व्हरवरून त्रुटी आली. कृपया पुन्हा प्रयत्न करा.";
          setApiError(message);
          toast.error(`❌ ${message}`);
        } else {
          const message = "अज्ञात त्रुटी आली. कृपया पुन्हा प्रयत्न करा.";
          setApiError(message);
          toast.error(`❌ ${message}`);
        }
      }
    },
  });

  // ✅ Scroll to first error field
  useEffect(() => {
    if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
      const firstError = Object.keys(formik.errors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      if (element && "focus" in element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        // element.focus();
      }
    }
  }, [formik.submitCount, formik.errors]);

  return (
    <div>
      {/* ✅ Main Button */}
      <div className="flex items-center justify-center transform -translate-y-10 sm:-translate-y-16 md:-translate-y-20">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white text-black font-[1000] rounded-2xl transition hover:bg-gray-400 flex items-center justify-center text-center 
          w-48 sm:w-64 md:w-60 lg:w-80 h-12 sm:h-16 md:h-12 lg:h-24 
          text-lg sm:text-xl md:text-2xl lg:text-3xl lg:font-extrabold px-4 py-2 font-NotoSans"
        >
          कार्यक्रम प्रवेशपत्रिका
        </button>
      </div>

      {/* ✅ Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2 sm:px-4">
          <div
            className="
              bg-[#20063b] text-white rounded-2xl shadow-2xl
              w-full max-w-md sm:max-w-lg md:max-w-xl 
              h-[90vh] sm:h-auto
              p-4 sm:p-6 relative overflow-y-auto
              animate-fadeIn
            "
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#20063b] pb-3 z-10">
              <h2 className="text-lg sm:text-xl font-semibold text-center">
                🎟️ कार्यक्रम प्रवेशपत्रिका
              </h2>
              <hr className="mt-3 border-gray-500" />
            </div>

            {/* Error Message */}
            {apiError && (
              <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-3 text-center">
                {apiError}
              </div>
            )}

            {/* Scrollable Form */}
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-3 text-left overflow-y-auto max-h-[70vh] pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
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
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 hover:border-white"
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium">मोबाइल नंबर</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="१० अंकी संख्या प्रविष्ट करा"
                  value={formik.values.mobileNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only digits and max 10 characters
                    if (/^\d{0,10}$/.test(value)) {
                      formik.setFieldValue("mobileNumber", value);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 hover:border-white"
                />

                {/* Validation error */}
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
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2"
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.address}
                  </p>
                )}
              </div>

              <VillageSelect formik={formik} />

              {formik.values.village === "6734c7f10000000000000001" && (
                <div>
                  <label className="block text-sm font-medium">
                    विभागाचे नाव
                  </label>
                  <select
                    name="sectionName"
                    value={formik.values.sectionName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2"
                  >
                    <option value="">प्रभाग निवडा (ऐच्छिक)</option>
                    {[...Array(15)].map((_, i) => (
                      <option className="text-black" key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  {formik.touched.sectionName && formik.errors.sectionName && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.sectionName}
                    </p>
                  )}
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
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2"
                />
                {formik.touched.birthDate && formik.errors.birthDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.birthDate}
                  </p>
                )}
              </div>

              {/* Coordinator */}
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
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2"
                />
              </div>

              {/* Instagram */}
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
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-[#20063b] pb-3">
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
