import { Link, useSearchParams } from "react-router-dom";
import styles from "./QuestionItem.module.scss";
import ArrowBottom from "@/shared/assets/icons/arrow-bottom.svg?react";
import ArrowRight from "@/shared/assets/icons/arrow-right.svg?react";
import { ROUTES } from "@/shared/config";
import type { Question } from "../../model/types";

interface QuestionItemProps {
  question: Question;
}

export const QuestionItem = ({ question }: QuestionItemProps) => {
  const [searchParams] = useSearchParams();
  const detailSearch = searchParams.toString();

  return (
    <details className={styles.root}>
      <summary className={styles.head}>
        <p className={styles.title}>{question.title}</p>
        <ArrowBottom />
      </summary>

      <div className={styles.block}>
        <ul className={styles.meta}>
          <li className={styles.tag}>
            Рейтинг: <mark>{question.rate}</mark>
          </li>
          <li className={styles.tag}>
            Сложность: <mark>{question.complexity}</mark>
          </li>
        </ul>

        {question.imageSrc && (
          <img className={styles.image} src={question.imageSrc} alt="" />
        )}

        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: question.shortAnswer || question.description }}
        />

        <Link
          to={{
            pathname: ROUTES.questionDetail(question.id),
            search: detailSearch ? `?${detailSearch}` : "",
          }}
          className={styles.goLink}
        >
          <span>Подробнее</span>
          <ArrowRight />
        </Link>
      </div>
    </details>
  );
};