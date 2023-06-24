import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  data: {}
};

const singleReportSlice = createSlice({
    name: "singleReport",
    initialState,
    reducers: {
        singleReportRequest: (state) => {
        state.loading = true;
        state.error = null;
      },
      singleReportSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
      singleReportFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });

export const { singleReportRequest, singleReportSuccess, singleReportFailure } =
singleReportSlice.actions;

export const getSingleReport = (id, token) => async (dispatch) => {
    try {
      dispatch(singleReportRequest());
      const response = await axios.get(
        `https://sf-final-project-be.herokuapp.com/api/cases/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(singleReportSuccess(response.data));
    } catch (error) {
      dispatch(singleReportFailure(error.message));
    }
  };

  export default singleReportSlice.reducer;