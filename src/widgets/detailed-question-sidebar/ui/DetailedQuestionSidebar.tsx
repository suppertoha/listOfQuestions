import { useState } from "react";
import type { Question, QuestionSkill } from "@/entities/question";
import skillFallbackIcon from "@/shared/assets/images/defaultImg.svg";
import { AUTHOR_DISPLAY_NAME } from "@/shared/config/expertProfile";
import styles from "./DetailedQuestionSidebar.module.scss";

interface DetailedQuestionSidebarProps {
  question: Question;
}

interface SkillTagProps {
  skill: QuestionSkill;
}

const SkillTag = ({ skill }: SkillTagProps) => {
  const [hasError, setHasError] = useState(false);
  const iconSrc =
    skill.imageSrc && !hasError ? skill.imageSrc : skillFallbackIcon;

  return (
    <span className={styles.skill}>
      <img
        src={iconSrc}
        alt=""
        className={styles.skillIcon}
        width={20}
        height={20}
        onError={() => setHasError(true)}
      />
      {skill.title}
    </span>
  );
};

export const DetailedQuestionSidebar = ({
  question,
}: DetailedQuestionSidebarProps) => {
  return (
    <aside className={styles.card}>
      <div className={styles.block}>
        <p className={styles.label}>Уровень:</p>
        <div className={styles.badges}>
          <span className={styles.badge}>
            Сложность: <mark>{question.complexity}</mark>
          </span>
          <span className={styles.badge}>
            Рейтинг: <mark>{question.rate}</mark>
          </span>
        </div>
      </div>

      {question.questionSkills.length > 0 && (
        <div className={styles.block}>
          <p className={styles.label}>Навыки:</p>
          <div className={styles.skills}>
            {question.questionSkills.map((skill) => (
              <SkillTag key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {question.keywords.length > 0 && (
        <div className={styles.block}>
          <p className={styles.label}>Ключевые слова:</p>
          <div className={styles.keywords}>
            {question.keywords.map((word) => (
              <span key={word} className={styles.keyword}>
                #{word}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className={styles.author}>
        <span className={styles.authorLabel}>Автор: </span>
        <span className={styles.authorName}>{AUTHOR_DISPLAY_NAME}</span>
      </p>
    </aside>
  );
};
