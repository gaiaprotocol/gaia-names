import { el, View } from "@common-module/app";
import { Input } from "@common-module/app-components";
import SearchIcon from "../icons/SearchIcon.js";
import Layout from "./Layout.js";

export default class HomeView extends View {
  public static current: HomeView | undefined;

  public nameInput: Input;

  constructor() {
    super();
    HomeView.current = this;

    Layout.content = this.container = el(
      ".home-view",
      el(
        ".name-form",
        el("h2", "Gaia Names"),
        this.nameInput = new Input(".name", {
          placeholder: "Search for a name",
          suffixIcon: new SearchIcon(),
        }),
        el(
          ".credit",
          "Created by ",
          el("a", "Gaia Protocol", {
            href: "https://gaiaprotocol.com",
            target: "_blank",
          }),
        ),
      ),
    );
  }

  public close(): void {
    super.close();
    HomeView.current = undefined;
  }
}
