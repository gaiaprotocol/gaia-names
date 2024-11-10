import { DomNode } from "@common-module/app";

export default class NextIcon extends DomNode {
  constructor() {
    super(".icon.next");
    const svgHeight = 22;

    const svg = '<svg fill="currentColor" height="' + svgHeight +
      '" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>';
    this.htmlElement.innerHTML = svg;
  }
}
