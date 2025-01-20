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
import {
  GaiaNameRepository,
  GodMode,
  PersonaDisplay,
  PersonaRepository,
} from "gaiaprotocol";
import { profileView } from "../../pages/profileView.js";
import AppConfig from "../AppConfig.js";
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
    const main = new QueriedDomNode(".profile-view main");
    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(main);

    const existingName = await GaiaNameRepository.fetchByName(name);
    if (!existingName) {
      Router.goWithoutHistory(`/${name}.gaia/register`);
    } else {
      this.showProfile(existingName.wallet_address, existingName.name);
    }

    loadingSpinner.remove();
  }

  private async showProfile(walletAddress: string, name?: string) {
    if (walletAddress === WalletLoginManager.getLoggedInAddress()) {
      new QueriedDomNode(".profile-view header").append(
        el(
          ".button-container",
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

                await GodMode.supabaseConnector.callEdgeFunction(
                  "remove-gaia-name",
                );

                const walletAddress = WalletLoginManager.getLoggedInAddress();
                if (walletAddress) {
                  const user = { ...await UserManager.getUser(walletAddress) };
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

    const main = new QueriedDomNode(".profile-view main");
    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(main);
    const persona = await PersonaRepository.fetchPersona(walletAddress);
    loadingSpinner.remove();

    if (!persona) main.append(el(".no-persona", "No persona found"));
    else {
      main.append(
        new PersonaDisplay({
          persona,
          showEditButton:
            persona.wallet_address === WalletLoginManager.getLoggedInAddress(),
          onEditClick: () =>
            window.open("https://personas.gaia.cc/edit-persona", "_blank"),
        }),
      );
    }
  }
}
