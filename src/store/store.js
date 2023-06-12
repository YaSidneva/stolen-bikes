import { configureStore } from "@reduxjs/toolkit";
// import { default as autorizationReducer } from "./authorization/authorizationSlice";
import userReducer from "./registration/userSlice";
import { default as loginReducer } from "./authorization/loginSlice";

export const store = configureStore({
  reducer: {
    autorization: loginReducer,
    user: userReducer,

  },
});
