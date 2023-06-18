import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      console.log(action);
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
    },
    loginUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
        state.token = null;
      },
  },
});

export const { loginUserRequest, loginUserSuccess, loginUserFailure, logout } =
  loginSlice.actions;

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginUserRequest());
    const response = await axios.post(
      "https://sf-final-project-be.herokuapp.com/api/auth/sign_in",
      userData
    );
    dispatch(loginUserSuccess(response.data));
  } catch (error) {
    dispatch(loginUserFailure(error.message));
  }
};

export default loginSlice.reducer;
