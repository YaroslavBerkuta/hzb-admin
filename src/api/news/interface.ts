import { INews } from "../../typing";

export interface IGetNewsListRes {
  items: INews[];
  count: number;
}
