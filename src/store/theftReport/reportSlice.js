import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    reportsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    reportsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    reportsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reportsRequest, reportsSuccess, reportsFailure } =
reportsSlice.actions;

export const getReports = (token) => async (dispatch) => {
  try {
    dispatch(reportsRequest());
    const response = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/cases/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(reportsSuccess(response.data));
  } catch (error) {
    dispatch(reportsFailure(error.message));
  }
};

export const deleteReport = (id, token) => async (dispatch) => {
  axios
    .delete(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(dispatch(getReports(token)));
};

export const createReport = (data, token) => async (dispatch) => {
  axios
    .post(`https://sf-final-project-be.herokuapp.com/api/cases/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(dispatch(getReports(token)));
};

export const createReportPublic = (data) => async (dispatch) => {
    axios
      .post(`https://sf-final-project-be.herokuapp.com/api/public/report`, data)
  };

export default reportsSlice.reducer;
