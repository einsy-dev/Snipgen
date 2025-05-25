export const extention = {
  name: "<extention-name>",
  version: "1.0.0",
  author: "<author>",
  license: "ISC",
  description: "<description>",
  contributes: {
    snippets: [] as SnippetI[]
  },
  scrips: {
    build: "vsce package",
    publish: "vsce publish"
  },
  categories: ["Snippets"],
  devDependencies: {
    "vsce": "^2.15.0"
  }
};

interface SnippetI {
  language: string;
  path: string;
}