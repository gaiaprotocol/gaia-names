import { el } from "@common-module/universal-page";

export function registerNameView<T>(): T {
  return el(".register-name-view", el("header", el("h1", "Register Name")));
}
