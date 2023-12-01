import { IPartner } from "../../typing/interfaces/partner.inerface";
import { http } from "../http.service";

class PartnersApi {
  getList(params: any) {
    return http.get<{ items: IPartner[]; count: number }>(
      "admin/partner/list",
      { params }
    );
  }

  store(data: any) {
    return http.post<IPartner>("admin/partner/create", data);
  }

  delete(id: number) {
    return http.delete<void>(`admin/partner/${id}`);
  }
  update(id: number, data: any) {
    return http.patch<any>(`admin/partner/${id}`, data);
  }
}

export const partnerApi = new PartnersApi();
