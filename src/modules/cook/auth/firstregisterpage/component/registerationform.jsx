// components/RegisterForm.jsx
import React, { useState } from "react";
import { useFormValidation } from "../hook/formvalidationhook";
import { registerSchema } from "../schema/zodvalidationschema";
import InputField from "./inputfield";
import PasswordField from "./passwordfield";
import { Link } from "react-router-dom";

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  
  const { 
    errors, 
    validate, 
    validateField, 
    handleFocus, 
    handleBlur 
  } = useFormValidation(registerSchema);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate field on change if it's been touched or has an error
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleFieldFocus = (e) => {
    handleFocus(e.target.name, formData);
  };

  const handleFieldBlur = (e) => {
    handleBlur(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(formData)) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Full Name"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        onFocus={handleFieldFocus}
        onBlur={handleFieldBlur}
        placeholder="Enter your full name"
        error={errors.fullname}
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onFocus={handleFieldFocus}
        onBlur={handleFieldBlur}
        placeholder="example@gmail.com"
        error={errors.email}
      />

      <PasswordField
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        onFocus={handleFieldFocus}
        onBlur={handleFieldBlur}
        placeholder="••••••••"
        error={errors.password}
      />
      <div className="pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full cursor-pointer rounded bg-[#4b6c1e] py-3 text-white transition-colors hover:bg-[#3d5819]"
        >
          Next Step
        </button>
      </div>
      <div className="flex ">Already have an account? <Link to={"/cook/login"}className="text-blue-400 underline pl-2"> login</Link></div>

    </div>
  );
};

export default RegisterForm;