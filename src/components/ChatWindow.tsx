"use client";

import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import StarterChips from "./StarterChips";
import ImprintLogo from "./ImprintLogo";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  windowId: number;
  index: number;
  totalOpen: number;
  onClose: () => void;
  onNewWindow: () => void;
}

const GREETING =
  "Hi! I'm Imprint's support assistant. Ask me anything about your subscription, billing, or how to get the most out of the app.";

export default function ChatWindow({
  index,
  onClose,
  onNewWindow,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserSent, setHasUserSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const agentTurns = messages.filter((m) => m.role === "assistant").length;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Position: first window at right-6, each additional one shifts left
  const rightOffset = 24 + index * 410; // 24px base (right-6) + 410px per window

  const sendMessage = async (text: string) => {
    setHasUserSent(true);
    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.filter((m) => m.content !== GREETING),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Request failed");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");

      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setIsLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          const data = line.replace("data: ", "");
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            assistantContent += parsed.text;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: assistantContent,
              };
              return updated;
            });
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      const fallback =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or email info@imprintapp.com for help.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fallback },
      ]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-imprint-bg sm:inset-auto sm:bottom-6 sm:right-[var(--chat-right)] sm:h-[560px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-imprint-border sm:shadow-2xl"
      style={{ "--chat-right": `${rightOffset}px` } as React.CSSProperties}
    >
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-imprint-border bg-imprint-surface px-4 py-3">
        <ImprintLogo size="md" />
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-imprint-dark">
            Imprint Support
          </h2>
          <p className="text-xs text-imprint-muted">
            Typically replies instantly
          </p>
        </div>
        <div className="flex items-center gap-1">
          {/* New conversation button — hidden on mobile */}
          {hasUserSent && (
            <button
              onClick={onNewWindow}
              className="hidden h-8 w-8 items-center justify-center rounded-lg text-imprint-muted transition-colors hover:bg-imprint-bg hover:text-imprint-dark sm:flex"
              aria-label="New conversation"
              title="New conversation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
            </button>
          )}
          {/* Close button */}
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-imprint-muted transition-colors hover:bg-imprint-bg hover:text-imprint-dark"
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} />
          ))}

          {isLoading && <TypingIndicator />}

          {!hasUserSent && !isLoading && (
            <div className="mt-2">
              <StarterChips onSelect={sendMessage} />
            </div>
          )}

          {agentTurns >= 3 && !isLoading && (
            <div className="text-center">
              <a
                href="mailto:info@imprintapp.com?subject=Support%20Request"
                className="text-xs text-imprint-muted underline transition-colors hover:text-imprint"
              >
                Need more help? Talk to a human
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-imprint-border bg-imprint-surface px-3 pb-3 pt-2">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
