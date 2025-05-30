import * as vscode from "vscode";
import * as fs from "fs";
import { SnippetI, SnippetsI } from "./interface";
import Modal from "../Modal";

class Storage {
  dir: string | undefined;

  langScope: { [key: string]: string } = {
    javascript: "javascript, javascriptreact, typescript, typescriptreact",
    typescript: "typescript, typescriptreact"
  };

  constructor() {
    if (!vscode.workspace.workspaceFolders) return;
    this.dir = vscode.workspace.workspaceFolders[0].uri.fsPath + "/.vscode";
  }

  init() {
    if (!this.dir) return;
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir, { recursive: true });
    }
  }

  read(language: string): SnippetsI | undefined {
    this.init();
    if (!this.dir) return;
    if (fs.existsSync(`${this.dir}/${language}.code-snippets`)) {
      return JSON.parse(
        fs.readFileSync(`${this.dir}/${language}.code-snippets`, "utf-8") ||
          "{}"
      );
    }
    return {};
  }

  async write(snippet: SnippetI) {
    this.init();
    if (!this.dir) return;
    const data = this.read(snippet.language);
    if (!data) return;
    if (data[snippet.name]) {
      if (!(await Modal.Confirm("Snippet already exists. Override?"))) return;
    }

    data[snippet.name] = {
      prefix: snippet.prefix
        .split(",")
        .map((p) => p.trim())
        .filter((el) => el),
      body: snippet.body.split("\n"),
      description: snippet.description,
      scope: this.langScope[snippet.language] || snippet.language
    };

    fs.writeFileSync(
      `${this.dir}/${snippet.language}.code-snippets`,
      JSON.stringify(data, null, 2),
      "utf8"
    );

    Modal.Info("Snippet saved.");
  }
}

export default new Storage();
