import { View } from "@common-module/app";
import { profileView } from "../../pages/profileView.js";
import Layout from "./Layout.js";
import AppConfig from "../AppConfig.js";

export default class ProfileView extends View {
  constructor() {
    super();
    document.title = (AppConfig.isDevMode ? "(Dev) " : "") + "Profile - Gaia Names";
    Layout.content = this.container = profileView();
  }
}
