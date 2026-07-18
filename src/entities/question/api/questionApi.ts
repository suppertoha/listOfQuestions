import baseApi from "@/shared/api/baseApi";
import type {
  Question,
  QuestionParams,
  QuestionResponse,
} from "../model/types";
import DOMPurify from "dompurify";

const buildQuestionsQuery = (params?: QuestionParams | void) => {
  const p = (params ?? {}) as QuestionParams;

  const queryParams: Record<string, unknown> = {
    page: p.page ?? 1,
    limit: p.limit ?? 10,
  };

  if (p.specializationSlug)
    queryParams.specializationSlug = p.specializationSlug;
  if (p.skillsIdx && p.skillsIdx.length > 0) {
    queryParams.skills = p.skillsIdx.join(",");
    queryParams.skillFilterMode = "ANY";
  }
  if (p.searchValue) queryParams.titleOrDescription = p.searchValue;
  if (p.complexity && p.complexity.length > 0)
    queryParams.complexity = p.complexity.join(",");
  if (p.rate && p.rate.length > 0) queryParams.rate = p.rate.join(",");
  if (p.status) queryParams.status = p.status;

  return {
    url: "questions/public-questions",
    params: queryParams,
  };
};

export const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchQuestions: builder.query<QuestionResponse, QuestionParams | void>({
      query: (params) => buildQuestionsQuery(params),
      transformResponse: (response: QuestionResponse) => {
        if (response?.data) {
          response.data = response.data.map((question) => ({
            ...question,
            shortAnswer: DOMPurify.sanitize(question.shortAnswer),
            longAnswer: question.longAnswer
              ? DOMPurify.sanitize(question.longAnswer)
              : null,
            description: DOMPurify.sanitize(question.description),
          }));
        }
        return response;
      },

      providesTags: ["Question"],
    }),

    fetchQuestionById: builder.query<Question, number>({
      query: (id) => `questions/public-questions/${id}`,
      transformResponse: (response: Question) => {
        if (response) {
          return {
            ...response,
            shortAnswer: DOMPurify.sanitize(response.shortAnswer),
            longAnswer: response.longAnswer
              ? DOMPurify.sanitize(response.longAnswer)
              : null,
            description: DOMPurify.sanitize(response.description),
          };
        }
        return response;
      },
      providesTags: (_result, _error, id) => [{ type: "Question", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchQuestionsQuery,
  useFetchQuestionByIdQuery,
  useLazyFetchQuestionsQuery,
} = questionApi;
