import { Action } from "../../typing";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class SaveAccount implements Action {
  readonly type = "SET_ACCOUNT";
  constructor(public readonly payload: any) {}
}

export type TAccountActions = SaveAccount;
