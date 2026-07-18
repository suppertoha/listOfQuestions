import { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useFetchQuestionsQuery,
  useLazyFetchQuestionsQuery,
  type QuestionParams,
} from "@/entities/question";
import { ROUTES } from "@/shared/config";

const buildListParams = (searchParams: URLSearchParams): QuestionParams => {
  const page = Number(searchParams.get("page")) || 1;
  const specialization = searchParams.get("specialization") || "";
  const skill = searchParams.get("skill") || "";
  const search = searchParams.get("search") || "";
  const complexityParam = searchParams.get("complexity") || "";
  const rateParam = searchParams.get("rate") || "";

  return {
    page,
    limit: 10,
    specializationSlug: specialization || undefined,
    skillsIdx: skill ? [skill] : undefined,
    searchValue: search || undefined,
    complexity: complexityParam
      ? complexityParam.split(",").map(Number)
      : undefined,
    rate: rateParam ? rateParam.split(",").map(Number) : undefined,
  };
};

export const useQuestionNavigation = (questionId: number) => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [searchParams] = useSearchParams();
  const listParams = useMemo(
    () => buildListParams(searchParams),
    [searchParams],
  );

  const { data } = useFetchQuestionsQuery(listParams);
  const [fetchQuestions] = useLazyFetchQuestionsQuery();

  const questions = useMemo(() => data?.data ?? [], [data?.data]);
  const currentIndex = questions.findIndex((item) => item.id === questionId);
  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;
  const isOnCurrentPage = currentIndex >= 0;

  const hasPrev =
    isOnCurrentPage && (currentIndex > 0 || (listParams.page ?? 1) > 1);

  const hasNext =
    isOnCurrentPage &&
    (currentIndex < questions.length - 1 ||
      (listParams.page ?? 1) < totalPages);

  const navigateToQuestion = useCallback(
    (id: number, page?: number) => {
      const nextParams = new URLSearchParams(searchParams);

      if (page !== undefined) {
        nextParams.set("page", String(page));
      }

      const search = nextParams.toString();

      navigate({
        pathname: ROUTES.questionDetail(id),
        search: search ? `?${search}` : "",
      });
    },
    [navigate, searchParams],
  );

  const goPrev = useCallback(async () => {
    if (!hasPrev || isNavigating) return;

    if (currentIndex > 0) {
      navigateToQuestion(questions[currentIndex - 1].id);
      return;
    }

    const currentPage = listParams.page ?? 1;
    if (currentPage > 1) {
      const prevPage = currentPage - 1;

      try {
        setIsNavigating(true);

        const result = await fetchQuestions({
          ...listParams,
          page: prevPage,
        }).unwrap();

        const prevQuestions = result.data;
        if (prevQuestions.length > 0) {
          navigateToQuestion(
            prevQuestions[prevQuestions.length - 1].id,
            prevPage,
          );
        }
      } catch (err) {
        console.error("Ошибка при навигации:", err);
        alert(
          "Не удалось загрузить следующий вопрос. Проверьте интернет-соединение.",
        );
      } finally {
        setIsNavigating(false);
      }
    }
  }, [
    hasPrev,
    currentIndex,
    isNavigating,
    listParams,
    fetchQuestions,
    questions,
    navigateToQuestion,
  ]);

  const goNext = useCallback(async () => {
    // ЗАЩИТА: Блокируем клик, если кнопка заблокирована или уже идет запрос
    if (!hasNext || isNavigating) return;

    if (currentIndex < questions.length - 1) {
      navigateToQuestion(questions[currentIndex + 1].id);
      return;
    }

    const currentPage = listParams.page ?? 1;

    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;

      try {
        setIsNavigating(true);

        const result = await fetchQuestions({
          ...listParams,
          page: nextPage,
        }).unwrap();

        const nextQuestions = result.data;

        if (nextQuestions.length > 0) {
          navigateToQuestion(nextQuestions[0].id, nextPage);
        }
      } catch (err) {
        console.error("Ошибка при навигации вперёд:", err);
        alert(
          "Не удалось загрузить следующий вопрос. Проверьте интернет-соединение.",
        );
      } finally {
        setIsNavigating(false);
      }
    }
  }, [
    hasNext,
    currentIndex,
    isNavigating,
    questions,
    listParams,
    totalPages,
    fetchQuestions,
    navigateToQuestion,
  ]);

  return { hasPrev, hasNext, goPrev, goNext, isNavigating };
};
