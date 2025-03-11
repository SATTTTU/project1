import { useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FiLoader, FiUpload, FiFile, FiX } from "react-icons/fi";
import authimage from "../../../../assets/background1.jpg";

export const RegisterPage = () => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    passwordsizephoto: null,
    citizenshipFront: null,
    citizenshipBack: null,
    certificate: null,
    experience: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const fileInputRefs = {
    passwordsizephoto: useRef(),
    citizenshipFront: useRef(),
    citizenshipBack: useRef(),
    certificate: useRef(),
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, [fieldName]: e.dataTransfer.files[0] });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeFile = (fieldName) => {
    setFormData({ ...formData, [fieldName]: null });
    if (fileInputRefs[fieldName].current) {
      fileInputRefs[fieldName].current.value = "";
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.passwordsizephoto) newErrors.passwordsizephoto = "Required";
      if (!formData.citizenshipFront) newErrors.citizenshipFront = "Required";
      if (!formData.citizenshipBack) newErrors.citizenshipBack = "Required";
    } else if (currentStep === 3 && !formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e) => {
    if (e) e.preventDefault(); // Prevents Link from navigating automatically if event exists

    if (!validateStep(step)) return;

    if (step === 3) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/cook/underreview");
      }, 2000);
      return;
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const FileUploadField = ({ name, label, required = false }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div
          className={`border-2 border-dashed rounded-md p-4 text-center ${
            formData[name] ? "border-[#4b6c1e] bg-[#f5f8f1]" : "border-gray-300"
          }`}
          onDrop={(e) => handleDrop(e, name)}
          onDragOver={handleDragOver}
          onClick={() => fileInputRefs[name].current.click()}
        >
          {formData[name] ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiFile className="text-[#4b6c1e] mr-2" />
                <span className="text-sm text-gray-700 truncate">
                  {formData[name].name}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(name);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FiX />
              </button>
            </div>
          ) : (
            <div>
              <FiUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Drag & drop or click to upload
              </p>
            </div>
          )}
          <input
            ref={fileInputRefs[name]}
            type="file"
            name={name}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left side - Image with overlay */}
      <div className="relative hidden w-1/2 md:block">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src={authimage}
          alt="Background"
          className="object-cover h-screen"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-12">
          <h2 className="text-4xl font-bold mb-4">Hello, Friends</h2>
          <p className="text-center mb-2">Enter your Personal Details</p>
          <p className="text-center mb-8">Start your journey with us</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex flex-col py-8 overflow-y-auto">
        <div className="max-w-md mx-auto w-full px-4">
          <h1 className="text-3xl font-bold text-[#4b6c1e] mb-8">
            Sign in as Cook
          </h1>

          {/* Stepper */}
          <div className="flex items-center justify-between gap-2 pt-2 mb-8">
            {[1, 2, 3].map((num, index) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-full ${
                    step >= num
                      ? "bg-[#4b6c1e] text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {num}
                </div>
                {index < 2 && (
                  <div className="relative flex-1 h-1 mx-2">
                    <div className="absolute w-full h-full bg-gray-200 rounded"></div>
                    <div
                      className={`absolute h-full rounded ${
                        step > num
                          ? "w-full bg-[#4b6c1e]"
                          : "w-0 bg-transparent"
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Upload personal documents */}
          {step === 1 && (
            <div className="space-y-4 cursor-grab">
              <fieldset>
                <legend className="text-lg font-bold mb-4">
                  Upload your photo and documents
                </legend>
                <FileUploadField
                  name="passwordsizephoto"
                  label="Password size photo"
                  required
                />
                <FileUploadField
                  name="citizenshipFront"
                  label="Citizenship Front"
                  required
                />
                <FileUploadField
                  name="citizenshipBack"
                  label="Citizenship Back"
                  required
                />
              </fieldset>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => {}}
                  className="px-6 py-2 border cursor-not-allowed opacity-50 border-[#4b6c1e] text-[#4b6c1e] rounded"
                  disabled
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 rounded cursor-pointer bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819]"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Upload certificate and experience */}
          {step === 2 && (
            <div className="space-y-4 cursor-grab">
              <fieldset>
                <legend className="text-lg font-bold mb-4">
                  Upload your cooking certificate and share your experience
                </legend>
                <FileUploadField
                  name="certificate"
                  label="Certificate (if available)"
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Past Experience
                  </label>
                  <textarea
                    name="experience"
                    rows="4"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    placeholder="Describe your cooking experience..."
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#4b6c1e]"
                  />
                </div>
              </fieldset>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border cursor-pointer border-[#4b6c1e] text-[#4b6c1e] rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 rounded cursor-pointer bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819]"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Terms and conditions */}
          {step === 3 && (
            <div className="space-y-4 cursor-pointer">
              {/* Preview uploaded documents */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">
                  Uploaded Documents
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "passwordsizephoto",
                    "citizenshipFront",
                    "citizenshipBack",
                    "certificate",
                  ].map(
                    (field) =>
                      formData[field] && (
                        <div key={field} className="shadow-lg rounded-md p-2">
                          <p className="text-xs text-gray-500 mb-1">
                            {field === "passwordsizephoto" && "Photo"}
                            {field === "citizenshipFront" &&
                              "Citizenship (Front)"}
                            {field === "citizenshipBack" &&
                              "Citizenship (Back)"}
                            {field === "certificate" && "Certificate"}
                          </p>
                          <div className="bg-gray-100 rounded flex items-center justify-center p-2">
                            <FiFile className="text-[#4b6c1e] mr-1" />
                            <span className="text-xs truncate">
                              {formData[field].name}
                            </span>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>

              <fieldset className="mb-6">
                <legend className="text-lg font-bold mb-2">
                  Terms and Conditions
                </legend>
                <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-60 overflow-y-auto">
                  <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
                    aliquam nisl, eget ultricies nisl nisl eget nisl.
                    <br />
                    <br />
                    Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
                    aliquam nisl, eget ultricies nisl nisl eget nisl.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        termsAccepted: e.target.checked,
                      })
                    }
                  />
                  <label
                    htmlFor="termsAccepted"
                    className="text-sm font-medium"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.termsAccepted}
                  </p>
                )}
              </fieldset>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-[#4b6c1e] text-[#4b6c1e] rounded"
                >
                  Previous
                </button>
                {!isLoading ? (
                  <Link
                    to="/cook/underreview"
                    onClick={nextStep}
                    className="px-6 rounded bg-[#4b6c1e] cursor-pointer py-3 text-white transition-colors hover:bg-[#3d5819] flex items-center"
                  >
                    Submit
                  </Link>
                ) : (
                  <button
                    disabled
                    className="px-6 rounded bg-[#4b6c1e] cursor-wait py-3 text-white transition-colors hover:bg-[#3d5819] flex items-center"
                  >
                    <FiLoader className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
