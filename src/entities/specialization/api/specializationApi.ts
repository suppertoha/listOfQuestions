import baseApi from "@/shared/api/baseApi";

import type { Specialization } from "../model/types";

export const specializationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchSpecializations: builder.query<{data: Specialization[]}, void>({
      query: () => "/specializations",
      providesTags: ["Specialization"],
    }),
  }),
  overrideExisting: false,
});

export const { useFetchSpecializationsQuery } = specializationApi;
