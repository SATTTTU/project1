import React from 'react';

const TermsStep = ({ formik }) => {
  console.log("formik", formik)
  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto">
      {/* <pre>{JSON.stringify(formik,null,2  )}</pre> */}
      <div className="w-full bg-white p-6 rounded-lg ">
        <h2 className="text-2xl font-bold text-center mb-2">Terms and Conditions</h2>
        
        <h3 className="text-xl font-semibold text-center mb-4">Terms of Service</h3>
        
        <p className="mb-4">By checking the box below, you agree to be bound by the following terms and conditions:</p>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6 max-h-64 overflow-y-auto">
          <ol className="list-decimal pl-6 space-y-2">
            <li>You certify that all documents and information provided are true and accurate.</li>
            <li>You understand that providing false information may result in rejection of your application.</li>
            <li>You agree to maintain the confidentiality of your account information.</li>
            <li>You grant us permission to verify your documents with relevant authorities.</li>
            <li>You understand that approval of your application is at our discretion.</li>
            <li>You agree to comply with all applicable laws and regulations.</li>
            <li>You acknowledge that we may modify these terms at any time.</li>
            <li>You understand that we may terminate your account for violation of these terms.</li>
            <li>You agree to indemnify and hold us harmless from any claims arising from your use of our service.</li>
            <li>You acknowledge that you have read and understood these terms.</li>
          </ol>
        </div>
        
        <div className="flex items-center justify-center mb-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formik.values.termsAccepted}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">I have read and agree to the terms and conditions</span>
          </label>
        </div>
        
        {formik.touched.termsAccepted && formik.errors.termsAccepted && (
          <div className="text-red-500 text-sm text-center mt-1">
            {formik.errors.termsAccepted}
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsStep;