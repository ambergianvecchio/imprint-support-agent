"use client";

import { useState, useRef, useEffect } from "react";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import StarterChips from "@/components/StarterChips";
import ImprintLogo from "@/components/ImprintLogo";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hi! I'm Imprint's support assistant. Ask me anything about your subscription, billing, or how to get the most out of the app.";

export default function Home() {
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
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
    }
  };

  return (
    <div className="flex h-dvh flex-col bg-imprint-bg">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-imprint-border bg-imprint-surface px-4 py-3 sm:px-6">
        <ImprintLogo size="md" />
        <div>
          <h1 className="text-sm font-semibold text-imprint-dark">Imprint Support</h1>
          <p className="text-xs text-imprint-muted">Typically replies instantly</p>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} />
          ))}

          {isLoading && <TypingIndicator />}

          {!hasUserSent && !isLoading && (
            <div className="mt-2">
              <StarterChips onSelect={sendMessage} />
            </div>
          )}

          {/* Escalation link — appears after 2+ agent turns beyond greeting */}
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
      <div className="border-t border-imprint-border bg-imprint-surface px-4 pb-4 pt-3 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
