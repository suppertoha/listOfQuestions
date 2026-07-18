import baseApi from "@/shared/api/baseApi";

import type { Specialization, SpecializationResponse } from "../model/types";

export const specializationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchSpecializations: builder.query<SpecializationResponse, void>({
      query: () => ({
        url: "specializations",
        params: {
          limit: 100, 
        },
      }),
      providesTags: ["Specialization"],
    }),
  }),
  overrideExisting: false,
});

export const { useFetchSpecializationsQuery } = specializationApi;
