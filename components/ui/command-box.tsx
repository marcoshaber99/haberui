"use client";

import type React from "react";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CommandBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  command: string;
}

export function CommandBox({ command, className, ...props }: CommandBoxProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn("relative rounded-md bg-muted p-4", className)}
      {...props}
    >
      <pre className="text-sm font-mono overflow-x-auto whitespace-pre scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        <code className="inline-block">{command}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={copyToClipboard}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">Copy command</span>
      </Button>
    </div>
  );
}
