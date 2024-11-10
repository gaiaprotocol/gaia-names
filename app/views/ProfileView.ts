import { el, View } from "@common-module/app";
import Layout from "./Layout.js";

export default class ProfileView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(
      ".profile-view",
      el("header", el("h1", "Profile")),
    );
  }
}
