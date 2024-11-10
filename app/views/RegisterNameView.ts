import { el, Router, View } from "@common-module/app";
import {
  Alert,
  AppCompConfig,
  Button,
  ButtonType,
} from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { registerNameView } from "../../pages/registerNameView.js";
import AppConfig from "../AppConfig.js";
import CalendarIcon from "../icons/CalendarIcon.js";
import LockIcon from "../icons/LockIcon.js";
import OpenInNewIcon from "../icons/OpenInNewIcon.js";
import GaiaNameRepository from "../repositories/GaiaNameRepository.js";
import Layout from "./Layout.js";

export default class RegisterNameView extends View {
  constructor() {
    super();
    document.title = (AppConfig.isDevMode ? "(Dev) " : "") +
      "Register Name - Gaia Names";
  }

  public changeData(data: { name: string }): void {
    Layout.content = this.container = registerNameView(data.name);

    if (WalletLoginManager.isLoggedIn) {
      this.render(data.name.replace(".gaia", "").toLowerCase());
    } else {
      Router.goWithoutHistory("/");
    }
  }

  private async render(name: string) {
    const loading = new AppCompConfig.LoadingSpinner().appendTo(this.container);

    const [eligible, existingName] = await Promise.all([
      AppConfig.supabaseConnector.callEdgeFunction(
        "check-god-mode",
      ),
      GaiaNameRepository.fetchName(name),
    ]);

    if (!eligible) {
      this.showNotEligible();
    } else if (existingName) {
      Router.goWithoutHistory(`/${name}.gaia`);
    } else {
      // show form
    }

    loading.remove();
  }

  private showNotEligible() {
    el(
      ".not-eligible",
      el("h2", new LockIcon(), "God Mode Required"),
      el(
        "p",
        "To register a GAIA Name, you need to activate God Mode by meeting one of the following requirements:",
      ),
      el(
        "ul",
        el("li", "Hold 10,000 or more $GAIA"),
        el("li", "Hold at least one The Gods NFT"),
      ),
      el(
        ".buttons",
        new Button({
          type: ButtonType.Contained,
          icon: new OpenInNewIcon(),
          iconPosition: "right",
          title: "Buy $GAIA",
          onClick: () => {
            new Alert({
              icon: new CalendarIcon(),
              title: "$GAIA Launch Schedule",
              message:
                "$GAIA will be launched in Q1 2025.\nStay tuned for more updates!",
            });
          },
        }),
        new Button({
          type: ButtonType.Contained,
          icon: new OpenInNewIcon(),
          iconPosition: "right",
          title: "Buy The Gods NFT",
          onClick: () => {
            open("https://opensea.io/collection/gaia-protocol-gods");
          },
        }),
      ),
    ).appendTo(this.container);
  }
}
