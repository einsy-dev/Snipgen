import * as vscode from "vscode";
import { SnippetI } from "./interface";

class Config {
  root: string;
  vscode: string;
  ext: string;

  constructor() {
    if (!vscode.workspace.workspaceFolders) throw new Error("Workspace not found");
    this.root = vscode.workspace.workspaceFolders[0].uri.fsPath;
    this.vscode = this.root + "/.vscode";
    this.ext = this.root + "/extention";
  }

  langScope: { [key: string]: string } = Object.freeze({
    javascript: "javascript, javascriptreact, typescript, typescriptreact",
    javascriptreact: "javascriptreact, typescriptreact",
    typescript: "typescript, typescriptreact"
  });

  license =
    'MIT License\n\nCopyright (c) 2025 einsy.dev\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n';

  packageJson = {
    name: "",
    version: "0.0.1",
    description: "",
    license: "ISC",
    type: "commonjs",
    publisher: "",
    categories: ["Snippets"],
    engines: {
      vscode: "^1.100.0"
    },
    contributes: {
      snippets: [] as SnippetI[]
    }
  };

  readme = "";

  changeLog =
    '# Change Log\n\nAll notable changes to the "snipgen" extension will be documented in this file.\n\nCheck [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.\n\n## [Unreleased]\n\n- Initial release\n';
}

export default new Config();
