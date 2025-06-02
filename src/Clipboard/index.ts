import * as vscode from "vscode";

class Clipboard {
  constructor() {}

  public async stringifyAndCopy() {
    const selection = vscode.window.activeTextEditor?.selection;
    if (!selection || selection.isEmpty) return;
    const selectionRange = new vscode.Range(
      selection.start.line,
      selection.start.character,
      selection.end.line,
      selection.end.character
    );

    await vscode.env.clipboard.writeText(
      JSON.stringify(
        vscode.window.activeTextEditor?.document.getText(selectionRange)
      )
    );
  }
}

export default new Clipboard();
