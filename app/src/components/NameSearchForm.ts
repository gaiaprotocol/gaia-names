import { DomNode, el } from "@common-module/app";
import { Input } from "@common-module/app-components";
import { Debouncer } from "@common-module/ts";
import { ClearIcon, SearchIcon } from "@gaiaprotocol/svg-icons";
import NameSearchResultModal from "./NameSearchResultModal.js";

export default class NameSearchForm extends DomNode {
  private nameInput: Input;
  private resultModal: NameSearchResultModal;

  private nameChangeDebouncer = new Debouncer(300, () => {
    this.searchNames();
  });

  constructor() {
    super(".name-search-form");
    this.append(
      this.nameInput = new Input(".name", {
        placeholder: "Search for a name",
        suffixIcon: el(
          ".icon-container",
          new SearchIcon(),
          new ClearIcon().onDom("click", () => {
            this.nameInput.value = "";
            this.nameInput.focus();
          }),
        ),
        autoCapitalize: "none",
        onKeyDown: (event) => {
          if (event.key === ".") {
            event.preventDefault();
          }
        },
        onChange: () => this.nameChangeDebouncer.execute(),
      }),
      this.resultModal = new NameSearchResultModal(),
    );

    this.resultModal.addClass("hidden");
  }

  private async searchNames(): Promise<void> {
    const name = this.nameInput.value.trim().toLowerCase();
    if (name.length === 0) {
      this.resultModal.addClass("hidden");
    } else {
      this.resultModal.removeClass("hidden");
      this.resultModal.query = name;
    }
  }

  public focusInput(): void {
    this.nameInput.focus();
  }
}
