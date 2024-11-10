import { el as UniversalEl, html } from "@common-module/universal-page";
import {
  createPage,
  el,
} from "https://raw.githubusercontent.com/yjgaia/deno-module/main/page.ts";
import { introView } from "../pages/introView.ts";
import { profileView } from "../pages/profileView.ts";
import { registerNameView } from "../pages/registerNameView.ts";
import { layout } from "./pages/layout.ts";

UniversalEl.impl = el;
html.impl = (htmlContent) => htmlContent;

const GTAG_ID = "G-4CPW07T0ZS";

export function pages(
  path: string,
  isDevMode = false,
): Response | undefined {
  if (path === "/") {
    return new Response(
      createPage(
        {
          title: (isDevMode ? "(Dev) " : "") + "The Gods NFT",
          jsFiles: [isDevMode ? "/bundle-dev.js" : "/bundle.js"],
          cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
          gtagId: GTAG_ID,
        },
        layout(introView()),
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  } else if (
    (path.startsWith("/0x") || path.endsWith(".gaia")) &&
    new URLPattern({ pathname: "/:name" }).test({ pathname: path })
  ) {
    return new Response(
      createPage(
        {
          title: (isDevMode ? "(Dev) " : "") + "The Gods NFT",
          jsFiles: [isDevMode ? "/bundle-dev.js" : "/bundle.js"],
          cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
          gtagId: GTAG_ID,
        },
        layout(profileView()),
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  } else if (
    new URLPattern({ pathname: "/:name/register" }).test({ pathname: path })
  ) {
    return new Response(
      createPage(
        {
          title: (isDevMode ? "(Dev) " : "") + "The Gods NFT",
          jsFiles: [isDevMode ? "/bundle-dev.js" : "/bundle.js"],
          cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
          gtagId: GTAG_ID,
        },
        layout(
          registerNameView(
            new URLPattern({ pathname: "/:name/register" }).exec({
              pathname: path,
            })!.pathname.groups.name!,
          ),
        ),
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  }
}
