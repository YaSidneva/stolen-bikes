import { configureStore } from '@reduxjs/toolkit'
import { autorizationReducer } from './authorization/authorizationSlice'
 
export const store = configureStore({
  reducer: {
    autorization: autorizationReducer
  },
});
