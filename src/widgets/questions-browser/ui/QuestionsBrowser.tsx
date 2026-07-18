import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { QuestionList, useFetchQuestionsQuery } from "@/entities/question";
import { useFetchSpecializationsQuery } from "@/entities/specialization";
import FilterButton from "@/shared/assets/icons/filter-button.svg?react";
import { useFilters } from "@/features/filter-questions";
import { FiltersReset } from "@/features/reset-filters";
import { ROUTES } from "@/shared/config";
import { Pagination } from "@/shared/ui";
import { QuestionsBrowserSkeleton } from "./QuestionsBrowserSkeleton";
import styles from "./QuestionsBrowser.module.scss";

interface QuestionsBrowserProps {
  isMobile: boolean;
  openSidebar: () => void;
}

export const QuestionsBrowser = ({
  isMobile,
  openSidebar,
}: QuestionsBrowserProps) => {
  const {
    specialization,
    skill,
    search,
    complexity,
    rate,
    page,
    changePage,
    status,
  } = useFilters();

  const { data: specializationsResponse } = useFetchSpecializationsQuery();

  const { data, error, isLoading } = useFetchQuestionsQuery({
    specializationSlug: specialization,
    skillsIdx: skill ? [skill] : undefined,
    searchValue: search,
    complexity: complexity.length > 0 ? complexity.map(Number) : undefined,
    rate: rate.length > 0 ? rate.map(Number) : undefined,
    page,
    limit: 10,
    status: status !== "all" ? status : undefined,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isLoading) {
    return <QuestionsBrowserSkeleton isMobile={isMobile} />;
  }

  if (error) {
    if ("status" in error) {
      if (error.status === 404) {
        return (
          <div className={styles.error}>
            Ошибка 404: Специализация или вопросы не найдены.
          </div>
        );
      }
      if (error.status === 500) {
        return (
          <div className={styles.error}>
            Ошибка 500: Проблема на стороне сервера. Попробуйте позже.
          </div>
        );
      }
      return (
        <div className={styles.error}>
          Произошла ошибка при загрузке: {error.status}
        </div>
      );
    }

    return (
      <div className={styles.error}>
        Сетевая ошибка. Проверьте подключение к интернету.
      </div>
    );
  }

  const questions = data.data;
  const totalPages = Math.ceil(data.total / data.limit);
  const isEmpty = questions.length === 0;

  const currentSpec = specializationsResponse?.data?.find(
    (spec) => spec.slug === specialization,
  );
  const pageTitle = specialization
    ? `Вопросы ${currentSpec?.title ?? specialization}`
    : "Вопросы";

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1 className={styles.title}>{pageTitle}</h1>
        {isMobile && (
          <button
            type="button"
            className={styles.filterButton}
            aria-label="Открыть фильтры"
            onClick={openSidebar}
          >
            <FilterButton />
          </button>
        )}
      </div>

      {isEmpty ? <FiltersReset /> : <QuestionList questions={questions} />}

      {!isEmpty && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={changePage}
        />
      )}
    </div>
  );
};
