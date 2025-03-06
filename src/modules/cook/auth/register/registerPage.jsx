import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";

export const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    citizenshipFront: null,
    citizenshipBack: null,
    certificate: null,
    experience: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    if (!formData.termsAccepted) {
      setErrors({ termsAccepted: "You must accept the terms" });
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 3 && !validateStep3()) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl ">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map((num, index) => (
          <div key={num}>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-full ${
                  step > num
                    ? "bg-[#4b6c1e] text-white"
                    : step === num
                    ? "bg-[#4b6c1e] text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {num}
              </div>
              {index !== 3 && (
                <div className="relative w-12 h-1">
                  <div className="absolute w-full h-full bg-gray-300 rounded"></div>
                  <div
                    className={`absolute h-full rounded ${
                      step > num ? "w-full bg-[#4b6c1e]" : "w-0 bg-transparent"
                    }`}
                  ></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <fieldset className="mb-6">
            <legend className="text-lg font-bold mb-2">Upload Documents</legend>
            {[
              { name: "citizenshipFront", label: "Citizenship Front" },
              { name: "citizenshipBack", label: "Citizenship Back" },
              { name: "certificate", label: "Certificate (if available)" },
            ].map((file, idx) => (
              <div key={idx} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {file.label}
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    name={file.name}
                    onChange={handleFileChange}
                  />
                  <FaFileUpload className="ml-2 text-gray-500" />
                </div>
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Past Experience
              </label>
              <textarea
                name="experience"
                rows="3"
                className="w-full border rounded-lg p-2"
                onChange={handleChange}
              ></textarea>
            </div>
          </fieldset>
          <div className="flex justify-between">
            <button
              type="button"
              className="px-6 py-2 border border-[#4b6c1e] rounded-full"
              onClick={prevStep}
            >
              Previous
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-[#4b6c1e] text-white rounded-full"
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <fieldset className="mb-6">
            <legend className="text-lg font-bold mb-2">
              Terms and Conditions
            </legend>
            <p className="text-gray-600">
              Please accept the terms before proceeding.
            </p>
            <label className="flex items-center mt-3">
              <input
                type="checkbox"
                name="termsAccepted"
                onChange={() =>
                  setFormData({
                    ...formData,
                    termsAccepted: !formData.termsAccepted,
                  })
                }
              />
              <span className="ml-2">I agree to the terms and conditions.</span>
            </label>
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
            )}
          </fieldset>
          <button
            type="button"
            className="px-6 py-2 bg-[#4b6c1e] text-white rounded-full"
            onClick={nextStep}
          >
            Submit
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center">
          <h2 className="text-lg font-bold">Your request is under review...</h2>
        </div>
      )}
    </div>
  );
};
