/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lang } from "../enums";

export interface IQuality {
  id: number;
  translations: IQualityTranslate[];
  cover: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IQualityTranslate {
  id: number;
  lang: Lang;
  name: string;
  description: string;
  qualityId: number;
  quality: IQuality;

  createdAt?: string;
  updatedAt?: string;
}
