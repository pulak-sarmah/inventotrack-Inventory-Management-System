import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/types";

const name = JSON.parse(localStorage.getItem("name") || "null");

const initialState: AuthState = {
  isLoggedIn: false,
  name: name,
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state: { auth: { isLoggedIn: boolean } }) =>
  state.auth.isLoggedIn;

export const selectName = (state: { auth: { name: string } }) =>
  state.auth.name;

export const selectUser = (state: {
  auth: {
    user: {
      name: string;
      email: string;
      phone: string;
      bio: string;
      photo: string;
    };
  };
}) => state.auth.user;

export default authSlice.reducer;
