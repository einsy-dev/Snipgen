import * as vscode from "vscode";

class Modal {
  async Input(prompt: string, { required = false, defaultValue = "" } = {}) {
    return await vscode.window
      .showInputBox({
        prompt,
        ignoreFocusOut: true
      })
      .then(async (res): Promise<string> => {
        if (res === undefined) throw new Error("Modal closed.");
        if (required && !res) {
          this.Warning("Please enter a value.");
          return await this.Input(prompt, { required, defaultValue });
        }
        return res || defaultValue;
      });
  }

  async Confirm(prompt: string) {
    return await vscode.window
      .showInformationMessage(prompt, "Yes", "No")
      .then((answer) => (answer === "Yes" ? true : false));
  }

  async Info(prompt: string) {
    return await vscode.window.showInformationMessage(prompt);
  }
  async Warning(prompt: string) {
    return await vscode.window.showWarningMessage(prompt);
  }
  async Error(prompt: string) {
    return await vscode.window.showErrorMessage(prompt);
  }
}

export default new Modal();
