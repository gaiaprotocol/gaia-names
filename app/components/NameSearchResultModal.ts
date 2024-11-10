import { DomNode, el, Router } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import NextIcon from "../icons/NextIcon.js";
import GaiaNameRepository from "../repositories/GaiaNameRepository.js";
import NameSearchResultList from "./NameSearchResultList.js";

export default class NameSearchResultModal extends DomNode {
  private searchNonce = 0;

  private resultList: NameSearchResultList;
  private availableNameDisplay: DomNode | undefined;

  constructor() {
    super(".name-search-result-modal");
    this.append(
      this.resultList = new NameSearchResultList(),
    );
  }

  public set query(query: string) {
    this.search(query);
  }

  private async search(query: string): Promise<void> {
    this.availableNameDisplay?.remove();

    this.searchNonce += 1;
    const currentNonce = this.searchNonce;

    const loadingSpinner = new AppCompConfig.LoadingSpinner();
    this.addClass("loading").clear().append(loadingSpinner);

    const names = await GaiaNameRepository.searchNames(query);
    const exactMatch = names.some((n) =>
      n.name.toLowerCase() === query.toLowerCase()
    );

    this.resultList.names = names.map((n) => n.name);

    if (!exactMatch) {
      const availableName = `${query.toLowerCase()}.gaia`;
      this.availableNameDisplay = el(
        ".available-name-display",
        el("h3", "Available"),
        el("a.available-name", availableName, new NextIcon(), {
          onclick: () => Router.go(`/${availableName}/register`),
        }),
      ).appendTo(this);
      this.availableNameDisplay.on(
        "remove",
        () => this.availableNameDisplay = undefined,
      );
    }

    if (currentNonce === this.searchNonce) {
      loadingSpinner.remove();
      this.removeClass("loading");
    }
  }
}
