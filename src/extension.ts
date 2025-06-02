// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import Snipgen from "./Snipgen";
import Extention from "./Extention";
import Clipboard from "./Clipboard";

export function activate(context: vscode.ExtensionContext) {
  const snipgenParse = vscode.commands.registerCommand("snipgen.parse", () =>
    Snipgen.parse()
  );

  const extentionInit = vscode.commands.registerCommand(
    "snipgen.initExtention",
    () => Extention.init()
  );

  const copyStringify = vscode.commands.registerCommand(
    "snipgen.copyStringify",
    () => Clipboard.stringifyAndCopy()
  );

  context.subscriptions.push(snipgenParse, extentionInit, copyStringify);
}

// This method is called when your extension is deactivated
export function deactivate() {}
