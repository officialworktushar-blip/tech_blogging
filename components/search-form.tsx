import { Search } from "lucide-react";

type SearchFormProps = {
  defaultQuery?: string;
};

export function SearchForm({ defaultQuery = "" }: SearchFormProps) {
  return (
    <form
      role="search"
      action="/search"
      method="get"
      className="mt-6 flex flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="search-q" className="sr-only">
        Search help articles
      </label>

      <input
        id="search-q"
        name="q"
        type="search"
        defaultValue={defaultQuery}
        placeholder="Search articles, errors, and fixes"
        autoComplete="off"
        className="h-11 w-full rounded-md border border-line bg-background px-3.5 text-sm text-foreground placeholder:text-subtle"
      />

      <button
        type="submit"
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
      >
        <Search aria-hidden="true" className="size-4" />
        Search
      </button>
    </form>
  );
}
