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
      className={cn("group relative rounded-md bg-muted", className)}
      {...props}
    >
      <div className="relative flex items-center">
        <pre className="overflow-x-auto py-4 pl-4 pr-12 text-sm font-mono scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
          <code className="inline-block min-w-full">{command}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 h-8 w-8"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy command</span>
        </Button>
      </div>
    </div>
  );
}
