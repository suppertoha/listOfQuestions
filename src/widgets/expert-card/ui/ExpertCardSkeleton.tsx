import styles from "./ExpertCardSkeleton.module.scss";

export const ExpertCardSkeleton = () => (
  <div className={styles.card}>
    <div className={styles.header}>
      <div className={styles.skeletonAvatar} />
      <div className={styles.meta}>
        <div className={styles.skeletonName} />
        <div className={styles.skeletonRole} />
      </div>
    </div>
    <div className={styles.skeletonDescription} />
    <div className={styles.socials}>
      <div className={styles.skeletonSocial} />
      <div className={styles.skeletonSocial} />
      <div className={styles.skeletonSocial} />
    </div>
  </div>
);
