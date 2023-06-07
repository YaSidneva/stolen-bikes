import { configureStore } from '@reduxjs/toolkit'
import { default as autorizationReducer } from './authorization/authorizationSlice'
 
export const store = configureStore({
  reducer: {
    autorization: autorizationReducer
  },
});
