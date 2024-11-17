import { Router, SPAInitializer } from "@common-module/app";
import { WalletLoginManager } from "@common-module/wallet-login";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import IntroView from "./views/IntroView.js";
import Layout from "./views/Layout.js";
import ProfileView from "./views/ProfileView.js";
import RegisterNameView from "./views/RegisterNameView.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  SPAInitializer.init();
  WalletLoginManager.init();

  Router
    .add("/", IntroView)
    .add("/:name", ProfileView)
    .add("/:name/register", RegisterNameView);

  Layout.init();
}
