import { createPage } from "@common-module/ssr";
import { introView } from "../../pages/introView.js";
import { profileView } from "../../pages/profileView.js";
import { registerNameView } from "../../pages/registerNameView.js";
import { layout } from "./layout.js";

const GTAG_ID = "G-4CPW07T0ZS";
const VERSION = "0.0.1";

export function pages(
  path: string,
  isDevMode = false,
): string | undefined {
  if (path === "/") {
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + "Gaia Names",
        jsFiles: [
          `${isDevMode ? "/bundle-dev.js" : "/bundle.js"}?v=${VERSION}`,
        ],
        cssFiles: [
          `${isDevMode ? "/bundle-dev.css" : "/bundle.css"}?v=${VERSION}`,
        ],
        gtagId: GTAG_ID,
      },
      layout(introView()),
    );
  } else if (
    (path.startsWith("/0x") || path.endsWith(".gaia")) &&
    new URLPattern({ pathname: "/:name" }).test({ pathname: path })
  ) {
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + "Profile - Gaia Names",
        jsFiles: [
          `${isDevMode ? "/bundle-dev.js" : "/bundle.js"}?v=${VERSION}`,
        ],
        cssFiles: [
          `${isDevMode ? "/bundle-dev.css" : "/bundle.css"}?v=${VERSION}`,
        ],
        gtagId: GTAG_ID,
      },
      layout(profileView(
        new URLPattern({ pathname: "/:name" }).exec({
          pathname: path,
        })!.pathname.groups.name!,
      )),
    );
  } else if (
    new URLPattern({ pathname: "/:name/register" }).test({ pathname: path })
  ) {
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + "Register Name - Gaia Names",
        jsFiles: [
          `${isDevMode ? "/bundle-dev.js" : "/bundle.js"}?v=${VERSION}`,
        ],
        cssFiles: [
          `${isDevMode ? "/bundle-dev.css" : "/bundle.css"}?v=${VERSION}`,
        ],
        gtagId: GTAG_ID,
      },
      layout(
        registerNameView(
          new URLPattern({ pathname: "/:name/register" }).exec({
            pathname: path,
          })!.pathname.groups.name!,
        ),
      ),
    );
  }
}
