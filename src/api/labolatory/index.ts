/* eslint-disable @typescript-eslint/no-unused-vars */

import { ILabolatory } from "../../typing";
import { http } from "../http.service";
import { ResLabolatoryList } from "./interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
class LabolatoryApi {
  getList(params: any) {
    return http.get<ResLabolatoryList>("admin/labolatory", { params });
  }

  create(data: any) {
    return http.post<ILabolatory>("admin/labolatory", data);
  }

  remove(id: number) {
    return http.delete(`admin/labolatory/${id}`);
  }

  update(id: number, data: any) {
    return http.patch(`admin/labolatory/${id}`, data);
  }
}

export const labolatoryApi = new LabolatoryApi();
