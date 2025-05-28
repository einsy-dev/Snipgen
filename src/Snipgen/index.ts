import { SnippetI } from "./interface";
import { removeTypes } from "remove-types";
import Storage from "./Storage";
import Modal from "../Modal";

class SnipGen {
  async parse(snippet: SnippetI) {
    await Storage.write(snippet).catch((err) => Modal.Error(err));
    if (
      snippet.language === "typescript" ||
      snippet.language === "typescriptreact"
    ) {
      const language = snippet.language.replace("typescript", "javascript");
      await removeTypes(snippet.body)
        .then(async (result: string) => {
          await Storage.write({
            ...snippet,
            body: result,
            language
          });
        })
        .catch((err) => Modal.Error(err));
    }
  }
}
export default new SnipGen();
