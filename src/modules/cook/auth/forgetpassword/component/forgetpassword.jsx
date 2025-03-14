// ForgotPassword.jsx
import React, { useState } from 'react';
import forgetPassword from "../../../../../assets/forgetPasswordimg.png";
import { useEmailValidator } from '../schema/zodvalidation';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const { validateEmail } = useEmailValidator();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email using our validator component
    const validation = validateEmail(email);
    
    if (!validation.isValid) {
      setEmailError(validation.error);
      return;
    }
    
    // Clear any previous error
    setEmailError(null);
    
    // Proceed with form submission
    console.log('Form submitted with email:', email);
    // Here you would typically call your API
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing again
    if (emailError) setEmailError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full p-8 flex">
        <div className="flex-1 hidden md:block">
          <img
            src={forgetPassword}
            alt="Security illustration"
            className="w-full h-auto"
          />
        </div>
        
        <div className="flex-1 px-4 md:px-8">
          <h1 className="text-3xl font-semibold text-green-700 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600 mb-8">
            Enter the email address associated with your account.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter Email Address"
                className={`w-full px-4 py-3 rounded-lg border ${
                  emailError ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:border-teal-500 transition-colors`}
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <Link 
              to={"/cook/resetpassword"}
                type="submit"
                className="bg-[#4b6c1e] text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Send
              </Link >
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};