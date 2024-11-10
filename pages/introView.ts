import { el } from "@common-module/universal-page";

export function introView<T>(): T {
  return el(
    ".intro-view",
    el("section.name-search-form-container"),
  );
}
