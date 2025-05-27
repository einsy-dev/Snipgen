import * as vscode from "vscode";
import * as fs from "fs";
import { SnippetsI } from "./interface";
import { transform } from "detype";

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
      fs.writeFileSync(`${path}/${language}.code-snippets`, "{}", "utf8");
    }
    const data: SnippetsI = JSON.parse(
      fs.readFileSync(`${path}/${language}.code-snippets`, "utf-8") || "{}"
    );

    if (data[name] && !(await submit())) {
      return;
    }
    data[name] = {
      prefix,
      body: body.split("\n"),
      description,
      scope: langScope[language] || language
    };

    fs.writeFileSync(
      `${path}/${language}.code-snippets`,
      JSON.stringify(data, null, 2),
      "utf8"
    );

    if (language === "typescript" || language === "typescriptreact") {
      await transform(body, "file.tsx")
        .then(async (result) => {
          let lang = language.replace("typescript", "javascript");

          if (!fs.existsSync(`${path}/${lang}.code-snippets`)) {
            fs.writeFileSync(`${path}/${lang}.code-snippets`, "{}", "utf8");
          }

          const newData: SnippetsI = JSON.parse(
            fs.readFileSync(`${path}/${language}.code-snippets`, "utf-8") ||
              "{}"
          );

          if (newData[name] && !(await submit())) {
            return;
          }
          newData[name] = {
            prefix,
            body: result.split("\n"),
            description,
            scope: langScope[lang] || lang
          };

          fs.writeFileSync(
            `${path}/${lang}.code-snippets`,
            JSON.stringify(newData, null, 2),
            "utf8"
          );
        })
        .catch((e) => console.error(e));
    }
  }
}
export default new SnipGen();

function submit() {
  return vscode.window
    .showInformationMessage("Snippet already exists. Override?", "Yes", "No")
    .then((answer) => {
      if (answer === "Yes") {
        return true;
      }
      return false;
    });
}

let langScope: { [key: string]: string } = {
  javascript: "javascript, javascriptreact",
  typescript: "typescript, typescriptreact"
};
