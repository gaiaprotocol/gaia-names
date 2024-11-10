import { el } from "@common-module/universal-page";

export function registerNameView<T>(name: string): T {
  return el(".register-name-view", el("header", el("h1", `Register ${name}`)));
}
