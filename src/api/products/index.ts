/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "../http.service";

class ProductApi {
  create(data: any) {
    return http.post<any>("admin/products", data);
  }

  getList(params: any) {
    return http.get<any>("admin/products/list", { params });
  }

  update(id: number, data: any) {
    return http.patch<any>(`admin/products/${id}`, data);
  }

  remove(id: number) {
    return http.delete(`admin/products/${id}`);
  }
}

export const productApi = new ProductApi();
