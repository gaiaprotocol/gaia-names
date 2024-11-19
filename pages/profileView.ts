import { el } from "@common-module/universal-page";
import { AddressUtils } from "@common-module/wallet-utils";

export function profileView<T>(name: string): T {
  return el(
    ".profile-view",
    el(
      "header",
      el(
        "h1",
        name.endsWith(".gaia") ? name : AddressUtils.shortenAddress(name),
      ),
    ),
    el("main"),
  );
}
