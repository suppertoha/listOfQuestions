import { FilterQuestions, useFilters } from "@/features/filter-questions";
import styles from "./QuestionsFilters.module.scss";

export const QuestionsFilters = () => {
  const {
    specialization,
    changeSpecialization,
    skill,
    changeSkill,
    search,
    changeSearch,
    complexity,
    toggleComplexity,
    rate,
    toggleRate,
    status,
    changeStatus,
  } = useFilters();
  return (
    <div className={styles.card}>
      <FilterQuestions
        currentSpecialization={specialization}
        onSpecializationChange={changeSpecialization}
        currentSkill={skill}
        onSkillChange={changeSkill}
        search={search}
        onSearchChange={changeSearch}
        complexity={complexity}
        onComplexityToggle={toggleComplexity}
        rate={rate}
        onRateToggle={toggleRate}
        status={status}
        onStatusChange={changeStatus}
      />
    </div>
  );
};
