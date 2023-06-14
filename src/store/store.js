import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from "./registration/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import { default as loginReducer } from "./authorization/loginSlice";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  auth: loginReducer,
  user: userReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
