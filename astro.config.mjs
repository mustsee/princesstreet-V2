import image from "@astrojs/image";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";
import { defineConfig } from "astro/config";
import path from "path";
import { fileURLToPath } from "url";
import { remarkReadingTime } from "./src/utils/frontmatter.mjs";
import partytown from "@astrojs/partytown";
import { SITE } from "./src/config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const whenExternalScripts = (items = []) =>
  SITE.googleAnalyticsId
    ? Array.isArray(items)
      ? items.map((item) => item())
      : [items()]
    : [];

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  //trailingSlash: SITE.trailingSlash ? "always" : "never",
  output: "static",
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ["dataLayer.push"] },
      })
    ),
    react(),
    astroI18next(),
  ],

  markdown: {
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },

  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});
