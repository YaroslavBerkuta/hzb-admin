import { Region } from "../enums/region.enum";

export interface IDistributors {
  id: number;
  key: Region;
  translations: IDistributorsTranslates[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IDistributorsTranslates {
  id: number;
  description: string;
  lang: string;
  name: string;
  distributorId: number;
  createdAt?: string;
  updatedAt?: string;
}
