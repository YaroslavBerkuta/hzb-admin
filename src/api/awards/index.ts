import { http } from "../http.service";
import { IGetAwardsListRes } from "./interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
class AwardsApi {
  getList(params: any) {
    return http.get<IGetAwardsListRes>("admin/awards", { params });
  }
}

export const awardsApi = new AwardsApi();
