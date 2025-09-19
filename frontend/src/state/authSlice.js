import { createSlice } from "@reduxjs/toolkit";

const tokenFromLocalStrg = localStorage.getItem("token");
const userFromLocalStrg = localStorage.getItem("user");



const initialState = {
    user: userFromLocalStrg ? JSON.parse(userFromLocalStrg) : null,
    token: tokenFromLocalStrg || null,
    role: localStorage.getItem("role") || "user",
    isAuthenticated: !!tokenFromLocalStrg,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user.role || "user";
            state.isAuthenticated = true;

            // Save user and token in LocalStorage 
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("role", action.payload.user.role || "user");
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;

            // Remove from LocalStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
