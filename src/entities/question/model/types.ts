export interface QuestionParams {
  page?: number;
  limit?: number;
  specializationSlug?: string;
  skillsIdx?: string[];
  searchValue?: string;
  complexity?: number[];
  rate?: number[];
}

export interface QuestionResponse {
  data: Question[];
  limit: number;
  page: number;
  total: number;
}

export interface QuestionUser {
  id: string;
  username: string;
}
export interface QuestionSkill {
  id: number;
  title: string;
  imageSrc: string | null;
}
export interface Question {
  id: number;
  title: string;
  slug: string;
  description: string;
  code: string | null;
  imageSrc: string | null;
  keywords: string[];
  longAnswer: string | null;
  shortAnswer: string;
  status: string;
  rate: number;
  complexity: number;
  createdAt: string;
  updatedAt: string;
  createdBy: QuestionUser;
  updatedBy: QuestionUser;
  questionSkills: QuestionSkill[];
}
