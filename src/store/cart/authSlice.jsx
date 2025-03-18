import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
