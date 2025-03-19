import axios from "axios";

export const fetchMenuItems = async () => {
  const response = await axios.get("/api/get-menu-item");
  return response.data.data;
};
