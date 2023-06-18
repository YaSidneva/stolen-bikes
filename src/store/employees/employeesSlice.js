import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    employeesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    employeesSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    employeesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { employeesRequest, employeesSuccess, employeesFailure } =
  employeesSlice.actions;

export const getEmployees = (token) => async (dispatch) => {
  try {
    dispatch(employeesRequest());
    const response = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/officers/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(employeesSuccess(response.data));
  } catch (error) {
    dispatch(employeesFailure(error.message));
  }
};

export default employeesSlice.reducer;
