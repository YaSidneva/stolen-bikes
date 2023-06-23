import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  data: {}
};

const singleEmployeeSlice = createSlice({
  name: "singleEmployee",
  initialState,
  reducers: {
    singleEmployeeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    singleEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    singleEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { singleEmployeeRequest, singleEmployeeSuccess, singleEmployeeFailure } =
singleEmployeeSlice.actions;

export const getSingleEmployee = (id, token) => async (dispatch) => {
    try {
      dispatch(singleEmployeeRequest());
      const response = await axios.get(
        `https://sf-final-project-be.herokuapp.com/api/officers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(singleEmployeeSuccess(response.data));
    } catch (error) {
      dispatch(singleEmployeeFailure(error.message));
    }
  };

  export default singleEmployeeSlice.reducer;