"use client";

import type React from "react";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // You can choose a different theme
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language: string;
}

export function CodeBlock({
  code,
  language,
  className,
  ...props
}: CodeBlockProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, [code, language]);

  return (
    <pre className={cn("p-4 rounded-md", className)} {...props}>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}
