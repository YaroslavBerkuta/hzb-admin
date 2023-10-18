/* eslint-disable @typescript-eslint/no-explicit-any */
export interface INews {
  cover: any[];
  id: number;
  createdAt?: string;
  updatedAt?: string;
  translations: INewsTranslates[];
}

export interface INewsTranslates {
  id: number;
  description: string;
  lang: string;
  name: string;
  newsId: number;
  createdAt?: string;
  updatedAt?: string;
}
