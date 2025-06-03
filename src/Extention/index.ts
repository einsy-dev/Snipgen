import fs from "fs";
import Config from "../Config";

class Extention {
  init() {
    const snippets = fs
      .readdirSync(Config.root + "/.vscode")
      .filter((el) => el.includes(".code-snippets"));

    if (!snippets.length) return;
    if (!fs.existsSync(Config.root + "/extention/snippets")) {
      fs.mkdirSync(Config.root + "/extention/snippets", { recursive: true });
    }

    const json = Config.packageJson;

    snippets.forEach((el) => {
      fs.copyFileSync(
        Config.root + "/.vscode/" + el,
        Config.ext + "/extention/snippets/" + el
      );
      json.contributes.snippets.push({
        language: el.split(".")[0],
        path: "./snippets/" + el
      });
    });

    fs.writeFileSync(
      Config.ext + "/package.json",
      JSON.stringify(json, null, 2)
    );

    fs.writeFileSync(Config.ext + "/LICENSE", Config.license);
    fs.writeFileSync(Config.ext + "/README.md", Config.readme);
    fs.writeFileSync(Config.ext + "/CHANGELOG.md", Config.changeLog);
  }
}

export default new Extention();
