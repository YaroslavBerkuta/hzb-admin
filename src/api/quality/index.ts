/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IQuality } from "../../typing";
import { http } from "../http.service";
import { IResQualityList } from "./interface";

class QualityApi {
  getList(params: any) {
    return http.get<IResQualityList>("admin/quality", { params });
  }

  create(data: any) {
    return http.post<IQuality>("admin/quality", data);
  }

  remove(id: number) {
    return http.delete(`admin/quality/${id}`);
  }
}

export const qualityApi = new QualityApi();
