import React from 'react';
import { AlertCircle } from 'lucide-react';

const TermsStep = ({ formData, setFormData, errors }) => {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Terms and Conditions</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto text-gray-700 text-sm">
        <h3 className="font-bold mb-2">Terms and Conditions Agreement</h3>
        <p className="mb-3">
          By checking the box below, you agree to be bound by the following terms and conditions:
        </p>
        <ol className="list-decimal ml-5 space-y-2">
          <li>You certify that all documents provided are authentic and accurate.</li>
          <li>You authorize the verification of any information provided.</li>
          <li>You understand that providing false information may result in rejection.</li>
          <li>You consent to the storage and processing of your personal data.</li>
          <li>You understand that your application will be reviewed and may be rejected.</li>
          <li>You agree to provide additional information if requested.</li>
          <li>You acknowledge that submission does not guarantee acceptance.</li>
          <li>You have read and understood all terms and conditions outlined herein.</li>
        </ol>
      </div>
      
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            style={{ accentColor: '#426B1F' }}
            checked={formData.termsAccepted}
            onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-medium text-gray-700">
            I have read and agree to the terms and conditions
          </label>
        </div>
      </div>
      {errors.terms && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors.terms}
        </p>
      )}
    </div>
  );
};

export default TermsStep;