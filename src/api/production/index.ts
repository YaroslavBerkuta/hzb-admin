import { IProduction } from "../../typing";
import { http } from "../http.service";
import { ResProductionList } from "./interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
class ProductionApi {
  getList(params: any) {
    return http.get<ResProductionList>("admin/productions", { params });
  }
  store(data: any) {
    return http.post<IProduction>("admin/productions", data);
  }

  delete(id: number) {
    return http.delete<void>(`admin/productions/${id}`);
  }
}

export const productionApi = new ProductionApi();
