import { useNavigate } from "react-router-dom";

export const useChangeAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user_token"); 
    // localStorage.removeItem("authToken"); 
    navigate("/login"); 
  };

  return { logout };
};
