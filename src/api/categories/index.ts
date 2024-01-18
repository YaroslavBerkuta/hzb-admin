/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "../http.service";

class CategoriesApi {
  getList() {
    return http.get<any>("admin/products/categories");
  }
}

export const categoriesApi = new CategoriesApi();
