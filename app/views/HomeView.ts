import { el, View } from "@common-module/app";
import FloatingNamesBackground from "../components/FloatingNamesBackground.js";
import NameSearchForm from "../components/NameSearchForm.js";
import Layout from "./Layout.js";

export default class HomeView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(
      ".home-view",
      el(
        "section.name-search-form-container",
        new FloatingNamesBackground(),
        el(
          "main",
          el("h2", "Gaia Names"),
          new NameSearchForm(),
          el(
            ".credit",
            "Created by ",
            el("a", "Gaia Protocol", {
              href: "https://gaiaprotocol.com",
              target: "_blank",
            }),
          ),
        ),
      ),
    );
  }
}
