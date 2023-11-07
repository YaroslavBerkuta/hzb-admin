import { Root } from "../../typing";

export const selectAccount = (store: Root) => {
  return store.account.info;
};
