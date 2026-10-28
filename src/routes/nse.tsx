import { createFileRoute } from "@tanstack/react-router";
import { NseBoard } from "@/components/markets/NseBoard";

export const Route = createFileRoute("/nse")({ component: NsePage });

function NsePage() {
  return <NseBoard />;
}
