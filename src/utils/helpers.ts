import { State } from "./enums";

export function setStatusCssClass(status: State) {
  return status == State.Online ? "status-online" : "hide";
}
