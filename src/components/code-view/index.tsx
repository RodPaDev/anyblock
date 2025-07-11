import Prism from "prismjs";
import { useEffect } from "react";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";

import "./theme.css";

export interface CodeViewProps {
  code: string;
  lang: string;
}

export function CodeView({ code, lang }: CodeViewProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, lang]);

  return (
    <pre className="p-2 bg-transparent border-none rounded-none m-0 text-xs">
      <code className={`language-${lang}`}>{code}</code>
    </pre>
  );
}
