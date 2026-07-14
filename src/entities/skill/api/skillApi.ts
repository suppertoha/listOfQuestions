import baseApi from "@/shared/api/baseApi";

import type { Skill, SkillParams } from "../model/types";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchSkill: builder.query<{data: Skill[]}, SkillParams>({
      query: (params) => ({
  url: 'skills',
  params: {
    limit: params.limit ?? 12,
    specializations: params.specializations,
  },
}),
      providesTags: ["Skills"],
    }),
  }),
  overrideExisting: false,
});

export const { useFetchSkillQuery } = skillApi;



