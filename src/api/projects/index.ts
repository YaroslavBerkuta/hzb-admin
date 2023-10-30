/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "../http.service";
import { ResProjectsList } from "./interface";

class ProjectApi {
  getList(params: any) {
    return http.get<ResProjectsList>("admin/projects", { params });
  }
}

export const projectApi = new ProjectApi();
