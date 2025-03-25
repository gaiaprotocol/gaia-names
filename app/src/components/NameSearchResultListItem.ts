import { DomNode, el, Router } from "@common-module/app";

export default class NameSearchResultListItem extends DomNode {
  constructor(name: string) {
    super("a.name-search-result-list-item");
    this.append(
      `${name}.gaia`,
      el(".registered", "Registered"),
    );
    this.onDom("click", () => Router.go(`/${name}.gaia`));
  }
}
