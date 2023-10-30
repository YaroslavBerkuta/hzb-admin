/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lang } from "../enums";

export interface IProduction {
  id: number;

  translations: IProductionTranslate[];
  cover: any[];

  createdAt?: string;
  updatedAt?: string;
}

export interface IProductionTranslate {
  id: number;
  lang: Lang;
  name: string;
  data: string;
  productionId: number;
  production: IProduction;
  createdAt?: string;
  updatedAt?: string;
}
