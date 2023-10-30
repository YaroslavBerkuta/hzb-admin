import { Lang } from "../enums";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProject {
  id: number;

  translations?: IProjectTranslates[];

  createdAt?: string;
  updatedAt?: string;
}

export interface IProjectTranslates {
  id: number;
  lang: Lang;

  name: string;
  description: string;
  projectId: number;

  createdAt?: string;
  updatedAt?: string;
}
