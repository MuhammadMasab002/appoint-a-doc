import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery } from "./CustomBaseQuery.js";

export const WebsiteNameApi = createApi({
  reducerPath: "api",
  baseQuery: CustomBaseQuery,
  tagTypes: ["DUMMyTAG"],
  endpoints: (builder) => ({
    // simple get dummy query
    getDummyData: builder.query({
      query: () => ({
        url: "/dummy-endpoint",
      }),
    }),
  }),
  // endpoints: EndPointMethods,
});

export const { useGetDummyDataQuery } = WebsiteNameApi;
