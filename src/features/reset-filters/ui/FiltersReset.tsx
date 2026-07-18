import { NotFoundBlock } from "@/shared/ui";
import styles from "./FiltersReset.module.scss";

interface FiltersResetProps {
  onReset: () => void;
}

export const FiltersReset = ({ onReset }: FiltersResetProps) => {
  return (
    <NotFoundBlock
      title="К сожалению, по запросу ничего не найдено"
      description="Попробуйте изменить запрос или воспользуйтесь нашими категориями"
    >
      <button type="button" className={styles.resetBtn} onClick={onReset}>
        Сбросить фильтр
      </button>
    </NotFoundBlock>
  );
};
