"use client";

import { useState, useCallback } from "react";
import ChatWindow from "./ChatWindow";

interface WindowState {
  id: number;
  isOpen: boolean;
}

export default function ChatWidget() {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 1, isOpen: false },
  ]);
  const [nextId, setNextId] = useState(2);

  const hasOpenWindow = windows.some((w) => w.isOpen);

  const openWindow = (id: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: true } : w))
    );
  };

  const closeWindow = (id: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  };

  const createNewWindow = useCallback(() => {
    const id = nextId;
    setNextId((n) => n + 1);
    setWindows((prev) => [...prev, { id, isOpen: true }]);
  }, [nextId]);

  // Get open windows for positioning
  const openWindows = windows.filter((w) => w.isOpen);

  return (
    <>
      {/* Chat bubble trigger — only show when no windows are open */}
      {!hasOpenWindow && (
        <button
          onClick={() => openWindow(windows[windows.length - 1].id)}
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

      {/* Render each open chat window */}
      {openWindows.map((w, index) => (
        <ChatWindow
          key={w.id}
          windowId={w.id}
          index={index}
          totalOpen={openWindows.length}
          onClose={() => closeWindow(w.id)}
          onNewWindow={createNewWindow}
        />
      ))}
    </>
  );
}
