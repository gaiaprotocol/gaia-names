import { el, QueriedDomNode, View } from "@common-module/app";
import { introView } from "../../../pages/introView.js";
import AppConfig from "../AppConfig.js";
import FloatingNamesBackground from "../components/FloatingNamesBackground.js";
import NameSearchForm from "../components/NameSearchForm.js";
import Layout from "./Layout.js";

export default class IntroView extends View {
  private static current: IntroView;

  public static focusSearchInput() {
    IntroView.current.nameSearchForm.focusInput();
  }

  private nameSearchForm: NameSearchForm;

  constructor() {
    super();
    IntroView.current = this;

    document.title = (AppConfig.isDevMode ? "(Dev) " : "") + "Gaia Names";

    Layout.content = this.container = introView();

    new QueriedDomNode(".name-search-form-container").append(
      new FloatingNamesBackground(),
      el(
        "main",
        el("h2", "Gaia Names"),
        this.nameSearchForm = new NameSearchForm(),
        el(
          ".credit",
          "Created by ",
          el("a", "Gaia Protocol", {
            href: "https://gaiaprotocol.com",
            target: "_blank",
          }),
        ),
      ),
    );
  }
}
