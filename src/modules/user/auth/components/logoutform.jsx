import { useFormik } from "formik";
import { useUserLogout } from "../api/logout"; // Import logout API hook
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../store/cart/authSlice"; // Redux logout action

const LogoutForm = () => {
    const { logout, isLoading, isError, error } = useUserLogout();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {},
        onSubmit: async () => {
            try {
                await logout();
                dispatch(logoutUser()); // Update Redux state
                navigate("/user/login"); // Redirect to login page
            } catch (err) {
                console.error("Logout Error:", err.message);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <button
                type="submit"
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-200 rounded-sm"
                disabled={isLoading}
            >
                {isLoading ? "Logging out..." : "Sign out"}
            </button>
            {isError && <p className="text-red-500 text-sm">{error?.message}</p>}
        </form>
    );
};

export default LogoutForm;
