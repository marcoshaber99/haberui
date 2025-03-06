import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { metadataImage } from "@/lib/metadata";

// Update the props type to match what FumaDocs expects
export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  // Wait for the params promise to resolve
  const params = await props.params;
  const slugPath = params.slug || [];
  const page = source.getPage(slugPath);

  if (!page) notFound();
  const MDX = page.data.body;

  // Add TypeTable to the MDX components
  const customMdxComponents = {
    ...defaultMdxComponents,
    TypeTable,
  };

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={customMdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

// Update the metadata function to match the same pattern
export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slugPath = params.slug || [];
  const page = source.getPage(slugPath);

  if (!page) notFound();

  return metadataImage.withImage(page.slugs, {
    title: page.data.title,
    description: page.data.description,
  });
}
