import clsx from "clsx";
import ArrowLeft from "@/shared/assets/icons/arrow-left.svg?react";
import ArrowRight from "@/shared/assets/icons/arrow-right.svg?react";
import { usePagination } from "./model/hooks/usePagination";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const paginationRange = usePagination({ currentPage, totalPages });

  if (totalPages <= 1) return null;

  return (
    <div className={styles.root}>
      <div className={styles.items}>
        <button
          type="button"
          className={styles.arrow}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Предыдущая страница"
        >
          <ArrowLeft />
        </button>

        {paginationRange.map((page, index) => (
          <button
            key={`${page}-${index}`}
            type="button"
            className={clsx(
              styles.buttonEl,
              page === currentPage && styles.active,
              page === "..." && styles.more,
            )}
            disabled={page === "..." || page === currentPage}
            onClick={() => {
              if (typeof page === "number") onPageChange(page);
            }}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className={styles.arrow}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Следующая страница"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};