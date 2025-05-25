// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import snipgen from "./snipgen";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.sayHello",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        throw new Error("No active editor");
      }
      const selection = editor.selection;
      if (selection && !selection.isEmpty) {
        const selectionRange = new vscode.Range(
          selection.start.line,
          selection.start.character,
          selection.end.line,
          selection.end.character
        );
        const body = editor.document.getText(selectionRange);

        const name = await vscode.window.showInputBox({
          prompt: "Name",
          ignoreFocusOut: true
        });

        const prefix = await vscode.window.showInputBox({
          prompt: "Title",
          ignoreFocusOut: true
        });

        const description = await vscode.window.showInputBox({
          prompt: "Description",
          ignoreFocusOut: true
        });

        await snipgen.parse(
          name!,
          body!,
          prefix!,
          description!,
          vscode.window.activeTextEditor!.document.languageId
        );
      }
    }
  );
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
