import { el, QueriedDomNode, Router, View } from "@common-module/app";
import {
  AlertDialog,
  AppCompConfig,
  Button,
  ButtonType,
} from "@common-module/app-components";
import { UserManager } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { CalendarIcon, LockIcon, OpenInNewIcon } from "@gaiaprotocol/svg-icons";
import { GaiaNameRepository, GodMode } from "gaiaprotocol";
import { registerNameView } from "../../pages/registerNameView.js";
import AppConfig from "../AppConfig.js";
import Layout from "./Layout.js";

export default class RegisterNameView extends View {
  constructor() {
    super();
    document.title = (AppConfig.isDevMode ? "(Dev) " : "") +
      "Register Name - Gaia Names";
  }

  public changeData(data: { name: string }): void {
    Layout.content = this.container = registerNameView(data.name);

    new QueriedDomNode(".register-name-view header a.back").onDom(
      "click",
      (event) => {
        event.preventDefault();
        Router.go("/");
      },
    );

    if (WalletLoginManager.isLoggedIn()) {
      this.render(data.name.replace(".gaia", "").toLowerCase());
    } else {
      Router.goWithoutHistory("/");
    }
  }

  private async render(name: string) {
    const loading = new AppCompConfig.LoadingSpinner().appendTo(this.container);

    const [eligible, existingName] = await Promise.all([
      GodMode.supabaseConnector.callEdgeFunction(
        "check-god-mode",
      ),
      GaiaNameRepository.fetchByName(name),
    ]);

    if (!eligible) {
      this.showNotEligible();
    } else if (existingName) {
      Router.goWithoutHistory(`/${name}.gaia`);
    } else {
      this.showRegisterForm(name);
    }

    loading.remove();
  }

  private showNotEligible() {
    this.container.append(el(
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
            new AlertDialog({
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
    ));
  }

  private showRegisterForm(name: string) {
    this.container.append(
      el(
        ".register-form",
        el(
          "p",
          "Would you like to register ",
          el("b", `${name}.gaia`),
          " as your wallet name?\nThe name will remain valid only while you maintain ",
          el("b", "God Mode"),
          " by holding either 10,000 $GAIA or at least one The Gods NFT.",
        ),
        el(
          ".buttons",
          new Button({
            type: ButtonType.Outlined,
            title: "Cancel",
            onClick: () => Router.go("/"),
          }),
          new Button({
            type: ButtonType.Contained,
            title: "Register Name",
            onClick: async () => {
              await GodMode.supabaseConnector.callEdgeFunction(
                "set-gaia-name",
                { name },
              );

              const walletAddress = WalletLoginManager.getLoggedInAddress();
              if (walletAddress) {
                const user = await UserManager.getUser(walletAddress);
                user.name = `${name}.gaia`;
                UserManager.setUser(user);
              }
              Router.go(`/${name}.gaia`);
            },
          }),
        ),
      ),
    );
  }
}
