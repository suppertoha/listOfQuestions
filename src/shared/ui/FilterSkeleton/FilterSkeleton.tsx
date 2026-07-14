import clsx from "clsx";
import styles from "./FilterSkeleton.module.scss";

interface FilterSkeletonProps {
  buttonsCount?: number;
  isColumn?: boolean;
}

export const FilterSkeleton = ({
  buttonsCount = 5,
  isColumn = false,
}: FilterSkeletonProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.skeletonTitle} />

      <div className={clsx(styles.wrapper, isColumn && styles.column)}>
        {Array.from({ length: buttonsCount }).map((_, index) => (
          <div key={index} className={styles.skeletonButton} />
        ))}
      </div>

      <div className={styles.skeletonToggle} />
    </div>
  );
};
