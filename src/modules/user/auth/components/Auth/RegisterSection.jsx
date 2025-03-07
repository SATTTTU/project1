import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { InputField } from "./InputField";
import { FcGoogle } from "react-icons/fc";
import { signInSchema, signUpSchema } from "../../../../../modules/user/auth/formik/schema/authSchema";


const RegisterSection = ({ setIsSignUp }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signUpSchema),
    onSubmit: (values) => {
      console.log("Registration Data Submitted:", values);
    },
  });

  return (
    <div className={`w-1/2 p-8 transition-all duration-500`}>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto pt-30">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Create Account</h1>

        <div className="space-y-3">
          <InputField
            label="Name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
          />
          <InputField
            label="E-mail"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />
        </div>

        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-md mt-6 w-full hover:bg-green-900 transition-colors">
          Sign Up
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition-colors"
        >
          <FcGoogle className="text-xl" />
          <span className="text-gray-600">Continue with Google</span>
        </button>
      </form>
    </div>
  );
};

export default RegisterSection;
