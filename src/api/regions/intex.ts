/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "../http.service";
import { IResDistributorsList } from "./interface";

class DistributorApi {
  getList(params: any) {
    return http.get<IResDistributorsList>("admin/distributors", { params });
  }
  store(data: any) {
    return http.post<any>("admin/distributors", data);
  }
  remove(id: number) {
    return http.delete(`admin/distributors/${id}`);
  }

  update(id: number, data: any) {
    return http.patch(`admin/distributors/${id}`, data);
  }
}

export const distributorApi = new DistributorApi();
