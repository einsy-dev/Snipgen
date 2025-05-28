// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import snipgen from "./Snipgen";
import Modal from "./Modal";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "snipgen.parse",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || !vscode.workspace.workspaceFolders) return;

      const selection = editor.selection;
      if (!selection || selection.isEmpty) return;

      const selectionRange = new vscode.Range(
        selection.start.line,
        selection.start.character,
        selection.end.line,
        selection.end.character
      );

      const body = editor.document.getText(selectionRange);
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
      await snipgen.parse({
        name,
        body,
        prefix,
        description,
        language: editor.document.languageId
      });
    }
  );
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
