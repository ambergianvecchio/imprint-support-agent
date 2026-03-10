"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import StarterChips from "./StarterChips";
import ImprintLogo from "./ImprintLogo";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: number;
  messages: Message[];
  hasUserSent: boolean;
  preview: string;
}

const GREETING =
  "Hi! I'm Imprint's support assistant. Ask me anything about your subscription, billing, or how to get the most out of the app.";

function createConversation(id: number): Conversation {
  return {
    id,
    messages: [{ role: "assistant", content: GREETING }],
    hasUserSent: false,
    preview: "New conversation",
  };
}

type View = "chat" | "history";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    createConversation(1),
  ]);
  const [activeId, setActiveId] = useState(1);
  const [nextId, setNextId] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<View>("chat");
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId)!;
  const messages = active.messages;
  const hasUserSent = active.hasUserSent;
  const agentTurns = messages.filter((m) => m.role === "assistant").length;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const updateConversation = useCallback(
    (id: number, updater: (conv: Conversation) => Conversation) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? updater(c) : c))
      );
    },
    []
  );

  const startNewConversation = () => {
    const newConv = createConversation(nextId);
    setConversations((prev) => [...prev, newConv]);
    setActiveId(nextId);
    setNextId((n) => n + 1);
    setIsLoading(false);
    setView("chat");
  };

  const switchConversation = (id: number) => {
    setActiveId(id);
    setIsLoading(false);
    setView("chat");
  };

  const sendMessage = async (text: string) => {
    const convId = activeId;
    const userMessage: Message = { role: "user", content: text };
    const preview = text.length > 30 ? text.slice(0, 30) + "…" : text;

    updateConversation(convId, (c) => ({
      ...c,
      messages: [...c.messages, userMessage],
      hasUserSent: true,
      preview: c.hasUserSent ? c.preview : preview,
    }));

    const updatedMessages = [...messages, userMessage];
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

      updateConversation(convId, (c) => ({
        ...c,
        messages: [...c.messages, { role: "assistant", content: "" }],
      }));
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
            const content = assistantContent;
            updateConversation(convId, (c) => {
              const updated = [...c.messages];
              updated[updated.length - 1] = {
                role: "assistant",
                content,
              };
              return { ...c, messages: updated };
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
      updateConversation(convId, (c) => ({
        ...c,
        messages: [...c.messages, { role: "assistant", content: fallback }],
      }));
    }
  };

  return (
    <>
      {/* Chat bubble trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-imprint py-3 pl-4 pr-5 shadow-lg transition-all hover:scale-105 hover:bg-imprint-hover"
          aria-label="Open support chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-white"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium text-white">Chat with us</span>
        </button>
      )}

      {/* Chat widget panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-imprint-bg sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[560px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-imprint-border sm:shadow-2xl">
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-imprint-border bg-imprint-surface px-4 py-3">
            {view === "history" ? (
              <>
                <button
                  onClick={() => setView("chat")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-imprint-muted transition-colors hover:bg-imprint-bg hover:text-imprint-dark"
                  aria-label="Back to chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <h2 className="flex-1 text-sm font-semibold text-imprint-dark">
                  Conversations
                </h2>
              </>
            ) : (
              <>
                <ImprintLogo size="md" />
                <div className="flex-1">
                  <h2 className="text-sm font-semibold text-imprint-dark">
                    Imprint Support
                  </h2>
                  <p className="text-xs text-imprint-muted">
                    Typically replies instantly
                  </p>
                </div>
              </>
            )}
            <div className="flex items-center gap-1">
              {view === "chat" && (
                <>
                  {/* History button — show when there are past conversations */}
                  {conversations.length > 1 && (
                    <button
                      onClick={() => setView("history")}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-imprint-muted transition-colors hover:bg-imprint-bg hover:text-imprint-dark"
                      aria-label="Chat history"
                      title="Chat history"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                  {/* New conversation button */}
                  {hasUserSent && (
                    <button
                      onClick={startNewConversation}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-imprint-muted transition-colors hover:bg-imprint-bg hover:text-imprint-dark"
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
                </>
              )}
              {/* Close button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setView("chat");
                }}
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

          {/* History view */}
          {view === "history" ? (
            <div className="flex-1 overflow-y-auto">
              <div className="p-3">
                <button
                  onClick={startNewConversation}
                  className="mb-2 flex w-full items-center gap-2 rounded-xl border border-dashed border-imprint-border px-4 py-3 text-sm text-imprint transition-colors hover:border-imprint hover:bg-imprint-light/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                  New conversation
                </button>
                <div className="flex flex-col gap-1">
                  {[...conversations].reverse().map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => switchConversation(conv.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                        conv.id === activeId
                          ? "bg-imprint-light/30 ring-1 ring-imprint"
                          : "hover:bg-imprint-surface"
                      }`}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-imprint-light/50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-4 w-4 text-imprint"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.16 6.57.524 1.437.237 2.43 1.55 2.43 3.012v5.928c0 1.462-.993 2.775-2.43 3.012a41.116 41.116 0 0 1-2.96.36.076.076 0 0 0-.063.046l-2.06 4.12a.75.75 0 0 1-1.341-.046l-1.773-4.074a.076.076 0 0 0-.063-.046 41.12 41.12 0 0 1-2.88-.351C4.073 14.289 3.08 12.976 3.08 11.514V5.536c0-1.462.993-2.775 2.35-3.012Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-imprint-dark">
                          {conv.preview}
                        </p>
                        <p className="text-xs text-imprint-muted">
                          {conv.messages.length === 1
                            ? "No messages yet"
                            : `${conv.messages.filter((m) => m.role === "user").length} message${conv.messages.filter((m) => m.role === "user").length !== 1 ? "s" : ""}`}
                        </p>
                      </div>
                      {conv.id === activeId && (
                        <div className="h-2 w-2 shrink-0 rounded-full bg-imprint" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-4"
              >
                <div className="flex flex-col gap-4">
                  {messages.map((msg, i) => (
                    <ChatBubble
                      key={i}
                      role={msg.role}
                      content={msg.content}
                    />
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
            </>
          )}
        </div>
      )}
    </>
  );
}
