import type { Question } from "@/entities/question";
import defaultImage from "@/shared/assets/images/detailsDefault.png";
import FilterButton from "@/shared/assets/icons/filter-button.svg?react";
import ArrowLeft from "@/shared/assets/icons/arrow-left.svg?react";
import ArrowRight from "@/shared/assets/icons/arrow-right.svg?react";
import styles from "./DetailedQuestionBrowser.module.scss";

interface DetailedQuestionBrowserProps {
  question: Question;
  isMobile: boolean;
  openSidebar: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  isNavigating?: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const DetailedQuestionBrowser = ({
  question,
  isMobile,
  openSidebar,
  hasPrev,
  hasNext,
  isNavigating = false,
  onPrev,
  onNext,
}: DetailedQuestionBrowserProps) => {
  return (
    <div className={styles.root}>
      <section className={styles.card}>
        <div className={styles.hero}>
          <img
            className={styles.image}
            src={question.imageSrc || defaultImage}
            alt=""
          />

          <div className={styles.heroText}>
            <div className={styles.topBlock}>
              <h1 className={styles.title}>{question.title}</h1>
              {isMobile && (
                <button
                  type="button"
                  className={styles.toggleBtn}
                  aria-label="Открыть информацию"
                  onClick={openSidebar}
                >
                  <FilterButton />
                </button>
              )}
            </div>
            <p className={styles.description}>{question.description}</p>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={onPrev}
            disabled={!hasPrev || isNavigating}
          >
            <ArrowLeft />
            <span>Предыдущий</span>
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={onNext}
            disabled={!hasNext || isNavigating}
          >
            <span>Следующий</span>
            <ArrowRight />
          </button>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Краткий ответ</h2>
        <div
          className={styles.answer}
          dangerouslySetInnerHTML={{ __html: question.shortAnswer || "" }}
        />
      </section>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Развернутый ответ</h2>
        <div
          className={styles.answer}
          dangerouslySetInnerHTML={{ __html: question.longAnswer || "" }}
        />
      </section>
    </div>
  );
};
