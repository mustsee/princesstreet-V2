import fs from "fs";
import content from "./src/frontaid.content.json" assert { type: "json" };

// TODO: Add creation of lng directory if doesn't exists

// We receive from our CMS frontAid a single JSON file
// For Astro i18n integration, we need to have
// A single tranlastion.json file per language, in a public/locales/${lng} folder
// This script is executed predev/prestart/prebuild, see package.json
for (const [key, value] of Object.entries(content)) {
  fs.writeFile(
    `./public/locales/${key}/translation.json`,
    JSON.stringify(value),
    (err) => {
      if (err) throw err;
      console.log(`Saved ${key} translation`);
    }
  );
}
