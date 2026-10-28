type Props = {
  data: number[];
  className?: string;
  up?: boolean;
};

export function Sparkline({ data, className = "h-8 w-24", up }: Props) {
  if (!data.length) return <div className={className} />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const w = 96;
  const h = 32;
  const coords = data.map((v, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * w;
    const y = h - ((v - min) / span) * (h - 6) - 3;
    return { x, y };
  });
  const pts = coords.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const last = coords[coords.length - 1]!;
  const area = `0,${h} ${pts} ${w},${h}`;
  const positive = up ?? (data[data.length - 1]! >= data[0]!);
  const color = positive ? "var(--color-up)" : "var(--color-down)";
  const fill = positive ? "var(--color-up-soft)" : "var(--color-down-soft)";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" aria-hidden>
      <polygon fill={fill} points={area} />
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" points={pts} />
      <circle cx={last.x} cy={last.y} r="1.7" fill={color} />
    </svg>
  );
}
