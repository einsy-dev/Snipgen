import Modal from "../Modal";
import fs from "fs";
import * as vscode from "vscode";
import Config from "../Config";
import { getSelection } from "../utils";
import { SnippetI } from "./interface";

class Snipgen {
  async parse() {
    const body = getSelection();
    if (!body) return;

    const name = await Modal.Input("Snippet name (required)", {
      required: true
    });

    const prefix = await Modal.Input("Snippet prefix 'trigger' (required)", {
      required: true
    });

    const description = await Modal.Input("Snippet description");

    let language = vscode.window.activeTextEditor?.document.languageId;
    if (!language) throw new Error("language not found");

    await this.write({
      name,
      body,
      prefix,
      description,
      language
    }).catch((err) => Modal.Error(err));
  }

  async write(snippet: SnippetI) {
    const data = this.read(snippet.language);

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
      scope: Config.langScope[snippet.language] || snippet.language
    };

    fs.writeFileSync(
      `${Config.vscode}/${snippet.language}.code-snippets`,
      JSON.stringify(data, null, 2),
      "utf8"
    );

    Modal.Info("Snippet saved.");
  }
  private read(language: string) {
    if (fs.existsSync(`${Config.vscode}/${language}.code-snippets`)) {
      return JSON.parse(
        fs.readFileSync(
          `${Config.vscode}/${language}.code-snippets`,
          "utf-8"
        ) || "{}"
      );
    }
    return {};
  }
}

export default new Snipgen();
