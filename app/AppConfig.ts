import { Router } from "@common-module/app";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@common-module/app-components";
import { SocialCompConfig } from "@common-module/social-components";
import { AuthTokenManager, SupabaseConnector } from "@common-module/supabase";
import { AddressUtils } from "@common-module/wallet";
import { GaiaProtocolConfig } from "gaiaprotocol";
import ProfileIcon from "./icons/ProfileIcon.js";
import GaiaNameRepository from "./repositories/GaiaNameRepository.js";

export interface IAppConfig {
  isDevMode: boolean;

  supabaseUrl: string;
  supabaseKey: string;
}

class AppConfig implements IAppConfig {
  public isDevMode!: boolean;

  public supabaseUrl!: string;
  public supabaseKey!: string;

  public supabaseConnector!: SupabaseConnector;

  public init(config: IAppConfig) {
    Object.assign(this, config);

    const authTokenManager = new AuthTokenManager("gaia-names-auth-token");

    this.supabaseConnector = new SupabaseConnector(
      config.supabaseUrl,
      config.supabaseKey,
      authTokenManager,
    );

    GaiaNameRepository.supabaseConnector = this.supabaseConnector;

    GaiaProtocolConfig.init(config.isDevMode, config.isDevMode);

    SocialCompConfig.goLoggedInUserProfile = async (user) => {
      Router.go(`/${user.name.endsWith(".gaia") ? user.name : user.id}`);
    };

    SocialCompConfig.fetchUser = async (walletAddress: string) => {
      const name = await GaiaNameRepository.fetchName(walletAddress);
      return {
        id: walletAddress,
        name: name
          ? `${name}.gaia`
          : AddressUtils.shortenAddress(walletAddress),
        isFallback: true,
      };
    };

    SocialCompConfig.getLoggedInUserMenu = async (menu, user) => {
      return new DropdownMenuGroup(
        user.isFallback
          ? new DropdownMenuItem({
            icon: new ProfileIcon(),
            label: "Profile",
            onClick: () => {
              Router.go(
                `/${user.name.endsWith(".gaia") ? user.name : user.id}`,
              );
              menu.remove();
            },
          })
          : new DropdownMenuItem({
            icon: new ProfileIcon(),
            label: "Profile",
            onClick: () => {
              menu.remove();
            },
          }),
      );
    };
  }
}

export default new AppConfig();
