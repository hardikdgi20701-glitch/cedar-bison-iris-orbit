function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-fg">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ChatMarkdown({ text }: { text: string }) {
  const blocks = text
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
  return (
    <div className="space-y-2 text-sm leading-relaxed text-pretty">
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const bullets = lines.filter((l) => /^[-•*]\s+/.test(l));
        if (bullets.length >= 2 && bullets.length === lines.length) {
          return (
            <ul key={i} className="list-disc space-y-1 pl-4 marker:text-primary">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.replace(/^[-•*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }
        const numbered = lines.filter((l) => /^\d+[.)]\s+/.test(l));
        if (numbered.length >= 2 && numbered.length === lines.length) {
          return (
            <ol key={i} className="list-decimal space-y-1 pl-4 marker:text-primary">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.replace(/^\d+[.)]\s+/, ""))}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={i} className="whitespace-pre-wrap">
            {lines.map((l, j) => (
              <span key={j}>
                {j > 0 ? <br /> : null}
                {renderInline(l.replace(/^[-•*]\s+/, ""))}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
