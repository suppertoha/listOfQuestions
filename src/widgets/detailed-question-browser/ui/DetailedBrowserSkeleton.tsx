import styles from "./DetailedBrowserSkeleton.module.scss";

interface DetailedBrowserSkeletonProps {
  isMobile?: boolean;
}

export const DetailedBrowserSkeleton = ({
  isMobile = false,
}: DetailedBrowserSkeletonProps) => {
  return (
    <div className={styles.root}>
      <section className={styles.card}>
        <div className={styles.hero}>
          <div className={styles.skeletonImg} />
          <div className={styles.heroText}>
            <div className={styles.topBlock}>
              <div className={styles.skeletonTitle} />
              {isMobile && <div className={styles.skeletonToggleBtn} />}
            </div>
            <div className={styles.skeletonDescription} />
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.nav}>
          <div className={styles.skeletonNavBtn} />
          <div className={styles.skeletonNavBtn} />
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.skeletonAnswerTitle} />
        <div className={styles.skeletonAnswerLine} />
        <div className={styles.skeletonAnswerLine} />
        <div className={styles.skeletonAnswerLineShort} />
      </section>

      <section className={styles.card}>
        <div className={styles.skeletonAnswerTitle} />
        <div className={styles.skeletonAnswerLine} />
        <div className={styles.skeletonAnswerLine} />
        <div className={styles.skeletonAnswerLine} />
        <div className={styles.skeletonAnswerLineShort} />
      </section>
    </div>
  );
};
