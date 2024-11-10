import { DomNode } from "@common-module/app";

export default class NameSearchResultListItem extends DomNode {
  constructor(name: string) {
    super(".name-search-result-list-item");
    this.append(
      name,
    );
  }
}
