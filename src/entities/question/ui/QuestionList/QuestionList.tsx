import { QuestionItem } from "../QuestionItem/QuestionItem";
import styles from "./QuestionList.module.scss";
import type { Question } from "../../model/types";

interface QuestionListProps {
  questions: Question[];
}

export const QuestionList = ({ questions }: QuestionListProps) => {
  return (
    <div className={styles.wrapper}>
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
};