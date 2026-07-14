import styles from "./QuestionItemSkeleton.module.scss";

export const QuestionItemSkeleton = () => {
  return (
    <li className={styles.item}>
      <div className={styles.row}>
        <div className={styles.title} />
        <div className={styles.icon} />
      </div>
    </li>
  );
};