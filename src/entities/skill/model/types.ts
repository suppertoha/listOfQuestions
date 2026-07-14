export interface Skill {
  id: number;
  title: string;
  slug: string;
  description?: string;
  imageSrc?: string | null;
  createdAt?: string;
  updatedAt?: string;
  createdBy: null;
}

export interface SkillParams {
  limit?: number;
  specializations?: number[];
}
