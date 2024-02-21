import { Lang } from "../enums";

export interface ICategory {
  id: number;
  key: string;
  type: "c" | "sc";
  parentId?: number;
  translations: ICategoryTranslate[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ICategoryTranslate {
  id: number;
  lang: Lang;
  name: string;
  description: string;
  categoryId: number;
  category?: ICategory;
  createdAt?: string;
  updatedAt?: string;
}
