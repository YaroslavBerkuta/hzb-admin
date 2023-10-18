import { createReducer } from "@bitalikrty/redux-create-reducer";
import { Account } from "../../typing";
import { TAccountActions } from "./types";

const initialState = {
  info: {
    data: null,
    isLoading: true,
  },
};

export const accountReducer = createReducer<Account, TAccountActions>(
  initialState,
  {
    SET_ACCOUNT: (state, action) => {
      console.log("action:", action);
      return {
        ...state,
        info: {
          data: action.payload,
          isLoading: false,
        },
      };
    },
    // SET_LOADING_ACCOUNT: (state, action) => {
    //   return {
    //     ...state,
    //     info: {
    //       ...state.info,
    //       isLoading: action.payload,
    //     },
    //   };
    // },
    // RESET_ACCOUNT: () => {
    //   return {
    //     ...initialState,
    //     info: {
    //       data: null,
    //       isLoading: false,
    //     },
    //   };
    // },
  }
);
