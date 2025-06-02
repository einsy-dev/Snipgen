import { State, StateI } from "../Store";

class Clipboard {
  constructor(private readonly state: StateI) {}

  public async stringifyAndCopy() {
    const selection = this.state.editor.selection;
    if (!selection || selection.isEmpty) return;
    const selectionRange = new this.state.range(
      selection.start.line,
      selection.start.character,
      selection.end.line,
      selection.end.character
    );

    await this.state.clipboard.writeText(
      JSON.stringify(this.state.editor.document.getText(selectionRange))
    );
  }
}

export default new Clipboard(State);
