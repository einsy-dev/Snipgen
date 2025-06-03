import * as vscode from "vscode";

export function getSelection() {
  const selection = vscode.window.activeTextEditor!.selection;

  const selectionRange = new vscode.Range(
    selection.start.line,
    selection.start.character,
    selection.end.line,
    selection.end.character
  );
  return vscode.window.activeTextEditor?.document.getText(selectionRange);
}
