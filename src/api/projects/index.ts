/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProject } from "../../typing";
import { http } from "../http.service";
import { ResProjectsList } from "./interface";

class ProjectApi {
  getList(params: any) {
    return http.get<ResProjectsList>("admin/projects", { params });
  }

  create(data: any) {
    return http.post<IProject>("admin/projects", data);
  }

  remove(id: number) {
    return http.delete(`admin/projects/${id}`);
  }

  update(id: number, data: any) {
    return http.patch(`admin/projects/${id}`, data);
  }

  removeProduction(id: number) {
    return http.delete(`admin/projects/production/${id}`);
  }
}

export const projectApi = new ProjectApi();
