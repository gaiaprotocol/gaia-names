import { el } from "@common-module/universal-page";

export function introView<T>(): T {
  return el(
    ".intro-view",
    el("section.name-search-form-container"),
    el(
      "section.intro",
      el("h2", "Your Exclusive Identity in Gaia Protocol"),
      el(
        "p",
        "Gaia Names is a unique feature designed exclusively for God Mode holders, providing a personalized identity within Gaia Protocol ecosystem.",
      ),
      el("h3", "What is Gaia Name?"),
      el(
        "p",
        "Gaia Name is a distinct and non-duplicable .gaia identifier available only to users who meet the following criteria:",
      ),
      el(
        "ul",
        el(
          "li",
          "Hold at least one ",
          el("a", "Gods NFT", {
            href: "https://thegods.gaia.cc/",
            target: "_blank",
          }),
          " or",
        ),
        el(
          "li",
          "Possess 10,000 or more ",
          el("a", "$GAIA", {
            href: "https://token.gaia.cc/",
            target: "_blank",
          }),
          " tokens",
        ),
      ),
      el(
        "p",
        "This exclusive naming system allows God Mode holders to establish a recognizable presence across all Gaia Protocol services.",
      ),
      el("h3", "Why Secure Your Gaia Name?"),
      el(
        "ul",
        el(
          "li",
          "Uniqueness - Each Gaia Name is exclusive and cannot be replicated.",
        ),
        el(
          "li",
          "Integration - Seamlessly use your Gaia Name across all Gaia Protocol services.",
        ),
        el(
          "li",
          "Prestige - Reflect your status as a God Mode holder within the ecosystem.",
        ),
      ),
      el(
        "p",
        "Take ownership of your Gaia Name and solidify your identity within Gaia Protocol today.",
      ),
    ),
  );
}
