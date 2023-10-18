import { accountApi } from "../../../api/account";
import { SaveAccount } from "../../../store/account";
import { Service } from "../../service";

class AccountService extends Service {
  constructor() {
    super();
    this.loadAccount();
  }
  async loadAccount() {
    try {
      const { data } = await accountApi.load();
      this.dispatch(new SaveAccount(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const accountService = new AccountService();
