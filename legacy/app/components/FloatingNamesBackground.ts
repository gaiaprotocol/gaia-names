import { DomNode, el } from "@common-module/app";

interface NameObject {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
}

export default class FloatingNamesBackground extends DomNode {
  private names = [
    "jupiter.gaia",
    "mars.gaia",
    "venus.gaia",
    "saturn.gaia",
    "mercury.gaia",
    "neptune.gaia",
    "pluto.gaia",
    "earth.gaia",
    "moon.gaia",
    "cosmos.gaia",
    "star.gaia",
    "galaxy.gaia",
    "nebula.gaia",
    "comet.gaia",
    "meteor.gaia",
    "yj.gaia",
  ];

  constructor() {
    super(".floating-names-background");

    const randomNames = this.generateRandomNames();
    randomNames.forEach((nameObj) => {
      this.append(this.createFloatingName(nameObj));
    });

    this.append(el(".foreground-overlay"));
  }

  private generateRandomNames(): NameObject[] {
    return this.names.map((name) => ({
      id: Math.random().toString(36).substr(2, 9),
      name,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random(),
    }));
  }

  private getStyleProperties(
    nameObj: NameObject,
  ): Partial<CSSStyleDeclaration> {
    const opacity = 0.2 + nameObj.z * 0.8;
    const scale = 0.5 + nameObj.z * 0.5;
    const blur = nameObj.z < 0.3 ? "3px" : "0px";

    return {
      position: "absolute",
      left: `${nameObj.x}%`,
      top: `${nameObj.y}%`,
      opacity: `${opacity}`,
      transform: `scale(${scale})`,
      filter: `blur(${blur})`,
      zIndex: `${Math.floor(nameObj.z * 100)}`,
    };
  }

  private createFloatingName(nameObj: NameObject): DomNode<HTMLDivElement> {
    const nameEl = el(
      "div.name-item",
      el("div.dot"),
      el("span.name", nameObj.name),
    );
    nameEl.style(this.getStyleProperties(nameObj));
    return nameEl;
  }
}
