import { cn } from "@/lib/utils";

/** Tiny looping bull/bear clip for last-trade colour. */
export function MascotClip({
  up,
  className,
  size = "md",
}: {
  up: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "lg" ? "size-24" : size === "sm" ? "size-10" : "size-14";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border shadow-inner",
        up ? "ring-1 ring-emerald-500/40" : "ring-1 ring-rose-500/40",
        dim,
        className,
      )}
      title={up ? "Last close / last trade was green — bull" : "Last close / last trade was red — bear"}
    >
      <video
        className="size-full object-cover"
        src={up ? "/mascots/bull.mp4" : "/mascots/bear.mp4"}
        poster={up ? "/mascots/bull.jpg" : "/mascots/bear.jpg"}
        autoPlay
        muted
        playsInline
        loop
      />
    </div>
  );
}
