import { el, View } from "@common-module/app";
import Layout from "./Layout.js";

export default class RegisterNameView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(
      ".register-name-view",
      el("header", el("h1", "Register Name")),
    );
  }
}
