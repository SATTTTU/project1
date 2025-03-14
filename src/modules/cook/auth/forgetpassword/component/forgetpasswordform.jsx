import React from "react";
import { useFormik } from "formik";
import { forgotPasswordValidationSchema } from "./validationSchemas";
import EmailField from "./EmailField";

const ForgotPasswordForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: (values) => {
      onSubmit(values.email);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-6">
        <EmailField
          name="email"
          placeholder="Enter Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-[#4b6c1e] text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;