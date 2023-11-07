/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lang } from "../enums";

export interface ILabolatory {
  id: number;
  translations: ILabolatoryTranslate[];
  cover: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ILabolatoryTranslate {
  id: number;
  lang: Lang;
  name: string;
  description: string;
  labolatoryId: number;
  labolatory: ILabolatory;

  createdAt?: string;
  updatedAt?: string;
}
