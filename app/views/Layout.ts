import { BodyNode, DomNode, el, View } from "@common-module/app";
import { LoggedInUserAvatarButton } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import GaiaProtocolLogo from "../components/GaiaProtocolLogo.js";

export default class Layout extends View {
  private static current: Layout;

  public static set content(content: DomNode) {
    Layout.current.contentContainer.append(content);
  }

  private contentContainer: DomNode;

  constructor() {
    super();
    Layout.current = this;

    this.container = el(
      ".layout",
      el(
        "header",
        new GaiaProtocolLogo(),
        el(".buttons", new LoggedInUserAvatarButton(WalletLoginManager, true)),
      ),
      this.contentContainer = el("main"),
    ).appendTo(BodyNode);
  }
}
