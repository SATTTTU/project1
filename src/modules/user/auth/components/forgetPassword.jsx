import ForgetImage from "../../../../assets/forgetPasswordimg.png";
import { useForgotPasswordFormik } from "../../../../modules/user/auth/formik/forgotPasswordFormik";

export const ForgotPasswordForm = () => {
  
  const formik = useForgotPasswordFormik();

  return (
    <>
      <div className="flex-1 hidden md:block">
        <img
          src={ForgetImage}
          alt="Security illustration"
          className="w-full h-auto"
        />
      </div>

      <div className="flex-1 px-4 md:px-8">
        <h1 className="text-3xl font-semibold text-[#426B1F] mb-2">
          Forgot Password?
        </h1>
        <p className="text-gray-600 mb-8">
          Enter the email address associated with your account.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 transition-colors"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-2">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#426B1F] cursor-pointer text-white px-6 py-2 lg:px-8 lg:py-3 rounded-lg hover:bg-[#426B1F] transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
