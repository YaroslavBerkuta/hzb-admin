import { http } from "../http.service";
import { ILoginPayload, ILoginResponce } from "./interface";

class AuthApi {
  login(data: ILoginPayload) {
    return http.post<ILoginResponce>("admin/auth", {
      ...data,
      deviceName: "web",
    });
  }
}

export const authApi = new AuthApi();
