import { ROLES } from "../config/paths/roles";

const getUser = async () => {
	const user_type = localStorage.getItem("active-user");
	const response = await api.get(`/${user_type}/me`);
	return response.data;
};
const CookLoginWithEmailPassword = async () => {
	return api.post("/cook/login", data);
};
const AdminLoginWithEmailAndPassword = async () => {
	return api.post("/admin/login", data);
};
const UserLoginWithEmailPassword = async () => {
	return api.post("/login", data);
};
const logout = () => {
	const user_type = localStorage.getItem("active_user");
	return api.post(`/${user_type}/logout`);
};
const authConfig = {
	userFn: getUser,
	loginFn: async (data) => {
		const { role, ...rest } = data;
		switch (role) {
			case ROLES.COOK:
				return await CookLoginWithEmailPassword();
			case ROLES.USER:
				return await UserLoginWithEmailPassword();
			case ROLES.ADMIN:
				return await AdminLoginWithEmailAndPassword();
			default:
				throw new Error("Unsupported api format");
		}
	},
	registerFn: async () => Promise.resolve(null),
	logoutFn: logout,
};
