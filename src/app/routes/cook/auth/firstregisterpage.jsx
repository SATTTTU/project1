// File: components/auth/RegisterPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import RegisterForm from "./RegisterForm";
import authimage from "../../../../../assets/background1.jpg";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleFormDataChange = (newData) => {
    setFormData(newData);
  };

  const handleNextStep = () => {
    window.location.href = "/cook/verification";
  };

  return (
    <AuthLayout
      image={authimage}
      title="Hello, Friends"
      subtitle={["Enter your Personal Details", "Start your journey with us"]}
      linkText="Login"
      linkUrl="/cook/login"
      mainTitle="Sign in as Cook"
    >
      <RegisterForm
        formData={formData}
        onFormDataChange={handleFormDataChange}
        onSubmit={handleNextStep}
      />
    </AuthLayout>
  );
};

export default RegisterPage;
