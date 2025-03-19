import { PasswordInput } from "@/components/ui/passwordfield/passwordField";
import { useState } from "react";
import { UsechangePasswordFormik } from "../formik/changeFormik";

export const ChangePasswordForm = () => {
    const { formik } = UsechangePasswordFormik();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    
    return (
        <form onSubmit={formik.handleSubmit} className="space-y-3">
            <PasswordInput
                label="Current Password"
                name="oldpassword"
                value={formik.values.oldpassword}
                onChange={formik.handleChange}
                showPassword={showCurrentPassword}
                toggleShowPassword={() => setShowCurrentPassword(!showCurrentPassword)}
            />
        
            {formik.errors.currentPassword && (
                <p className="text-red-500 text-sm">{formik.errors.currentPassword}</p>
            )}

            <PasswordInput
                label="New Password"
                name="newpassword"
                value={formik.values.newpassword}
                onChange={formik.handleChange}
                showPassword={showNewPassword}
                toggleShowPassword={() => setShowNewPassword(!showNewPassword)}
            />
            {formik.errors.newPassword && (
                <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
            )}

            <PasswordInput
                label="Confirm New Password"
                name="confirmpassword"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                showPassword={showConfirmPassword}
                toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            {formik.errors.confirmpassword && (
                <p className="text-red-500 text-sm">{formik.errors.confirmpassword}</p>
            )}

            <button
                type="submit"
                className="w-full bg-[#426B1F] text-white py-2 rounded-md hover:bg-green-900"
            >
                Change Password
            </button>
        </form>
    );
};
