import * as vscode from "vscode";
import * as fs from "fs";
import { SnippetsI } from "./interface";

class SnipGen {
  root = vscode.workspace.workspaceFolders![0].uri.fsPath;

  async parse(
    name: string,
    body: string,
    prefix: string,
    description: string,
    language: string
  ) {
    const path = this.root + "/.vscode";
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    if (!fs.existsSync(`${path}/${language}.code-snippets`)) {
      fs.writeFileSync(`${path}/${language}.code-snippets`, "{}");
    }
    const data: SnippetsI = JSON.parse(
      fs.readFileSync(`${path}/${language}.code-snippets`, "utf-8") || "{}"
    );

    if (data[name] && !(await submit("Snippet already exists. Override?"))) {
      return;
    }

    data[name] = {
      prefix,
      body: body.split("\n"),
      description,
      scope: language
    };

    fs.writeFileSync(
      `${path}/${language}.code-snippets`,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  }
}
export default new SnipGen();

function submit(title: string) {
  return vscode.window
    .showInformationMessage(title, "Yes", "No")
    .then((answer) => {
      if (answer === "Yes") {
        return true;
      }
      return false;
    });
}
