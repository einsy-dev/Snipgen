import * as vscode from "vscode";
import * as fs from "fs";
import Config from "../Config";

class Extention {
  root: string | undefined;
  constructor() {
    if (!vscode.workspace.workspaceFolders) return;
    this.root = vscode.workspace.workspaceFolders[0].uri.fsPath;
  }
  init() {
    if (!this.root) return;
    const snippets = fs
      .readdirSync(this.root + "/.vscode")
      .filter((el) => el.includes(".code-snippets"));
    if (!snippets.length) return;
    if (!fs.existsSync(this.root + "/extention/snippets")) {
      fs.mkdirSync(this.root + "/extention/snippets", { recursive: true });
    }

    const json = Config.packageJson;

    snippets.forEach((el) => {
      fs.copyFileSync(
        this.root + "/.vscode/" + el,
        this.root + "/extention/snippets/" + el
      );
      json.contributes.snippets.push({
        language: el.split(".")[0],
        path: "./snippets/" + el
      });
    });

    fs.writeFileSync(
      this.root + "/extention/package.json",
      JSON.stringify(json, null, 2)
    );

    fs.writeFileSync(this.root + "/extention/LICENSE", Config.license);
    fs.writeFileSync(this.root + "/extention/README.md", Config.readme);
    fs.writeFileSync(this.root + "/extention/CHANGELOG.md", Config.changeLog);
  }
}

export default new Extention();
