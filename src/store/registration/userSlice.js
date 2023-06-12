import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
} = userSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerUserRequest());
    const response = await axios.post('https://sf-final-project-be.herokuapp.com/api/auth/sign_up', userData);
    dispatch(registerUserSuccess(response.data));
  } catch (error) {
    dispatch(registerUserFailure(error.message));
  }
};

export default userSlice.reducer;
