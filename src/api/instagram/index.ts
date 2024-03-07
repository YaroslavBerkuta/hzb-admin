import { http } from "../http.service";

class InstagramApi {
  getList() {
    return http.get<any>("instagram/list");
  }

  create(data: any) {
    return http.post<any>("instagram", data);
  }
  remove(id: number) {
    return http.delete(`instagram/${id}`);
  }

  update(id: number, data: any) {
    return http.patch<any>(`instagram/${id}`, data);
  }
}

export const instagramApi = new InstagramApi();
