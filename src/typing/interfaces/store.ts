/* eslint-disable @typescript-eslint/no-explicit-any */
export type StoreData<T> = {
  data: T;
  isLoading: boolean;
};

export interface Account {
  info: StoreData<any>;
}

export interface Action {
  type: any;
  payload?: any;
}

export interface Root {
  account: Account;
}
