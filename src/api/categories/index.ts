/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory } from "../../typing/interfaces/category.interface";
import { http } from "../http.service";

class CategoriesApi {
  getList(params: any) {
    return http.get<any>("admin/category", params);
  }
  remove(id: number) {
    return http.delete(`admin/category/${id}`);
  }
  store(data: any) {
    return http.post<ICategory>("admin/category", data);
  }
  update(id: number, data: any) {
    return http.patch(`admin/category/${id}`, data);
  }
}

export const categoriesApi = new CategoriesApi();
