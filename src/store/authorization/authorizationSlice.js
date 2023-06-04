import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CLIENT_ID = "a1165252-8bf2-4f9d-9200-203074b63881";

const initialState = {};

export const getUserData = createAsyncThunk("autorization/getUserData", async () => {
  try {
    const response = await axios.post(
      "https://sf-final-project-be.herokuapp.com/api/auth/sign_up",
      { email: "Ivan@gmail.com", password: "123456", "clientId": CLIENT_ID },
          );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

const autorizationSlice = createSlice({
  name: "autorization",
  initialState,
  reducers: {
    getAutorization: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export default autorizationSlice.reducer;
