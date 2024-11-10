import { el, View } from "@common-module/app";
import { Input } from "@common-module/app-components";
import { Debouncer } from "@common-module/ts";
import FloatingNamesBackground from "../components/FloatingNamesBackground.js";
import NameSearchResultModal from "../components/NameSearchResultModal.js";
import SearchIcon from "../icons/SearchIcon.js";
import Layout from "./Layout.js";

export default class HomeView extends View {
  public static current: HomeView | undefined;

  public nameInput: Input;
  private nameSearchResultModal: NameSearchResultModal;

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
            autoCapitalize: "none",
            onKeyDown: (event) => {
              if (event.key === ".") {
                event.preventDefault();
              }
            },
            onChange: () => this.nameChangeDebouncer.execute(),
          }),
          this.nameSearchResultModal = new NameSearchResultModal(),
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

    this.nameSearchResultModal.addClass("hidden");
  }

  private async searchNames(): Promise<void> {
    const name = this.nameInput.value.trim().toLowerCase();
    if (name.length === 0) {
      this.nameSearchResultModal.addClass("hidden");
    } else {
      this.nameSearchResultModal.removeClass("hidden");
      this.nameSearchResultModal.query = name;
    }
  }

  public close(): void {
    super.close();
    HomeView.current = undefined;
  }
}
