import { ArticleGridSkeleton } from "@/components/article-grid-skeleton";
import { PageHeadingSkeleton } from "@/components/page-skeleton";
import { SiteShell } from "@/components/site-shell";

export default function Loading() {
  return (
    <SiteShell>
      <main className="container-page pb-16 pt-8 sm:pt-10 lg:pt-12">
        <PageHeadingSkeleton className="mt-6" />
        <ArticleGridSkeleton className="mt-10" />
      </main>
    </SiteShell>
  );
}
