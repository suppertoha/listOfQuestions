import { ExpertCardSkeleton } from "@/widgets/expert-card";
import styles from "./DetailedSidebarSkeleton.module.scss";

export const DetailedSidebarSkeleton = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <div className={styles.block}>
          <div className={styles.skeletonTitle} />
          <div className={styles.badges}>
            <div className={styles.skeletonBadge} />
            <div className={styles.skeletonBadge} />
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.skeletonTitle} />
          <div className={styles.badges}>
            <div className={styles.skeletonButton} />
            <div className={styles.skeletonButton} />
            <div className={styles.skeletonButton} />
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.skeletonTitle} />
          <div className={styles.badges}>
            <div className={styles.skeletonKeyword} />
            <div className={styles.skeletonKeyword} />
            <div className={styles.skeletonKeyword} />
          </div>
        </div>

        <div className={styles.skeletonAuthor} />
      </div>

      <ExpertCardSkeleton />
    </aside>
  );
};
