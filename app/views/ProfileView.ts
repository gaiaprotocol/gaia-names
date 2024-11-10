import { Router, View } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { profileView } from "../../pages/profileView.js";
import AppConfig from "../AppConfig.js";
import GaiaNameEntity from "../entities/GaiaNameEntity.js";
import GaiaNameRepository from "../repositories/GaiaNameRepository.js";
import Layout from "./Layout.js";

export default class ProfileView extends View {
  constructor() {
    super();
    document.title = (AppConfig.isDevMode ? "(Dev) " : "") +
      "Profile - Gaia Names";
  }

  public changeData(data: { name: string }): void {
    Layout.content = this.container = profileView(data.name);
    this.loadName(data.name.replace(".gaia", "").toLowerCase());
  }

  private async loadName(name: string) {
    const loading = new AppCompConfig.LoadingSpinner().appendTo(this.container);

    const existingName = await GaiaNameRepository.fetchName(name);

    if (!existingName) {
      Router.goWithoutHistory(`/${name}.gaia/register`);
    } else {
      this.showProfile(existingName);
    }

    loading.remove();
  }

  private showProfile(nameData: GaiaNameEntity) {
    console.log(nameData);
  }
}
