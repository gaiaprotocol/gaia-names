import { el } from "@common-module/universal-page";

export function profileView<T>(): T {
  return el(".profile-view", el("header", el("h1", "Profile")));
}
