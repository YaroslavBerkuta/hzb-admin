/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAwards {
  id: number;
  cover: any[];
  translations: IAwardsTranslates[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IAwardsTranslates {
  id: number;
  description: string;
  lang: string;
  name: string;
  awardId: number;
  createdAt?: string;
  updatedAt?: string;
}
