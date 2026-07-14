import styles from "./FilterQuestions.module.scss";
import Loop from "@/shared/assets/icons/loop.svg?react";
import { useFetchSpecializationsQuery } from "@/entities/specialization";
import { useFetchSkillQuery } from "@/entities/skill";
import { TagFilterGroup, FilterSkeleton } from "@/shared/ui";
import {
  COMPLEXITY_FILTERS,
  DEFAULT_SKILL_FILTERS,
  RATE_FILTERS,
  STATUS_FILTERS,
} from "@/shared/constants/constants";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useEffect, useState } from "react";

export interface FilterQuestionsProps {
  currentSpecialization: string;
  onSpecializationChange: (slug: string) => void;
  currentSkill: string | null;
  onSkillChange: (slug: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  complexity: string[];
  onComplexityToggle: (id: string) => void;
  rate: string[];
  onRateToggle: (id: string) => void;
  status: string;
  onStatusChange: (id: string) => void;
}

export const FilterQuestions = ({
  currentSpecialization,
  onSpecializationChange,
  currentSkill,
  onSkillChange,
  search,
  onSearchChange,
  complexity,
  onComplexityToggle,
  rate,
  onRateToggle,
  status,
  onStatusChange,
}: FilterQuestionsProps) => {
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync input with URL after reset
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch !== localSearch) return;
    if (debouncedSearch === search) return;
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, localSearch, onSearchChange, search]);

  const { data: specializationsResponse, isLoading: isSpecsLoading } =
    useFetchSpecializationsQuery();

  const currentSpec = specializationsResponse?.data?.find(
    (spec) => spec.slug === currentSpecialization,
  );
  const activeSpecId = currentSpec?.id;

  const defaultSpecId = specializationsResponse?.data?.[0]?.id;
  const skillsSpecId = activeSpecId ?? defaultSpecId;

  const {
    data: skillsResponse,
    isLoading: isSkillsLoading,
    isFetching: isSkillsFetching,
  } = useFetchSkillQuery(
    {
      limit: 12,
      ...(skillsSpecId ? { specializations: [skillsSpecId] } : {}),
    },
    {
      skip: isSpecsLoading,
    },
  );

  const mappedSpecializations =
    specializationsResponse?.data?.map((spec) => ({
      id: spec.slug,
      label: spec.title,
    })) ?? [];

  const mappedSkillFromApi =
    skillsResponse?.data?.map((skill) => ({
      id: String(skill.id),
      label: skill.title,
      icon: skill.imageSrc ?? undefined,
    })) ?? [];

  const mappedSkill =
    mappedSkillFromApi.length > 0 ? mappedSkillFromApi : DEFAULT_SKILL_FILTERS;

  const isSkillsLoadingState = isSkillsLoading || isSkillsFetching;

  return (
    <>
      <div className={styles.search}>
        <label>
          <Loop />
        </label>
        <input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className={styles.input}
          placeholder="Введите запрос…"
        />
      </div>

      {isSpecsLoading ? (
        <FilterSkeleton buttonsCount={5} isColumn />
      ) : (
        <TagFilterGroup
          title="Специализация"
          items={mappedSpecializations}
          selectedId={currentSpecialization}
          onSelect={(id) => onSpecializationChange(String(id))}
        />
      )}

      {isSkillsLoadingState ? (
        <FilterSkeleton buttonsCount={5} />
      ) : (
        <TagFilterGroup
          title="Навыки"
          items={mappedSkill}
          selectedId={currentSkill}
          onSelect={(id) => onSkillChange(String(id))}
        />
      )}

      <TagFilterGroup
        title="Сложность"
        items={COMPLEXITY_FILTERS}
        selectedId={complexity}
        onSelect={(id) => onComplexityToggle(String(id))}
      />

      <TagFilterGroup
        title="Рейтинг"
        items={RATE_FILTERS}
        selectedId={rate}
        onSelect={(id) => onRateToggle(String(id))}
      />
      <TagFilterGroup
        title="Статус"
        items={STATUS_FILTERS}
        selectedId={status}
        onSelect={(id) => onStatusChange(String(id))}
      />
    </>
  );
};
