"use client";

import ImprintLogo from "./ImprintLogo";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <ImprintLogo />
      <div className="rounded-2xl rounded-tl-sm bg-imprint-surface px-4 py-3 shadow-sm ring-1 ring-imprint-border">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-imprint-muted/50 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-imprint-muted/50 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-imprint-muted/50 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
