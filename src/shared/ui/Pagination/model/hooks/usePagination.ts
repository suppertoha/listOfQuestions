import { useMemo } from "react";
import type { PaginationItem } from "../types";

interface Props {
  currentPage: number;
  totalPages: number;
}

const MIDDLE_COUNT = 6;

export const usePagination = ({ currentPage, totalPages }: Props) => {
  return useMemo<PaginationItem[]>(() => {
    if (totalPages <= MIDDLE_COUNT + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage - Math.floor(MIDDLE_COUNT / 2);
    let end = currentPage + Math.floor(MIDDLE_COUNT / 2) - 1;

    if (start < 2) {
      start = 2;
      end = start + MIDDLE_COUNT - 1;
    }

    if (end > totalPages - 1) {
      end = totalPages - 1;
      start = end - MIDDLE_COUNT + 1;
    }

    const pages: PaginationItem[] = [1];

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");

    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);
};