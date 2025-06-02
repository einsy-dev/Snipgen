import * as vscode from "vscode";
import { getSelection } from "../utils";

class Clipboard {
  constructor() {}

  public async stringifyAndCopy() {
    await vscode.env.clipboard.writeText(JSON.stringify(getSelection()));
  }
}

export default new Clipboard();
