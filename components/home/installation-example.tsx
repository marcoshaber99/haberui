"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function InstallationExample() {
  const [copied, setCopied] = useState(false);
  const [typed, setTyped] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  const command =
    'npx shadcn@latest add "https://haberui.com/h/feature-toggle.json"';

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    const typeCommand = async () => {
      for (let i = 0; i <= command.length; i++) {
        setTyped(command.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      // Keep cursor visible without blinking after typing completes
    };
    typeCommand();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Terminal Window - Styled for both light and dark modes */}
        <div className="relative overflow-hidden rounded-lg border shadow-md dark:bg-zinc-950 dark:border-zinc-800 bg-zinc-100 border-zinc-200">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 dark:bg-zinc-900 dark:border-zinc-800 bg-zinc-200 border-b border-zinc-300">
            <div className="flex space-x-2">
              <div className="size-3 rounded-full bg-red-500"></div>
              <div className="size-3 rounded-full bg-yellow-500"></div>
              <div className="size-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center space-x-2">
              <Terminal className="size-3.5 dark:text-zinc-500 text-zinc-600" />
              <span className="text-xs dark:text-zinc-500 text-zinc-600 font-medium">
                Terminal
              </span>
            </div>
            <div className="w-14"></div> {/* Spacer for balance */}
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="p-4 font-mono text-sm overflow-x-auto scrollbar-hide dark:bg-zinc-950 bg-zinc-800"
          >
            <div className="flex">
              <span className="select-none mr-2 text-emerald-500">$</span>
              <span className="text-zinc-100">{typed}</span>
              {showCursor && (
                <span className="ml-0.5 inline-block w-2 h-5 bg-zinc-300 opacity-75"></span>
              )}
            </div>
          </div>
        </div>

        {/* Copy Button - Positioned outside the terminal content */}
        <div className="absolute top-2 right-2 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={copyToClipboard}
                  className="p-1.5 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-700/80 
                             bg-zinc-300/80 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-400/80 
                             transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={copied ? "Copied!" : "Copy to clipboard"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Check className="h-4 w-4 text-emerald-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{copied ? "Copied!" : "Copy command"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>
    </div>
  );
}
