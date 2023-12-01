import { Lang } from "../enums";

export interface IPartner {
  id: number;
  link: string;

  translations?: IPartnerTranslate[];

  createdAt?: string;
  updatedAt?: string;
}

export interface IPartnerTranslate {
  id: number;

  lang: Lang;
  name: string;
  description: string;
  partnerId: number;
  partner?: IPartner;

  createdAt?: string;
  updatedAt?: string;
}
