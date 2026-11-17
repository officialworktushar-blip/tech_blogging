import { ContentLoadingSkeleton } from "@/components/page-skeleton";
import { SiteShell } from "@/components/site-shell";

export default function Loading() {
  return (
    <SiteShell>
      <ContentLoadingSkeleton />
    </SiteShell>
  );
}
