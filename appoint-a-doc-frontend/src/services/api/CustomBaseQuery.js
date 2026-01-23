import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logout, setCredentials } from "../store/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api", 
  credentials: "include", // if using cookies
  prepareHeaders: (headers) => headers,
});

export const CustomBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If access token expired -> try refresh
  if (result?.error?.status === 401) {
    console.log("Access token expired... Refreshing token");

    const refreshResult = await baseQuery(
      {
        url: "/auth/user/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data?.success) {
      api.dispatch(setCredentials({ user: refreshResult?.data?.user }));
    }

    // Retry original request
    result = await baseQuery(args, api, extraOptions);
  } else {
    api.dispatch(logout());
  }
  return result;
};
