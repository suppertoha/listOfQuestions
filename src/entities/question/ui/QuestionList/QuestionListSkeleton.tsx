import { QuestionItemSkeleton } from "../QuestionItem/QuestionItemSkeleton";
import styles from "./QuestionList.module.scss";

interface QuestionListSkeletonProps {
  count?: number;
}

export const QuestionListSkeleton = ({ count = 10 }: QuestionListSkeletonProps) => {
  return (
    <ul className={styles.wrapper}>
      {Array.from({ length: count }).map((_, index) => (
        <QuestionItemSkeleton key={index} />
      ))}
    </ul>
  );
};