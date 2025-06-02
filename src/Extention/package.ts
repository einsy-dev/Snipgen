export const packageJson = {
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

interface SnippetI {
  language: string;
  path: string;
}
