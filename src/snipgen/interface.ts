interface SnippetsI {
  [key: string]: {
    prefix: string;
    body: string[];
    description: string;
    scope: string;
  };
}

export type { SnippetsI };
