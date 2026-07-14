import { useFilters } from "@/features/filter-questions";
import { NotFoundBlock } from "@/shared/ui";
import styles from "./FiltersReset.module.scss";

export const FiltersReset = () => {
  const { resetFilters } = useFilters();

  return (
    <NotFoundBlock
      title="К сожалению, по запросу ничего не найдено"
      description="Попробуйте изменить запрос или воспользуйтесь нашими категориями"
    >
      <button type="button" className={styles.resetBtn} onClick={resetFilters}>
        Сбросить фильтр
      </button>
    </NotFoundBlock>
  );
};