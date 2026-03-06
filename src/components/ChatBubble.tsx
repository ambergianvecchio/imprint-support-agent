"use client";

import { useMemo } from "react";
import ImprintLogo from "./ImprintLogo";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
}

function renderMarkdown(text: string): string {
  let html = text
    // Bold: **text**
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic: *text*
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Inline code: `text`
    .replace(/`(.+?)`/g, '<code class="rounded bg-black/5 px-1 py-0.5 text-xs">$1</code>')
    // Links: [text](url)
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-imprint hover:text-imprint-hover">$1</a>'
    )
    // Line breaks
    .replace(/\n/g, "<br />");

  return html;
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  const isAgent = role === "assistant";
  const html = useMemo(() => renderMarkdown(content), [content]);

  return (
    <div className={`flex gap-3 ${isAgent ? "justify-start" : "justify-end"}`}>
      {isAgent && <ImprintLogo />}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isAgent
            ? "rounded-tl-sm bg-imprint-surface text-imprint-dark shadow-sm ring-1 ring-imprint-border"
            : "rounded-tr-sm bg-imprint text-white"
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
