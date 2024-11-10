import { View } from "@common-module/app";
import { profileView } from "../../pages/profileView.js";
import Layout from "./Layout.js";

export default class ProfileView extends View {
  constructor() {
    super();
    Layout.content = this.container = profileView();
  }
}
