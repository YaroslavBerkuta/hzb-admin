/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "../http.service";
import { IGetNewsListRes } from "./interface";

class NewsApi {
  getList(params: any) {
    return http.get<IGetNewsListRes>("admin/news/list", { params });
  }
}

export const newsApi = new NewsApi();
