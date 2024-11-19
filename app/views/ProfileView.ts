import { el, QueriedDomNode, Router, View } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  ConfirmDialog,
} from "@common-module/app-components";
import { UserManager } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { AddressUtils } from "@common-module/wallet-utils";
import { DeleteIcon, EditIcon } from "@gaiaprotocol/svg-icons";
import { PersonaDisplay } from "gaiaprotocol";
import { profileView } from "../../pages/profileView.js";
import AppConfig from "../AppConfig.js";
import GaiaNameRepository from "../repositories/GaiaNameRepository.js";
import IntroView from "./IntroView.js";
import Layout from "./Layout.js";

export default class ProfileView extends View {
  constructor() {
    super();
    document.title = (AppConfig.isDevMode ? "(Dev) " : "") +
      "Profile - Gaia Names";
  }

  public changeData(data: { name: string }): void {
    Layout.content = this.container = profileView(data.name);

    if (data.name.endsWith(".gaia")) {
      this.loadName(data.name.replace(".gaia", "").toLowerCase());
    } else {
      this.showProfile(data.name);
    }
  }

  private async loadName(name: string) {
    const loading = new AppCompConfig.LoadingSpinner().appendTo(this.container);

    const existingName = await GaiaNameRepository.fetchName(name);

    if (!existingName) {
      Router.goWithoutHistory(`/${name}.gaia/register`);
    } else {
      this.showProfile(existingName.wallet_address, existingName.name);
    }

    loading.remove();
  }

  private showProfile(walletAddress: string, name?: string) {
    if (walletAddress === WalletLoginManager.getLoggedInAddress()) {
      new QueriedDomNode(".profile-view header").append(
        el(
          ".buttons",
          new Button({
            type: ButtonType.Contained,
            icon: new EditIcon(),
            title: name ? "Change Name" : "Set Name",
            onClick: () => {
              Router.go("/");
              IntroView.focusSearchInput();
            },
          }),
          name
            ? new Button({
              type: ButtonType.Outlined,
              icon: new DeleteIcon(),
              title: "Remove Name",
              onClick: async () => {
                await new ConfirmDialog({
                  icon: new DeleteIcon(),
                  title: "Remove Name",
                  message: "Are you sure you want to remove your Gaia Name?",
                }).waitForConfirmation();

                await AppConfig.supabaseConnector.callEdgeFunction(
                  "remove-gaia-name",
                );

                const walletAddress = WalletLoginManager.getLoggedInAddress();
                if (walletAddress) {
                  const user = await UserManager.getUser(walletAddress);
                  user.name = AddressUtils.shortenAddress(walletAddress);
                  UserManager.setUser(user);
                }
                Router.go(`/${walletAddress}`);
              },
            })
            : undefined,
        ),
      );
    }

    new QueriedDomNode(".profile-view main").append(
      new PersonaDisplay(walletAddress),
    );
  }
}
