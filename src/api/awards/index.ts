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
}

export const awardsApi = new AwardsApi();
