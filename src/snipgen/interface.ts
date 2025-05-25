interface SnippetsI {
  [key: string]: {
    prefix: string;
    body: string[];
    description: string;
  };
}

export type { SnippetsI };
