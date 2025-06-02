import * as vscode from "vscode";

class Store {
  private _root;
  private _editor;
  private _range;
  private _clipboard;

  langScope: { [key: string]: string } = Object.freeze({
    javascript: "javascript, javascriptreact, typescript, typescriptreact",
    javascriptreact: "javascriptreact, typescriptreact",
    typescript: "typescript, typescriptreact"
  });

  constructor() {
    if (!vscode.workspace.workspaceFolders || !vscode.window.activeTextEditor) {
      throw new Error("no worspace folders");
    }

    this._root = vscode.workspace.workspaceFolders[0].uri.fsPath;
    this._editor = vscode.window.activeTextEditor;
    this._range = vscode.Range;
    this._clipboard = vscode.env.clipboard;
    if (!this._root || !this._editor || !this._range || !this._clipboard)
      throw new Error("State err");
  }

  get root() {
    return this._root;
  }
  get editor() {
    return this._editor;
  }
  get range() {
    return this._range;
  }
  get clipboard() {
    return this._clipboard;
  }
}

export const State = new Store();
export type StateI = typeof State;
