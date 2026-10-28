import { createFileRoute } from "@tanstack/react-router";
import { DeepSearch } from "@/components/markets/DeepSearch";

type SearchParams = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">Deep Search</h1>
        <p className="mt-1 text-sm text-muted">
          Live NSE & BSE quotes plus Google Finance, Google Search and Google News for further research.
        </p>
      </div>
      <DeepSearch initial={q ?? ""} />
    </div>
  );
}
