import Modal from "../Modal";
import { State, StateI } from "../Store";
import fs from "fs";
import { SnippetI } from "./interface";

class SnipgenService {
  private _dir: string;

  constructor(private readonly state: StateI) {
    this._dir = state.root + "./vscode";
    if (!fs.existsSync(this._dir)) {
      fs.mkdirSync(this._dir, { recursive: true });
    }
  }
  read(language: string) {
    if (fs.existsSync(`${this._dir}/${language}.code-snippets`)) {
      return JSON.parse(
        fs.readFileSync(`${this._dir}/${language}.code-snippets`, "utf-8") ||
          "{}"
      );
    }
    return {};
  }

  async write(snippet: SnippetI) {
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
      scope: this.state.langScope[snippet.language] || snippet.language
    };

    fs.writeFileSync(
      `${this._dir}/${snippet.language}.code-snippets`,
      JSON.stringify(data, null, 2),
      "utf8"
    );

    Modal.Info("Snippet saved.");
  }
}
export const snipgenService = new SnipgenService(State);
export type SnipgenServiceI = typeof snipgenService;
