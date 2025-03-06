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

export default async function Page(props: { params: { slug?: string[] } }) {
  // Use empty array for root /docs path
  const slugPath = props.params.slug || [];
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

export async function generateMetadata(props: { params: { slug?: string[] } }) {
  const slugPath = props.params.slug || [];
  const page = source.getPage(slugPath);

  if (!page) notFound();

  return metadataImage.withImage(page.slugs, {
    title: page.data.title,
    description: page.data.description,
  });
}
