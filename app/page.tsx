import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        {siteConfig.name}
      </h1>
    </main>
  );
}
