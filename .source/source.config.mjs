// source.config.ts
import { defineDocs } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    // You can customize your docs schema here if needed
  },
  meta: {
    // Meta configuration
  }
});
export {
  docs
};
