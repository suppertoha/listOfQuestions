import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { COMPLEXITY_FILTERS } from "./config/constants";

export const useFilters = () => {
const [searchParams, setSearchParams] = useSearchParams();
const rawPage = Math.floor(Number(searchParams.get("page"))) || 1;
const page = rawPage < 1 ? 1 : rawPage;
const specialization = searchParams.get("specialization") || "";
const skill = searchParams.get("skill") || "";
const search = searchParams.get("search") || "";
const validateArrayParam = (paramValue: string | null) => {
  if (!paramValue) return [];
  return paramValue
    .split(",")
    .filter((val) => val.trim() !== "" && !isNaN(Number(val)) && Number(val) > 0);
};

const complexity = validateArrayParam(searchParams.get("complexity"));
const rate = validateArrayParam(searchParams.get("rate"));

  const status = searchParams.get("status") || "all";

  const changePage = (newPage: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", String(newPage));
      return newParams;
    });
  };

  const changeSpecialization = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug === specialization) {
      newParams.delete("specialization");
    } else {
      newParams.set("specialization", slug);
    }
    newParams.delete("skill");
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const changeSkill = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug === skill) {
      newParams.delete("skill");
    } else {
      newParams.set("skill", slug);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const changeSearch = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (value) {
          newParams.set("search", value);
        } else {
          newParams.delete("search");
        }
        newParams.set("page", "1");
        return newParams;
      });
    },
    [setSearchParams],
  );

  const toggleComplexity = (id: string) => {
    const group = COMPLEXITY_FILTERS.find((item) => item.id === id);
    if (!group) return;

    const levels = group.values.map(Number);
    const current = (searchParams.get("complexity")?.split(",") ?? [])
      .filter(Boolean)
      .map(Number);

    const allSelected = levels.every((lvl) => current.includes(lvl));
    const updated = allSelected
      ? current.filter((lvl) => !levels.includes(lvl))
      : [...new Set([...current, ...levels])];

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (updated.length > 0) {
        newParams.set("complexity", updated.join(","));
      } else {
        newParams.delete("complexity");
      }
      newParams.set("page", "1");
      return newParams;
    });
  };

  const toggleRate = (id: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentRate = searchParams.get("rate")?.split(",") || [];

    const updatedRate = currentRate.includes(id)
      ? currentRate.filter((item) => item !== id)
      : [...currentRate, id];

    if (updatedRate.length > 0) {
      newParams.set("rate", updatedRate.join(","));
    } else {
      newParams.delete("rate");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const changeStatus = (id: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (id === "all") newParams.delete("status");
      else newParams.set("status", id);
      newParams.set("page", "1");
      return newParams;
    });
  };

  const resetFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    specialization,
    changeSpecialization,
    skill,
    changeSkill,
    changeSearch,
    search,
    toggleComplexity,
    complexity,
    toggleRate,
    rate,
    status,
    changeStatus,
    page,
    changePage,
		resetFilters,
  };
};
