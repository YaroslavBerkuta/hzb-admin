/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "../http.service";
import { IGetNewsListRes } from "./interface";

class NewsApi {
  getList(params: any) {
    return http.get<IGetNewsListRes>("admin/news/list", { params });
  }
  store(data: any) {
    return http.post<any>("admin/news/create", data);
  }

  delete(id: number) {
    return http.delete<void>(`admin/news/${id}`);
  }

  update(id: number, data: any) {
    return http.patch<any>(`admin/news/${id}`, data);
  }
}

export const newsApi = new NewsApi();
