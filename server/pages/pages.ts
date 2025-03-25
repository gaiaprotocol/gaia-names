import { createPage, el } from "@common-module/ssr";
import { el as UniversalEl, html } from "@common-module/universal-page";
import { introView } from "../pages/introView.ts";
import { profileView } from "../pages/profileView.ts";
import { registerNameView } from "../pages/registerNameView.ts";
import { layout } from "./pages/layout.ts";

UniversalEl.impl = el;
html.impl = (htmlContent) => htmlContent;

const GTAG_ID = "G-4CPW07T0ZS";
const VERSION = "0.0.1";

export function pages(
  path: string,
  isDevMode = false,
): Response | undefined {
  if (path === "/") {
    return new Response(
      createPage(
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
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  }
}
