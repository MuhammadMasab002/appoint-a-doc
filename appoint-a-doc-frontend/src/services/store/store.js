import { configureStore } from "@reduxjs/toolkit";
import { WebsiteNameApi } from "../api";
import authReducer from "./slices/authSlice.js";

export const store = configureStore({
  reducer: {
    [WebsiteNameApi.reducerPath]: WebsiteNameApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(WebsiteNameApi.middleware),
});
