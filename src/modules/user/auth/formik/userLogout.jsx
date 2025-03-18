import { useFormik } from "formik";
import { useUserLogout } from "../../auth/api/logout";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice"; // Redux action (if used)
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { mutate: logoutMutation } = useUserLogout();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {},
        onSubmit: () => {
            logoutMutation({}, {
                onSuccess: () => {
                    localStorage.removeItem("authToken"); // Remove token
                    dispatch(logoutUser()); // Clear Redux state (if using Redux)
                    navigate("/login"); // Redirect to login page
                },
                onError: (error) => {
                    console.error("Logout failed:", error);
                }
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <button type="submit" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-200 rounded-sm">
                <AiOutlineLogout className="mr-3 h-5 w-5" />
                Sign out
            </button>
        </form>
    );
};
