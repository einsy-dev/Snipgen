interface SnippetI {
  name: string;
  body: string;
  prefix: string;
  description: string;
  language: string;
}

interface SnippetsI {
  [name: string]: {
    prefix: string;
    body: string[];
    description: string;
    scope: string;
  };
}

export type { SnippetI, SnippetsI };
