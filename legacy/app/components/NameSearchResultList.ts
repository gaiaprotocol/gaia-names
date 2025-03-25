import { DomNode } from "@common-module/app";
import NameSearchResultListItem from "./NameSearchResultListItem.js";

export default class NameSearchResultList extends DomNode {
  public children: NameSearchResultListItem[] = [];

  constructor() {
    super(".name-search-result-list");
  }

  public set names(names: string[]) {
    this.clear().append(...names.map((n) => new NameSearchResultListItem(n)));
  }
}
