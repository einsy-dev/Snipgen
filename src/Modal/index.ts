import * as vscode from "vscode";

class Modal {
  /**
   * @param prompt Text to display under input
   * @param required Will repeat input and warn if value empty and not undefined
   * @param defaultValue
   * @returns User input
   */
  async Input(prompt: string, { required = false, defaultValue = "" } = {}) {
    return await vscode.window
      .showInputBox({
        prompt,
        ignoreFocusOut: true
      })
      .then(async (res): Promise<string> => {
        if (required && !res && res !== undefined) {
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
