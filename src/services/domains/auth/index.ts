import { Service } from "../../service";
import { storageService } from "../../system/storage";
import { authApi } from "../../../api/auth/index";
import { ILoginPayload } from "../../../api/auth/interface";
import { accountService } from "../account";
class AuthService extends Service {
  public async login(payload: ILoginPayload) {
    try {
      const { data } = await authApi.login(payload);
      this.saveSession(data);
      accountService.loadAccount();
    } catch (error) {
      console.log("error", error);
    }
  }

  public async saveSession(session: {
    refreshToken: string;
    accessToken: string;
  }) {
    await storageService.set("refreshToken", session.refreshToken);
    await storageService.set("accessToken", session.accessToken);
  }
}

export const authService = new AuthService();
