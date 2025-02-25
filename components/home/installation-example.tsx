"use client";

import { useState, useEffect } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { motion } from "motion/react";

export function InstallationExample() {
  const [copied, setCopied] = useState(false);
  const [typed, setTyped] = useState("");
  const command =
    'npx shadcn@latest add "https://haberui.com/h/thinking-state.json"';

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
    };
    typeCommand();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden rounded-md bg-gray-900 shadow-md">
          <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800">
            <div className="flex space-x-1.5">
              <div className="size-2 rounded-full bg-red-500"></div>
              <div className="size-2 rounded-full bg-yellow-500"></div>
              <div className="size-2 rounded-full bg-green-500"></div>
            </div>
            <Terminal className="size-4 text-gray-400" />
          </div>
          <div className="p-3 font-mono text-xs sm:text-sm">
            <span className="select-none mr-1.5 text-green-400">$</span>
            <span className="text-gray-300">{typed}</span>
            <span className="animate-blink">|</span>
          </div>
        </div>
        <motion.button
          onClick={copyToClipboard}
          className="absolute top-8 right-2 p-1.5 text-gray-400 hover:text-white transition-colors focus:outline-hidden focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
