export const ROUTES = {
  questions: "/",
  notFound: "/404",
  questionDetail: (id: number | string) => `/questions/${id}`,
} as const;