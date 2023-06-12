import { configureStore } from '@reduxjs/toolkit'
import { default as autorizationReducer } from './authorization/authorizationSlice'
import userReducer from './registration/userSlice';
 
export const store = configureStore({
  reducer: {
    autorization: autorizationReducer,
    user: userReducer,
    
  },
});
