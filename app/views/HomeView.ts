import { el, View } from "@common-module/app";
import { Input } from "@common-module/app-components";
import { Debouncer } from "@common-module/ts";
import FloatingNamesBackground from "../components/FloatingNamesBackground.js";
import NameSearchResultList from "../components/NameSearchResultList.js";
import SearchIcon from "../icons/SearchIcon.js";
import Layout from "./Layout.js";

export default class HomeView extends View {
  public static current: HomeView | undefined;

  public nameInput: Input;
  private nameSearchResultList: NameSearchResultList;

  private nameChangeDebouncer = new Debouncer(300, () => {
    this.searchNames();
  });

  constructor() {
    super();
    HomeView.current = this;

    Layout.content = this.container = el(
      ".home-view",
      el(
        ".name-form-container",
        new FloatingNamesBackground(),
        el(
          ".name-form",
          el("h2", "Gaia Names"),
          this.nameInput = new Input(".name", {
            placeholder: "Search for a name",
            suffixIcon: new SearchIcon(),
            onChange: () => this.nameChangeDebouncer.execute(),
          }),
          this.nameSearchResultList = new NameSearchResultList(),
          el(
            ".credit",
            "Created by ",
            el("a", "Gaia Protocol", {
              href: "https://gaiaprotocol.com",
              target: "_blank",
            }),
          ),
        ),
      ),
    );

    this.nameSearchResultList.addClass("hidden");
  }

  private async searchNames(): Promise<void> {
    const name = this.nameInput.value.trim();
    if (name.length === 0) {
      this.nameSearchResultList.addClass("hidden");
    } else {
      this.nameSearchResultList.removeClass("hidden");
      this.nameSearchResultList.query = name;
    }
  }

  public close(): void {
    super.close();
    HomeView.current = undefined;
  }
}
