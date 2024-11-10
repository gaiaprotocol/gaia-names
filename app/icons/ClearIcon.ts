import { DomNode } from "@common-module/app";

export default class ClearIcon extends DomNode {
  constructor() {
    super(".icon.clear");
    const svgHeight = 22;

    const svg = '<svg fill="currentColor" height="' + svgHeight +
      '" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
    this.htmlElement.innerHTML = svg;
  }
}
