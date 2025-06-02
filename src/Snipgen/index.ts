import Modal from "../Modal";
import { State, StateI } from "../Store";
import { snipgenService, SnipgenServiceI } from "./service";

class Snipgen {
  constructor(
    private readonly snipgenService: SnipgenServiceI,
    private readonly state: StateI
  ) {}
  async parse() {
    const selection = this.state.editor.selection;
    if (!selection || selection.isEmpty) return;

    const selectionRange = new this.state.range(
      selection.start.line,
      selection.start.character,
      selection.end.line,
      selection.end.character
    );

    const body = this.state.editor.document.getText(selectionRange);
    if (!body) return;

    const name = await Modal.Input("Snippet name (required)", {
      required: true
    });
    if (!name) return;

    const prefix = await Modal.Input("Snippet prefix 'trigger' (required)", {
      required: true
    });
    if (!prefix) return;

    const description = (await Modal.Input("Snippet description")) || "";
    await this.snipgenService
      .write({
        name,
        body,
        prefix,
        description,
        language: this.state.editor.document.languageId
      })
      .catch((err) => Modal.Error(err));
  }
}

export default new Snipgen(snipgenService, State);
