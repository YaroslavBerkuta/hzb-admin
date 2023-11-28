import { http } from "../http.service";
import { IGetAwardsListRes } from "./interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
class AwardsApi {
  getList(params: any) {
    return http.get<IGetAwardsListRes>("admin/awards", { params });
  }

  create(data: any) {
    return http.post<any>("admin/awards", data);
  }
  delete(id: number) {
    return http.delete<void>(`admin/awards/${id}`);
  }
  update(id: number, data: any) {
    return http.patch<any>(`admin/awards/${id}`, data);
  }
}

export const awardsApi = new AwardsApi();
