import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { metadataImage } from "@/lib/metadata";

export default async function Page() {
  // Get the index page from the source
  const page = source.getPage([]);
  if (!page) {
    return <div>Documentation index not found</div>;
  }

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}
export async function generateMetadata() {
  const page = source.getPage([]);
  if (!page) return {};

  return metadataImage.withImage(page.slugs, {
    title: page.data.title,
    description: page.data.description,
  });
}
