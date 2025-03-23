import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = location.pathname.split("/").pop(); // Extract token from URL path
    const email = queryParams.get("email"); // Get email from query param

    if (token && email) {
      // Store token and email in localStorage
      localStorage.setItem("resetPasswordToken", token);
      localStorage.setItem("resetPasswordEmail", email);

      // Redirect to actual reset password page
      navigate("/reset-password");
    } else {
      console.error("Token or email missing from URL.");
    }
  }, [location, navigate]);

  return null; // This component does not render anything
};

// export default CaptureResetToken;
