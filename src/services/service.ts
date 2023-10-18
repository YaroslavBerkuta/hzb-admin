import { message } from "antd";
import { store } from "../store/index";
import { Action, Root } from "../typing";

export abstract class Service {
  protected dispatch(action: Action) {
    store.dispatch({
      type: action.type,
      payload: action.payload,
    });
  }

  protected getState<T extends keyof Root>(key?: T): Root | Root[T] {
    const state = store.getState();
    if (key) return state[key];
    return state;
  }

  protected select<T>(selector: (state: Root) => T): T {
    const state = this.getState() as Root;
    return selector(state);
  }

  protected showError(
    text = "An unexpected error has occurred, please try again later"
  ) {
    message.error(text);
  }

  protected showMessage(text: string) {
    message.success(text);
  }
}
