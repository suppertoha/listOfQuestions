import { QuestionListSkeleton } from "@/entities/question";
import styles from "./QuestionsBrowser.module.scss";

interface QuestionsBrowserSkeletonProps {
  isMobile?: boolean;
}

export const QuestionsBrowserSkeleton = ({
  isMobile = false,
}: QuestionsBrowserSkeletonProps) => {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.skeletonTitle} />
        {isMobile && <div className={styles.skeletonFilterButton} />}
      </div>

      <QuestionListSkeleton count={10} />

      <div className={styles.skeletonPagination} />
    </div>
  );
};
