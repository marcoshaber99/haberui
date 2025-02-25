// components/demos/demo-factory.tsx
"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";

interface TabDemoProps {
  preview: React.ReactNode;
  code: string;
  title?: string;
  defaultTab?: "preview" | "code";
}

export function TabDemo({
  preview,
  code,
  title,
  defaultTab = "preview",
}: TabDemoProps) {
  return (
    <div className="rounded-lg border">
      {title && (
        <div className="p-4 border-b">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
      )}
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="preview"
            className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2.5 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2.5 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-6">
          {preview}
        </TabsContent>
        <TabsContent value="code" className="p-0">
          <CodeBlock code={code} language="tsx" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
