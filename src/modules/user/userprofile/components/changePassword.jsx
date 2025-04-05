// import { PasswordInput } from "@/components/ui/passwordfield/passwordField";
// import { useState } from "react";

// export const ChangePasswordForm = () => {
//   const { formik } = UsechangePasswordFormi();
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   return (
//     <form onSubmit={formik.handleSubmit} className="space-y-3">
//       <PasswordInput
//         label="Current Password"
//         name="oldpassword"
//         value={formik.values.oldpassword}
//         onChange={formik.handleChange}
//         showPassword={showCurrentPassword}
//         toggleShowPassword={() => setShowCurrentPassword(!showCurrentPassword)}
//       />
//       {formik.touched.oldpassword && formik.errors.oldpassword && (
//         <p className="text-red-500 text-sm">{formik.errors.oldpassword}</p>
//       )}

//       <PasswordInput
//         label="New Password"
//         name="newpassword"
//         value={formik.values.newpassword}
//         onChange={formik.handleChange}
//         showPassword={showNewPassword}
//         toggleShowPassword={() => setShowNewPassword(!showNewPassword)}
//       />
//       {formik.touched.newpassword && formik.errors.newpassword && (
//         <p className="text-red-500 text-sm">{formik.errors.newpassword}</p>
//       )}

//       <PasswordInput
//         label="Confirm New Password"
//         name="confirmpassword"
//         value={formik.values.confirmpassword}
//         onChange={formik.handleChange}
//         showPassword={showConfirmPassword}
//         toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
//       />
//       {formik.touched.confirmpassword && formik.errors.confirmpassword && (
//         <p className="text-red-500 text-sm">{formik.errors.confirmpassword}</p>
//       )}

//       {formik.errors.submit && (
//         <p className="text-red-500 text-sm">{formik.errors.submit}</p>
//       )}

//       <button
//         type="submit"
//         className="w-full bg-[#426B1F] text-white py-2 rounded-md hover:bg-green-900"
//         disabled={formik.isSubmitting} // Disable button during submission
//       >
//         {formik.isSubmitting ? "Changing..." : "Change Password"}
//       </button>
//     </form>
//   );
// };
