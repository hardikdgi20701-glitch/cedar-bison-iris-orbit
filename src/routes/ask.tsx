import { createFileRoute } from "@tanstack/react-router";
import { ResearchPanel } from "@/components/markets/ResearchPanel";

export const Route = createFileRoute("/ask")({
  component: AskPage,
});

function AskPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">PlanVista</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight">Ask anything</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Markets, SIPs, charts, tax words, or how a beginner starts. Answers stay short enough to read. This is a
        classroom, not a buy or sell call.
      </p>
      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-rail">
        <ResearchPanel variant="page" />
      </div>
    </div>
  );
}
