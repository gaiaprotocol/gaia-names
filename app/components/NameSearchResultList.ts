import { DomNode } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";

export default class NameSearchResultList extends DomNode {
  private searchNonce = 0;

  constructor() {
    super(".name-search-result-list");
  }

  public set query(query: string) {
    this.search(query);
  }

  private async search(query: string): Promise<void> {
    this.searchNonce += 1;
    const currentNonce = this.searchNonce;

    const loadingSpinner = new AppCompConfig.LoadingSpinner();
    this.addClass("loading").clear().append(loadingSpinner);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (currentNonce === this.searchNonce) {
      loadingSpinner.remove();
      this.removeClass("loading");
    }
  }
}
