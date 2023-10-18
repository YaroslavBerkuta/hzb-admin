/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "../http.service";

class AccountApi {
  load() {
    return http.get<any>("admin/account");
  }
}

export const accountApi = new AccountApi();
