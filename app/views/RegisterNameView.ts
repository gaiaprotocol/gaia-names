import { Router, View } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { registerNameView } from "../../pages/registerNameView.js";
import AppConfig from "../AppConfig.js";
import Layout from "./Layout.js";

export default class RegisterNameView extends View {
  constructor() {
    super();
    Layout.content = this.container = registerNameView();

    if (WalletLoginManager.isLoggedIn) {
      this.checkGodMode();
    } else {
      Router.goWithoutHistory("/");
    }
  }

  private async checkGodMode() {
    const loading = new AppCompConfig.LoadingSpinner().appendTo(this.container);

    const eligible = await AppConfig.supabaseConnector.callEdgeFunction(
      "check-god-mode",
    );
    console.log("God mode eligible:", eligible);

    loading.remove();
  }
}
