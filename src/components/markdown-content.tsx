import Image from "next/image";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

function parseInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${keyPrefix}-strong-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return <span key={`${keyPrefix}-text-${index}`}>{part}</span>;
  });
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const lines = content.split("\n");

  return (
    <div className={className}>
      {lines.map((rawLine, index) => {
        const line = rawLine.trim();
        if (!line) return <div key={`space-${index}`} className="h-3" />;

        const imgMatch = line.match(/^!\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
        if (imgMatch) {
          const alt = imgMatch[1] || "Imagen";
          const src = imgMatch[2];
          return (
            <div key={`img-${index}`} className="my-4 overflow-hidden rounded-2xl">
              <Image src={src} alt={alt} width={1600} height={1000} className="h-auto w-full object-cover" />
            </div>
          );
        }

        if (line.startsWith("### ")) {
          return (
            <h4 key={`h3-${index}`} className="mt-2 text-2xl font-semibold">
              {parseInline(line.slice(4), `h3-${index}`)}
            </h4>
          );
        }

        if (line.startsWith("## ")) {
          return (
            <h3 key={`h2-${index}`} className="mt-3 text-3xl font-semibold">
              {parseInline(line.slice(3), `h2-${index}`)}
            </h3>
          );
        }

        if (line.startsWith("# ")) {
          return (
            <h2 key={`h1-${index}`} className="mt-4 text-4xl font-semibold tracking-tight">
              {parseInline(line.slice(2), `h1-${index}`)}
            </h2>
          );
        }

        return (
          <p key={`p-${index}`} className="text-lg leading-relaxed text-foreground/95">
            {parseInline(line, `p-${index}`)}
          </p>
        );
      })}
    </div>
  );
}
